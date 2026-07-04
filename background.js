// background.js
// Opens a list of URLs as new background tabs, with a small delay between
// each so Firefox doesn't choke if there are a lot of them.

browser.runtime.onMessage.addListener((message) => {
  if (message.action === "openLinks" && Array.isArray(message.links)) {
    openLinksSequentially(message.links, message.delay ?? 250);
  }
});

async function openLinksSequentially(links, delay) {
  for (const url of links) {
    try {
      await browser.tabs.create({ url, active: false });
    } catch (e) {
      console.error("Failed to open tab for", url, e);
    }
    if (delay > 0) {
      await new Promise((resolve) => setTimeout(resolve, delay));
    }
  }
}
