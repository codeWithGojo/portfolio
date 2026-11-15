import { mkdir, readFile, writeFile } from "node:fs/promises";
import { join, resolve } from "node:path";
import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react";
import { projects } from "./src/projects";

const origin = "https://imegu.world";
const portrait = "/favour-graduation-2026.webp";
const pages = [
  {
    path: "/",
    title: "Favour Imegu (Gojo) — Developer",
    description:
      "Favour Imegu builds websites, products and business systems. Explore his work, story and ways to get in touch.",
    image: portrait,
  },
  {
    path: "/about",
    title: "About Favour Imegu",
    description:
      "Favour Imegu’s story, from learning to code in Nigeria to studying Computer Science at Bowen and building with Dev Boyz.",
    image: portrait,
  },
  {
    path: "/work",
    title: "Work by Favour Imegu",
    description:
      "Explore Favour Imegu’s websites, apps, business tools and client work, including Afri Index and BlessingFoundHerBlessing.",
    image: "/social-preview.png",
  },
  {
    path: "/hobbies",
    title: "Hobbies | Favour Imegu",
    description:
      "Explore Favour Imegu’s personal timeline and the stories behind his love of music, anime, gaming and Arsenal.",
    image: "/arsenal-celebration-hd.webp",
  },
  {
    path: "/pricing",
    title: "Services & Pricing | Favour Imegu",
    description:
      "Find website and software development services, starting prices and custom quotes for your project.",
    image: portrait,
  },
  {
    path: "/contact",
    title: "Contact Favour Imegu",
    description:
      "Tell Favour Imegu about your website or software project and get in touch by email or WhatsApp.",
    image: portrait,
  },
  ...projects.map((project) => ({
    path: "/work/" + project.id,
    title: project.title + " | Favour Imegu",
    description: project.summary ?? project.built,
    image: project.image ?? "/social-preview.png",
  })),
];

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll('"', "&quot;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

function routeDocuments(): Plugin {
  let outputDirectory: string;

  return {
    name: "portfolio-route-documents",
    apply: "build",
    configResolved(config) {
      outputDirectory = resolve(config.root, config.build.outDir);
    },
    async writeBundle() {
      const indexPath = join(outputDirectory, "index.html");
      const template = await readFile(indexPath, "utf8");
      await Promise.all(
        pages.map(async (page) => {
          const canonical = new URL(page.path, origin).href;
          const title = escapeHtml(page.title);
          const description = escapeHtml(page.description);
          const image = escapeHtml(new URL(page.image, origin).href);
          const structuredData = JSON.stringify(
            page.path === "/"
              ? {
                  "@context": "https://schema.org",
                  "@type": "ProfilePage",
                  url: canonical,
                  mainEntity: {
                    "@type": "Person",
                    name: "Favour Imegu",
                    alternateName: "Gojo",
                    url: canonical,
                    jobTitle: "Software developer",
                    sameAs: [
                      "https://github.com/codeWithGojo",
                      "https://x.com/not_favour",
                    ],
                  },
                }
              : {
                  "@context": "https://schema.org",
                  "@type": page.path.startsWith("/work/")
                    ? "CreativeWork"
                    : "WebPage",
                  name: page.title,
                  description: page.description,
                  url: canonical,
                },
          ).replaceAll("<", "\\u003c");

          const head = [
            "<title>" + title + "</title>",
            '<meta name="description" content="' + description + '">',
            '<link rel="canonical" href="' + canonical + '">',
            '<meta property="og:type" content="website">',
            '<meta property="og:title" content="' + title + '">',
            '<meta property="og:description" content="' + description + '">',
            '<meta property="og:url" content="' + canonical + '">',
            '<meta property="og:image" content="' + image + '">',
            '<meta name="twitter:card" content="summary_large_image">',
            '<meta name="twitter:title" content="' + title + '">',
            '<meta name="twitter:description" content="' + description + '">',
            '<meta name="twitter:image" content="' + image + '">',
            '<script type="application/ld+json">' +
              structuredData +
              "</script>",
          ].join("\n    ");
          const routeDirectory = join(outputDirectory, page.path);
          await mkdir(routeDirectory, { recursive: true });
          await writeFile(
            join(routeDirectory, "index.html"),
            template.replace(
              /<!-- route-meta-start -->[\s\S]*?<!-- route-meta-end -->/,
              () => head,
            ),
          );
        }),
      );

      const fallback = template.replace(
        /<!-- route-meta-start -->[\s\S]*?<!-- route-meta-end -->/,
        '<title>Page not found | Favour Imegu</title><meta name="robots" content="noindex">',
      );
      const entries = pages
        .map(
          (page) =>
            "<url><loc>" + new URL(page.path, origin).href + "</loc></url>",
        )
        .join("\n  ");
      await Promise.all([
        writeFile(join(outputDirectory, "404.html"), fallback),
        writeFile(
          join(outputDirectory, "sitemap.xml"),
          '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n  ' +
            entries +
            "\n</urlset>\n",
        ),
      ]);
    },
  };
}

export default defineConfig({
  plugins: [react(), routeDocuments()],
  server: { allowedHosts: ["terminal.local"] },
});
