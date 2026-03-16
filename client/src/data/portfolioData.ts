// Portfolio data for Bruno Nakano's portfolio website
// Design: Retro-Futurist OS Terminal - desktop metaphor with draggable folders

export interface Project {
  id: string;
  title: string;
  number?: string;
  subtitle?: string;
  description?: string;
  credits?: string;
  thumbnail?: string;
  images?: string[];
  link?: string;
}

export interface Category {
  id: string;
  name: string;
  projects: Project[];
  position: { x: number; y: number };
}

export const BRUNO_HEADSHOT = "https://d2xsxph8kpxj0f.cloudfront.net/310519663345609769/ebddu5gAjjXLBejJrGs3UU/bruno-headshot-DrzB7KCW37mYGvDyCbeTf5.webp";
export const BRUNO_FULLBODY = "https://d2xsxph8kpxj0f.cloudfront.net/310519663345609769/ebddu5gAjjXLBejJrGs3UU/bruno-fullbody-44irAzx2VKqvKgYttZZfGa.webp";

export const categories: Category[] = [
  {
    id: "interactive",
    name: "INTERACTIVE",
    position: { x: 6, y: 12 },
    projects: [
      {
        id: "samsung-diplo",
        title: "SAMSUNG X DIPLO [CAN'T STOP]",
        number: "01",
        subtitle: "THE MIX THAT ONLY PLAYS WHEN YOU MOVE",
        description: `Introducing "Can't Stop" by Grammy-winning DJ/Producer Diplo, an exclusive 30-minute mix with a catch: you have to move to play it. Your phone's GPS and accelerometer detect movement to play the mix, which is composed of new, unreleased content. Run, jump, dance, pogo - the app doesn't discriminate. Just don't stop.`,
        credits: "[AGENCY: R/GA NY] [PRODUCTION: R/GA STUDIOS NY-BA]",
        thumbnail: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=400&q=80",
      },
      {
        id: "mcdonalds-emlings",
        title: "MCDONALD'S [EMLINGS]",
        number: "02",
        subtitle: "DIGITAL CREATURES THAT LIVE IN YOUR HAPPY MEAL",
        description: "A mobile AR experience where McDonald's Happy Meal boxes come to life with digital creatures called Emlings. Each box contains a unique character that kids can collect, train, and play with through the app.",
        credits: "[AGENCY: DDB CHICAGO] [PRODUCTION: UNIT9]",
        thumbnail: "https://images.unsplash.com/photo-1619454016518-697bc231e7cb?w=400&q=80",
      },
      {
        id: "samsung-sdrive",
        title: "SAMSUNG [S-DRIVE]",
        number: "03",
        subtitle: "THE SAFER DRIVING APP",
        description: "S Drive is a mobile app that rewards safe driving behavior. The app monitors speed, phone usage, and smooth braking to generate a driving score. Users earn rewards and compete with friends.",
        credits: "[AGENCY: R/GA NY]",
        thumbnail: "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=400&q=80",
      },
      {
        id: "learn-to-unlock",
        title: "LEARN TO UNLOCK",
        number: "04",
        subtitle: "EXPERIMENTS [VIBE-CODING]",
        description: "An experimental interactive experience exploring the intersection of learning and technology. Built as a vibe-coding experiment.",
        thumbnail: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&q=80",
      },
      {
        id: "love-o-meter",
        title: "LOVE-O-METER",
        number: "05",
        subtitle: "EXPERIMENTS [VIBE-CODING]",
        description: "An experimental love compatibility calculator built as a vibe-coding experiment.",
        thumbnail: "https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=400&q=80",
      },
      {
        id: "whoopinator",
        title: "THE WHOOPINATOR",
        number: "06",
        subtitle: "EXPERIMENTS [VIBE-CODING]",
        description: "A playful experimental web experience built as a vibe-coding experiment.",
        thumbnail: "https://images.unsplash.com/photo-1535016120720-40c646be5580?w=400&q=80",
      },
      {
        id: "mood-calendar",
        title: "MOOD CALENDAR",
        number: "07",
        subtitle: "EXPERIMENTS [VIBE-CODING]",
        description: "A mood tracking calendar application built as a vibe-coding experiment.",
        thumbnail: "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?w=400&q=80",
      },
    ],
  },
  {
    id: "social-pr",
    name: "SOCIAL AND PR",
    position: { x: 18, y: 30 },
    projects: [
      {
        id: "zuck",
        title: "@ZUCK",
        number: "01",
        subtitle: "MARK ZUCKERBERG'S SOCIAL PRESENCE",
        description: "Creative direction and strategy for Mark Zuckerberg's personal social media presence across platforms.",
        thumbnail: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=400&q=80",
      },
      {
        id: "facebook-rock",
        title: "FACEBOOK (I WANNA ROCK)",
        number: "02",
        subtitle: "SOCIAL CAMPAIGN",
        description: "A social media campaign celebrating music and connection on Facebook.",
        thumbnail: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&q=80",
      },
      {
        id: "facebook-horrors",
        title: "FACEBOOK (HOUSE OF HORRORS)",
        number: "03",
        subtitle: "HALLOWEEN CAMPAIGN",
        description: "A Halloween-themed social campaign for Facebook featuring interactive horror experiences.",
        thumbnail: "https://images.unsplash.com/photo-1509557965875-b88c97052f0e?w=400&q=80",
      },
      {
        id: "facebook-mindfull",
        title: "FACEBOOK (MINDFULL)",
        number: "04",
        subtitle: "MENTAL WELLNESS CAMPAIGN",
        description: "A social campaign promoting mental wellness and mindfulness on Facebook.",
        thumbnail: "https://images.unsplash.com/photo-1545389336-cf090694435e?w=400&q=80",
      },
    ],
  },
  {
    id: "design-illustration",
    name: "DESIGN AND ILLUSTRATION",
    position: { x: 8, y: 55 },
    projects: [
      {
        id: "design-1",
        title: "IDENTITY OF PLACE",
        number: "01",
        description: "Exhibition poster design exploring cultural identity and place.",
        thumbnail: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&q=80",
      },
      {
        id: "design-2",
        title: "TYPOGRAPHIC STUDIES",
        number: "02",
        description: "Experimental typography and lettering explorations.",
        thumbnail: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400&q=80",
      },
      {
        id: "design-3",
        title: "EDITORIAL ILLUSTRATION",
        number: "03",
        description: "Illustrations for editorial and publishing projects.",
        thumbnail: "https://images.unsplash.com/photo-1572044162444-ad60f128bdea?w=400&q=80",
      },
      {
        id: "design-4",
        title: "BRAND ILLUSTRATIONS",
        number: "04",
        description: "Custom illustrations created for brand identity projects.",
        thumbnail: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80",
      },
    ],
  },
  {
    id: "campaign",
    name: "CAMPAIGN",
    position: { x: 20, y: 16 },
    projects: [
      {
        id: "facebook-eoy",
        title: "FACEBOOK [END OF THE YEAR]",
        number: "01",
        subtitle: "YEAR IN REVIEW",
        description: "Facebook's annual year-in-review campaign celebrating connections and memories made throughout the year.",
        thumbnail: "https://images.unsplash.com/photo-1467810563316-b5476525c0f9?w=400&q=80",
      },
      {
        id: "libero-football",
        title: "LIBERO MAGAZINE [FOOTBALL ANALOGIES]",
        number: "02",
        subtitle: "EDITORIAL CAMPAIGN",
        description: "A campaign for Libero Magazine using football analogies to explain life's bigger moments.",
        thumbnail: "https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=400&q=80",
      },
      {
        id: "levis-vote",
        title: "LEVI'S [USE YOUR VOTE]",
        number: "03",
        subtitle: "CIVIC ENGAGEMENT CAMPAIGN",
        description: "A campaign encouraging young Americans to exercise their right to vote, featuring Levi's iconic denim aesthetic.",
        thumbnail: "https://images.unsplash.com/photo-1540910419892-4a36d2c3266c?w=400&q=80",
      },
      {
        id: "samsung-unbox",
        title: "SAMSUNG [UNBOX YOUR PHONE]",
        number: "04",
        subtitle: "PRODUCT LAUNCH CAMPAIGN",
        description: "A campaign for Samsung's latest smartphone launch, encouraging users to unbox the full potential of their device.",
        thumbnail: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&q=80",
      },
      {
        id: "wwf-just",
        title: "WWF [JUST*]",
        number: "05",
        subtitle: "ENVIRONMENTAL CAMPAIGN",
        description: "A powerful environmental awareness campaign for WWF challenging people to reconsider their relationship with nature.",
        thumbnail: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&q=80",
      },
      {
        id: "facebook-real-story",
        title: "FACEBOOK (A REAL FACEBOOK STORY)",
        number: "06",
        subtitle: "BRAND CAMPAIGN",
        description: "A brand campaign showcasing real stories of connection and community on Facebook.",
        thumbnail: "https://images.unsplash.com/photo-1516321497487-e288fb19713f?w=400&q=80",
      },
    ],
  },
  {
    id: "brand-identity",
    name: "BRAND AND IDENTITY",
    position: { x: 28, y: 12 },
    projects: [
      {
        id: "wwf-just-brand",
        title: "WWF [JUST*]",
        number: "01",
        subtitle: "BRAND IDENTITY",
        description: "Complete brand identity system for WWF's JUST* initiative, including logo, typography, and visual guidelines.",
        thumbnail: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&q=80",
      },
      {
        id: "studio-mano",
        title: "STUDIO MANO",
        number: "02",
        subtitle: "BRAND IDENTITY",
        description: "Brand identity for Studio Mano, a ceramics and furniture design studio. Includes logo, packaging, and visual system.",
        thumbnail: "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=400&q=80",
      },
    ],
  },
  {
    id: "events-activations",
    name: "EVENTS AND ACTIVATIONS",
    position: { x: 36, y: 30 },
    projects: [
      {
        id: "playstation-tailor",
        title: "PLAYSTATION [MR. LEE TAILOR SHOP]",
        number: "01",
        subtitle: "EXPERIENTIAL ACTIVATION",
        description: "An immersive pop-up activation for PlayStation featuring Mr. Lee's Tailor Shop, where visitors could customize their gaming experience.",
        thumbnail: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400&q=80",
      },
    ],
  },
  {
    id: "pottery-furniture",
    name: "POTTERY AND FURNITURE",
    position: { x: 44, y: 14 },
    projects: [
      {
        id: "pottery-1",
        title: "CERAMIC VESSELS",
        number: "01",
        description: "Hand-thrown ceramic vessels with organic forms and natural glazes.",
        thumbnail: "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=400&q=80",
      },
      {
        id: "pottery-2",
        title: "FURNITURE COLLECTION",
        number: "02",
        description: "Custom furniture pieces combining traditional craft with contemporary design.",
        thumbnail: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&q=80",
      },
      {
        id: "pottery-3",
        title: "CARVED TABLE",
        number: "03",
        description: "Hand-carved wooden table with intricate geometric patterns.",
        thumbnail: "https://images.unsplash.com/photo-1530018607912-eff2daa1bac4?w=400&q=80",
      },
      {
        id: "pottery-4",
        title: "TILE WORK",
        number: "04",
        description: "Handmade ceramic tiles with traditional patterns and contemporary applications.",
        thumbnail: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80",
      },
    ],
  },
];

export const aboutContent = {
  bio: `Bruno Nakano is a Creative Director and CEO Communications lead at Meta, based in Los Angeles.

With a career spanning São Paulo, Madrid, Sydney, New York, San Francisco, and LA, Bruno brings a global perspective to his work in interactive experiences, social campaigns, brand identity, and experiential activations.

Previously at R/GA New York, Bruno led award-winning campaigns for Samsung, McDonald's, Levi's, and WWF. His work sits at the intersection of technology, culture, and craft — from mobile apps that only play music when you move, to hand-thrown ceramics and custom furniture.`,
  email: "hello@brunonakano.com",
  locations: "SAO / MAD / SYD / NYC / SF / LA",
  currentLocation: "Los Angeles, CA",
  title: "Creative Director",
  company: "CEO Communications | Meta",
};
