import Web3 from "web3";
import WalletConnect from "@walletconnect/client";
import QRCodeModal from "@walletconnect/qrcode-modal";

const ABI_NFT = require("../abi/NFT.json");
const COOKIE_AGE = 60 * 60 * 24 * 7;

const wc_connector = new WalletConnect({
  bridge: "https://bridge.walletconnect.org",
  qrcodeModal: QRCodeModal,
});

export default async function (context, inject) {
  const $w3 = new Web3(window.ethereum);
  if (process.env.ADDR_NFT_HUNTER) {
    $w3.ADDR_NFT_HUNTER = process.env.ADDR_NFT_HUNTER;
    $w3.CONTRACT_NFT_HUNTER = new $w3.eth.Contract(ABI_NFT, $w3.ADDR_NFT_HUNTER);
  }
  $w3.getBalance = async function (wallet) {
    let balance = {
      khv: 0
    }
    if (wallet && $w3.ADDR_NFT_HUNTER) {
      balance.khh = await $w3.CONTRACT_NFT_HUNTER.methods.balanceOf(wallet).call();
    }
    await context.store.commit("auth/SET_BALANCE", balance);
  }
  $w3.getConnection = async function () {
    if (wc_connector.connected) {
      return {
        connector: wc_connector,
        connect_type: "walletconnect",
      };
    } else if (window.ethereum) {
      return {
        connector: new Web3(window.ethereum),
        connect_type: "metamask",
      };
    }
    return null;
  }
  $w3.validNetwork = async function () {
    const connect = await this.getConnection();
    if (connect && connect.connect_type === "metamask") {
      const id = await connect.connector.eth.net.getId();
      const networks = [""];
    }
  }
  $w3.checkWallet = async function () {
    let accounts = [];
    if (wc_connector.connected) {
      accounts = wc_connector.accounts;
    } else if (window.ethereum) {
      accounts = await new Web3(window.ethereum).eth.getAccounts();
    }
    let wallet = accounts.shift();
    if (wallet) {
      let needSign = true;
      let signature = context.store.$ck.get("auth.signature");
      let message = context.store.$ck.get("auth.message");
      if (message) {
        let jMsg = JSON.parse(window.atob(message));
        let now = new Date().getTime();
        if (jMsg.timestamp + COOKIE_AGE * 1000 > now) {
          needSign = false
        }
        if (jMsg.wallet !== wallet) {
          needSign = true
        }
      }
      if (needSign) {
        message = window.btoa(JSON.stringify({
          wallet: wallet,
          type: 'auth',
          timestamp: new Date().getTime(),
        }))
        signature = await $w3.sign(wallet, message);
      }
      if (signature && message) {
        context.store.$ck.set("auth.signature", signature, {
          maxAge: COOKIE_AGE,
          path: '/'
        });
        context.store.$ck.set("auth.message", message, {
          maxAge: COOKIE_AGE,
          path: '/'
        });
        context.$axios.setHeader('signature', signature);
        context.$axios.setHeader('message', message);
        localStorage.setItem("is_connected", "true");
      } else {
        wallet = null;
      }
    }
    await context.store.dispatch("auth/setWallet", wallet);
    await $w3.getBalance(wallet);
  }
  $w3.sign = async function (wallet, message) {
    return await $w3.eth.personal.sign(message, wallet, '').catch((e) => {
      return null;
    })
  }
  $w3.connect = async function () {
    if (window.ethereum) {
      await window.ethereum.enable();
      await $w3.checkWallet();
    }
  }
  if (process.browser) {
    if (localStorage && localStorage.getItem("is_connected") === "true") {
      await $w3.checkWallet();
    }
  }
  context.$web3 = $w3;
  inject("web3", $w3);
}
