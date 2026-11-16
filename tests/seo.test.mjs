import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync, existsSync } from "node:fs";
import { resolve } from "node:path";
const base = "https://imegu.world";
const sitemap = readFileSync("dist/sitemap.xml", "utf8");
const urls = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map((match) => match[1]);
const paths = urls.map((url) => new URL(url).pathname);
const doc = (path) => readFileSync(resolve("dist", path === "/" ? "index.html" : `${path.slice(1)}.html`), "utf8");
function meta(source, pattern) { return source.match(pattern)?.[1] ?? ""; }
test("sitemap contains unique HTTPS canonical pages and every project, never error pages", () => {
  assert.match(sitemap, /<urlset xmlns=/);
  assert.equal(new Set(urls).size, urls.length);
  for (const path of ["/", "/about", "/work", "/hobbies", "/pricing", "/contact", "/services", "/services/website-development", "/services/ecommerce-development", "/services/erp-inventory", "/services/custom-software"]) assert.ok(paths.includes(path), `missing ${path}`);
  for (const path of paths) { assert.match(path, /^\//); assert.doesNotMatch(path, /404|missing|\.html$/); assert.ok(existsSync(resolve("dist", `${path.slice(1)}.html`)) || path === "/"); }
});
test("every sitemap route has meaningful prerendered HTML and unique metadata", () => {
  const titles = new Set();
  for (const path of paths) {
    const source = doc(path); const title = meta(source, /<title>(.*?)<\/title>/); const description = meta(source, /<meta name="description" content="(.*?)"/);
    assert.ok(title.length > 20 && title.length <= 70, `${path} title: ${title}`); assert.ok(!titles.has(title), `duplicate title: ${title}`); titles.add(title);
    assert.ok(description.length >= 90 && description.length <= 165, `${path} description length ${description.length}`);
    assert.equal(meta(source, /<link rel="canonical" href="(.*?)"/), `${base}${path}`);
    assert.equal((source.match(/<h1\b/g) || []).length, 1, `${path} needs one H1`);
    assert.match(source, /<main[\s\S]*?<h1/); assert.doesNotMatch(source, /name="robots" content="noindex"/);
    for (const tag of ["property=\"og:title\"", "property=\"og:description\"", "property=\"og:image\"", "name=\"twitter:card\""]) assert.ok(source.includes(tag), `${path} lacks ${tag}`);
    assert.ok(existsSync(resolve("public", source.match(/property="og:image" content="https:\/\/imegu.world(.*?)"/)?.[1]?.replace(/^\//, ""))), `${path} social image missing`);
  }
});
test("route JSON-LD parses and describes visible page entities", () => {
  for (const path of paths) {
    const source = doc(path); const match = source.match(/<script type="application\/ld\+json">(.*?)<\/script>/);
    assert.ok(match, `${path} has JSON-LD`); const data = JSON.parse(match[1]); assert.equal(data["@context"], "https://schema.org"); assert.ok(Array.isArray(data["@graph"]));
    if (path.startsWith("/work/")) assert.ok(data["@graph"].some((item) => item["@type"] === "BreadcrumbList"));
    if (path.startsWith("/services/")) { assert.ok(data["@graph"].some((item) => item["@type"] === "Service")); assert.ok(data["@graph"].some((item) => item["@type"] === "BreadcrumbList")); }
  }
});
test("robots points at production sitemap and source fallback sitemap is complete", () => {
  const robots = readFileSync("public/robots.txt", "utf8"); assert.match(robots, /Sitemap: https:\/\/imegu.world\/sitemap\.xml/);
  assert.ok(urls.length >= 15); assert.ok(!paths.includes("/404"));
});
test("404 is prerendered, excluded from sitemap and explicitly noindex", () => {
  const missing = readFileSync("dist/404.html", "utf8"); assert.match(missing, /name="robots" content="noindex"/); assert.doesNotMatch(sitemap, /<loc>https:\/\/imegu.world\/404<\/loc>/);
});


test("indexable pages contain no broken same-origin route or asset links", () => {
  for (const path of paths) {
    const source = doc(path);
    for (const [, href] of source.matchAll(/href="([^"]+)"/g)) {
      if (!href.startsWith("/") || href.startsWith("//")) continue;
      const route = href.split(/[?#]/, 1)[0];
      if (/\.[a-z0-9]{2,6}$/i.test(route)) assert.ok(existsSync(resolve("dist", route.slice(1))), `${path} -> ${href}`);
      else assert.ok(paths.includes(route) || route === "/404", `${path} -> ${href}`);
    }
  }
});

test("service pages include useful copy, enquiry paths and visible FAQs", () => {
  for (const path of ["/services/website-development", "/services/ecommerce-development", "/services/erp-inventory", "/services/custom-software"]) {
    const source = doc(path);
    assert.match(source, /<details>/, `${path} has a native FAQ`);
    assert.match(source, /contact\?service=/, `${path} has a service-specific enquiry`);
    assert.match(source, /Related services/);
    assert.ok((source.match(/<li>/g) || []).length >= 6, `${path} has practical scope content`);
  }
  const hub = doc("/services");
  for (const path of ["website-development", "ecommerce-development", "erp-inventory", "custom-software"]) assert.ok(hub.includes(`/services/${path}`));
});
