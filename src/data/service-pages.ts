export type ServicePageData = {
  id: string;
  path: string;
  eyebrow: string;
  title: string;
  intro: string;
  summary: string;
  audience: string;
  capabilities: string[];
  problems: string[];
  process: string[];
  projects: string[];
  faqs: { question: string; answer: string }[];
  related: string[];
  quote: string;
};

export const servicePages: ServicePageData[] = [
  {
    id: "website-development", path: "/services/website-development", eyebrow: "01 / Websites",
    title: "Websites built around what your business needs to say.",
    intro: "I design and build responsive websites for businesses, teams and events. We start with the people who need to use it, then shape the pages and enquiry path around them.",
    summary: "Website design and development for Nigerian businesses, with remote collaboration available across Nigeria and internationally.",
    audience: "A business that needs a clear online home, or an existing site that no longer explains the work well.",
    capabilities: ["Company and service websites", "Law firm, hotel, school and restaurant websites", "Portfolio and event websites", "Responsive redesigns", "Contact and enquiry flows", "Agreed maintenance and improvements"],
    problems: ["Visitors cannot tell what you offer or who it is for.", "Your site is difficult to use on a phone.", "Important details and contact routes are scattered.", "You need a website that can grow with your content."],
    process: ["Discuss the audience, goals, content and timing.", "Agree page structure, visual direction, scope and quote.", "Build and review the responsive pages together.", "Check the agreed flows, prepare launch and hand over."],
    projects: ["wedding", "dev-boyz"],
    faqs: [
      { question: "What does a business website cost?", answer: "A focused landing page is published at ₦150,000–₦300,000. A multi-page business website is quoted after we agree the pages, content, integrations and launch needs." },
      { question: "Can you work with a business outside Ibadan?", answer: "Yes. I work remotely with people in Nigeria and can discuss projects from other locations too. I do not claim a physical office in every city mentioned on this site." },
      { question: "Are domain and hosting included?", answer: "They are separate from the development quote unless the agreed proposal says otherwise. We will identify domain registration, hosting and third-party subscriptions before work begins." },
    ],
    related: ["ecommerce-development", "custom-software"],
    quote: "Tell me who the site needs to reach, what pages you have in mind and what you want visitors to do.",
  },
  {
    id: "ecommerce-development", path: "/services/ecommerce-development", eyebrow: "02 / Online shops",
    title: "An online shop should make browsing and buying clear.",
    intro: "I can help scope and build an online storefront around your catalogue, customers and order process. Payment, fulfilment and stock integrations depend on the providers and requirements we agree together.",
    summary: "E-commerce website development in Nigeria: storefronts, product discovery and carefully scoped buying flows.",
    audience: "A Nigerian business planning to sell online, or a team that needs a better way for customers to browse products and enquire.",
    capabilities: ["Responsive storefronts and product catalogues", "Product search and filters", "Shopping bag and checkout planning", "Payment-provider integration when supported and agreed", "Order and inventory workflow planning", "Admin dashboard requirements"],
    problems: ["Customers cannot find the right products on mobile.", "Product information is hard to keep organised.", "Orders arrive through disconnected channels.", "The shop needs a clear path from catalogue to confirmed order."],
    process: ["Map products, variants, delivery and payment needs.", "Confirm the checkout provider, integrations and operational rules.", "Agree what is included in the first release and what stays manual.", "Build, test the agreed flows and document handover."],
    projects: ["cantica", "dev-boyz"],
    faqs: [
      { question: "Have you built a live transactional store?", answer: "Cantica is a pre-launch storefront concept. It demonstrates catalogue, search, filters and a local launch bag, but it is not a live shop taking payments or managing real stock." },
      { question: "Can you connect Nigerian payment providers?", answer: "Payment integrations are scoped around a provider that supports the business and the required account setup. Availability, fees and approval depend on the provider; they are confirmed before implementation." },
      { question: "Can the store manage inventory?", answer: "We can scope inventory synchronization and admin workflows once we understand where stock is recorded and how orders are fulfilled. I will not assume an integration exists before checking it." },
    ],
    related: ["website-development", "erp-inventory"],
    quote: "Share the products you sell, how you currently take orders and what the customer checkout should look like.",
  },
  {
    id: "erp-inventory", path: "/services/erp-inventory", eyebrow: "03 / Business systems",
    title: "Bring everyday business workflows into clearer view.",
    intro: "I scope custom internal tools around the work a team already does: recording stock, following purchases, managing records or reviewing reports. The right first step is understanding the current process and where it breaks down.",
    summary: "Custom ERP and inventory software scoping for Nigerian businesses, based on real workflows and agreed requirements.",
    audience: "A team using spreadsheets, paper or disconnected tools to keep track of stock, purchases, clients or routine reporting.",
    capabilities: ["Inventory and stock movement records", "Purchase and supplier workflows", "Client and document records", "Staff roles and access rules", "Financial and operational reporting", "Workflow automation and logistics requirements"],
    problems: ["Staff cannot tell which record is current.", "Stock changes are difficult to trace.", "Routine reports take too long to assemble.", "A handoff between people depends on repeated messages."],
    process: ["Map roles, records, approvals and exceptions.", "Prioritise a small, testable first release.", "Agree data handling, access, integrations and reporting.", "Build with the intended users, test real scenarios and plan the handover."],
    projects: ["expenseai", "nairascope"],
    faqs: [
      { question: "Do you have a public ERP deployment to show?", answer: "There is no verified public client ERP case study on this portfolio today. I can show related dashboard work such as ExpenseAI and discuss a new system from its actual requirements." },
      { question: "Can an ERP include staff permissions and purchase orders?", answer: "Those are possible requirements to scope. The roles, approval rules, purchasing steps and reports should be agreed before a quote so the system fits how the business operates." },
      { question: "Will you replace our existing tools?", answer: "That depends on the workflow and integrations. We can identify what should stay, what data needs to move and which parts can be automated before making that decision." },
    ],
    related: ["custom-software", "ecommerce-development"],
    quote: "Tell me what you track today, who updates it and which stock or reporting decisions are hardest to make.",
  },
  {
    id: "custom-software", path: "/services/custom-software", eyebrow: "04 / Web applications",
    title: "Software shaped around a specific way of working.",
    intro: "I build web applications, data interfaces and internal dashboards where a standard website is not enough. We make the key workflow clear first, then choose a practical first version to build and validate.",
    summary: "Custom software and web application development in Nigeria, from focused dashboards to data-driven products.",
    audience: "A founder, team or organisation with a defined process that needs a tailored digital tool.",
    capabilities: ["Custom web applications and dashboards", "Data-driven interfaces and searchable records", "API and database-backed products", "Workflow automation", "Mobile-friendly internal tools", "SaaS prototypes and product foundations"],
    problems: ["A spreadsheet has become difficult to share or maintain.", "A team needs a dashboard built around its decisions.", "A product idea needs a working first version.", "Several steps or data sources should connect in one interface."],
    process: ["Define the user, job and information the tool needs.", "Agree the first release, data, integrations and risks.", "Build the main flow and review it against real scenarios.", "Test, document and plan what should happen next."],
    projects: ["afri-index", "terrascope", "expenseai", "predictarena"],
    faqs: [
      { question: "What kinds of applications are a good fit?", answer: "Focused dashboards, data tools, internal workflows and early product builds are good starting points when the users and problem can be described clearly." },
      { question: "Are the projects shown production business software?", answer: "Their status differs. Afri Index and TerraScope are live independent products; ExpenseAI's public workspace is browser-local; PredictArena is a live project with parts still in development. They demonstrate work, not a claim that every feature is a client deployment." },
      { question: "Can you build a SaaS product?", answer: "I can scope a prototype or application foundation. Accounts, billing, permissions, data protection and ongoing operations need to be specified for the actual product before confirming a delivery plan." },
    ],
    related: ["website-development", "erp-inventory"],
    quote: "Describe the user, the task they need to complete and what is difficult about the current process.",
  },
];

export const servicesHubMetadata = {
  path: "/services", title: "Web, E-commerce & Software Services | Favour Imegu",
  description: "Explore website, e-commerce, ERP and custom software development by Favour Imegu in Nigeria. See real project examples, scope and request a quote.", image: "/social-preview.png",
};
