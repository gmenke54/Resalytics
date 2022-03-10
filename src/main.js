/*global chrome*/

export async function readPage() {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: () => {
      console.log('running');
      console.log(window.getSelection().toString());
    }
  });
}
