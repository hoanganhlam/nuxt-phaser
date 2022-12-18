function slugify(str) {
  str = str.replace(/^\s+|\s+$/g, '');
  str = str.toLowerCase();
  let from = "àáäâèéëêìíïîòóöôùúüûñç·/_,:;";
  let to = "aaaaeeeeiiiioooouuuunc------";
  for (let i = 0, l = from.length; i < l; i++) {
    str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
  }
  str = str.replace(/[^a-z0-9 -]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
  return str;
}


const event_names = [
  {title: "Launch", id: "launch"},
  {title: "Listing", id: "listing"},
  {title: "Initial DEX Offering", id: "ido"},
  {title: "Initial CEX Offering", id: "ico"},
  {title: "Initial Exchange Offering", id: "ieo"},
  {title: "Initial Gaming Offering", id: "igo"},
  {title: "Add member", id: "add_member"},
  {title: "Add backer", id: "add_backer"},
  {title: "Add advisor", id: "add_advisor"},
  {title: "Add Investor", id: "add_investor"},
  {title: "AMA", id: "ama"},
  {title: "Release", id: "release"},
]

const target_types = [
  {title: "Market", id: "market"},
  {title: "Community", id: "community"},
  {title: "Team Member", id: "team_member"},
  {title: "Developer", id: "developer"},
  {title: "Marketer", id: "marketer"},
  {title: "Investor", id: "investor"}
]

const month = [
  {title: "January", id: 0},
  {title: "February", id: 1},
  {title: "March", id: 2},
  {title: "April", id: 3},
  {title: "May", id: 4},
  {title: "June", id: 5},
  {title: "July", id: 6},
  {title: "August", id: 7},
  {title: "September", id: 8},
  {title: "October", id: 9},
  {title: "November", id: 10},
  {title: "December", id: 11}
]

const positions = [
  {title: "CEO", id: "ceo"}
]

const handleAdd = (txt, dataset) => {
  if (!dataset.map(x => x.id).includes(slugify(txt))) {
    return {title: txt, id: slugify(txt)}
  }
  return null
}

export default {
  event_name: {
    default: event_names,
    handleAdd: (txt) => {
      return handleAdd(txt, event_names)
    }
  },
  partner_type: {
    default: target_types,
    handleAdd: (txt) => {
      return handleAdd(txt, target_types)
    }
  },
  position: {
    default: positions,
    handleAdd: (txt) => {
      return handleAdd(txt, positions)
    }
  },
  month: {
    default: month
  }
}
