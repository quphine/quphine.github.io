
import fs from "node:fs";
import path from "node:path";

const source = path.join(
    "quartz",
    "static",
    "google5ce53a1a93aea776.html"
);
const destination = path.join(
    "public",
    "google5ce53a1a93aea776.html"
);

fs.copyFileSync(source, destination);
console.log("Google verification file copied to public/");
