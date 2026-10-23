// Downloads the placeholder photos into public/images. Run: node scripts/fetch-images.mjs
// Credits: Unsplash (free licence), Wikimedia Commons "Laos Plateau des Bolovens Plantations (3)"
// by Pierre André (CC BY-SA 4.0) and "Coffee cherries, San Marcos, Tarrazu" (public domain).
import { mkdir, writeFile } from "node:fs/promises";

const unsplash = (id) => `https://images.unsplash.com/photo-${id}?w=2000&q=75&fm=jpg`;
const commons = (path, file) => [1920, 1280].map((w) => `https://upload.wikimedia.org/wikipedia/commons/thumb/${path}/${file}/${w}px-${file}`);

const IMAGES = {
  hero: unsplash("1524350876685-274059332603"),
  "bean-paksong-washed": unsplash("1521302080334-4bebac2763a6"),
  "bean-bolaven-natural": unsplash("1587734195503-904fca47e0e9"),
  "bean-tha-teng-honey": unsplash("1514432324607-a09d9b4aefdd"),
  "bean-house-espresso": unsplash("1497935586351-b67a49e012bf"),
  brew: unsplash("1442512595331-e89e73853f31"),
  roast: unsplash("1511537190424-bbbab87ac5eb"),
  cafe: unsplash("1453614512568-c4024d13c247"),
  texture: unsplash("1447933601403-0c6688de566e"),
  cherries: commons("7/77", "Laos_Plateau_des_Bolovens_Plantations_%283%29.jpg"),
  drying: commons("5/57", "Coffee-cherries-afternoon-in-san-marcos-tarrazu-costa-rica.jpg"),
};

await mkdir("public/images", { recursive: true });
for (const [name, src] of Object.entries(IMAGES)) {
  let saved = false;
  for (const url of [src].flat()) {
    const res = await fetch(url, { headers: { "User-Agent": "coffee-site-placeholder/1.0 (image fetch script)" } });
    if (!res.ok) continue;
    const buf = Buffer.from(await res.arrayBuffer());
    await writeFile(`public/images/${name}.jpg`, buf);
    console.log(name, `${Math.round(buf.length / 1024)} KB`);
    saved = true;
    break;
  }
  if (!saved) throw new Error(`could not download ${name}`);
}
