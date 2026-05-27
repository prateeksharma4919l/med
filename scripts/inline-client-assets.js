import fs from "fs";
import path from "path";

const distDir = path.resolve("client", "dist");
const indexPath = path.join(distDir, "index.html");

let html = fs.readFileSync(indexPath, "utf8");

html = html.replace(
  /<link rel="stylesheet" crossorigin href="([^"]+)">/,
  (match, href) => {
    const cssPath = path.join(distDir, href.replace(/^\//, ""));
    const css = fs.readFileSync(cssPath, "utf8");
    return `<style>${css}</style>`;
  }
);

html = html.replace(
  /<script type="module" crossorigin src="([^"]+)"><\/script>/,
  (match, src) => {
    const jsPath = path.join(distDir, src.replace(/^\//, ""));
    const js = fs.readFileSync(jsPath, "utf8");
    return `<script type="module">${js}</script>`;
  }
);

fs.writeFileSync(indexPath, html);
console.log("Inlined client CSS and JS into dist/index.html");
