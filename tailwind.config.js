/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/{app,components}/**/*.tsx"],
  theme: {
    extend: {
      colors: {
        "death-knight": "#c41e3a",
        "demon-hunter": "#a330c9",
        druid: "#ff7d0a",
        evoker: "#33937f",
        hunter: "#abd473",
        mage: "#69ccf0",
        monk: "#00ff96",
        paladin: "#f58cba",
        priest: "#ffffff",
        rogue: "#fff569",
        shaman: "#0070de",
        warlock: "#9482c9",
        warrior: "#c79c6e",
      },
    },
  },
  plugins: [],
  safelist: [
    "text-death-knight",
    "text-demon-hunter",
    "text-druid",
    "text-evoker",
    "text-hunter",
    "text-mage",
    "text-monk",
    "text-paladin",
    "text-priest",
    "text-rogue",
    "text-shaman",
    "text-warlock",
    "text-warrior",
  ],
};
