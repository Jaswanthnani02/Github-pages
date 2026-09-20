const sharp = require('sharp');

(async () => {
  const width = 1200;
  const height = 630;
  const svg = `
<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}">
  <rect width="100%" height="100%" fill="#0a1628"/>
  <rect x="0" y="0" width="12" height="100%" fill="#2dd4bf"/>
  <text x="72" y="220" fill="#2dd4bf" font-family="Segoe UI, Helvetica, Arial" font-size="28" font-weight="600">Cloud and AI Solutions Engineer</text>
  <text x="72" y="310" fill="#f1f5f9" font-family="Georgia, Times New Roman, serif" font-size="64" font-weight="700">Jaswanth Gaddam</text>
  <text x="72" y="380" fill="#a8b8cc" font-family="Segoe UI, Helvetica, Arial" font-size="28">Azure automation · MCP · ops dashboards</text>
  <text x="72" y="520" fill="#7b8fa6" font-family="Consolas, monospace" font-size="22">jaswanthnani02.github.io</text>
</svg>`;
  await sharp(Buffer.from(svg)).jpeg({ quality: 85 }).toFile('og-card.jpg');
  console.log('og-card ok');
})();
