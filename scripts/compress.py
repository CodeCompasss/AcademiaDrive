#!/usr/bin/env python3
"""Lossless compression for files under public/academiadrive."""
import os
import shutil
import subprocess
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1] / "public" / "academiadrive"


def compress_pdf(src: Path) -> bool:
    tmp = src.with_suffix(".tmp.pdf")
    subprocess.run(
        [
            "gs", "-q", "-sDEVICE=pdfwrite", "-dCompatibilityLevel=1.4",
            "-dNOPAUSE", "-dBATCH", "-dQUIET",
            "-dDownsampleColorImages=false",
            "-dDownsampleGrayImages=false",
            "-dDownsampleMonoImages=false",
            "-dAutoFilterColorImages=false",
            "-dColorImageFilter=/FlateEncode",
            "-dGrayImageFilter=/FlateEncode",
            "-dMonoImageFilter=/FlateEncode",
            f"-sOutputFile={tmp}", str(src),
        ],
        check=True,
    )
    # verify page count unchanged
    try:
        from pypdf import PdfReader
        a = len(PdfReader(str(src)).pages)
        b = len(PdfReader(str(tmp)).pages)
    except Exception:
        a = b = -1
    if a != b or a < 0:
        tmp.unlink(missing_ok=True)
        return False
    if tmp.stat().st_size < src.stat().st_size:
        shutil.move(str(tmp), str(src))
        return True
    tmp.unlink(missing_ok=True)
    return False


def compress_png(src: Path) -> bool:
    from PIL import Image
    tmp = src.with_suffix(".tmp.png")
    with Image.open(src) as im:
        im.save(tmp, optimize=True)
    if tmp.stat().st_size < src.stat().st_size:
        shutil.move(str(tmp), str(src))
        return True
    tmp.unlink(missing_ok=True)
    return False


def main() -> int:
    if not ROOT.is_dir():
        print("academiadrive not found", file=sys.stderr)
        return 1
    saved = 0
    changed = 0
    total = 0
    for src in sorted(ROOT.rglob("*")):
        if not src.is_file():
            continue
        total += 1
        ext = src.suffix.lower()
        before = src.stat().st_size
        ok = False
        if ext == ".pdf":
            ok = compress_pdf(src)
        elif ext == ".png":
            ok = compress_png(src)
        if ok:
            changed += 1
            saved += before - src.stat().st_size
            print(f"compressed {src}: {before} -> {src.stat().st_size}")
        else:
            print(f"skip {src}")
    print(f"done: {changed}/{total} files, saved {saved} bytes")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())