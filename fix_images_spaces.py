import re

with open('src/App.tsx', 'r') as f:
    content = f.read()

content = content.replace('/peaches skincare essentials laptop frame.png', '/peaches-skincare-essentials-laptop-frame.png')
content = content.replace('/peaches skincare essentials mobile frame.png', '/peaches-skincare-essentials-mobile-frame.png')

with open('src/App.tsx', 'w') as f:
    f.write(content)
