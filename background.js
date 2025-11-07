chrome.runtime.onMessage.addListener(async (request, sender, sendResponse) => {
  if (request.type === "NEW_COPY") {
    chrome.runtime.sendMessage({ type: "NEW_COPY", text: copiedText }); //publish the event to other extension parts
  }
});