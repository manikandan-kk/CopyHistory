(() => {

  const loadCopyHistory = (copyHistory) => {
    const historyContainer = document.getElementById("copy-history-display");
    if (copyHistory.length === 0) {
      historyContainer.innerText = "No copy history available.";
      return;
    }
    historyContainer.innerHTML = "";
    copyHistory.forEach((item, index) => {
      const copyItem = document.createElement("div");
      copyItem.className = "copy-item";
      const pathElement1 = document.createElementNS("http://www.w3.org/2000/svg", "path");
      pathElement1.setAttribute("d", "M5 6c0-1.09.91-2 2-2h4.5L15 7.5V15c0 1.09-.91 2-2 2H7c-1.09 0-2-.91-2-2zm6-1.25V8h3.25z");

      const pathElement2 = document.createElementNS("http://www.w3.org/2000/svg", "path");
      pathElement2.setAttribute("d", "M10 1a2 2 0 0 1 2 2H6a2 2 0 0 0-2 2v9a2 2 0 0 1-2-2V4a3 3 0 0 1 3-3z");
      pathElement2.setAttribute("opacity", ".4");

      const svgElement = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      svgElement.setAttribute("xmlns", "http://www.w3.org/2000/svg");
      svgElement.setAttribute("height", "16");
      svgElement.setAttribute("viewBox", "0 0 20 20");
      svgElement.setAttribute("width", "16");
      svgElement.classList.add("copy-icon");
      svgElement.appendChild(pathElement1);
      svgElement.appendChild(pathElement2);

      svgElement.addEventListener("click", async (e) => {
        await navigator.clipboard.writeText(item);
      });
      copyItem.appendChild(svgElement);

      const textNode = document.createElement("div");
      textNode.className = "copy-text-node";

      const visibleTextNode = document.createElement("div");
      visibleTextNode.className = "copy-text";
      visibleTextNode.textContent = item;
      textNode.appendChild(visibleTextNode);

      const textToolTip = document.createElement("div");
      textToolTip.className = "copy-tooltip";
      if (index >= 6) {
        textToolTip.classList.add("copy-tooltip-blv");
      }
      textNode.appendChild(textToolTip);
      textToolTip.innerText = item;
      console.log(item);

      copyItem.appendChild(textNode);

      const deleteButton = document.createElement("div");
      deleteButton.className = "copy-delete-button";
      deleteButton.innerText = "X";
      deleteButton.addEventListener("click", async (e) => {
        const updatedCopyHistory = await deleteCopyHistoryItem(index);
        loadCopyHistory(updatedCopyHistory);
      });
      copyItem.appendChild(deleteButton);

      historyContainer.appendChild(copyItem);
    });
  }

  const reloadPopup = async () => {
    const copyHistory = await fetchCopyHistory();
    loadCopyHistory(copyHistory);
  };

  const initDarkMode = async () => {
    const isDarkMode = (await fetchSettings())[DARK_MODE_KEY] === DARK;
    if (isDarkMode) {
      document.body.classList.add("darkmode");
    }

    const darkModeButton = document.querySelector(".action-btn-darkmode");
    darkModeButton.addEventListener("click", async () => {
      document.body.classList.toggle("darkmode");
      await updateSettings(DARK_MODE_KEY, (await fetchSettings())[DARK_MODE_KEY] === DARK ? LIGHT : DARK);
    });
  };

  document.addEventListener("DOMContentLoaded", async () => {
    await reloadPopup();
    await initDarkMode();
  });

  chrome.runtime.onMessage.addListener(async (request, sender, sendResponse) => {
    if (request.type === "NEW_COPY") {
      await reloadPopup();
    }
  });

})();