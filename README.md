# Wayback Machine Page Opener

A small Firefox extension that scans whatever web.archive.org page you're on
and opens every archive snapshot link it finds in new tabs — handy for
quickly checking whether a URL (or a whole batch of them) has actually been
archived.

## What it works on

It looks for links matching the pattern `web.archive.org/web/<timestamp>/<url>`
on the currently open page. This covers pages like:

- URL search / site listing results (e.g. `web.archive.org/web/*/example.com/*`)
- Any page that lists multiple snapshot links in a table or list

Note: the classic single-URL "calendar" view (the one with the colored dots
per day) is rendered as an interactive JS widget rather than plain links, so
it won't have anything to scan until you click into a specific capture. It
works best on list/table-style results pages.

## Install (temporary, for personal use)

1. Open Firefox and go to `about:debugging#/runtime/this-firefox`
2. Click **"Load Temporary Add-on..."**
3. Select the `manifest.json` file in this folder
4. The extension icon will appear in your toolbar

(This load lasts until you restart Firefox — reload it the same way next
session. To make it permanent you'd need to package and sign it via Mozilla's
add-on developer hub, but that's overkill for personal use.)

## How to use it

1. Navigate to a Wayback Machine page listing snapshot links
2. Click the extension icon
3. Click **"Scan this page for links"** — it'll show how many it found
4. Adjust "Max tabs to open" and "Delay between tabs" if you want limits
   (defaults: 50 tabs max, 250ms delay between each, to avoid Firefox choking
   on a huge batch)
5. Click **"Open all found links"** — it'll prompt for confirmation if
   opening more than 15 tabs

## Making it permanent (surviving browser restarts)

Extensions loaded via "Load Temporary Add-on" are wiped when Firefox
restarts. Regular Firefox only keeps *signed* extensions installed
permanently, so to keep this one around:

1. Run `./package.sh` (or zip the files yourself — see below) to produce
   `wayback-opener.zip`
2. Create a free account at https://addons.mozilla.org/developers/
3. Submit the zip under **"Submit a New Add-on"** → choose **"On your own"**
   (self-distribution) if you don't want it listed publicly on AMO
4. Mozilla's automated review signs it and gives you back a `.xpi` file
   (usually within minutes for something this simple)
5. Install the `.xpi` via `about:addons` → gear icon → **"Install Add-on
   From File"** — it will now persist across restarts

Manual zip, if you'd rather not use the script:
```
zip -r wayback-opener.zip manifest.json content.js background.js popup.html popup.js icon.svg
```
Make sure the files are at the root of the zip, not inside a subfolder.

## Files

- `manifest.json` — extension config
- `content.js` — scans the page DOM for archive links
- `background.js` — opens the tabs, one at a time with a delay
- `popup.html` / `popup.js` — the toolbar popup UI
- `icon.svg` — toolbar icon
- `package.sh` — zips the extension for AMO submission
- `LICENSE` — MIT license

## License

MIT — see `LICENSE`.
