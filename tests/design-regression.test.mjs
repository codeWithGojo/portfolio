import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync, existsSync } from "node:fs";

const app = readFileSync(new URL("../src/App.tsx", import.meta.url), "utf8");
const world = readFileSync(new URL("../src/world.css", import.meta.url), "utf8");
const motion = readFileSync(new URL("../src/WorldMotion.tsx", import.meta.url), "utf8");
const index = readFileSync(new URL("../index.html", import.meta.url), "utf8");

test("all six primary routes remain linked", () => {
  for (const route of ["/", "/about", "/work", "/hobbies", "/pricing", "/contact"]) {
    assert.ok(app.includes(`["${route}",`), `Missing route ${route}`);
  }
});

test("Arsenal feature is exactly Saka + Lewis-Skelly, with visible source credit", () => {
  const start = app.indexOf('<article className="arsenal-feature">');
  const end = app.indexOf('<div className="hobbies-notes">', start);
  assert.ok(start !== -1 && end > start);
  const feature = app.slice(start, end);
  assert.equal((feature.match(/<img\b/g) || []).length, 2);
  assert.match(feature, /1_bukayo_saka_arsenal_2025_/);
  assert.match(feature, /1_Myles_Lewis-Skelly_arsenal_2025_/);
  assert.match(feature, /CC BY-SA 4\.0/);
  assert.match(feature, /Chensiyuan/);
  assert.doesNotMatch(feature, /COME ON|YOU GUNNERS|ArsenalAtmosphere|champions-overlay/);
  assert.match(world, /\.hobbies-layout \.arsenal-feature::after \{ display: none; \}/);
  assert.match(world, /\.hobbies-layout \.arsenal-feature[\s\S]*?background: transparent;/);
});

test("red and neutral theme tokens replace burgundy", () => {
  assert.match(world, /--bg: #0b0c0e;/);
  assert.match(world, /--panel: #191a1e;/);
  assert.match(world, /--accent: #e32732;/);
  assert.match(world, /--accent: #bf1824;/);
  assert.match(world, /\.arsenal-photo-pair/);
});

test("intro and Easter egg remain, old splash is removed", () => {
  assert.match(app, /CircularIdentityIntro/);
  assert.match(app, /StarboyEgg/);
  assert.match(motion, /export function CircularIdentityIntro/);
  assert.doesNotMatch(app + motion, /Coding Ninja|CodingNinjaIntro/);
});

test("hobbies chapters, projects and client contact flow remain", () => {
  for (const term of ["My Fav Artists", "In Another Universe", "Balancing Life", "DustGrid", "life-chapter", "WhatsApp", "enquiry-form"]) {
    assert.ok(app.includes(term), `Missing feature: ${term}`);
  }
});

test("obsolete install app and PWA assets are absent", () => {
  assert.doesNotMatch(index, /install-app|manifest\.webmanifest/);
  assert.equal(existsSync(new URL("../public/sw.js", import.meta.url)), false);
  assert.equal(existsSync(new URL("../public/install-app.js", import.meta.url)), false);
});
