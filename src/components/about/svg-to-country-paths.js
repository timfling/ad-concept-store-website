const fs = require('fs');
const { JSDOM } = require('jsdom');

// Read SVG file
const svg = fs.readFileSync('./world-map.svg', 'utf8');
const dom = new JSDOM(svg, { contentType: "image/svg+xml" });
const doc = dom.window.document;

const countryPaths = [];

// Handle <path id=...>
doc.querySelectorAll('path[id]').forEach(el => {
  const id = el.getAttribute('id');
  const d = el.getAttribute('d');
  if (id && d) countryPaths.push({ id, d });
});

// Handle <g id=...> with <path> children
doc.querySelectorAll('g[id]').forEach(g => {
  const id = g.getAttribute('id');
  g.querySelectorAll('path').forEach(el => {
    const d = el.getAttribute('d');
    if (id && d) countryPaths.push({ id, d });
  });
});

// Output as JS array
const output = `const countryPaths = ${JSON.stringify(countryPaths, null, 2)};\n\nexport default countryPaths;\n`;
fs.writeFileSync('./countryPaths.js', output);

console.log('countryPaths.js generated!'); 