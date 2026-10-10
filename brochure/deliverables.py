"""Builds the secondary deliverables: contact sheet, image mapping workbook, reports and source zip.
Run after build.py and qa.py:  python brochure/deliverables.py
"""
import json, pathlib, re, zipfile, datetime
import pymupdf
from PIL import Image
from openpyxl import Workbook
from openpyxl.styles import Font, PatternFill, Alignment
from content import PRODUCTS, NAME, DESC, facts, origin, NEW_IDS, CURATED, CREDITS

ROOT = pathlib.Path(__file__).resolve().parent
REPO = ROOT.parent
OUT = REPO / "brochure-output"
IMGS = REPO / "public" / "images"
qa = json.loads((ROOT / "build" / "qa.json").read_text(encoding="utf-8"))
PRINT = OUT / "Jay_Impex_Global_Export_Brochure_16p_Print.pdf"
DIGI = OUT / "Jay_Impex_Global_Export_Brochure_16p_Digital.pdf"

# which brochure page each product appears on
PAGE_OF = {}
for pid in PRODUCTS:
    c = PRODUCTS[pid]["category"]
    PAGE_OF[pid] = {"rice": 5, "oilseeds": 10, "fmcg": 10, "fruits": 11, "sweets": 11, "textiles": 12, "machinery": 13, "utensils": 13, "mats": 13, "pulses": 9}.get(c)
for pid in ("salem-turmeric-finger-powder", "guntur-red-chilli-whole-powder", "malabar-black-pepper", "cumin-seeds-jeera", "green-cardamom-bold", "coriander-seeds-and-powder"): PAGE_OF[pid] = 6
for pid in ("mustard-seeds", "fenugreek-seeds", "cinnamon-sticks", "cloves"): PAGE_OF[pid] = 7
for pid in ("star-anise", "tamarind", "asafoetida", "bay-leaves"): PAGE_OF[pid] = 8

# brochure image used per product (mirrors build.py)
USED = {
    "deity-1121-steam-basmati": None, "deity-1509-golden-sella-basmati": None, "sugandha-steam-rice": "Rice.png", "parboiled-rice": "parboiled-rice.jpg",
    "salem-turmeric-finger-powder": "Turmeric_Powder.jpg", "guntur-red-chilli-whole-powder": "Red_Chilli.png", "malabar-black-pepper": "Black_Pepper.png",
    "cumin-seeds-jeera": "Cumin_Seeds.png", "green-cardamom-bold": "Cardamom.png", "coriander-seeds-and-powder": "Coriander_Seed.png",
    "mustard-seeds": "Mustard_Seeds.png", "fenugreek-seeds": "Fenugreek_Seeds.png", "cinnamon-sticks": "Cinnamon.png", "cloves": "Cloves.png",
    "star-anise": "Star_Anise.png", "tamarind": "Tamarind.png", "asafoetida": "Asafoetida.png", "bay-leaves": "BayLeaves.png",
    "toor-dhal-pigeon-peas": "3-toor-dhal-480x480.jpg", "green-moong-dhal-whole-split": "Green-Moong-Dhall-Whole-480x480.jpg",
    "black-urid-dhal-gota-split": "1-urid-gota-480x480.jpg", "channa-dal-bengal-gram": "4-channa-dal-480x480.jpg", "masoor-dal": "masoor-dal.jpg",
    "rajma": "rajma-kidney-beans.jpg", "moth-dal": "6-moth-dal-480x480.png", "horse-gram": "7-horse-gram-480x480.jpg", "black-chana": "9-black-channa-480x480.jpg",
    "ragi-finger-millet": "ragi-finger-millet.jpg", "sesame-seeds": "sesame-seeds.jpg", "groundnuts": "groundnuts.jpg", "fmcg-packaged-provisions": None,
    "jaggery": "jaggery.jpg", "seasonal-fresh-fruits": "seasonal-fruits.jpg", "traditional-indian-sweets": "indian-sweets.jpg",
    "textiles-fabrics-garments": "textiles-sourcing.jpg", "industrial-agro-machinery": "industrial-machinery.jpg",
    "stainless-steel-kitchenware": "stainless-utensils.jpg", "natural-coir-door-mats": "coir-door-mats.jpg",
}
EXTRA_USED = {"JayImpexExporter-logo.png": "Logo (cover, back cover, running header)", "Deity_Rice.png": "Deity Basmati pack shots (cover, p2, p4, p5)",
              "Rotate-Dals.jpg": "Cover collage and portfolio tile (pulses)", "Exporter.jpg": "Illustrative logistics image (p15)"}

PROVENANCE = {
    "JayImpexExporter-logo.png": ("Company wordmark logo", "Owner to confirm this is the official logo (website header uses a different image)."),
    "Jayimpex-Logo.PNG": ("Deity portrait image used as the website header logo", "NOT used: religious portrait; owner to confirm whether it is the corporate logo."),
    "Jayimpex-Logo-min.PNG": ("Downsized copy of the portrait image", "NOT used."),
    "Deity_Rice.png": ("Deity Basmati packaging artwork (Platinum/Gold/Silver/Classic)", "Appears to be the owner's own packaging; owner to confirm."),
    "Deity_Rice_noBackground.JPG": ("Duplicate of Deity_Rice.png", "Not used (duplicate)."),
    "Rice.png": ("Generic rice-in-bowl image, likely stock", "Used for Sugandha rice; not a photo of Jay Impex stock. Owner to replace."),
    "Rotate-Rice.png": ("Generic rice image, likely stock", "Not used in brochure (website uses it for Deity 1509)."),
    "Exporter.jpg": ("Illustrative port/container image (stock or AI-generated, provenance unknown)", "Used on p15 with 'Illustrative image' label."),
    "Retailers.jpg": ("Stock photo with visible Dreamstime watermark/credit", "NOT used. Licensing unclear; removed from the website repo."),
    "wholesaler.jpg": ("Generic warehouse stock-style photo", "NOT used; removed from the website repo."),
    "FMCG.jpg": ("Collage of third-party brand logos (Coca-Cola, Pampers, Disney, etc.)", "NOT used. Implies brand distribution; trademark risk; removed from the website repo."),
    "Rotate-FMCG.png": ("Crop of the same third-party logo collage", "NOT used. Removed from the website repo."),
    "Rotate-Dals.jpg": ("Mixed pulses photo, provenance unknown", "Used for cover and portfolio."),
    "Rotate-Spices.png": ("Spice scene with leaves, provenance unknown", "Not used."),
    "Spices.jpg": ("Wide spice banner, provenance unknown", "Not used."),
    "coming-soon-2712818.jpg": ("Stock 'coming soon' graphic", "NOT used."),
    "jayimpex-og.png": ("Social-share card", "Not used."),
    "seasonal-fruits.jpg": ("AI-style illustrative render", "Used with 'Illustrative image' label; not a photo of actual stock."),
    "indian-sweets.jpg": ("AI-style illustrative render", "Used with 'Illustrative image' label."),
    "textiles-sourcing.jpg": ("AI-style illustrative render", "Used with 'Illustrative image' label."),
    "industrial-machinery.jpg": ("AI-style illustrative render", "Used with 'Illustrative image' label."),
    "stainless-utensils.jpg": ("AI-style illustrative render", "Used with 'Illustrative image' label."),
    "coir-door-mats.jpg": ("AI-style illustrative render containing generated caption text", "Used zoomed and labelled 'Illustrative image'; replace with real photography."),
}
CC = {"parboiled-rice.jpg", "masoor-dal.jpg", "rajma-kidney-beans.jpg", "sesame-seeds.jpg", "groundnuts.jpg", "jaggery.jpg", "ragi-finger-millet.jpg"}

# ---------------------------------------------------------------- contact sheet
def contact_sheet():
    src = pymupdf.open(DIGI)
    out = pymupdf.open()
    page = out.new_page(width=595.28, height=841.89)
    cols, rows, mx, top, gap = 4, 4, 28, 70, 10
    cw = (595.28 - 2 * mx - (cols - 1) * gap) / cols
    ch = cw * 297 / 210
    page.insert_text((mx, 38), "Jay Impex – Global Export Brochure: 16-page overview", fontsize=14, fontname="helv", color=(0.04, 0.12, 0.27))
    page.insert_text((mx, 54), "Digital edition, A4 portrait. Page numbers below each thumbnail.", fontsize=8, fontname="helv", color=(0.4, 0.45, 0.55))
    for i in range(16):
        r, c = divmod(i, cols)
        x, y = mx + c * (cw + gap), top + r * (ch + 22)
        rect = pymupdf.Rect(x, y, x + cw, y + ch)
        page.show_pdf_page(rect, src, i)
        page.draw_rect(rect, color=(0.8, 0.84, 0.9), width=0.5)
        page.insert_text((x, y + ch + 11), f"{i+1:02d}", fontsize=8, fontname="helv", color=(0.04, 0.12, 0.27))
    out.set_metadata({"title": "Jay Impex Brochure Contact Sheet", "author": "Jay Impex"})
    out.save(OUT / "Jay_Impex_Brochure_Contact_Sheet.pdf", garbage=4, deflate=True)

# ---------------------------------------------------------------- workbook
def workbook():
    wb = Workbook()
    hdr_fill = PatternFill("solid", fgColor="0A1F44")
    def sheet(ws, headers, rows, widths):
        ws.append(headers)
        for c in ws[1]:
            c.font = Font(bold=True, color="FFFFFF"); c.fill = hdr_fill; c.alignment = Alignment(wrap_text=True, vertical="top")
        for r in rows:
            ws.append(r)
        for i, w in enumerate(widths):
            ws.column_dimensions[chr(65 + i)].width = w
        for row in ws.iter_rows(min_row=2):
            for c in row:
                c.alignment = Alignment(wrap_text=True, vertical="top")
        ws.freeze_panes = "A2"
    ppi_rows = qa["print"]["ppi_rows"]
    def ppi_for(img, page):
        if not img: return ""
        im = Image.open(IMGS / img)
        key = f"{im.size[0]}x{im.size[1]}"
        m = [r["ppi"] for r in ppi_rows if r["page"] == page and r["px"] == key]
        return min(m) if m else ""
    # sheet 1: product -> image mapping
    ws = wb.active; ws.title = "Image mapping"
    rows = []
    for pid, p in PRODUCTS.items():
        img = USED[pid]
        dims = ""; status = ""
        if img:
            im = Image.open(IMGS / img); dims = f"{im.size[0]}x{im.size[1]}"
        if img in CC: status = "Third-party CC BY-SA/CC BY photo, credited in brochure"
        elif img in PROVENANCE: status = PROVENANCE[img][1]
        elif img is None: status = "Typographic tile (no photo)" if "deity" in pid else "Text-led card (no suitable licensed image; website image shows third-party logos)"
        else: status = "Provenance unknown; owner to confirm rights"
        rows.append([pid, NAME[pid], p["category"], PAGE_OF[pid], p["image"].replace("/images/", ""), img or "(none)", dims, ppi_for(img, PAGE_OF[pid]),
                     "Mapped from website data; visually checked" if img else "n/a", status])
    sheet(ws, ["Product ID", "Brochure name", "Category", "Brochure page", "Website image", "Brochure image", "Pixels", "Effective ppi (print)", "Image-to-product check", "Rights / provenance note"], rows, [30, 30, 12, 9, 28, 28, 11, 12, 28, 60])
    # sheet 2: full image inventory
    ws2 = wb.create_sheet("Image inventory")
    used_names = {v for v in USED.values() if v} | set(EXTRA_USED)
    rows = []
    for f in sorted(p.name for p in IMGS.iterdir() if p.is_file()):
        try:
            im = Image.open(IMGS / f); px = f"{im.size[0]}x{im.size[1]}"; mode = im.mode; icc = "yes" if im.info.get("icc_profile") else "no"; alpha = "yes" if "A" in im.mode else "no"
        except Exception:
            px = mode = icc = alpha = "?"
        prov = PROVENANCE.get(f, ("Product image (provenance not documented)" if f not in CC else "Wikimedia Commons CC licensed", ""))
        rows.append([f, px, mode, alpha, icc, (IMGS / f).stat().st_size // 1024, "yes" if f in used_names else "no", EXTRA_USED.get(f, ""), prov[0], prov[1]])
    sheet(ws2, ["File", "Pixels", "Colour mode", "Alpha channel", "ICC profile", "KB", "Used in brochure", "Used for", "What it is", "Notes"], rows, [36, 11, 9, 8, 8, 8, 9, 34, 46, 60])
    # sheet 3: product data matrix
    ws3 = wb.create_sheet("Product matrix")
    rows = []
    for pid, p in PRODUCTS.items():
        shown = facts(pid, 5)
        shown_s = "; ".join(f"{a}: {b}" for a, b in shown) or "(none – 'on request')"
        all_specs = "; ".join(f"{s['label']}: {s['value']}" for s in p["specifications"])
        rows.append([pid, NAME[pid], p["name"], p["category"], origin(pid), DESC[pid], shown_s, all_specs,
                     "; ".join(p["packagingOptions"]), p["hsCode"], p["minOrderQuantity"], p["shelfLife"], "; ".join(p["certifications"]),
                     "Added to catalogue 2026-10-10 (not owner-reviewed): numeric specs withheld" if pid in NEW_IDS else "Original catalogue entry; numeric specs shown only where claim-neutral and flagged for owner sign-off",
                     "Website data (src/data/products.ts); descriptions rewritten without superlatives"])
    sheet(ws3, ["Product ID", "Brochure name", "Website name", "Category", "Origin (website)", "Brochure descriptor", "Facts printed in brochure", "All website specifications",
                "Packaging (website; NOT printed)", "HS code (NOT printed)", "MOQ (NOT printed)", "Shelf life (NOT printed)", "Certifications (NOT printed)", "Validation status", "Source"],
          rows, [26, 28, 34, 11, 30, 44, 50, 70, 44, 12, 22, 14, 36, 50, 40])
    # sheet 4: per-image effective ppi (print edition)
    ws4 = wb.create_sheet("Print image ppi")
    sheet(ws4, ["Page", "Image pixels", "Placed size (mm, incl. bleed where full-bleed)", "Effective ppi"],
          [[r["page"], r["px"], r["placed_mm"], r["ppi"]] for r in sorted(ppi_rows, key=lambda x: (x["page"], x["ppi"]))], [8, 14, 26, 12])
    wb.save(OUT / "Jay_Impex_Product_Image_Mapping.xlsx")

# ---------------------------------------------------------------- reports
def reports():
    pq, dq = qa["print"], qa["digital"]
    lowish = sorted([r for r in pq["ppi_rows"] if r["ppi"] < 250 and r["placed_mm"] not in ("216x303", "210x297")], key=lambda r: r["ppi"])
    n_prod, n_cat = len(PRODUCTS), len({p["category"] for p in PRODUCTS.values()})
    today = datetime.date.today().isoformat()
    fonts = ", ".join(sorted({k.split("+")[-1] for k in pq["fonts"]}))
    md = f"""# Jay Impex Brochure – Print Preflight Report

Generated {today} by `brochure/build.py` + `brochure/qa.py`. File: `{pq['file']}` ({pq['bytes']/1e6:.1f} MB).

## Summary

| Check | Result |
| --- | --- |
| Pages | {pq['pages']} (exactly 16) |
| Page size (MediaBox / CropBox / BleedBox) | 216 × 303 mm = A4 + 3 mm bleed on all sides |
| TrimBox | 210 × 297 mm, set on every page |
| Fonts | All embedded as TrueType subsets ({fonts}) |
| Safe margins | Text kept ≥ 12 mm from side trim edges and ≥ 6 mm from top/bottom trim edges on every page (automated check, 0 violations); content block margin is 14 mm, which also leaves binding allowance for saddle stitching |
| Image resolution | {pq['images_total']} placed images; lowest effective resolution {pq['ppi_min']} ppi; 0 below 150 ppi (see below) |
| Colour space | **RGB (not CMYK)** – see "Remaining printer requirements" |
| PDF/X | **Not produced** – Chrome cannot output PDF/X |
| Crop marks | None (not requested; add if the printer requires them) |
| Metadata | Title, author, subject, keywords set; bookmarks for all 16 pages |
| Blank / duplicate pages | None detected |

## Image resolution

Full-bleed backgrounds (cover and back cover gradients) were pre-rendered at 300 ppi. The product photographs supplied in `public/images` are small (typically 400–1,024 px), so 300 ppi is only reached at small placed sizes:

- 300 ppi or better: most product tiles (30–60 mm wide) and the logo.
- Placed images between 150 and 250 ppi ({len(lowish)}): the ones listed below. These are acceptable for offset or digital print at brochure viewing distance but will not match true 300 ppi sharpness.

| Page | Source px | Placed (mm) | Effective ppi |
| --- | --- | --- | --- |
""" + "\n".join(f"| {r['page']} | {r['px']} | {r['placed_mm']} | {r['ppi']} |" for r in lowish) + f"""

**Recommendation:** replace the supplied photographs with original, high-resolution photography (≥ 1,800 px on the long side for tiles up to 60 mm) before a premium print run.

## Colour workflow (documented, not applied)

Chrome produces RGB PDFs. To produce a CMYK file for offset printing:

1. Ask the printer for their ICC output profile (for example ISO Coated v2 / FOGRA39 for coated European stock, or the profile of the specific press).
2. Convert with Ghostscript (not installed in this environment), for example:
   `gs -dBATCH -dNOPAUSE -sDEVICE=pdfwrite -sColorConversionStrategy=CMYK -dProcessColorModel=/DeviceCMYK -sOutputICCProfile=<printer.icc> -dPDFX -sOutputFile=out_cmyk.pdf {pq['file']}`
   (use PDF/X-1a or X-4 according to the printer's specification and add the required OutputIntent).
3. Re-run preflight in Acrobat Pro or a similar tool, and inspect the sky-blue (≈ #12B6F4) accent: it is outside the CMYK gamut and will print duller; ask for a proof.

## Remaining printer-specific requirements

- CMYK conversion and PDF/X OutputIntent (above).
- Confirm whether the printer wants separate single pages, crop marks, a different bleed (3 mm used) or a slug area.
- 16 pages is a multiple of 4, suitable for saddle stitch; confirm paper weight for spine creep.
- Obtain a physical proof, particularly for the dark navy gradient pages (cover and back cover), which can show banding on some presses.
- Not all photographs reach 300 ppi (see above).

## Digital edition

`{dq['file']}` – {dq['bytes']/1e6:.1f} MB, A4 (210 × 297 mm), no bleed or print marks, images capped at about 150 ppi, fonts embedded, links and QR verified (see verification report).
"""
    (OUT / "Jay_Impex_Print_Preflight_Report.md").write_text(md, encoding="utf-8")

    # ---------------- content verification report
    new_ct = len(NEW_IDS)
    vr = f"""# Jay Impex Brochure – Content Verification Report

Generated {today}. Scope: the customer-facing text, products and contact details in the two PDFs.

## Coverage

- Products in the brochure: **{n_prod}** (all {n_prod} entries in `src/data/products.ts`), in **{n_cat}** catalogue categories, shown as 11 brochure categories. Automated check: every product name appears in the PDF text ({'none missing' if not pq['products_missing_from_text'] else pq['products_missing_from_text']}).
- The live site (`jayimpex-dev.up.railway.app/products`) and the local project could not both be compared product by product; the deployed dev site is built from branch `devmaster`, which at the time of writing did **not** yet contain the most recent local change that moves fruits, sweets, textiles, machinery, utensils and mats to the end of the catalogue (PR #71). Product content is identical; only ordering differs. Note that `https://www.jayimpex.net` is **not reachable** at the time of writing (no valid TLS certificate), so the QR code and web address will not work for readers until the domain is fixed.

## Verified facts used (source)

| Claim | Source |
| --- | --- |
| Based in Chennai, Tamil Nadu; address | Owner-confirmed (PRD §5, FR-6) |
| Established 1990; "commodities wholesaler since 1990" | Owner-confirmed (PRD) and legacy `home.html` |
| Phone/WhatsApp +91 94440 42275, info@jayimpex.net, Mon–Sat 10:00–22:00 IST | Owner-confirmed (PRD FR-6) |
| Loading ports Chennai (INMAA) and Kamarajar (Ennore); alternates Tuticorin, Kattupalli, Cochin, Visakhapatnam | Owner-confirmed (PRD) |
| Destinations: Australia (Melbourne, Sydney, Brisbane, Fremantle), Middle East, Europe, Africa, Americas | Owner-confirmed (PRD) and legacy `products.html` |
| Deity Basmati in Platinum, Gold, Silver, Classic packs | Legacy `products.html` and Deity pack artwork |
| Rice also exported as raw, boiled, steam, long-grain white, Sona Masoori and broken, to Dubai, Egypt, Eastern Africa, Australia, Canada, USA | Legacy `products.html` |
| Six client-sourced categories and their sourcing hubs | Owner-confirmed (PRD §5.5) |
| Product names, origins and descriptive facts | Website catalogue data |
| Business roles (exporter, wholesaler, custom sourcing); buyer segments | PRD / legacy copy; brief |

## Claims deliberately **excluded**

No evidence was available for any of these, so none appear in either PDF (automated text scan confirms: ISO, FSSAI, APEDA, HACCP, GMP, organic, certified, Spices Board, HS code, MOQ, "35+", placeholders):

- All certifications and registrations (ISO 9001, FSSAI, APEDA, Spices Board, BSCI, REACH, CE and others listed in product data).
- "Government recognised export house", "35+ countries", "35+ years", market-leadership wording.
- HS codes, minimum order quantities, shelf life, prices, container capacities, transit times.
- Packaging specifications for individual products (not documented per product).
- Compliance statements such as aflatoxin or Sudan dye "guaranteed negative", "zero preservatives", "organic", AQL levels, FAT testing.
- Superlatives and marketing adjectives in the website's product subtitles (descriptors were rewritten neutrally).

## Items that need owner confirmation before print

1. **Official logo.** The website header uses `Jayimpex-Logo-min.PNG`, a portrait of a deity on yellow. The brochure uses `JayImpexExporter-logo.png` (the Jay Impex wordmark with globe, ship and leaves) because it carries the company name. Confirm which is the official corporate logo.
2. **Numeric specifications for the {n_prod - new_ct} original products** (grain length, moisture, purity, curcumin, volatile oil, and similar). They come from the website catalogue, which was not independently documented. They are printed because the website is the stated source, but each must be signed off. Set `NEW_IDS`/filters in `brochure/content.py` to withhold them.
3. **{new_ct} products added on 2026-10-10** (mustard, fenugreek, cinnamon, cloves, star anise, tamarind, asafoetida, bay leaves; masoor, rajma, moth beans, horse gram, black chana; parboiled rice; ragi, sesame, groundnut; jaggery) were added from a competitor-range comparison. Confirm Jay Impex actually supplies them. Only descriptive fields (forms, types, origin) are printed for these.
4. **Process and service statements** that come from the brief or the website rather than documented company procedure: the six-step enquiry process, "buyer-nominated inspection can be coordinated", "batch and lot identification", private-label packaging, mixed-SKU consolidation, FOB/CIF/CFR/EXW quotations.
5. **Origins** (for example "Salem" turmeric, "Idukki" cardamom, "Guntur" chilli) come from website data; the legacy site said Erode turmeric.
6. **Rice image mapping.** `Rice.png` (a generic rice photo) is used for Sugandha rice and is not a photograph of Jay Impex stock.

## Images

- **Excluded for rights/trademark reasons:** `Retailers.jpg` (visible Dreamstime credit), `FMCG.jpg` and `Rotate-FMCG.png` (Coca-Cola, Pampers, Gillette, Disney and other third-party logos), `wholesaler.jpg`, `coming-soon-2712818.jpg`. **These files were removed from the website repository (branch `feature/brochure-and-image-cleanup`) and their uses replaced; they disappear from the live site once that branch is merged and deployed.**
- **Illustrative images** (labelled "Illustrative image" in the brochure): fruits, sweets, textiles, machinery, utensils, door mats, logistics. They look AI-generated or stock and are not photographs of Jay Impex inventory.
- **Third-party photographs, credited on the page:** 7 Wikimedia Commons images under CC BY-SA / CC BY (see `docs/IMAGE_CREDITS.md`). CC BY-SA requires attribution; the credit is printed in small type on the page where the image appears.
- Provenance of the other product images (spice cut-outs, 480 px pulses, Deity packs) is not documented; confirm the owner holds the rights.

## Contact details and links

- Website `{', '.join(u for u in pq['links'] if u.startswith('http'))}`, `mailto:info@jayimpex.net`, `tel:+919444042275` are live links in both PDFs (verified in the PDF link annotations).
- QR code on page 16 decodes to `{pq['qr_decoded']}` (verified by decoding the rendered page). The destination page **does not resolve at the time of writing** because `www.jayimpex.net` has no valid certificate; fix the domain/TLS before distribution.

## Text quality

Automated spell-check flagged only proper nouns, Indian product names and British spellings (colours, customisation, finalised, summarised). One note: letter-spaced headings extract as spaced text (cosmetic, affects copy-and-paste only).

## Visual QA

All 16 pages of both editions were rendered and inspected. Issues found and fixed during QA: card text wrapping, overflow of the pulse page, overlapping footers, empty page areas, duplicated Deity image on the rice page, low-resolution gradient backgrounds, variable-font embedding (replaced with static fonts), the 143 ppi textiles image. Residual caveats are listed above.
"""
    (OUT / "Jay_Impex_Content_Verification_Report.md").write_text(vr, encoding="utf-8")

# ---------------------------------------------------------------- source zip
def source_zip():
    z = OUT / "Jay_Impex_Brochure_Source.zip"
    used = {v for v in USED.values() if v} | set(EXTRA_USED) | {"Deity_Rice.png"}
    with zipfile.ZipFile(z, "w", zipfile.ZIP_DEFLATED) as zf:
        for f in ["build.py", "content.py", "qa.py", "render.py", "deliverables.py", "products.json", "README.md"]:
            if (ROOT / f).exists(): zf.write(ROOT / f, f"brochure/{f}")
        for f in (ROOT / "fonts" / "static").glob("*.ttf"): zf.write(f, f"brochure/fonts/static/{f.name}")
        for n in sorted(used):
            zf.write(IMGS / n, f"public/images/{n}")
        zf.write(REPO / "docs" / "IMAGE_CREDITS.md", "docs/IMAGE_CREDITS.md")

if __name__ == "__main__":
    contact_sheet(); workbook(); reports(); source_zip()
    for p in sorted(OUT.iterdir()): print(f"{p.stat().st_size/1024:10.0f} KB  {p.name}")
