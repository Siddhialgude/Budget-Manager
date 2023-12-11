/*var contextMenuItem={
  "id":"spendMoney",
  "title":"SpendMoney",
  "contexts":["selection"]
};
chrome.contextMenus.create(contextMenuItem);
function isInt(value)
{
  return !isNaN(value)&&parseInt(Number(value))==value&&!isNaN(parseInt(value,10));
}
chrome.contextMenus.onClicked.addListener(function(clickData){
  if(clickData.menuItemId=="spendMoney"&&clickData.selectionText){
    if(isInt(clickData.selectionText)){
      chrome.storage.sync.get(['total','limit'],function(budget){
        var newtotal=0;
        if(budget.total){
          newtotal+=parseInt(budget.total);
        }
        newtotal+=parseInt(clickData.selectionText);
        chrome.storage.sync.set({'total':newtotal},function(){
          if(newtotal>=budget.limit){
            var notifOptions={
              type:'basic',
              iconUrl:'icon48.png',
              title:'Limit reached',
              message:"You have reached your limit !"
            };
            chrome.notifications.create('limitNotif',notifOptions);
          }
        });
      });
    }
  }
});
chrome.storage.onChanged.addListener(function(changes,storageName){
chrome.browserAction.setBadgeText({"text":changes.total.newValue.toString()});
});*/





// Define the context menu item
var contextMenuItem = {
  "id": "spendMoney",
  "title": "Spend Money",
  "contexts": ["selection"]
};

// Create the context menu item when the extension is installed or updated
chrome.runtime.onInstalled.addListener(function() {
  chrome.contextMenus.create(contextMenuItem, function() {
    if (chrome.runtime.lastError) {
      console.error(chrome.runtime.lastError);
    } else {
      console.log("Context menu item created successfully");
    }
  });
});

// Function to check if a value is an integer
function isInt(value) {
  return !isNaN(value) && parseInt(Number(value)) == value && !isNaN(parseInt(value, 10));
}

// Handle context menu item click
chrome.contextMenus.onClicked.addListener(function(clickData) {
  if (clickData.menuItemId == "spendMoney" && clickData.selectionText) {
    if (isInt(clickData.selectionText)) {
      chrome.storage.sync.get(['total', 'limit'], function(budget) {
        var newtotal = 0;
        if (budget.total) {
          newtotal += parseInt(budget.total);
        }
        newtotal += parseInt(clickData.selectionText);
        chrome.storage.sync.set({'total': newtotal}, function() {
          if (newtotal >= budget.limit) {
            var notifOptions = {
              type: 'basic',
              iconUrl: 'icon48.png',
              title: 'Limit reached',
              message: "You have reached your limit!"
            };
            chrome.notifications.create('limitNotif', notifOptions);
          }
        });
      });
    }
  }
});

// Update badge text when storage changes
/*chrome.storage.onChanged.addListener(function(changes, storageName) {
  if (!chrome.runtime.lastError && chrome.action) {
    console.log("storage changed");
    chrome.action.setBadgeText({"text": changes.total.newValue.toString()});
  }
});*/chrome.storage.onChanged.addListener(function(changes, storageName) {
  if (!chrome.runtime.lastError && chrome.action && changes.total) {
    console.log("storage changed");
    
    // Check if 'newValue' is defined before trying to access it
    if (changes.total.newValue !== undefined) {
      chrome.action.setBadgeText({"text": changes.total.newValue.toString()});
    }
  }
});




