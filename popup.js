document.addEventListener("DOMContentLoaded", () => {
  const scanBtn = document.getElementById("scanBtn");
  const openBtn = document.getElementById("openBtn");
  const statusEl = document.getElementById("status");
  const maxTabsInput = document.getElementById("maxTabs");
  const delayInput = document.getElementById("delay");

  let foundLinks = [];

  scanBtn.addEventListener("click", async () => {
    statusEl.textContent = "Scanning...";
    openBtn.disabled = true;
    foundLinks = [];

    const [tab] = await browser.tabs.query({ active: true, currentWindow: true });

    if (!tab || !tab.url || !tab.url.includes("web.archive.org")) {
      statusEl.textContent = "Please open a web.archive.org page first, then click Scan.";
      return;
    }

    try {
      const response = await browser.tabs.sendMessage(tab.id, { action: "scan" });
      foundLinks = (response && response.links) || [];

      if (foundLinks.length === 0) {
        statusEl.textContent = "No archive snapshot links found on this page.";
      } else {
        statusEl.textContent = `Found ${foundLinks.length} archive link(s).`;
        openBtn.disabled = false;
      }
    } catch (e) {
      statusEl.textContent = "Couldn't read this page. Try reloading it, then scan again.";
    }
  });

  openBtn.addEventListener("click", async () => {
    const max = parseInt(maxTabsInput.value, 10) || foundLinks.length;
    const delay = parseInt(delayInput.value, 10) || 0;
    const linksToOpen = foundLinks.slice(0, max);

    if (linksToOpen.length > 15) {
      const ok = confirm(`This will open ${linksToOpen.length} new tabs. Continue?`);
      if (!ok) return;
    }

    await browser.runtime.sendMessage({
      action: "openLinks",
      links: linksToOpen,
      delay,
    });

    statusEl.textContent = `Opening ${linksToOpen.length} tab(s)...`;
    setTimeout(() => window.close(), 400);
  });
});
