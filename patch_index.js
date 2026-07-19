const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf-8');
const preconnect = `
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
`;
if (!html.includes('preconnect')) {
    html = html.replace('<title>', preconnect + '    <title>');
    fs.writeFileSync('index.html', html);
}
