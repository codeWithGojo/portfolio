import { projects } from "../projects";
import { servicePages, servicesHubMetadata } from "./service-pages";

export const siteOrigin = "https://imegu.world";
const socialImage = "/social-preview.png";
const descriptions: Record<string, string> = {
  "/": "Favour Imegu is a Nigerian web and software developer building thoughtful websites, web apps and business systems. Explore real projects or discuss what you need.",
  "/about": "Meet Favour Imegu: a software developer from Ibadan, educated at Bowen University, learning through real web, mobile and business software projects with Dev Boyz.",
  "/work": "Explore Favour Imegu’s software projects and case studies: Afri Index, TerraScope, FireSafe, business dashboards, mobile tools and websites.",
  "/hobbies": "Arsenal, anime, music and competitive gaming: personal stories and interests beyond the software projects of Favour Imegu.",
  "/pricing": "Compare Favour Imegu’s web development services. Landing pages start at ₦150,000; business websites, online shops and custom systems are quoted to scope.",
  "/contact": "Contact Favour Imegu about a website, e-commerce project, web app or custom business system. Share your idea or start with WhatsApp.",
  ...Object.fromEntries(servicePages.map((service) => [service.path, service.summary])),
  "/services": servicesHubMetadata.description,
};
const clip = (text: string, max = 158) => text.length <= max ? text : `${text.slice(0, max - 1).replace(/\s+\S*$/, "")}…`;
const projectDescription = (project: (typeof projects)[number]) => clip(`${project.title}: ${project.summary || project.why} ${project.status}.`);
export const pageMetadata = [
  { path: "/", title: "Favour Imegu | Web & Software Developer in Nigeria", description: descriptions["/"], image: socialImage },
  { path: "/about", title: "About Favour Imegu | Story, Skills & Dev Boyz", description: descriptions["/about"], image: socialImage },
  { path: "/work", title: "Software Projects & Case Studies | Favour Imegu", description: descriptions["/work"], image: socialImage },
  { path: "/hobbies", title: "Outside the Code | Favour Imegu", description: descriptions["/hobbies"], image: socialImage },
  { path: "/pricing", title: "Web Development Services & Pricing in Nigeria | Favour Imegu", description: descriptions["/pricing"], image: socialImage },
  { path: "/contact", title: "Hire Favour Imegu | Web & Software Projects", description: descriptions["/contact"], image: socialImage },
  servicesHubMetadata,
  ...servicePages.map((service) => ({
    path: service.path,
    title: service.id === "website-development" ? "Website Developer in Nigeria | Favour Imegu"
      : service.id === "ecommerce-development" ? "E-commerce Website Development Nigeria | Favour Imegu"
      : service.id === "erp-inventory" ? "Custom ERP & Inventory Software Nigeria | Favour Imegu"
      : "Custom Software & Web App Developer | Favour Imegu",
    description: service.summary,
    image: socialImage,
  })),
  ...projects.map((project) => ({ path: `/work/${project.id}`, title: clip(`${project.title} | Favour Imegu`, 65), description: projectDescription(project), image: project.image || socialImage, imageWidth: project.imageWidth || 1200, imageHeight: project.imageHeight || 630 })),
];
export function metadataFor(path: string) {
  const normalized = path.replace(/\/$/, "") || "/";
  return pageMetadata.find((page) => page.path === normalized) || {
    path: "/404", title: "Page Not Found | Favour Imegu",
    description: "This page could not be found. Explore Favour Imegu’s software projects, story and contact details.", image: socialImage,
  };
}

const personId = `${siteOrigin}/#favour-imegu`;
const websiteId = `${siteOrigin}/#website`;
export function structuredDataFor(path: string) {
  const page = metadataFor(path);
  const canonical = `${siteOrigin}${page.path}`;
  const graph: Record<string, unknown>[] = [];
  const person = { "@id": personId, "@type": "Person", name: "Favour Imegu", alternateName: "codeWithGojo", url: siteOrigin, image: `${siteOrigin}/hero-graduation.webp`, jobTitle: "Software developer", description: descriptions["/"], homeLocation: { "@type": "Place", name: "Ibadan, Nigeria" }, alumniOf: { "@type": "CollegeOrUniversity", name: "Bowen University", address: { "@type": "PostalAddress", addressLocality: "Iwo", addressCountry: "NG" } }, sameAs: ["https://github.com/codeWithGojo"] };
  const website = { "@id": websiteId, "@type": "WebSite", name: "IMEGU.WORLD", url: siteOrigin, inLanguage: "en", publisher: { "@id": personId } };
  graph.push(person, website);
  if (page.path.startsWith("/work/")) {
    const project = projects.find((item) => `/work/${item.id}` === page.path);
    if (project) graph.push({ "@type": "CreativeWork", name: project.title, description: page.description, url: canonical, image: project.image ? `${siteOrigin}${project.image}` : undefined, creator: { "@id": personId }, keywords: project.tech.join(", "), about: project.tags.join(", "), ...(project.links[0] ? { sameAs: project.links.map((link) => link.href) } : {}) });
  }
  const servicePage = servicePages.find((service) => service.path === page.path);
  if (servicePage) graph.push({ "@type": "Service", name: servicePage.eyebrow.split(" / ")[1], serviceType: servicePage.eyebrow.split(" / ")[1], description: servicePage.summary, provider: { "@id": personId }, areaServed: [{ "@type": "Country", name: "Nigeria" }, { "@type": "Place", name: "Worldwide, remotely" }], url: canonical, isPartOf: { "@id": websiteId } });
  if (page.path === "/") graph.push({ "@type": "ProfilePage", name: page.title, url: canonical, mainEntity: { "@id": personId } });
  else if (page.path === "/about") graph.push({ "@type": "AboutPage", name: page.title, description: page.description, url: canonical, mainEntity: { "@id": personId }, isPartOf: { "@id": websiteId } });
  else if (page.path === "/work" || page.path === "/hobbies" || page.path === "/services") graph.push({ "@type": "CollectionPage", name: page.title, description: page.description, url: canonical, isPartOf: { "@id": websiteId } });
  else graph.push({ "@type": "WebPage", name: page.title, description: page.description, url: canonical, isPartOf: { "@id": websiteId } });
  if (page.path.startsWith("/work/")) graph.push({ "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: siteOrigin }, { "@type": "ListItem", position: 2, name: "Work", item: `${siteOrigin}/work` }, { "@type": "ListItem", position: 3, name: page.title, item: canonical }] });
  if (page.path.startsWith("/services/")) graph.push({ "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: siteOrigin }, { "@type": "ListItem", position: 2, name: "Services", item: `${siteOrigin}/services` }, { "@type": "ListItem", position: 3, name: page.title, item: canonical }] });
  if (page.path === "/work") graph.push({ "@type": "ItemList", name: "Software projects by Favour Imegu", itemListElement: projects.map((project, index) => ({ "@type": "ListItem", position: index + 1, name: project.title, url: `${siteOrigin}/work/${project.id}` })) });
  return { "@context": "https://schema.org", "@graph": graph };
}
