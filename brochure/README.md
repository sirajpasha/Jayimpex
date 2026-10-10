# Jay Impex brochure generator

Builds the 16-page A4 brochure (print edition with 3 mm bleed + digital edition) from the website catalogue data and `public/images`.
It is separate from the website and does not change it.

```
pip install pymupdf pillow segno numpy openpyxl opencv-python-headless pyspellchecker fonttools
node --experimental-strip-types -e "import('./src/data/products.ts').then(m=>require('fs').writeFileSync('brochure/products.json',JSON.stringify(m.PRODUCTS,null,1)))"
python brochure/build.py        # -> brochure-output/*Print.pdf and *Digital.pdf (needs Chrome or Edge installed)
python brochure/qa.py           # automated checks -> brochure/build/qa.json
python brochure/deliverables.py # contact sheet, image mapping workbook, reports, source zip
```

Edit copy in `content.py` (descriptors, curated facts, which specs are printed) and layout in `build.py`.
Fonts: Inter and Playfair Display (SIL Open Font License), static instances in `fonts/static`.
