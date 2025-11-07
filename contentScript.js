const COPY_HISTORY_LIMIT = 10;
(() => {
  document.addEventListener('copy', async(event) => {
    const selection = document.getSelection();
    const updatedCopyHistory = await updateCopyHistory(selection.toString(), COPY_HISTORY_LIMIT);
    console.log(updatedCopyHistory);
    chrome.runtime.sendMessage({ type: "NEW_COPY", text: copiedText }); //throw event to central background script
  });
})();

