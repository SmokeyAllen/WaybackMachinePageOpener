// content.js
// Runs on web.archive.org pages. Scans the DOM for links that point to
// actual archived snapshots (i.e. contain /web/<timestamp>/<original-url>)
// and reports them back to the popup when asked.

function collectWaybackLinks() {
  const anchors = Array.from(document.querySelectorAll("a[href]"));

  const snapshotPattern = /web\.archive\.org\/web\/\d{4,14}[a-z_]*\//i;

  const links = anchors
    .map((a) => a.href)
    .filter((href) => snapshotPattern.test(href));

  // Dedupe while preserving order
  return Array.from(new Set(links));
}

browser.runtime.onMessage.addListener((message) => {
  if (message.action === "scan") {
    return Promise.resolve({ links: collectWaybackLinks() });
  }
});
