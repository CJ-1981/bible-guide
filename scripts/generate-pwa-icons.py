#!/usr/bin/env python3
"""Generate PWA icons for the Bible Summary Guide app."""
from PIL import Image, ImageDraw, ImageFont
import os

OUTPUT_DIR = "/home/z/my-project/public"

def create_icon(size, output_path):
    """Create a Bible app icon with gradient background and book symbol."""
    img = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)

    # Gradient background (amber to warm brown)
    for y in range(size):
        r = int(180 + (60 * y / size))
        g = int(120 + (20 * y / size))
        b = int(60 + (10 * y / size))
        draw.line([(0, y), (size, y)], fill=(r, g, b, 255))

    # Rounded corners mask
    mask = Image.new("L", (size, size), 0)
    mask_draw = ImageDraw.Draw(mask)
    radius = int(size * 0.18)
    mask_draw.rounded_rectangle([(0, 0), (size, size)], radius=radius, fill=255)
    img.putalpha(mask)

    # Draw book shape
    cx, cy = size // 2, size // 2
    bw = int(size * 0.48)   # book width
    bh = int(size * 0.56)   # book height
    spine_w = int(size * 0.04)

    # Left page (slightly rotated look)
    left_rect = [
        (cx - bw // 2 - spine_w, cy - bh // 2),
        (cx - spine_w // 2, cy + bh // 2)
    ]
    draw.rounded_rectangle(left_rect, radius=int(size*0.03), fill=(255, 248, 230, 240))

    # Right page
    right_rect = [
        (cx + spine_w // 2, cy - bh // 2),
        (cx + bw // 2 + spine_w, cy + bh // 2)
    ]
    draw.rounded_rectangle(right_rect, radius=int(size*0.03), fill=(255, 252, 240, 245))

    # Spine
    draw.rectangle(
        [(cx - spine_w, cy - bh // 2), (cx + spine_w, cy + bh // 2)],
        fill=(139, 90, 43, 230)
    )

    # Cross symbol on the book
    cross_w = max(int(size * 0.04), 2)
    cross_h = int(size * 0.22)
    cross_arm = int(size * 0.13)
    cross_top = cy - int(size * 0.08)

    # Vertical bar
    draw.rectangle(
        [(cx - cross_w // 2, cross_top - cross_h),
         (cx + cross_w // 2, cross_top + cross_h)],
        fill=(139, 0, 0, 220)
    )
    # Horizontal bar
    draw.rectangle(
        [(cx - cross_arm, cross_top - int(cross_h * 0.15)),
         (cx + cross_arm, cross_top + int(cross_h * 0.15))],
        fill=(139, 0, 0, 220)
    )

    # Text lines on pages
    line_color = (160, 130, 90, 80)
    if size >= 128:
        for i in range(4):
            ly = cy - int(size * 0.15) + i * int(size * 0.08)
            # Left page lines
            draw.line(
                [(cx - bw // 2 + int(size*0.06), ly),
                 (cx - spine_w - int(size*0.04), ly)],
                fill=line_color, width=max(1, int(size * 0.012))
            )
            # Right page lines
            draw.line(
                [(cx + spine_w + int(size*0.04), ly),
                 (cx + bw // 2 - int(size*0.06), ly)],
                fill=line_color, width=max(1, int(size * 0.012))
            )

    img.save(output_path, "PNG")
    print(f"  Created: {output_path} ({size}x{size})")

# Generate all required icons
sizes = [
    (192, f"{OUTPUT_DIR}/icon-192.png"),
    (512, f"{OUTPUT_DIR}/icon-512.png"),
    (180, f"{OUTPUT_DIR}/apple-touch-icon.png"),   # iOS
    (152, f"{OUTPUT_DIR}/icon-152.png"),             # iPad
    (120, f"{OUTPUT_DIR}/icon-120.png"),             # iPhone
    (32,  f"{OUTPUT_DIR}/favicon-32.png"),
    (16,  f"{OUTPUT_DIR}/favicon-16.png"),
]

print("Generating PWA icons...")
for size, path in sizes:
    create_icon(size, path)

# Also create favicon.ico (32x32)
favicon = Image.open(f"{OUTPUT_DIR}/favicon-32.png")
favicon.save(f"{OUTPUT_DIR}/favicon.ico", format="ICO", sizes=[(16,16),(32,32)])
print(f"  Created: {OUTPUT_DIR}/favicon.ico")

print("Done! All icons generated.")
