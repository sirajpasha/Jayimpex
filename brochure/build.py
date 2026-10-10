"""Jay Impex 16-page brochure generator.

Usage:  python brochure/build.py            -> builds print + digital PDFs into brochure-output/
Requires: Google Chrome or Edge (headless PDF), PyMuPDF, Pillow, segno.
"""
import html, pathlib, shutil, subprocess, sys, json
from PIL import Image
import segno
import pymupdf as fitz  # PyMuPDF
from content import BRAND, PRODUCTS, DESC, NAME, facts, origin, CREDITS

ROOT = pathlib.Path(__file__).resolve().parent
REPO = ROOT.parent
IMG_SRC = REPO / "public" / "images"
OUT = REPO / "brochure-output"
BUILD = ROOT / "build"
CHROME = next(p for p in [
    r"C:\Program Files\Google\Chrome\Application\chrome.exe",
    r"C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe"] if pathlib.Path(p).exists())
TITLE = "Jay Impex – Global Export Brochure"
LOGO = "JayImpexExporter-logo.png"

e = html.escape

# ---------------------------------------------------------------- assets
used_images: set[str] = set()

def img(name: str, mode: str) -> str:
    """Return relative path to a processed copy of an image for the given edition."""
    used_images.add(name)
    src = IMG_SRC / name
    d = BUILD / mode / "img"
    d.mkdir(parents=True, exist_ok=True)
    is_logo = name == LOGO
    ext = ".png" if is_logo else ".jpg"
    dst = d / (src.stem + ext)
    if not dst.exists():
        im = Image.open(src)
        if im.mode in ("RGBA", "LA", "P"):
            bg = Image.new("RGB", im.size, (255, 255, 255))
            im = im.convert("RGBA"); bg.paste(im, mask=im.getchannel("A")); im = bg
        else:
            im = im.convert("RGB")
        if mode == "digital":
            im.thumbnail((1100, 1100) if not is_logo else (640, 640), Image.LANCZOS)
        if is_logo:
            im.save(dst, optimize=True)
        else:
            im.save(dst, quality=95 if mode == "print" else 82, optimize=True, subsampling=0 if mode == "print" else 2)
    return f"{mode}/img/{dst.name}"

def bg_image(mode: str, kind: str) -> str:
    """Pre-render the dark gradient + glow as a high-resolution JPEG (CSS gradients rasterise at 72 ppi in Chrome PDFs)."""
    import numpy as np
    d = BUILD / mode / "img"; d.mkdir(parents=True, exist_ok=True)
    dst = d / f"bg_{kind}.jpg"
    if dst.exists():
        return f"{mode}/img/{dst.name}"
    bleed = 3 if mode == "print" else 0
    dpi = 300 if mode == "print" else 150
    w_mm, h_mm = 210 + 2 * bleed, 297 + 2 * bleed
    W, H = int(w_mm / 25.4 * dpi), int(h_mm / 25.4 * dpi)
    ys, xs = np.mgrid[0:H, 0:W].astype(np.float32)
    x_mm, y_mm = xs / W * w_mm - bleed, ys / H * h_mm - bleed
    # linear gradient at 160deg (CSS): direction vector
    import math
    a = math.radians(160); dx, dy = math.sin(a), -math.cos(a)
    t = ((x_mm - 105) * dx + (y_mm - 148.5) * dy) / (abs(210 * dx) + abs(297 * dy)) + 0.5
    t = np.clip(t, 0, 1)
    stops = [(0.0, (7, 20, 43)), (0.55, (10, 31, 68)), (1.0, (12, 46, 98))]
    img = np.zeros((H, W, 3), np.float32)
    for c in range(3):
        img[..., c] = np.interp(t, [s[0] for s in stops], [s[1][c] for s in stops])
    cx, cy, r, alpha = (165, 35, 75, 0.35) if kind == "cover" else (40, 267, 80, 0.30)
    dist = np.sqrt((x_mm - cx) ** 2 + (y_mm - cy) ** 2) / r
    g = np.clip(1 - dist / 0.68, 0, 1) * alpha
    sky = np.array([18, 182, 244], np.float32)
    img = img * (1 - g[..., None]) + sky * g[..., None]
    img += np.random.default_rng(1).normal(0, 0.6, img.shape)   # dither to avoid banding
    Image.fromarray(np.clip(img, 0, 255).astype(np.uint8)).save(dst, quality=93, optimize=True, dpi=(dpi, dpi))
    return f"{mode}/img/{dst.name}"

def qr_svg() -> str:
    q = segno.make(BRAND["qr_target"], error="m")
    return q.svg_inline(dark="#0A1F44", light="#FFFFFF", scale=6, border=1, omitsize=True)

# ---------------------------------------------------------------- css
CSS = """
@font-face{font-family:'Playfair Display';src:url('../fonts/static/PlayfairDisplay-Bold.ttf');font-weight:700;}
@font-face{font-family:'Inter';src:url('../fonts/static/Inter-Regular.ttf');font-weight:400;}
@font-face{font-family:'Inter';src:url('../fonts/static/Inter-Medium.ttf');font-weight:500;}
@font-face{font-family:'Inter';src:url('../fonts/static/Inter-SemiBold.ttf');font-weight:600;}
@font-face{font-family:'Inter';src:url('../fonts/static/Inter-Bold.ttf');font-weight:700 900;}
:root{--navy:#0A1F44;--ink:#070F1F;--sky:#12B6F4;--skyd:#0A82BE;--mist:#F1F5FA;--line:#D8E1EC;--text:#2A3750;--muted:#66758F;--b:3mm;}
*{box-sizing:border-box;margin:0;padding:0}
html,body{background:#fff}
body{font-family:'Inter',sans-serif;color:var(--text);font-size:8.6pt;line-height:1.45;-webkit-print-color-adjust:exact;print-color-adjust:exact}
.page{position:relative;width:calc(210mm + 2*var(--b));height:calc(297mm + 2*var(--b));overflow:hidden;page-break-after:always;break-after:page;background:#fff}
.page:last-child{page-break-after:auto;break-after:auto}
.trim{position:absolute;left:var(--b);top:var(--b);width:210mm;height:297mm}
.safe{position:absolute;left:14mm;right:14mm;top:27mm;bottom:19mm}
h1,h2,h3,.serif{font-family:'Playfair Display',serif;color:var(--navy);font-weight:700}
.eyebrow{font-size:7.4pt;letter-spacing:.22em;text-transform:uppercase;color:var(--skyd);font-weight:700}
.dark .eyebrow{color:var(--sky)}
h1.pt{font-size:26pt;line-height:1.1;margin:2mm 0 3mm}
.lead{font-size:9.6pt;line-height:1.55;color:var(--text);max-width:150mm}
/* running header / footer */
.rh{position:absolute;left:14mm;right:14mm;top:9mm;height:9mm;display:flex;justify-content:space-between;align-items:center;border-bottom:.25mm solid var(--line);font-size:7pt;letter-spacing:.14em;text-transform:uppercase;color:var(--muted)}
.rh b{color:var(--navy);letter-spacing:.2em}
.rh .logo{display:flex;align-items:center;gap:2.5mm}
.rh .logo img{height:5.2mm;width:5.2mm;border-radius:1mm}
.rf{position:absolute;left:14mm;right:14mm;bottom:8mm;display:flex;justify-content:space-between;font-size:7pt;color:var(--muted)}
.rf .n{font-weight:700;color:var(--navy)}
.rf a{color:var(--muted);text-decoration:none}
.credit{position:absolute;left:14mm;right:14mm;bottom:12.5mm;font-size:5.8pt;color:#8A97AC;line-height:1.3}
/* cards */
.tile{background:#fff;border-radius:2.5mm;display:flex;align-items:center;justify-content:center;overflow:hidden}
.tile img{width:100%;height:100%;object-fit:contain;display:block}
.tile.cover img{object-fit:cover}
.pname{font-family:'Playfair Display',serif;font-weight:700;color:var(--navy);font-size:11.5pt;line-height:1.2}
.pdesc{margin-top:1mm;color:var(--text)}
.org{margin-top:1.2mm;font-size:7.4pt;color:var(--skyd);font-weight:600}
dl.f{margin-top:1.8mm;display:grid;grid-template-columns:22mm 1fr;column-gap:3mm;row-gap:.9mm;font-size:7.7pt}
dl.f dt{color:var(--muted);font-weight:600}
dl.f dd{color:var(--ink)}
.hcard{display:flex;gap:4.5mm;align-items:flex-start;border:.25mm solid var(--line);border-radius:3mm;padding:3.5mm;background:#fff}
.vcard{border:.25mm solid var(--line);border-radius:3mm;padding:3.5mm;background:#fff;display:flex;flex-direction:column}
.chip{display:inline-block;padding:.6mm 2.4mm;border-radius:10mm;background:var(--navy);color:#fff;font-size:7pt;font-weight:600;letter-spacing:.04em}
.chip.sky{background:var(--sky);color:var(--ink)}
.dark{background:#0A1F44;color:#DCE6F5}
.dark h1,.dark h2,.dark h3{color:#fff}
.illus{font-size:6pt;color:var(--muted);text-transform:uppercase;letter-spacing:.14em;margin-top:1mm}
.note{font-size:7.4pt;color:var(--muted)}
.panel{background:var(--mist);border-radius:3mm;padding:5mm}
.panel.navy{background:var(--navy);color:#DCE6F5}
.panel.navy h3{color:#fff}
.step{display:flex;gap:4mm;align-items:flex-start}
.step .no{flex:0 0 9mm;height:9mm;border-radius:50%;background:var(--navy);color:#fff;display:flex;align-items:center;justify-content:center;font-family:'Playfair Display',serif;font-weight:700;font-size:11pt}
.step h3{font-size:11pt;margin-bottom:.8mm}
ul.dot{list-style:none}
ul.dot li{position:relative;padding-left:4mm;margin:1.1mm 0}
ul.dot li:before{content:'';position:absolute;left:0;top:1.7mm;width:1.8mm;height:1.8mm;border-radius:50%;background:var(--sky)}
a{color:inherit;text-decoration:none}
"""

# ---------------------------------------------------------------- components
def chrome(n: int, section: str, mode: str) -> str:
    return (f'<div class="rh"><div class="logo"><img src="{img(LOGO, mode)}" alt="">'
            f'<b>JAY IMPEX</b></div><span>{e(section)}</span></div>'
            f'<div class="rf"><span>{e(BRAND["tagline"])}</span>'
            f'<span><a href="{BRAND["web_href"]}">{BRAND["web"]}</a> &nbsp;·&nbsp; <span class="n">{n:02d}</span></span></div>')

def credit_line(ids, extra="") -> str:
    parts = [f"{PRODUCTS[i]['name'].split(' (')[0]}: {CREDITS[i]}" for i in ids if i in CREDITS]
    if not parts and not extra:
        return ""
    return f'<div class="credit">{"Photo credits – " + "; ".join(parts) if parts else ""}{(" " + extra) if extra else ""}</div>'

def dl(pid: str, limit=4) -> str:
    rows = facts(pid, limit)
    if not rows:
        return '<div class="note" style="margin-top:1.8mm">Specifications and grades on request.</div>'
    return "<dl class=f>" + "".join(f"<dt>{e(a)}</dt><dd>{e(b)}</dd>" for a, b in rows) + "</dl>"

def hcard(pid: str, mode: str, img_name: str, size=38, show_origin=True, limit=4, cover=False, big=None) -> str:
    p = PRODUCTS[pid]
    o = f'<div class="org">{e(origin(pid))}</div>' if show_origin else ""
    inner = (f'<div style="width:100%;height:100%;display:flex;flex-direction:column;align-items:center;justify-content:center;background:#0A1F44;color:#fff;text-align:center">'
             f'<div style="font-family:\'Playfair Display\',serif;font-weight:700;font-size:25pt;line-height:1">{big}</div>'
             f'<div style="font-size:6.4pt;letter-spacing:.2em;color:#12B6F4;margin-top:1.5mm">BASMATI RICE</div></div>') if big else f'<img src="{img(img_name, mode)}" alt="{e(p["name"])}">'
    return (f'<div class="hcard"><div class="tile{" cover" if cover else ""}" style="width:{size}mm;height:{size}mm;flex:0 0 {size}mm">'
            f'{inner}</div>'
            f'<div style="flex:1;min-width:0"><div class="pname">{e(NAME[pid])}</div>'
            f'<div class="pdesc">{e(DESC[pid])}</div>{o}{dl(pid, limit)}</div></div>')

def vcard(pid: str, mode: str, img_name: str, h=40, limit=3, cover=False, illus=False) -> str:
    p = PRODUCTS[pid]
    return (f'<div class="vcard"><div class="tile{" cover" if cover else ""}" style="height:{h}mm"><img src="{img(img_name, mode)}" alt="{e(p["name"])}"></div>'
            f'<div class="pname" style="margin-top:2.5mm;font-size:10.5pt">{e(NAME[pid])}</div>'
            f'<div class="pdesc">{e(DESC[pid])}</div><div class="org">{e(origin(pid))}</div>{dl(pid, limit)}'
            + ('<div class="illus">Illustrative image</div>' if illus else '') + '</div>')

def page(n, section, inner, mode, cls="", credits="") -> str:
    bg = f'<img src="{bg_image(mode, "cover" if n == 1 else "back")}" style="position:absolute;left:0;top:0;width:100%;height:100%;display:block" alt="">' if "dark" in cls else ""
    return (f'<section class="page {cls}">{bg}<div class="trim">{chrome(n, section, mode) if n not in (1, 16) else ""}{inner}{credits}</div></section>')

def head(eyebrow, title, lead="") -> str:
    return f'<div class="eyebrow">{e(eyebrow)}</div><h1 class="pt">{title}</h1>' + (f'<p class="lead">{lead}</p>' if lead else "")

# ---------------------------------------------------------------- pages
def build_pages(mode: str):
    P = []
    n_products = len(PRODUCTS)
    cats = [
        ("Rice", "rice", "Deity Basmati, Sugandha and parboiled rice.", "Deity_Rice.png", 5),
        ("Spices & Seasonings", "spices", "Whole and ground spices from India's growing regions.", "Red_Chilli.png", 6),
        ("Pulses & Dals", "pulses", "Dals, lentils and beans, whole and split.", "Rotate-Dals.jpg", 9),
        ("Millets, Nuts & Oilseeds", "oilseeds", "Ragi, sesame seeds and groundnut kernels.", "sesame-seeds.jpg", 10),
        ("FMCG Provisions", "fmcg", "Packaged groceries and jaggery.", "jaggery.jpg", 10),
        ("Seasonal Fresh Fruits", "fruits", "Mangoes, pomegranates and bananas.", "seasonal-fruits.jpg", 11),
        ("Traditional Sweets", "sweets", "Indian sweets and packaged confectionery.", "indian-sweets.jpg", 11),
        ("Textiles & Garments", "textiles", "Cotton fabrics, apparel and home textiles.", "textiles-sourcing.jpg", 12),
        ("Machinery & Equipment", "machinery", "Food processing and agro machinery.", "industrial-machinery.jpg", 13),
        ("Utensils & Cookware", "utensils", "Stainless steel kitchenware.", "stainless-utensils.jpg", 13),
        ("Door Mats & Floor Coverings", "mats", "Coir and rubber mats and floor coverings.", "coir-door-mats.jpg", 13),
    ]
    cat_counts = {c[1]: sum(1 for p in PRODUCTS.values() if p["category"] == c[1]) for c in cats}

    def tile(nm, w, h, fit="contain", style=""):
        return (f'<div style="width:{w}mm;height:{h}mm;border-radius:3mm;background:#fff;overflow:hidden;{style}">'
                f'<img src="{img(nm, mode)}" style="width:100%;height:100%;object-fit:{fit};display:block" alt=""></div>')

    # 1 — front cover
    small = "".join(tile(n, 40.5, 40.5) for n in ["Red_Chilli.png", "Cardamom.png", "Black_Pepper.png", "Star_Anise.png"])
    P.append(page(1, "", f'''
      <div style="position:absolute;left:18mm;top:20mm;width:40mm;height:40mm;border-radius:5mm;overflow:hidden"><img src="{img(LOGO, mode)}" style="width:100%;height:100%;display:block" alt="Jay Impex logo"></div>
      <div style="position:absolute;left:18mm;right:18mm;top:74mm">
        <div class="eyebrow" style="color:#12B6F4;letter-spacing:.3em">{BRAND["descriptor"]}</div>
        <h1 style="font-size:40pt;line-height:1.08;color:#fff;margin-top:5mm;max-width:150mm">Driven by Excellence in <span style="color:#12B6F4">Global Trade</span></h1>
        <div style="width:22mm;height:.9mm;background:#12B6F4;margin:6mm 0"></div>
        <div style="color:#C9D6EA;font-size:11pt;max-width:120mm;line-height:1.5">Rice, spices, pulses and client-sourced commodities, exported from Chennai, India.</div>
      </div>
      <div style="position:absolute;left:18mm;right:18mm;top:160mm">
        <div style="display:flex;gap:5mm">{tile("Deity_Rice.png", 60, 60)}{tile("Rotate-Dals.jpg", 107, 60, "cover")}</div>
        <div style="display:flex;gap:5mm;margin-top:5mm">{small}</div></div>
      <div style="position:absolute;left:18mm;right:18mm;bottom:15mm;display:flex;justify-content:space-between;color:#9FB2D0;font-size:8pt;letter-spacing:.2em;text-transform:uppercase">
        <span>Chennai, India</span><span>Since 1990</span><span>{BRAND["web"]}</span></div>
    ''', mode, "dark"))

    # 2 — company profile
    pillars = [("Exporter", "Connects Indian producers with international markets, from specification and packing to shipment."),
               ("Wholesaler", "Commodity wholesaling since 1990, sourcing directly from producing regions."),
               ("Custom sourcing partner", "Procures goods strictly to client technical requirements, beyond agro commodities.")]
    pil = "".join(f'<div class="vcard" style="flex:1;padding:5mm"><div class="eyebrow" style="font-size:7pt">0{i+1}</div><h3 style="font-size:12.5pt;margin:1.5mm 0 2mm">{t}</h3><div>{d}</div></div>' for i, (t, d) in enumerate(pillars))
    P.append(page(2, "Company Profile", f'''<div class="safe">
      {head("About Jay Impex", "A Chennai-based commodities exporter and sourcing partner", "Jay Impex has traded commodities from India since 1990. From Chennai, we export staple agro products — Basmati rice, spices and pulses — and act as a custom procurement partner for textiles, machinery, kitchenware, fresh fruit, sweets and floor coverings.")}
      <div style="display:flex;gap:4mm;margin-top:11mm">{pil}</div>
      <div style="display:grid;grid-template-columns:1.1fr 1fr;gap:7mm;margin-top:11mm">
        <div class="panel navy" style="padding:6mm"><div class="eyebrow" style="color:#12B6F4">At a glance</div>
          <div style="display:grid;grid-template-columns:auto 1fr;gap:3mm 6mm;margin-top:4mm;font-size:9pt">
            <b style="color:#fff">Established</b><span>1990</span>
            <b style="color:#fff">Headquarters</b><span>Chennai, Tamil Nadu, India</span>
            <b style="color:#fff">Business</b><span>Commodities export, wholesale and custom sourcing</span>
            <b style="color:#fff">Loading ports</b><span>Chennai Port (INMAA), Kamarajar Port (Ennore)</span>
            <b style="color:#fff">Catalogue</b><span>{n_products} products in {len(cats)} categories</span></div></div>
        <div><div class="eyebrow">Who we serve</div>
          <ul class="dot" style="margin-top:3mm;font-size:9.4pt"><li>International importers and distributors</li><li>Wholesale and procurement teams</li><li>Food importers and commodity traders</li><li>Retailers and supermarket chains</li><li>Institutional and catering buyers</li></ul></div></div>
      <div class="panel" style="margin-top:11mm;display:flex;gap:7mm;align-items:center;padding:6mm">
        <div class="tile" style="flex:0 0 58mm;height:44mm"><img src="{img("Deity_Rice.png", mode)}" alt="Deity Basmati packs"></div>
        <div><div class="eyebrow">Our brand</div><h3 style="font-size:14pt;margin:1mm 0 1.5mm">Deity Basmati</h3><div>Jay Impex markets Basmati rice under the Deity brand, in Platinum, Gold, Silver and Classic packs.</div></div></div>
      <div class="note" style="margin-top:9mm">To discuss your requirement, contact <a href="mailto:{BRAND["email"]}" style="color:var(--skyd);font-weight:600">{BRAND["email"]}</a> or call <a href="{BRAND["tel_href"]}" style="color:var(--skyd);font-weight:600">{BRAND["phone"]}</a>.</div>
    </div>''', mode))

    # 3 — sourcing and export process
    steps = [("Product enquiry", "Tell us the product, quantity, packaging and destination port."),
             ("Specification confirmation", "We confirm grade, variety and specification with you."),
             ("Quotation and commercial agreement", "We prepare a quotation and agree commercial terms."),
             ("Quality and packaging alignment", "Sampling, inspection and packaging are aligned with your requirement."),
             ("Shipment planning", "We plan container loading and the sailing route."),
             ("Export documentation and dispatch", "Documentation is completed and the consignment is dispatched.")]
    st = "".join(f'<div class="step"><div class="no">{i+1}</div><div><h3>{t}</h3><div style="font-size:9pt">{d}</div></div></div>' for i, (t, d) in enumerate(steps))
    P.append(page(3, "Sourcing & Export", f'''<div class="safe">
      {head("How we work", "From enquiry to dispatch", "A clear path for importers, from first enquiry to export documentation.")}
      <div style="display:grid;grid-template-columns:1.2fr 1fr;gap:10mm;margin-top:10mm">
        <div style="display:flex;flex-direction:column;gap:10.5mm">{st}</div>
        <div style="display:flex;flex-direction:column;gap:6mm">
          <div class="panel navy" style="padding:6mm"><div class="eyebrow" style="color:#12B6F4">Loading ports</div>
            <h3 style="font-size:13pt;margin:2mm 0">Chennai &amp; Ennore</h3>
            <div>Primary: Chennai Port (INMAA) and Kamarajar Port (Ennore).</div>
            <div style="margin-top:2mm">Alternate South Indian terminals: Tuticorin, Kattupalli, Cochin and Visakhapatnam.</div></div>
          <div class="panel" style="padding:6mm"><div class="eyebrow">Destinations</div>
            <ul class="dot" style="margin-top:3mm"><li><b>Australia</b> – Melbourne, Sydney, Brisbane, Fremantle</li><li>Middle East</li><li>Europe</li><li>Africa</li><li>The Americas</li></ul></div>
          <div class="note">Sailing schedules, transit times and freight are confirmed per shipment.</div></div></div>
      <div class="panel navy" style="margin-top:10mm;padding:6mm;display:flex;justify-content:space-between;align-items:center;gap:8mm">
        <div><div class="eyebrow" style="color:#12B6F4">Start with an enquiry</div><h3 style="font-size:14pt;margin-top:1.5mm">Tell us what you need to ship.</h3></div>
        <div style="font-size:9.4pt;line-height:1.8;text-align:right"><a href="mailto:{BRAND["email"]}" style="color:#fff;font-weight:600">{BRAND["email"]}</a><br><a href="{BRAND["tel_href"]}" style="color:#fff;font-weight:600">{BRAND["phone"]}</a></div></div>
    </div>''', mode))

    # 4 — portfolio overview
    tl = ""
    for name, key, d, im, pg in cats:
        tl += (f'<div class="vcard" style="padding:2.5mm"><div class="tile" style="height:30mm"><img src="{img(im, mode)}" alt="{e(name)}" style="object-fit:cover"></div>'
               f'<div class="pname" style="margin-top:2mm;font-size:10pt">{e(name)}</div><div style="font-size:7.8pt;margin-top:.5mm">{e(d)}</div>'
               f'<div style="margin-top:1.2mm;font-size:7.2pt;color:var(--skyd);font-weight:700">{cat_counts[key]} product{"s" if cat_counts[key]!=1 else ""} &nbsp;·&nbsp; Page {pg}</div></div>')
    tl += ('<div class="vcard" style="padding:4mm;background:var(--navy);border-color:var(--navy);justify-content:center"><div class="eyebrow" style="color:#12B6F4">Custom sourcing</div>'
           '<div class="pname" style="color:#fff;margin-top:1.5mm;font-size:11pt">Something else?</div><div style="color:#C9D6EA;font-size:7.8pt;margin-top:1mm">Tell us what you need and we will source it to your specification.</div></div>')
    P.append(page(4, "Product Portfolio", f'''<div class="safe">
      {head("Product portfolio", "Eleven categories, one sourcing partner", f"{n_products} products across agro commodities and client-sourced goods.")}
      <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:4mm;margin-top:7mm">{tl}</div></div>''', mode))

    # 5 — rice
    chips = "".join(f'<span class="chip{" sky" if i==1 else ""}">{c}</span> ' for i, c in enumerate(["Platinum", "Gold", "Silver", "Classic"]))
    P.append(page(5, "Rice", f'''<div class="safe">
      {head("Rice", "Basmati and non-Basmati rice", "Basmati rice under the Deity brand, plus aromatic long-grain and parboiled rice.")}
      <div class="panel" style="margin-top:7mm;display:flex;gap:7mm;align-items:center;padding:6mm">
        <div class="tile" style="flex:0 0 56mm;height:56mm"><img src="{img("Deity_Rice.png", mode)}" alt="Deity Basmati packs"></div>
        <div><div class="eyebrow">Deity Basmati</div><h3 style="font-size:16pt;margin:1.5mm 0 3mm">Four packs, one brand</h3>
          <div>{chips}</div>
          <div style="margin-top:4mm">Deity Basmati is offered as 1121 steam and 1509 golden sella.</div></div></div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:4.5mm;margin-top:5mm">
        {hcard("deity-1121-steam-basmati", mode, "", 32, limit=4, big="1121")}
        {hcard("deity-1509-golden-sella-basmati", mode, "", 32, limit=4, big="1509")}
        {hcard("sugandha-steam-rice", mode, "Rice.png", 32, limit=4)}
        {hcard("parboiled-rice", mode, "parboiled-rice.jpg", 32, limit=4, cover=True)}
      </div>
      <div class="panel" style="margin-top:5mm;display:grid;grid-template-columns:1.1fr 1fr;gap:8mm;padding:5mm">
        <div><div class="eyebrow">Also available on request</div>
          <ul class="dot" style="margin-top:2mm;font-size:8.8pt;columns:2"><li>Raw rice</li><li>Boiled rice</li><li>Steam rice</li><li>Long-grain white</li><li>Sona Masoori</li><li>Broken rice</li></ul></div>
        <div><div class="eyebrow">Rice markets</div>
          <div style="margin-top:2.5mm;font-size:9pt">Rice is exported to markets including Dubai, Egypt, Eastern Africa, Australia, Canada and the United States.</div></div></div>
      <div class="note" style="margin-top:3mm">Specifications and packaging are confirmed per order.</div>
    </div>''', mode, credits=credit_line(["parboiled-rice"])))

    # 6-8 spices
    s1 = [("salem-turmeric-finger-powder", "Turmeric_Powder.jpg"), ("guntur-red-chilli-whole-powder", "Red_Chilli.png"),
          ("malabar-black-pepper", "Black_Pepper.png"), ("cumin-seeds-jeera", "Cumin_Seeds.png"),
          ("green-cardamom-bold", "Cardamom.png"), ("coriander-seeds-and-powder", "Coriander_Seed.png")]
    P.append(page(6, "Spices & Seasonings", f'''<div class="safe">
      {head("Spices & Seasonings · 1 of 3", "Signature spices", "Whole and ground spices sourced from India's growing regions.")}
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:4.5mm;margin-top:7mm">{"".join(hcard(i, mode, im, 30, limit=3) for i, im in s1)}</div>
      <div class="panel navy" style="margin-top:7mm;padding:6mm"><div class="eyebrow" style="color:#12B6F4">Sourced across India</div>
        <div style="margin-top:2mm;font-size:9.4pt;color:#DCE6F5">Our spices are sourced from established growing regions, including Tamil Nadu, Andhra Pradesh, Kerala, Gujarat and Rajasthan. Grades and specifications are confirmed per order.</div></div></div>''', mode))
    s2 = [("mustard-seeds", "Mustard_Seeds.png"), ("fenugreek-seeds", "Fenugreek_Seeds.png"), ("cinnamon-sticks", "Cinnamon.png"), ("cloves", "Cloves.png")]
    P.append(page(7, "Spices & Seasonings", f'''<div class="safe">
      {head("Spices & Seasonings · 2 of 3", "Seeds and sweet spices", "Everyday kitchen essentials, supplied for retail, blending and foodservice.")}
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:5mm;margin-top:8mm">{"".join(vcard(i, mode, im, 62, limit=3) for i, im in s2)}</div>
      <div class="panel navy" style="margin-top:7mm"><div class="eyebrow" style="color:#12B6F4">Samples and specifications</div>
        <div style="margin-top:1.5mm;font-size:9pt;color:#DCE6F5">Grades, forms and packing are confirmed per order. Samples and specifications are available on request.</div></div>
    </div>''', mode))
    s3 = [("star-anise", "Star_Anise.png"), ("tamarind", "Tamarind.png"), ("asafoetida", "Asafoetida.png"), ("bay-leaves", "BayLeaves.png")]
    P.append(page(8, "Spices & Seasonings", f'''<div class="safe">
      {head("Spices & Seasonings · 3 of 3", "Aromatics and culinary ingredients", "Additional spices and ingredients from the catalogue.")}
      <div style="display:flex;flex-direction:column;gap:4mm;margin-top:6mm">{"".join(hcard(i, mode, im, 34, limit=2) for i, im in s3)}</div>
      <div class="panel navy" style="margin-top:7mm"><div class="eyebrow" style="color:#12B6F4">Need a spice not listed?</div>
        <div style="margin-top:1.5mm;font-size:9pt;color:#DCE6F5">Our sourcing team can procure other whole and ground spices to your specification. Send your requirement to {BRAND["email"]}.</div></div>
    </div>''', mode))

    # 9 pulses
    pl = [("toor-dhal-pigeon-peas", "3-toor-dhal-480x480.jpg"), ("green-moong-dhal-whole-split", "Green-Moong-Dhall-Whole-480x480.jpg"),
          ("black-urid-dhal-gota-split", "1-urid-gota-480x480.jpg"), ("channa-dal-bengal-gram", "4-channa-dal-480x480.jpg"),
          ("masoor-dal", "masoor-dal.jpg"), ("rajma", "rajma-kidney-beans.jpg"), ("moth-dal", "6-moth-dal-480x480.png"),
          ("horse-gram", "7-horse-gram-480x480.jpg"), ("black-chana", "9-black-channa-480x480.jpg")]
    P.append(page(9, "Pulses & Dals", f'''<div class="safe">
      {head("Pulses & Dals", "Dals, lentils and beans", "Nine pulses, whole and split, for importers, packers and food manufacturers.")}
      <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:3.5mm;margin-top:6mm">{"".join(vcard(i, mode, im, 30, limit=2, cover=True) for i, im in pl)}</div></div>''', mode,
                  credits=credit_line(["masoor-dal", "rajma"])))

    # 10 millets / oilseeds / fmcg
    ms = [("ragi-finger-millet", "ragi-finger-millet.jpg"), ("sesame-seeds", "sesame-seeds.jpg"), ("groundnuts", "groundnuts.jpg")]
    P.append(page(10, "Millets, Nuts, Oilseeds & FMCG", f'''<div class="safe">
      {head("Millets, Nuts & Oilseeds", "Grains, seeds and nuts", "")}
      <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:4.5mm;margin-top:3mm">{"".join(vcard(i, mode, im, 44, limit=2, cover=True) for i, im in ms)}</div>
      <div style="margin-top:12mm">{head("FMCG Provisions", "Packaged goods and jaggery", "")}</div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:4.5mm;margin-top:3mm">
        <div class="vcard" style="justify-content:center;background:var(--navy);border-color:var(--navy);padding:6mm"><div class="eyebrow" style="color:#12B6F4">FMCG provisions</div>
          <div class="pname" style="color:#fff;margin-top:2mm;font-size:13pt">Packaged groceries and provisions</div>
          <div style="color:#C9D6EA;margin-top:2mm">{e(DESC["fmcg-packaged-provisions"])} Brands, SKUs and packaging are consolidated to buyer requirement.</div>
          <div style="color:#9FB2D0;margin-top:3mm;font-size:7.8pt">Product list available on request.</div></div>
        {vcard("jaggery", mode, "jaggery.jpg", 46, limit=2, cover=True)}</div>
      <div class="note" style="margin-top:6mm">Availability, grades and packaging are confirmed at the time of enquiry.</div>
    </div>''', mode, credits=credit_line(["ragi-finger-millet", "sesame-seeds", "groundnuts", "jaggery"])))

    # 11 fruits + sweets
    def feature(pid, im, label):
        return (f'<div class="vcard" style="flex-direction:row;gap:6mm;padding:5mm"><div style="flex:0 0 74mm"><div class="tile cover" style="height:74mm"><img src="{img(im, mode)}" alt="{e(NAME[pid])}"></div><div class="illus">Illustrative image</div></div>'
                f'<div style="flex:1"><div class="eyebrow">{label}</div><div class="pname" style="font-size:15pt;margin-top:1.5mm">{e(NAME[pid])}</div>'
                f'<div class="pdesc" style="font-size:9.2pt">{e(DESC[pid])}</div>{dl(pid, 4)}</div></div>')
    P.append(page(11, "Fruits & Sweets", f'''<div class="safe">
      {head("Seasonal Fruits & Traditional Sweets", "Fresh from the orchard, made by tradition", "Fresh fruit and confectionery, sourced to destination-market requirements.")}
      <div style="display:flex;flex-direction:column;gap:7mm;margin-top:8mm">
        {feature("seasonal-fresh-fruits", "seasonal-fruits.jpg", "Seasonal fresh fruits")}
        {feature("traditional-indian-sweets", "indian-sweets.jpg", "Traditional sweets")}</div>
      <div class="note" style="margin-top:7mm">Food products are subject to destination-country regulatory and labelling requirements, which are confirmed per shipment. Shelf life and cold-chain handling are agreed at enquiry.</div></div>''', mode))

    # 12 textiles
    P.append(page(12, "Textiles & Garments", f'''<div class="safe">
      {head("Textiles & Garments", "Cotton textiles sourced to your specification", "From Tirupur, Karur and Coimbatore: fabrics, apparel and home textiles made to client tech packs.")}
      <div style="display:flex;gap:7mm;margin-top:9mm;align-items:flex-start">
        <div style="flex:0 0 110mm"><div class="tile cover" style="width:110mm;height:110mm"><img src="{img("textiles-sourcing.jpg", mode)}" alt="Textiles"></div><div class="illus">Illustrative image</div></div>
        <div style="flex:1"><div class="eyebrow">Sourced to client specification</div><div class="pname" style="font-size:15pt;margin-top:1.5mm">{e(NAME["textiles-fabrics-garments"])}</div>
          <div class="pdesc" style="font-size:9.2pt">{e(DESC["textiles-fabrics-garments"])}</div>
          <div class="note" style="margin-top:4mm">Sizes, colours, finishes and packing are specified by the client and confirmed against a sample before production.</div></div></div>
      <div class="panel" style="margin-top:8mm;padding:6mm"><div class="eyebrow">Specification overview</div>{dl("textiles-fabrics-garments", 5).replace("<dl class=f>", '<dl class=f style="margin-top:3mm;grid-template-columns:30mm 1fr;row-gap:2mm;font-size:8.8pt">')}</div>
      <div class="panel navy" style="margin-top:6mm;padding:6mm"><div class="eyebrow" style="color:#12B6F4">Send us your tech pack</div>
        <div style="margin-top:2mm;font-size:9.2pt;color:#DCE6F5">Share your fabric, GSM, sizes, colours and packaging requirements at {BRAND["email"]} and we will respond with a quotation.</div></div></div>''', mode))

    # 13 machinery, utensils, mats
    def row(pid, im, label):
        zoom = ' style="transform:scale(1.25);transform-origin:50% 56%"' if "coir" in im else ""
        return (f'<div class="hcard" style="padding:4mm"><div style="flex:0 0 58mm"><div class="tile" style="width:58mm;height:58mm"><img src="{img(im, mode)}" alt="{e(NAME[pid])}"{zoom}></div><div class="illus">Illustrative image</div></div>'
                f'<div style="flex:1"><div class="eyebrow">{label}</div><div class="pname" style="font-size:13pt;margin-top:1.5mm">{e(NAME[pid])}</div>'
                f'<div class="pdesc" style="font-size:9pt">{e(DESC[pid])}</div>{dl(pid, 4)}</div></div>')
    P.append(page(13, "Machinery, Stainless Steel & Mats", f'''<div class="safe">
      {head("Machinery · Kitchenware · Floor Coverings", "Engineered and crafted in India", "")}
      <div style="display:flex;flex-direction:column;gap:5.5mm;margin-top:3mm">
        {row("industrial-agro-machinery", "industrial-machinery.jpg", "Machinery & equipment")}
        {row("stainless-steel-kitchenware", "stainless-utensils.jpg", "Utensils & cookware")}
        {row("natural-coir-door-mats", "coir-door-mats.jpg", "Door mats & floor coverings")}</div>
      <div class="note" style="margin-top:5mm">Technical specifications are finalised against the client's requirement before quotation.</div></div>''', mode))

    # 14 quality / packaging / compliance
    qa = [("Specification approval", "We agree the grade, variety and parameters you need before quotation."),
          ("Sampling and inspection", "Samples are provided for approval. Buyer-nominated inspection can be coordinated."),
          ("Packaging and labelling", "Bag type, pack size, marking and labelling are aligned with your market."),
          ("Batch and lot identification", "Consignments are marked so lots can be identified and traced."),
          ("Export documentation", "Commercial and shipping documents are prepared for each consignment."),
          ("Destination compliance", "Import, food-safety and labelling rules of the destination country are confirmed with you per shipment.")]
    qg = "".join(f'<div class="vcard" style="padding:6mm;min-height:40mm"><div class="eyebrow" style="font-size:7pt">0{i+1}</div><h3 style="font-size:13pt;margin:1.5mm 0 2mm">{t}</h3><div style="font-size:9pt">{d}</div></div>' for i, (t, d) in enumerate(qa))
    docs = ["Commercial invoice", "Packing list", "Bill of lading", "Certificate of origin"]
    P.append(page(14, "Quality, Packaging & Compliance", f'''<div class="safe">
      {head("Quality, packaging & compliance", "Aligned to your requirement", "A simple framework to make sure every consignment matches what you ordered.")}
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:4.5mm;margin-top:8mm">{qg}</div>
      <div style="display:grid;grid-template-columns:1.2fr 1fr;gap:5mm;margin-top:6mm">
        <div class="panel navy" style="padding:6mm"><div class="eyebrow" style="color:#12B6F4">Export documents</div>
          <div style="margin-top:2mm;font-size:9pt">Documents commonly prepared for export shipments include:</div>
          <ul class="dot" style="margin-top:2mm;columns:2;font-size:9pt">{"".join(f"<li>{d}</li>" for d in docs)}</ul>
          <div style="margin-top:2mm;font-size:8pt;color:#9FB2D0">Further documents depend on the product and destination.</div></div>
        <div class="panel" style="padding:6mm"><div class="eyebrow">Please note</div>
          <div style="margin-top:2mm;font-size:9pt">Specifications, grades and packaging vary by product and season, and are confirmed in writing with each quotation.</div></div></div>
    </div>''', mode))

    # 15 private label, consolidation, logistics
    chk = ["Product and variety or grade", "Quantity and number of containers", "Packaging type and pack size", "Labelling or private-label artwork",
           "Destination country and port", "Preferred commercial terms (FOB, CIF, CFR, EXW)", "Target shipment period", "Any inspection or documentation needs"]
    inc = [("FOB", "Free on Board", "Seller delivers goods on board the vessel at the port of loading."),
           ("CFR", "Cost and Freight", "Seller also pays freight to the named port of destination."),
           ("CIF", "Cost, Insurance and Freight", "As CFR, with seller also arranging minimum cargo insurance."),
           ("EXW", "Ex Works", "Buyer collects the goods from the seller's premises.")]
    incg = "".join(f'<div class="vcard" style="padding:4.5mm"><div class="serif" style="font-size:17pt;color:var(--skyd)">{a}</div><div style="font-weight:700;color:var(--navy);margin-top:.5mm">{b}</div><div style="font-size:8.2pt;margin-top:1.2mm">{c}</div></div>' for a, b, c in inc)
    P.append(page(15, "Private Label & Logistics", f'''<div class="safe">
      {head("Services", "Private label, consolidation and logistics", "Flexible packing and shipping arrangements for importers and retailers.")}
      <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:4mm;margin-top:7mm">
        <div class="vcard" style="padding:5mm"><h3 style="font-size:12.5pt">Private label</h3><div style="margin-top:1.5mm">Market rice, spices and pulses under your own brand, with packaging and labelling coordinated to your design.</div></div>
        <div class="vcard" style="padding:5mm"><h3 style="font-size:12.5pt">Consolidation</h3><div style="margin-top:1.5mm">Combine several products and SKUs into a single shipment, to suit retailers and distributors.</div></div>
        <div class="vcard" style="padding:5mm"><h3 style="font-size:12.5pt">Shipping &amp; terms</h3><div style="margin-top:1.5mm">Quotations on FOB, CIF, CFR or EXW terms, shipped from Chennai and other South Indian ports.</div></div></div>
      <div style="margin-top:6mm" class="eyebrow">Commercial terms explained</div>
      <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:3.5mm;margin-top:2.5mm">{incg}</div>
      <div class="panel navy" style="margin-top:6mm;padding:5mm"><div class="eyebrow" style="color:#12B6F4">Buyer enquiry checklist</div>
        <h3 style="font-size:13pt;margin:1mm 0 2mm">What to include in your enquiry</h3>
        <ul class="dot" style="columns:2;column-gap:8mm;font-size:9pt">{"".join(f"<li>{c}</li>" for c in chk)}</ul></div>
      <div style="display:flex;gap:6mm;margin-top:6mm;align-items:stretch">
        <div style="flex:0 0 76mm"><div class="tile cover" style="width:76mm;height:50mm"><img src="{img("Exporter.jpg", mode)}" alt="Port and container logistics"></div><div class="illus">Illustrative image</div></div>
        <div class="panel" style="flex:1;padding:6mm"><div class="eyebrow">Talk to our trade desk</div>
          <div style="margin-top:2.5mm;font-size:9.4pt;line-height:1.8"><a href="mailto:{BRAND["email"]}" style="color:var(--skyd);font-weight:600">{BRAND["email"]}</a><br>
          <a href="{BRAND["tel_href"]}" style="color:var(--skyd);font-weight:600">{BRAND["phone"]}</a> (phone / WhatsApp)<br>
          <span style="color:var(--muted);font-size:8.4pt">{BRAND["hours"]}</span></div></div></div>
      <div class="note" style="margin-top:3mm;padding-bottom:1mm">Container loading, delivery dates, transit times and freight are confirmed per enquiry. Incoterms® definitions are summarised for convenience.</div>
    </div>''', mode))

    # 16 back cover
    P.append(page(16, "", f'''
      <div style="position:absolute;left:18mm;top:22mm;width:34mm;height:34mm;border-radius:4.5mm;overflow:hidden"><img src="{img(LOGO, mode)}" style="width:100%;height:100%;display:block" alt="Jay Impex logo"></div>
      <div style="position:absolute;left:18mm;right:18mm;top:78mm">
        <div class="eyebrow" style="color:#12B6F4;letter-spacing:.3em">Request a quotation</div>
        <h1 style="font-size:30pt;line-height:1.12;color:#fff;margin-top:4mm;max-width:150mm">Let's move your next order.</h1>
        <div style="color:#C9D6EA;font-size:11pt;margin-top:5mm;max-width:130mm">Send us your product, quantity and destination, and our trade desk will respond with a quotation.</div>
      </div>
      <div style="position:absolute;left:18mm;right:18mm;top:150mm;display:flex;gap:12mm;align-items:flex-start">
        <div style="flex:1;color:#DCE6F5;font-size:10pt;line-height:1.7">
          <div style="color:#12B6F4;font-size:7.4pt;letter-spacing:.22em;text-transform:uppercase;font-weight:700">Contact</div>
          <div style="margin-top:2mm"><a href="{BRAND["web_href"]}" style="color:#fff;font-weight:600">{BRAND["web"]}</a></div>
          <div><a href="mailto:{BRAND["email"]}" style="color:#fff;font-weight:600">{BRAND["email"]}</a></div>
          <div><a href="{BRAND["tel_href"]}" style="color:#fff;font-weight:600">{BRAND["phone"]}</a> (phone / WhatsApp)</div>
          <div style="margin-top:3mm;color:#C9D6EA;font-size:9pt;line-height:1.55">{"<br>".join(BRAND["address"])}</div>
          <div style="margin-top:3mm;color:#9FB2D0;font-size:8.4pt">{BRAND["hours"]}</div></div>
        <div style="flex:0 0 46mm;text-align:center"><div style="background:#fff;border-radius:3mm;padding:3.5mm;width:46mm;height:46mm">{qr_svg().replace("<svg ", '<svg style="width:100%;height:100%;display:block" ', 1)}</div>
          <div style="color:#C9D6EA;font-size:7.6pt;margin-top:2mm">Scan to send an enquiry</div></div></div>
      <div style="position:absolute;left:18mm;right:18mm;bottom:20mm;border-top:.25mm solid rgba(255,255,255,.2);padding-top:5mm;display:flex;justify-content:space-between;color:#9FB2D0;font-size:8pt">
        <span style="font-family:'Playfair Display',serif;font-size:11pt;color:#fff">{BRAND["tagline"]}</span><span>Jay Impex · Chennai, India</span></div>
    ''', mode, "dark"))
    return P

def html_doc(mode: str) -> str:
    bleed = "3mm" if mode == "print" else "0mm"
    w, h = (216, 303) if mode == "print" else (210, 297)
    pw, ph = w + 0.35, h + 0.35  # Chrome floors page size to whole CSS px; oversize slightly, then crop exactly
    pages = "".join(build_pages(mode))
    return (f'<!doctype html><html lang="en"><head><meta charset="utf-8"><title>{e(TITLE)}</title>'
            f'<style>@page{{size:{pw}mm {ph}mm;margin:0}}:root{{--b:{bleed}}}{CSS}</style></head><body>{pages}</body></html>')

# ---------------------------------------------------------------- render + postprocess
def render(mode: str) -> pathlib.Path:
    BUILD.mkdir(exist_ok=True)
    (BUILD / "fonts").mkdir(exist_ok=True)
    f = BUILD / f"brochure_{mode}.html"
    f.write_text(html_doc(mode), encoding="utf-8")
    raw = BUILD / f"raw_{mode}.pdf"
    raw.unlink(missing_ok=True)
    subprocess.run([CHROME, "--headless=new", "--disable-gpu", "--no-pdf-header-footer", "--allow-file-access-from-files",
                    
                    f"--print-to-pdf={raw}", f.as_uri()], check=True, capture_output=True, timeout=240)
    import time
    for _ in range(240):  # Chrome may detach before the PDF is fully written
        if raw.exists() and raw.stat().st_size > 10000:
            time.sleep(1.5); break
        time.sleep(0.5)
    return raw

SECTIONS = ["Front cover", "Company profile", "Sourcing & export process", "Product portfolio", "Rice",
            "Spices 1", "Spices 2", "Spices 3", "Pulses & dals", "Millets, nuts, oilseeds & FMCG",
            "Fruits & sweets", "Textiles & garments", "Machinery, kitchenware & mats", "Quality, packaging & compliance",
            "Private label & logistics", "Back cover"]

def finish(raw: pathlib.Path, dst: pathlib.Path, mode: str):
    doc = fitz.open(raw)
    assert doc.page_count == 16, f"expected 16 pages, got {doc.page_count}"
    mm = 72 / 25.4
    W, H = (216, 303) if mode == "print" else (210, 297)
    def arr(x0, y0, x1, y1):
        return f"[{x0:.3f} {y0:.3f} {x1:.3f} {y1:.3f}]"
    for pg in doc:
        old_h = pg.mediabox.height          # PDF coordinates (origin bottom-left); content is anchored top-left
        x0, y0, x1, y1 = 0, old_h - H * mm, W * mm, old_h
        for key in ("MediaBox", "CropBox"):
            doc.xref_set_key(pg.xref, key, arr(x0, y0, x1, y1))
        if mode == "print":
            doc.xref_set_key(pg.xref, "BleedBox", arr(x0, y0, x1, y1))
            doc.xref_set_key(pg.xref, "TrimBox", arr(x0 + 3 * mm, y0 + 3 * mm, x1 - 3 * mm, y1 - 3 * mm))
    doc.set_metadata({"title": TITLE, "author": "Jay Impex", "subject": "Global export brochure – rice, spices, pulses and sourced commodities",
                      "keywords": "Jay Impex, export, rice, spices, pulses, Chennai, India", "creator": "Jay Impex brochure generator", "producer": "Chrome headless + PyMuPDF"})
    doc.set_toc([[1, s, i + 1] for i, s in enumerate(SECTIONS)])
    doc.save(dst, garbage=4, deflate=True, clean=True)
    doc.close()

if __name__ == "__main__":
    OUT.mkdir(exist_ok=True)
    modes = sys.argv[1:] or ["print", "digital"]
    for m in modes:
        raw = render(m)
        name = "Print" if m == "print" else "Digital"
        finish(raw, OUT / f"Jay_Impex_Global_Export_Brochure_16p_{name}.pdf", m)
        print("built", m)
