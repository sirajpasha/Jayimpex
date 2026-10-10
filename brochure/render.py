import pymupdf, sys, pathlib
src, outdir, dpi = sys.argv[1], pathlib.Path(sys.argv[2]), int(sys.argv[3])
outdir.mkdir(parents=True, exist_ok=True)
d = pymupdf.open(src)
for i, p in enumerate(d):
    p.get_pixmap(dpi=dpi).save(outdir / f"p{i+1:02d}.png")
print(d.page_count, d[0].rect, d[0].mediabox)
