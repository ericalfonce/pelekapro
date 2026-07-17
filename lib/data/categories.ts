export interface CategoryInfo {
  id: string;
  label: string;
  labelSwahili: string;
  description: string;
  icon: string; // emoji — replace with SVG when design system is ready
  color: string; // subtle bg tint for category tiles
  count?: number;
}

export const categories: CategoryInfo[] = [
  {
    id: "cases",
    label: "Phone Cases",
    labelSwahili: "Vifuniko vya Simu",
    description: "Ulinzi wa kweli bila kuficha uzuri",
    icon: "📱",
    color: "#F0F0EE",
  },
  {
    id: "chargers",
    label: "Chargers & Cables",
    labelSwahili: "Vichaja na Nyaya",
    description: "GaN, fast charge, MFi certified",
    icon: "⚡",
    color: "#FFF3E8",
  },
  {
    id: "power-banks",
    label: "Power Banks",
    labelSwahili: "Betri za Ziada",
    description: "Usikoseshwe nguvu popote ulipo",
    icon: "🔋",
    color: "#F0F5EE",
  },
  {
    id: "audio",
    label: "Earbuds & Headphones",
    labelSwahili: "Masikio na Vipokea Sauti",
    description: "ANC, Hi-Res, wireless freedom",
    icon: "🎧",
    color: "#EEF0F5",
  },
  {
    id: "screen-protectors",
    label: "Screen Protectors",
    labelSwahili: "Vilinda Skrini",
    description: "9H tempered glass, full-cover",
    icon: "🛡️",
    color: "#F5EEEE",
  },
  {
    id: "smartwatches",
    label: "Smartwatches",
    labelSwahili: "Saa za Akili",
    description: "AMOLED, health tracking, week-long battery",
    icon: "⌚",
    color: "#F0EEF5",
  },
  {
    id: "speakers",
    label: "Bluetooth Speakers",
    labelSwahili: "Vipaza Sauti vya Bluetooth",
    description: "Waterproof, outdoor-ready, powerful",
    icon: "🔊",
    color: "#EEF5F5",
  },
  {
    id: "bundles",
    label: "Combo Bundles",
    labelSwahili: "Mafurushi ya Combo",
    description: "Vitu vingi kwa bei moja — akiba halisi",
    icon: "📦",
    color: "#FFF8EE",
  },
];
