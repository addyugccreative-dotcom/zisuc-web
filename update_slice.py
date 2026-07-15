import re

with open('src/App.tsx', 'r') as f:
    content = f.read()

# Replace for desktop
content = content.replace(
    '{(products.length > 0 ? products : mockProducts).map((product) => (',
    '{(products.length > 0 ? products : mockProducts).slice(0, 4).map((product) => ('
)

# Replace for mobile
content = content.replace(
    '{(products.length > 0 ? products : mockProducts).map((product, idx) => (',
    '{(products.length > 0 ? products : mockProducts).slice(0, 4).map((product, idx) => ('
)

with open('src/App.tsx', 'w') as f:
    f.write(content)

