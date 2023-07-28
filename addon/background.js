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
      chrome.windows.create({
        url: chrome.runtime.getURL("popup.html"),
        type: "popup",
        width: 400,
        height: 300
      });
    });
  }
});
