export const contact = {
  email: "Imegufavour30@gmail.com",
  whatsapp: "https://wa.me/2349127971199",
};
export const services = [
  {
    id: "landing-page",
    title: "Landing page",
    for: "A launch, service or campaign with one clear goal.",
    price: "₦150,000–₦300,000",
    scope: "One focused page",
    includes: [
      "Design tailored to your brand",
      "Responsive phone and desktop layout",
      "Enquiry or contact action",
      "Agreed scope and launch plan",
    ],
    upgrades: "Additional sections, custom motion and integrations.",
  },
  ...[
    [
      "business-website",
      "Business website",
      "A clear home for your company, services and enquiries.",
      "Company pages, service information and contact flow",
    ],
    [
      "portfolio",
      "Portfolio website",
      "For people whose work deserves a considered presentation.",
      "Selected work, your story and contact pages",
    ],
    [
      "ecommerce",
      "E-commerce website",
      "For businesses planning a useful online shop.",
      "Product catalogue, checkout and order requirements",
    ],
    [
      "web-application",
      "Web application / SaaS",
      "For a product with workflows beyond a brochure.",
      "User flows, account requirements and integrations",
    ],
    [
      "business-systems",
      "ERP & internal systems",
      "For teams connecting their everyday work.",
      "Roles, dashboards, reporting and business workflows",
    ],
    [
      "maintenance",
      "Maintenance & improvements",
      "For an existing website that needs attention.",
      "Agreed fixes, updates and ongoing support",
    ],
    [
      "integrations",
      "Integrations & automation",
      "For connecting tools and reducing repeat work.",
      "API connections and agreed automated workflows",
    ],
  ].map(([id, title, who, scope]) => ({
    id,
    title,
    for: who,
    scope,
    price: null,
    includes: [
      "Discovery and agreed requirements",
      "Responsive, accessible interface where applicable",
      "Testing and handover",
    ],
    upgrades:
      "Hosting, maintenance and additional integrations quoted separately.",
  })),
];
export const chapters = [
  {
    time: "Ibadan / childhood",
    title: "Growing Up in Ibadan",
    preview: "A family full of lawyers. One child fascinated by computers.",
    story:
      "I grew up in Ibadan, Nigeria. Both my parents are practicing lawyers, and quite a few other family members are lawyers too. Sometimes it feels like almost half the family could represent the other half. Computers were the thing that caught my attention.",
  },
  {
    time: "Ages 10–12",
    title: "The Computer Kid",
    preview: "Office applications first. A coding class in Abuja next.",
    story:
      "By 10, I was comfortable with the major Microsoft Office applications. At 12, I spent a holiday in Abuja with my dad, who enrolled me in a coding class. It was fun and interactive. I didn’t leave as an expert programmer; I left wanting to understand more.",
  },
  {
    time: "2022 / onwards",
    title: "School and Finding My Way",
    preview:
      "Valencia College, Bowen University, and a lot of learning between the lines.",
    story:
      "I graduated from Valencia College in 2022 and later studied Computer Science at Bowen University in Iwo. University had its ups and downs. I consider myself an academically average student, but grades alone don’t describe what I can build. Friendships, challenges and the people around me shaped that journey.",
    image: "/favour-graduation-2026.webp",
  },
  {
    time: "University / Dev Boyz",
    title: "Learning to Work With Others",
    preview: "Nobody is a bank of knowledge. We all need each other.",
    story:
      "University taught me to delegate, recognise other people’s strengths and keep showing up under pressure. Some of the people I met became my Dev Boyz teammates. Delegation isn’t weakness: it makes room for someone else’s expertise. And to Professor Oyebade, my final-year supervisor: thank you for being part of my university journey.",
    link: "/work/dev-boyz",
  },
  {
    time: "Call of Duty: Mobile",
    title: "Life came to nerf me.",
    preview:
      "Competitive gaming, device upgrades, and some inconvenient reality.",
    story:
      "I competed around Tier 2 and Tier 3. First came an iPhone 11, which was later stolen, then an iPhone 12 with its 60 FPS limitations, and eventually a RedMagic 7S Pro. The upgrade helped, but I didn’t improve as much as I’d hoped. Bad internet, academics and software projects all demanded time. Honestly, I’m not even sure I would have made Tier 1. That doesn’t erase what the experience means to me. I’m not entirely giving up.",
  },
  {
    time: "The passion project",
    title: "Building Afri Index",
    preview: "An argument about Omah Lay became a project I fell in love with.",
    story:
      "My roommates didn’t agree that Omah Lay belonged in the Afrobeats top 10. I started gathering statistics to make my case, and the work became more interesting than winning the argument. The rankings still need to be fair—even when my favourite doesn’t land where I want.",
    link: "/work/afri-index",
  },
  {
    time: "The heart project",
    title: "Building Something That Made Someone Happy",
    preview: "My favourite outcome wasn’t a metric. It was my aunt’s reaction.",
    story:
      "I built BlessingFoundHerBlessing for my aunt, one of my favourite people. I cared about the little details, the visuals and how special it felt. Hearing how happy she sounded when she first saw it is the part I’ll always keep.",
    link: "/work/wedding",
  },
];
