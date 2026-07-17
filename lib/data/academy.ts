export interface AcademySeminar {
  id: string;
  title: string;
  subtitle: string;
  date: string;
  time: string;
  location: string;
  price: number;
  earlyBirdPrice: number;
  earlyBirdDeadline: string;
  spots: number;
  spotsLeft: number;
  topics: string[];
  instructor: string;
  duration: string;
  level: "beginner" | "intermediate" | "advanced";
}

export const seminars: AcademySeminar[] = [
  {
    id: "sem-001",
    title: "Importation Mastery",
    subtitle: "Source directly from China and build your inventory on a budget",
    date: "Saturday, 19 July 2025",
    time: "9:00 AM – 4:00 PM",
    location: "Arusha Conference Centre",
    price: 80000,
    earlyBirdPrice: 55000,
    earlyBirdDeadline: "10 July 2025",
    spots: 30,
    spotsLeft: 8,
    instructor: "Eric Alfonce",
    duration: "7 hours (full day)",
    level: "beginner",
    topics: [
      "How to find verified suppliers on Alibaba and 1688",
      "Negotiating prices — what to say and what to avoid",
      "Minimum order quantities and how to start small",
      "Shipping options: sea, air, and courier compared",
      "Tanzania customs: duties, clearance, and what to declare",
      "Real product sourcing walkthrough (live demo)",
      "Avoiding scams and protecting your money",
    ],
  },
  {
    id: "sem-002",
    title: "Online Sales Bootcamp",
    subtitle: "Turn your phone accessories stock into a consistent income stream",
    date: "Saturday, 9 August 2025",
    time: "9:00 AM – 5:00 PM",
    location: "Arusha Conference Centre",
    price: 90000,
    earlyBirdPrice: 65000,
    earlyBirdDeadline: "31 July 2025",
    spots: 25,
    spotsLeft: 12,
    instructor: "Eric Alfonce",
    duration: "8 hours (full day)",
    level: "intermediate",
    topics: [
      "Setting up a professional WhatsApp Business catalogue",
      "Instagram and TikTok content that actually converts",
      "Writing product descriptions that make people buy",
      "Pricing strategy: how to stay competitive and still profit",
      "Handling orders, payments, and customer complaints",
      "Building repeat customers through trust and follow-up",
      "Scaling from side hustle to full-time business",
    ],
  },
  {
    id: "sem-003",
    title: "Advanced Sourcing Strategies",
    subtitle: "Move beyond Alibaba — exclusive suppliers, private labels, and bulk margins",
    date: "Saturday, 6 September 2025",
    time: "9:00 AM – 3:00 PM",
    location: "Arusha Conference Centre",
    price: 110000,
    earlyBirdPrice: 80000,
    earlyBirdDeadline: "28 August 2025",
    spots: 20,
    spotsLeft: 5,
    instructor: "Eric Alfonce",
    duration: "6 hours",
    level: "advanced",
    topics: [
      "1688 and Taobao: sourcing from Chinese platforms without an agent",
      "Private labelling: building your own brand affordably",
      "Factory visits vs. trading companies — when to go direct",
      "Quality control: inspections before goods leave China",
      "Building long-term supplier relationships for better deals",
      "Wholesale distribution in Tanzania: supplying other shops",
      "Group buying with other entrepreneurs to unlock bulk prices",
    ],
  },
];

export const academyStats = {
  graduates: "340+",
  rating: "4.8",
  businessStarted: "87%",
  averageROI: "3x within 6 months",
};
