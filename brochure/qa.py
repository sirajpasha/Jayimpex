"""Automated QA for the brochure PDFs. Writes build/qa.json and prints a summary."""
import json, re, sys, hashlib, pathlib
import pymupdf, cv2, numpy as np
from content import PRODUCTS, NAME, BRAND

ROOT = pathlib.Path(__file__).resolve().parent
OUT = ROOT.parent / "brochure-output"
MM = 72 / 25.4
res = {}
BANNED = re.compile(r"\b(ISO|FSSAI|APEDA|HACCP|GMP|organic|certified|Spices Board|HS code|MOQ|35\+|lorem|TODO|TBD|placeholder|XXX)\b", re.I)

for mode, fn in (("print", "Jay_Impex_Global_Export_Brochure_16p_Print.pdf"), ("digital", "Jay_Impex_Global_Export_Brochure_16p_Digital.pdf")):
    d = pymupdf.open(OUT / fn)
    r = {"file": fn, "bytes": (OUT / fn).stat().st_size, "pages": d.page_count, "metadata": d.metadata, "issues": []}
    W, H = (216, 303) if mode == "print" else (210, 297)
    texts, hashes, links, ppi_rows, fonts = [], [], [], [], {}
    for i, p in enumerate(d):
        n = i + 1
        wmm, hmm = p.rect.width / MM, p.rect.height / MM
        if abs(wmm - W) > 0.05 or abs(hmm - H) > 0.05:
            r["issues"].append(f"p{n}: page size {wmm:.2f}x{hmm:.2f} mm, expected {W}x{H}")
        if mode == "print":
            tb = d.xref_get_key(p.xref, "TrimBox")[1]
            if tb == "null":
                r["issues"].append(f"p{n}: TrimBox missing")
        t = p.get_text()
        texts.append(t)
        hashes.append(hashlib.md5(t.encode()).hexdigest())
        if len(t.strip()) < 30:
            r["issues"].append(f"p{n}: nearly empty text")
        # text outside safe area (trim inset 10mm) – ignore full-bleed backgrounds (not text)
        off = 3 * MM if mode == "print" else 0
        for x0, y0, x1, y1, w, *_ in p.get_text("words"):
            if x0 < off + 12 * MM or x1 > p.rect.width - off - 12 * MM or y0 < off + 6 * MM or y1 > p.rect.height - off - 6 * MM:
                r["issues"].append(f"p{n}: text '{w}' within 12mm side / 6mm top-bottom of trim edge")
                break
        for l in p.get_links():
            if l.get("uri"):
                links.append((n, l["uri"]))
        for f in p.get_fonts():
            fonts[f[3]] = {"type": f[2], "embedded": f[1] != "n/a"}
        for im in p.get_image_info(xrefs=True):
            b = pymupdf.Rect(im["bbox"])
            if b.width < 1 or b.height < 1:
                continue
            w_in, h_in = b.width / 72, b.height / 72
            ppi = min(im["width"] / w_in, im["height"] / h_in)
            ppi_rows.append({"page": n, "px": f'{im["width"]}x{im["height"]}', "placed_mm": f"{b.width/MM:.0f}x{b.height/MM:.0f}", "ppi": round(ppi)})
    if len(set(hashes)) != len(hashes):
        r["issues"].append("duplicate page text detected")
    alltext = "\n".join(texts)
    r["banned_terms_found"] = sorted(set(m.group(0) for m in BANNED.finditer(alltext)))
    flat = re.sub(r"\s+", " ", alltext)
    r["products_missing_from_text"] = [pid for pid in PRODUCTS if NAME[pid].split(" (")[0] not in flat]
    r["links"] = sorted(set(u for _, u in links))
    r["fonts"] = fonts
    # QR decode on page 16
    pix = d[15].get_pixmap(dpi=200)
    arr = np.frombuffer(pix.samples, dtype=np.uint8).reshape(pix.height, pix.width, pix.n)
    img = cv2.cvtColor(arr, cv2.COLOR_RGB2BGR) if pix.n == 3 else cv2.cvtColor(arr, cv2.COLOR_RGBA2BGR)
    val, _, _ = cv2.QRCodeDetector().detectAndDecode(img)
    r["qr_decoded"] = val
    if val != BRAND["qr_target"]:
        r["issues"].append(f"QR decode mismatch: {val!r}")
    low = [x for x in ppi_rows if x["ppi"] < 150]
    r["images_total"] = len(ppi_rows)
    r["images_below_150ppi"] = len(low)
    r["ppi_min"] = min(x["ppi"] for x in ppi_rows) if ppi_rows else None
    r["ppi_rows"] = ppi_rows
    r["toc"] = d.get_toc()
    res[mode] = r
(ROOT / "build" / "qa.json").write_text(json.dumps(res, indent=1, default=str), encoding="utf-8")
for m, r in res.items():
    print(f"== {m}: {r['pages']} pages, {r['bytes']/1e6:.1f} MB, issues={len(r['issues'])}, banned={r['banned_terms_found']}, missing_products={r['products_missing_from_text']}")
    print("   QR:", r["qr_decoded"], "| links:", r["links"])
    print("   fonts:", r["fonts"])
    print("   low-ppi:", [(x["page"], x["px"], x["placed_mm"], x["ppi"]) for x in r["ppi_rows"] if x["ppi"] < 150])
    import collections
    print("   ppi buckets:", dict(collections.Counter((x["ppi"]//50)*50 for x in r["ppi_rows"])))
    print("   images:", r["images_total"], "min ppi:", r["ppi_min"], "below150:", r["images_below_150ppi"])
    for i in r["issues"][:25]: print("   !", i)
