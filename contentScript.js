const COPY_HISTORY_LIMIT = 10;
(() => {
  document.addEventListener('copy', async(event) => {
    const selection = document.getSelection();
    let selectedText = selection.toString();
    console.log(selectedText);
    selectedText = selectedText.trim();
    if (selectedText === "") {
      return;
    }

    const updatedCopyHistory = await updateCopyHistory(selectedText, COPY_HISTORY_LIMIT);
    chrome.runtime.sendMessage({ type: "NEW_COPY", text: selectedText }); //throw event to central background script
  });
})();

