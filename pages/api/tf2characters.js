const characters = [
  { name: "Scout", id: "scout" },
  {
    name: "Soldier",
    id: "soldier",
  },
  { name: "Pyro", id: "pyro" },
  {
    name: "Demoman",
    id: "demoman",
  },
  { name: "Heavy", id: "heavy" },
  {
    name: "Engineer",
    id: "engineer",
  },
  { name: "Medic", id: "medic" },
  {
    name: "Sniper",
    id: "sniper",
  },
  { name: "Spy", id: "spy" },
  {
    name: "Administrator",
    id: "administrator",
  },
  {
    name: "Blutarch Mann",
    id: "blutarch",
  },
  {
    name: "Gray Mann",
    id: "grayMann",
  },
  {
    name: "Merasmus",
    id: "merasmus",
  },
  {
    name: "Miss Pauling",
    id: "missPauling",
  },
  {
    name: "Redmond Mann",
    id: "redmond",
  },
  {
    name: "Saxton Hale",
    id: "saxtonHale",
  },
  {
    name: "The Bombinomicon",
    id: "bombinomicon",
  },
  {
    name: "The Horseless Headless Horsemann",
    id: "hhh",
  },
]

export default async function (req, res) {
  try {
    res.status(200).json({ characters })
  } catch (e) {
    console.log(e)
  }
}
