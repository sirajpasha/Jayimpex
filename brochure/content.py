"""Brochure content layer: verified facts, curated copy and product-data selection.

Every customer-facing fact must trace to (a) owner-confirmed statements in docs/PRD,
(b) the legacy owner website, or (c) the live catalogue data in src/data/products.ts.
Certifications, HS codes, MOQ, shelf life and prices are deliberately NOT used.
"""
import json, re, pathlib

ROOT = pathlib.Path(__file__).resolve().parent
PRODUCTS = {p["id"]: p for p in json.loads((ROOT / "products.json").read_text(encoding="utf-8"))}

BRAND = {
    "name": "Jay Impex",
    "tagline": "Driven by Excellence in Global Trade",
    "descriptor": "Global Commodity Export & Sourcing",
    "address": ["Marginfree Super Market, 1739, 18th Main Road,", "Anna Nagar West, Chennai – 600040,", "Tamil Nadu, India"],
    "phone": "+91 94440 42275",
    "tel_href": "tel:+919444042275",
    "email": "info@jayimpex.net",
    "web": "www.jayimpex.net",
    "web_href": "https://www.jayimpex.net",
    "qr_target": "https://www.jayimpex.net/contact",
    "hours": "Monday – Saturday, 10:00 AM – 10:00 PM IST",
}

# Products whose numeric specifications were added after the original catalogue
# (not owner-reviewed): only descriptive fields (forms/types) are shown for these.
NEW_IDS = {
    "mustard-seeds", "fenugreek-seeds", "cinnamon-sticks", "cloves", "star-anise", "tamarind",
    "asafoetida", "bay-leaves", "masoor-dal", "rajma", "moth-dal", "horse-gram", "black-chana",
    "parboiled-rice", "ragi-finger-millet", "sesame-seeds", "groundnuts", "jaggery",
}
DESCRIPTIVE = re.compile(r"^(forms?|types?|varieties|variety|form)$", re.I)
EXCLUDE = re.compile(
    r"aflatoxin|sudan|certif|organic|azo|aql|testing|\bfat\b|protein|aroma|sortex|dishwasher|rust|weather|"
    r"biodegrad|eco|cold|transit|irradiat|pre-treat|guarantee|nutrition|preservation|compliance|cooking|"
    r"elongation|damage|chalky|extraneous|acid|mesh|ash|colou?r value|shu|weevil", re.I)

# Short factual descriptors (derived from catalogue data; marketing superlatives removed)
DESC = {
    "deity-1121-steam-basmati": "Extra-long grain steam Basmati rice.",
    "deity-1509-golden-sella-basmati": "Parboiled (sella) Basmati rice with a golden grain.",
    "sugandha-steam-rice": "Aromatic long-grain steam rice.",
    "parboiled-rice": "Long-grain parboiled non-Basmati rice.",
    "salem-turmeric-finger-powder": "Turmeric fingers and powder, sourced from Tamil Nadu.",
    "guntur-red-chilli-whole-powder": "Red chilli, whole and ground. Guntur, Kashmiri and round varieties.",
    "malabar-black-pepper": "Malabar black pepper, whole and ground.",
    "cumin-seeds-jeera": "Cumin seeds (jeera), cleaned and graded.",
    "green-cardamom-bold": "Green cardamom, bold grade, from Kerala.",
    "coriander-seeds-and-powder": "Coriander (dhaniya) seeds and powder.",
    "mustard-seeds": "Black, brown and yellow mustard seeds.",
    "fenugreek-seeds": "Fenugreek (methi) seeds, whole.",
    "cinnamon-sticks": "Cinnamon sticks, broken pieces and powder.",
    "cloves": "Whole dried clove buds (kirambu).",
    "star-anise": "Whole star anise pods.",
    "tamarind": "Tamarind as whole pod, seedless slab or block.",
    "asafoetida": "Asafoetida (hing) as lump and compounded powder.",
    "bay-leaves": "Dried whole bay leaves (tej patta).",
    "toor-dhal-pigeon-peas": "Split pigeon peas (toor dal), unpolished and polished.",
    "green-moong-dhal-whole-split": "Green gram, whole and split.",
    "black-urid-dhal-gota-split": "Urid (black gram): white gota and black split.",
    "channa-dal-bengal-gram": "Split Bengal gram (channa dal).",
    "masoor-dal": "Red lentils, split and whole.",
    "rajma": "Red and speckled kidney beans.",
    "moth-dal": "Moth beans, whole and split.",
    "horse-gram": "Horse gram (kulthi / kollu), whole and split.",
    "black-chana": "Black chickpeas (kala chana), whole and split.",
    "ragi-finger-millet": "Finger millet (ragi), whole grain and flour.",
    "sesame-seeds": "Sesame seeds, hulled and natural.",
    "groundnuts": "Groundnut kernels (peanuts).",
    "fmcg-packaged-provisions": "Packaged groceries and provisions for multi-SKU shipments.",
    "jaggery": "Cane jaggery in cubes, blocks and powder.",
    "seasonal-fresh-fruits": "Indian seasonal fresh fruits: mangoes, pomegranates and bananas.",
    "traditional-indian-sweets": "Traditional Indian sweets and packaged confectionery.",
    "textiles-fabrics-garments": "Cotton fabrics, apparel, home textiles and made-ups, sourced to client specification.",
    "industrial-agro-machinery": "Food processing and agro machinery, sourced to client specification.",
    "stainless-steel-kitchenware": "Stainless steel utensils and commercial cookware.",
    "natural-coir-door-mats": "Coir and rubber door mats and floor coverings.",
}

# Hand-curated fact lines for the six client-sourced categories (claims such as organic status,
# AQL levels, certifications and shelf-life removed).
CURATED = {
    "seasonal-fresh-fruits": [
        ("Varieties", "Banganapalli, Alphonso, Kesar, Totapuri mangoes; Bhagwa pomegranates; Cavendish bananas"),
        ("Sourcing", "Direct from designated orchard belts"),
        ("Season", "Varies by variety – confirm at enquiry"),
    ],
    "traditional-indian-sweets": [
        ("Varieties", "Mysore Pak, Kaju Katli, Motichoor Laddu, Tirunelveli Halwa, Soan Papdi"),
        ("Packing", "Modified Atmosphere Packaging (MAP)"),
        ("Labelling", "Ingredient labelling to destination requirements"),
    ],
    "textiles-fabrics-garments": [
        ("Products", "T-shirts, woven fabrics, bed linen, bath and kitchen towels, made-ups"),
        ("Material", "Cotton and cotton-blend fabrics"),
        ("Weight", "120 – 450 GSM, as specified by the client"),
        ("Customisation", "Private label, embroidery, screen and digital printing"),
        ("Sourcing hubs", "Tirupur, Karur, Coimbatore"),
    ],
    "industrial-agro-machinery": [
        ("Equipment", "Agro processing, grain milling, optical sorting and packaging lines"),
        ("Construction", "Food-grade SS 304 / SS 316 contact surfaces"),
        ("Capacity", "100 – 5,000 kg/hr, configured to requirement"),
        ("Power", "Built to destination voltage and frequency"),
        ("Sourcing hubs", "Coimbatore, Chennai"),
    ],
    "stainless-steel-kitchenware": [
        ("Products", "Cookware, pressure cookers, thalis, bowls, storage canisters, cutlery"),
        ("Steel grade", "AISI 304 (18/8) and AISI 202 / 201"),
        ("Finish", "Mirror polish, satin matt, hammered copper base"),
        ("Sourcing hubs", "Salem, Chennai"),
    ],
    "natural-coir-door-mats": [
        ("Materials", "Natural coconut coir; rubber backing"),
        ("Sizes", "40×60, 45×75, 60×90, 80×120 cm and custom runners"),
        ("Design", "Plain, bleached, printed and embossed motifs"),
        ("Sourcing hubs", "Alleppey, Karur"),
    ],
}

NAME = {
    "deity-1121-steam-basmati": "Deity 1121 Steam Basmati",
    "deity-1509-golden-sella-basmati": "Deity 1509 Golden Sella Basmati",
    "sugandha-steam-rice": "Sugandha Steam Long Grain Rice",
    "parboiled-rice": "Parboiled Rice (Non-Basmati)",
    "salem-turmeric-finger-powder": "Salem Turmeric",
    "guntur-red-chilli-whole-powder": "Guntur Red Chilli",
    "malabar-black-pepper": "Malabar Black Pepper",
    "cumin-seeds-jeera": "Cumin Seeds (Jeera)",
    "green-cardamom-bold": "Green Cardamom",
    "coriander-seeds-and-powder": "Coriander (Dhaniya)",
    "mustard-seeds": "Mustard Seeds",
    "fenugreek-seeds": "Fenugreek (Methi)",
    "cinnamon-sticks": "Cinnamon (Pattai)",
    "cloves": "Cloves (Kirambu)",
    "star-anise": "Star Anise",
    "tamarind": "Tamarind",
    "asafoetida": "Asafoetida (Hing)",
    "bay-leaves": "Bay Leaves (Tej Patta)",
    "toor-dhal-pigeon-peas": "Toor Dal",
    "green-moong-dhal-whole-split": "Green Moong",
    "black-urid-dhal-gota-split": "Urid Dal",
    "channa-dal-bengal-gram": "Channa Dal",
    "masoor-dal": "Masoor Dal",
    "rajma": "Rajma",
    "moth-dal": "Moth Beans",
    "horse-gram": "Horse Gram",
    "black-chana": "Black Chana",
    "ragi-finger-millet": "Ragi (Finger Millet)",
    "sesame-seeds": "Sesame Seeds",
    "groundnuts": "Groundnut Kernels",
    "fmcg-packaged-provisions": "FMCG Provisions",
    "jaggery": "Jaggery",
    "seasonal-fresh-fruits": "Seasonal Fresh Fruits",
    "traditional-indian-sweets": "Traditional Sweets",
    "textiles-fabrics-garments": "Textiles, Fabrics & Garments",
    "industrial-agro-machinery": "Food Processing & Agro Machinery",
    "stainless-steel-kitchenware": "Stainless Steel Utensils & Cookware",
    "natural-coir-door-mats": "Coir & Rubber Door Mats",
}

def tidy_label(l):
    l = re.sub(r"\s*\(.*?\)", "", l)
    l = l.replace("Average Grain Length", "Grain length").replace(" Content", "").replace("Volatile Oil", "Volatile oil")
    l = l.replace("Broken Ratio", "Broken grain").replace("Foreign Matter", "Foreign matter")
    return l.strip()

def tidy_value(v):
    v = re.sub(r"([\d.,]+)\s*(mm|g/L|%)?\s*-\s*([\d.,]+)\s*(mm|g/L|%)", lambda m: f"{m.group(1)}–{m.group(3)}" + (m.group(4) if m.group(4) == "%" else " " + m.group(4)), v)
    return v.replace("8.40 mm Min", "8.40 mm min").replace("Min", "min").replace("Max", "max")

# Allowed (non-claim) specification labels for the original agro products
def facts(pid, limit=4):
    p = PRODUCTS[pid]
    if pid in CURATED:
        return CURATED[pid][:limit]
    out = []
    for s in p["specifications"]:
        lab, val = s["label"], s["value"]
        if pid in NEW_IDS:
            if DESCRIPTIVE.match(lab):
                out.append((tidy_label(lab), tidy_value(val)))
        else:
            if not EXCLUDE.search(lab) and not EXCLUDE.search(val):
                out.append((tidy_label(lab), tidy_value(val)))
    out = [(a, b) for a, b in out if len(b) <= 38]   # keep fact lines short enough for card columns
    return out[:limit]

def origin(pid):
    return PRODUCTS[pid]["origin"]

# Photo credits for Creative Commons images (kept in sync with docs/IMAGE_CREDITS.md)
CREDITS = {
    "parboiled-rice": "Luigi Chiesa, CC BY-SA 3.0",
    "masoor-dal": "Rydia, CC BY-SA 2.5",
    "rajma": "Sanjay Acharya, CC BY-SA 4.0",
    "sesame-seeds": "Sanjay Acharya, CC BY-SA 3.0",
    "groundnuts": "Shark2025, CC BY-SA 4.0",
    "jaggery": "Mangosapiens, CC BY-SA 4.0",
    "ragi-finger-millet": "Sengai Podhuvan, CC BY-SA 3.0",
}
