chrome.storage.sync.get(function(data) {
    if (typeof data === "object") {
        var _cache = {},
            el,
            splitted,
            i,
            objKeys;
        objKeys = Object.keys(data);
        for (i=0; i<objKeys.length; i+=1) {
            el = objKeys[i];
            splitted = el.split("&");
            if (splitted.length > 1) {
                _cache[splitted[0]] = _cache[splitted[0]] || {};
                _cache[splitted[0]][splitted[1]] = data[el];
            }
            else {
                _cache[el] = data[el];
            }
        }
        localStorage.clear();
        objKeys = Object.keys(_cache);
        for (i=0; i<objKeys.length; i+=1) {
            el = objKeys[i];
            localStorage.setItem(el, JSON.stringify(_cache[el]));
        }
    }
});

var GM_getValue = function(name, defaultValue) {
    var value = localStorage.getItem(name);
    if (value === null) {
        return defaultValue;
    }
    return value;
};
var GM_setValue = function(name, value) {
    var json_value,
        new_value = {};
    try {
        json_value = JSON.parse(value);
        json_keys = Object.keys(json_value);
        for (var i=0; i<json_keys.length; i+=1) {
            new_value[name+"&"+json_keys[i]] = json_value[json_keys[i]];
        }
    }
    catch (e) {
        new_value = {name: value};
    }
    chrome.storage.sync.set(new_value);
    localStorage.setItem(name, value);
};
var GM_addStyle = function(css) {
    var datuURIs = document.createElement("link");
    document.head = document.head || document.getElementsByTagName('head'[0]);
    datuURIs.href = "data:text/css,"+css;
    datuURIs.rel = "stylesheet";
    document.head.appendChild(datuURIs);
};
var GM_xmlhttpRequest = function() {
};

var unsafeWindow = window;