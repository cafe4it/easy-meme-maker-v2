function getClickHandler() {
    return function (info, tab) {
        var imageUrl = encodeURIComponent(info.srcUrl);
        var url = 'index.html?image='+imageUrl;
        // The srcUrl property is only available for image elements.
        //alert(info.srcUrl);
        chrome.tabs.create({ url: url});
    };
};

chrome.contextMenus.create({
    "title": "Make meme with this image",
    "type": "normal",
    "contexts": ["image"],
    "onclick": getClickHandler()
});