const COPY_HISTORY_KEY = 'copyHistory';

const fetchCopyHistory = async() => {
  return new Promise((resolve) => {
    chrome.storage.local.get([COPY_HISTORY_KEY], (result) => {
      resolve(result[COPY_HISTORY_KEY] ? result[COPY_HISTORY_KEY] : []);
    })
  });
};

const updateCopyHistory = async(text, copyHistoryLimit) => {
  let copyHistory = await fetchCopyHistory();
  if (copyHistory[0] && copyHistory[0] === text) { // Prevent duplicates
    return copyHistory;
  }
  if (copyHistory.length === 10) {
    copyHistory.splice(copyHistoryLimit - 1, 1);
  }
  copyHistory.unshift(text);    
  await chrome.storage.local.set({ [COPY_HISTORY_KEY]: copyHistory });
  return copyHistory;
};

const deleteCopyHistoryItem = async(index) => {
  let copyHistory = await fetchCopyHistory();
  copyHistory.splice(index, 1);
  await chrome.storage.local.set({ [COPY_HISTORY_KEY]: copyHistory });
  return copyHistory;
}