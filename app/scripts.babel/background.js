'use strict';


chrome.runtime.onInstalled.addListener(function (details) {
  console.log('previousVersion', details.previousVersion);
});

chrome.tabs.onUpdated.addListener(function (tabId, status, tab ) {
  if (tab.url.indexOf('https://jira.') == 0) {
    chrome.pageAction.show(tabId);
  }
});
