import re

with open('src/App.tsx', 'r') as f:
    content = f.read()

replacement = """                  <picture>
                    <source media="(min-width: 1024px)" srcSet="/peaches skincare essentials laptop frame.png" />
                    <img 
                      src="/peaches skincare essentials mobile frame.png" 
                      alt="Peaches Skincare Essentials" 
                      className="absolute inset-0 w-full h-full object-contain bg-[#E3DCD6] select-none transition-transform duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/image:scale-[1.07]"
                      referrerPolicy="no-referrer"
                    />
                  </picture>"""

content = re.sub(r'<img\s+src="/zisuc hero section image laptop verison\.png"[\s\S]*?referrerPolicy="no-referrer"\s*/>', replacement, content)

with open('src/App.tsx', 'w') as f:
    f.write(content)
