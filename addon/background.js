chrome.runtime.onInstalled.addListener(function() {
  chrome.contextMenus.create({
    id: "sendToNota",
    title: "Send to Nota",
    contexts: ["selection"]
  });
});

chrome.contextMenus.onClicked.addListener(function(info, tab) {
  if (info.menuItemId === "sendToNota") {
    chrome.storage.local.set({ selectedText: info.selectionText }, function() {
            // Get the URL of the active tab
            const currentUrl = tab.url;

            // Store the current URL in local storage
            chrome.storage.local.set({ currentUrl: currentUrl }, function() {

            chrome.windows.create({
              url: chrome.runtime.getURL("popup.html"),
              type: "popup",
              width: 400,
              height: 300
            });
          });
    });
  }
});

