#!/bin/bash
# Packages the extension into a .zip ready to upload to
# https://addons.mozilla.org/developers/ for signing.
#
# Usage: ./package.sh
# Output: wayback-opener.zip in this same folder
#
# Uses Python's built-in zipfile module, so it works even if the `zip`
# command isn't installed on your system.

set -e

OUTPUT="wayback-opener.zip"
rm -f "$OUTPUT"

python3 - <<'EOF'
import zipfile

files = [
    "manifest.json",
    "content.js",
    "background.js",
    "popup.html",
    "popup.js",
    "icon.svg",
]

with zipfile.ZipFile("wayback-opener.zip", "w", zipfile.ZIP_DEFLATED) as z:
    for f in files:
        z.write(f)

print("Created wayback-opener.zip")
EOF

echo "Upload wayback-opener.zip at https://addons.mozilla.org/developers/"
