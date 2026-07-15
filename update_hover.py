import re

with open('src/components/ProductCard.tsx', 'r') as f:
    content = f.read()

# Replace handleMouseEnter
content = re.sub(
    r'const handleMouseEnter = \(\) => \{\s*setIsHovered\(true\);\s*const img = imgRef\.current;\s*if \(img\) \{\s*gsap\.to\(img, \{\s*scale: [\d\.]+,\s*// Smooth intense hover zoom in\s*duration: [\d\.]+,\s*ease: \'power2\.out\',\s*overwrite: \'auto\'\s*\}\);\s*\}',
    r'''const handleMouseEnter = () => {
    setIsHovered(true);
    const img = imgRef.current;
    if (img) {
      gsap.to(img, {
        scale: 1.35, // Smooth intense hover zoom in
        duration: 0.8,
        ease: 'power3.out',
        overwrite: 'auto'
      });
    }''',
    content
)

# Replace handleMouseLeave
content = re.sub(
    r'const handleMouseLeave = \(\) => \{\s*setIsHovered\(false\);\s*const img = imgRef\.current;\s*if \(img\) \{\s*gsap\.to\(img, \{\s*scale: [\d\.]+,\s*// Smooth hover zoom out back to normal\s*duration: [\d\.]+,\s*ease: \'power3\.out\',\s*overwrite: \'auto\'\s*\}\);\s*\}',
    r'''const handleMouseLeave = () => {
    setIsHovered(false);
    const img = imgRef.current;
    if (img) {
      gsap.to(img, {
        scale: 1.00, // Smooth intense zoom out back to normal
        duration: 0.8,
        ease: 'power3.out',
        overwrite: 'auto'
      });
    }''',
    content
)

with open('src/components/ProductCard.tsx', 'w') as f:
    f.write(content)

