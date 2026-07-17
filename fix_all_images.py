import re

with open('src/products-data.ts', 'r') as f:
    content = f.read()

# Replace all image paths to one of the 4 available images.
images = ["/serum card image.png", "/cream card image.png", "/pad card image.png", "/cleanser card image.png"]

import random
def replace_img(match):
    return f'"{random.choice(images)}"'

content = re.sub(r'"/[^"]+\.webp"', replace_img, content)
content = re.sub(r'"/[^"]+\.png"', replace_img, content)
content = re.sub(r'"https://images\.unsplash\.com[^"]+"', replace_img, content)

with open('src/products-data.ts', 'w') as f:
    f.write(content)

