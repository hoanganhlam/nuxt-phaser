import Phaser from 'phaser';

import MAIN_CONFIG from '../../config';
import CONFIG from '../../config/game';
import InputManager from './InputManager';
import SoundManager from './SoundManager';
import Player from '../../prefabs/player/Player';
import Obstacles from '../../prefabs/obstacles';

/**
 * Main game scene
 * @class GameScene
 * @extends {Phaser.Scene}
 */
class GameScene extends Phaser.Scene {
  static CONFIG = CONFIG.SCENES.GAME;

  constructor() {
    super(GameScene.CONFIG.NAME);
    this.layer = null
  }

  init() {
    this.isPlaying = false;
    this.soundManager = new SoundManager(this);
    this.inputManager = new InputManager(this);
  }

  create() {
    const map = this.make.tilemap({key: 'ninosaur'});
    const tileWorld = map.addTilesetImage('nino-tileset');
    this.world = map.createLayer("world", tileWorld);
    this.world.setPosition(0, 0)
    this.world.displayWidth = MAIN_CONFIG.scale.width;
    this.world.displayHeight = MAIN_CONFIG.scale.height;
    this.world.setCollisionByProperty({type: 'grass'});
    this.matter.world.convertTilemapLayer(this.world);

    this.userGroup = this.matter.world.nextGroup(true);
    this.obstacleCat = this.matter.world.nextCategory()
    this.playerCat = this.matter.world.nextCategory()

    this.obstacles = new Obstacles(this);
    this.players = {}
    fetch(window.API_DOMAIN).then(async res => {
      const x = await res.json();
      this.obstacles.spawn(x.data.obstacles);
      Object.keys(x.data.players).forEach(key => {
        if (!this.players[key]) {
          this.players[key] = new Player(this, x.data.players[key]);
        }
      })

      window.socket.on("new_player", (data) => {
        if (!this.players[data.id]) {
          this.players[data.id] = new Player(this, data.id);
        }
      });

      window.socket.on("player_flip", (data) => {
        const player = this.players[data]
        if (player.isDead) {
          player.reset()
        } else if (player.state === Player.CONFIG.STATES.RUNNING) {
          player.flip()
        } else if (player.state === Player.CONFIG.STATES.IDLING) {
          player.setState(Player.CONFIG.STATES.RUNNING);
        }
      });

      window.socket.on("player_kick", (data) => {
        const player = this.players[data.id];
        if (player) {
          player.kick();
          if (player.isReady) {
            Object.keys(this.players).forEach(key => {
              if (key !== data.id) {
                if (
                  Phaser.Geom.Intersects.RectangleToRectangle(player.getBounds(), this.players[key].getBounds()) &&
                  this.players[key].isReady
                ) {
                  this.players[key].die();
                }
              }
            });
          }
        }
      });

      window.socket.on("player_die", (data) => {
        const player = this.players[data];
        if (player) player.die();
      });

      window.socket.on("player_move", (data) => {
        const player = this.players[data.id];
        player.score = data.score;
        player.totalScore = data.totalScore;
        if (window.socket.id !== data.id) {
          if (player) {
            player.x = data.x;
            player.y = data.y;
            player.angle = data.angle;
            player.direction = data.direction;
            player.destroying = data.destroying;
            player.isReady = data.isReady;
            player.rotating = data.rotating;
            player.isReverse = data.isReverse;
            player.speed = data.speed;
            player.state = data.state;
          }
        }
      });

      window.socket.on("player_remove", (data) => {
        const player = this.players[data];
        if (player) {
          player.destroying = true;
          setTimeout(() => {
            player.destroy();
          }, 500)
        }
      });

      window.socket.on("spawn", (data) => {
        this.obstacles.spawn(data);
      });

      window.socket.emit('new_player')
    })
  }

  update(time, delta) {
    Object.values(this.players).forEach(player => {
      if (!player.destroying) {
        player.update(0)
      }
    })
    this.obstacles.update(0)
  }
}

export default GameScene;
