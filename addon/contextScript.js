chrome.runtime.sendMessage({ action: "createContextMenu" });

chrome.runtime.onMessage.addListener(function (message) {
  if (message.action === "sendToPopup") {
    const selectedText = message.text;
    chrome.runtime.sendMessage({ action: "sendToPopup", text: selectedText });
  }
});
