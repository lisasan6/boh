# Makes the film grain tiles in public/grain (fixed seed, so every build is the same).
import numpy as np
from PIL import Image, ImageFilter
rng = np.random.default_rng(1931)
for i in range(8):
    n = rng.normal(0, 1, (540, 960))
    img = Image.fromarray(np.clip(128 + n * 34, 0, 255).astype(np.uint8), 'L')
    img = img.filter(ImageFilter.GaussianBlur(0.45))
    img.save(f'public/grain/g{i}.png', optimize=True)
