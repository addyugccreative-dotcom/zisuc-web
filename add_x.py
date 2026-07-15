import re

with open('src/App.tsx', 'r') as f:
    content = f.read()

content = re.sub(r'import { (.*?) } from \'lucide-react\';', r'import { \1, X } from \'lucide-react\';', content, count=1)

with open('src/App.tsx', 'w') as f:
    f.write(content)
