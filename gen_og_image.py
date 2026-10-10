#!/usr/bin/env python3
"""Generate a 1200x630 Open Graph share image for JayImpex (www.jayimpex.net).

Place in the repo root; regenerate with: python3 gen_og_image.py
Uses the repo's own logo (images/JayImpexExporter-logo.png) and the
site's navy/cyan brand tokens from style1.css (#003366 / #0DBAF6).
"""
from PIL import Image, ImageDraw, ImageFont
import os

W, H = 1200, 630
NAVY = (0, 35, 66)          # #002349
DEEP = (0, 51, 102)         # #003366
CYAN = (13, 186, 246)       # #0DBAF6
WHITE = (255, 255, 255)

CANVAS = Image.new("RGB", (W, H), NAVY)
draw = ImageDraw.Draw(CANVAS)

# Soft diagonal sheen (subtle)
for i in range(0, H, 3):
    a = int(70 - (i / H) * 35)
    draw.line([(0, i), (W, i)], fill=(8 + a // 8, 60 + a // 5, 120 + a // 4))

# Cyan accent bar on the left
draw.rectangle([0, 0, 16, H], fill=CYAN)

def load_font(size):
    for p in (
        "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf",
        "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf",
    ):
        if os.path.exists(p):
            return ImageFont.truetype(p, size)
    return ImageFont.load_default()

# Text block (left column only — logo owns the right)
draw.text((90, 105), "JayImpex", font=load_font(92), fill=WHITE)
draw.text((96, 240), "Indian Agro Commodities Exporter", font=load_font(38), fill=CYAN)
draw.text((96, 300), "Basmati rice · spices · pulses · agri exports", font=load_font(27), fill=(215, 230, 242))
draw.line([(96, 470), (640, 470)], fill=DEEP, width=4)
draw.text((96, 492), "www.jayimpex.net  ·  Chennai, India", font=load_font(27), fill=WHITE)

# Logo, framed (white rounded mask), right side, keeps clear of the text column
logo = Image.open("images/JayImpexExporter-logo.png").convert("RGB").resize((330, 330))
mask = Image.new("L", (330, 330), 0)
ImageDraw.Draw(mask).rounded_rectangle([0, 0, 330, 330], radius=36, fill=255)
frame = Image.new("RGB", (356, 356), WHITE)
frm_mask = Image.new("L", (356, 356), 0)
ImageDraw.Draw(frm_mask).rounded_rectangle([0, 0, 356, 356], radius=42, fill=255)
frame.paste(logo, (13, 13), mask)
CANVAS.paste(frame, (850, 240), frm_mask)

# Bottom brand strip
draw.rectangle([0, H - 14, W, H], fill=DEEP)
draw.rectangle([0, H - 20, W, H - 14], fill=CYAN)

out = "images/jayimpex-og.png"
CANVAS.save(out, "PNG", optimize=True)
print(f"wrote {out} {CANVAS.size}")
