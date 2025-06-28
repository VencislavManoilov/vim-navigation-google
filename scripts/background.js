chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "openTab") {
        chrome.windows.getCurrent((window) => {
            chrome.tabs.create({ url: message.url, windowId: window.id });
        });
    }
});
