//#region global functions(tools)

/**
 * minifies document.querySelector
 * 
 * @param {string} x element selector.
 *
 * @return {Element?} element.
 */
function $(x) {
    if (x == undefined) return null;
    return document.querySelector(x);
}

/**
 * minifies document.querySelectorAll
 * 
 * @param {object} obj xhr parameters as an object.
 *
 * @return {Element[]} stringified parameters.
 */
function $$(x) {
    if (x == undefined) return [];
    return document.querySelectorAll(x);
}

/**
 * Remove an item from array
 * 
 * @param {object} array
 * @param {object} item the item to remove from array
 *
 * @return {void}
 */
function array_remove(array, item) {
    if (!array || typeof array != "object") return;
    var index = array.indexOf(item);
    if (index !== -1) {
        array.splice(index, 1);
    }
}

/**
 * Stringifies object with ';' delimiter.
 * 
 * converts {data_1: "d1", data_2:"d2"} to "data_1:d1;data_2:d2".
 *
 * @param {object} obj xhr parameters as an object.
 *
 * @return {string} stringified parameters.
 */
function object_to_param_string(obj) {
    if (typeof obj == "string") return obj;
    return Object.keys(obj).reduce(function (str, key, i) {
        var delimiter, val;
        delimiter = (i === 0) ? '' : scope.sep;
        key = (key);
        if (obj[key] == undefined || obj[key] == null) {
            val = '';
        } else if (typeof obj[key] == "object") {
            val = (JSON.stringify(obj[key]));
        } else {
            val = (obj[key]);
        }
        return [str, delimiter, key, ':', val].join('');
    }, '');
}

/**
 * Wraps xhr parameters in custom packet.
 * 
 * All xhr parameters will be wrap as follow:
 * object->stringify->utf8_encode->to_base64->encrypt->to_base64
 *
 * @param {object} d parameters object.
 *
 * @return {string} server readable encrypted parameters.
 */
function params_to(d) {
    if (!d) return "";
    d = object_to_param_string(d);
    d = utf8_encode(d);
    d = btoa(d);
    d = btoa(crypt(d));
    d = scope.self.id + scope.sep + d;
    return d;
}

/**
 * Unwraps received data from server
 * 
 * Received data from xhr will unwrap as follow:
 * from_base64->decrypt->from_base64->utf8_decode
 *
 * @param {string} d encrypted data from server.
 *
 * @return {string} plain stringified data
 */
function params_from(d) {
    if (!d) return "";
    d = utf8_decode(atob(crypt(atob(d))));
    return d;
}

/**
 * Wraps xhr parameters in custom packet for unauthenticated requests.
 * 
 * All xhr parameters will be wrap as follow:
 * utf8_encode->to_base64->encrypt->to_base64
 *
 * @param {string} d plain stringified parameters.
 *
 * @return {string} server readable encrypted parameters.
 */
function params_to_unauthed(d) {
    if (!d) return "";
    d = btoa(crypt(utf8_encode(d)));
    return d;
}

/**
 * Unwraps received data from server for unauthenticated requests.
 * 
 * Received data from xhr will unwrap as follow:
 * from_base64->decrypt->from_base64->utf8_decode
 *
 * @param {string} d encrypted data from server.
 *
 * @return {string} plain stringified data
 */
function params_from_unauthed(d) {
    if (!d) return "";
    d = utf8_decode(atob(crypt(atob(d))));
    return d;
}

/**
 * Removes any character other than digits from number
 * 
 * For example converts 132,154 to 132154
 *
 * @param {number|string} dirty_num number with non digit characters
 *
 * @return {number} raw number
 */
function dirty_num_to_num(dirty_num) {
    //
    var str_ = "";
    dirty_num = dirty_num.toString();
    for (var i = 0; i < dirty_num.length; i++) {
        dirty_num = dirty_num.replace(" ", "");
        if (dirty_num[i] == '.' || !isNaN(dirty_num[i])) str_ += dirty_num[i];
    }
    if (str_ == "") return "";
    return Number(str_);
}

/**
 * String utf8 encode. 
 *
 * @param {string} s any string
 *
 * @return {string} utf8 encoded string
 */
function utf8_encode(s) {
    return unescape(encodeURIComponent(s));
}

/**
 * String utf8 decode 
 *
 * @param {string} s any string
 *
 * @return {string} utf8 decoded string
 */
function utf8_decode(s) {
    return decodeURIComponent(escape(s));
}

/**
 * Shows loading for a specific section, or the whole page.
 * 
 * If key parameter be exist, then the little loading shows in front of section name in sidebar.
 * else main loading will be shown.
 * this function only adds/removes class to/from elements.
 *
 * @param {boolean} shows true to shows and false to hide loading
 * @param {string} key section key
 *
 * @return {void}
 */
function loading(show, key) {
    if (key != undefined && $("#loading_" + key)) {
        if (show == false) {
            $("#loading_" + key).classList.remove("true");
            return;
        }
        $("#loading_" + key).classList.add("true");
        return;
    }
    if (show == false) {
        $("#loading").classList.add("none");
        $("#loading").classList.remove("trans");
        return;
    }
    $("#loading").classList.add("trans");
    $("#loading").classList.remove("none");
}

/**
 * Shows a toast message
 *
 * @param {string} msg shows in toast body
 * @param {number} type colorize toast for different type of messages
 * -1 is danger
 * 0 is warning or neutral
 * 1 is sucess
 *
 * @return {void} shows a toast in page
 */
function toast(msg, type = 0) {
    // clone node and set message
    clearTimeout(toast_timeout);
    var toast = $(".toast").cloneNode(true);
    toast.classList.remove("success");
    toast.classList.remove("error");
    if(type == 1) toast.classList.add("success");
    else if(type == -1) toast.classList.add("error");
    toast.querySelector(".toast_msg").innerText = msg;
    toast.querySelector(".close").addEventListener("click", toast_close);
    // append to document, then set top and right
    document.body.appendChild(toast);
    setTimeout(function () {
        var w = toast.getBoundingClientRect().width;
        toast.style.right = "calc(" + toast_right_true + "% - " + (w/2) + "px)";
        toast.style.top = (_toast_h) + "em";
    }, 100);

    // calculate next toast top
    var h = toast.getBoundingClientRect().height / 16; //in em
    var _toast_h = toast_top;
    toast_top += (h + 1);
    // 
    setTimeout(function () {
        toast.style.right = toast_right_default + "em";
    }, 6000);
    setTimeout(function () {
        document.body.removeChild(toast);
        if (_toast_h < toast_top) toast_top = _toast_h;
    }, 7000);
    toast_timeout = setTimeout(function () {
        toast_top = toast_top_default;
    }, 8000);
}

/**
 * Closes a toast message.
 *
 * @param {Number} toast_right_default from global var.
 *
 * @return {void} closes a toast in page
 */
function toast_close() {
    this.parentElement.style.right = toast_right_default + "em";
}

/**
 * Adds a 0 before string with lenght of 1 to make sure that minimum lenght of string is 2
 *
 * @param {string} str input string, should be numeral
 *
 * @return {string} str with at least 2 digit length
 */
function min2(str) { //
    if (str == undefined || str == null) return "";
    try {
        str = str.toString();
    } catch (x) {
        return "";
    }
    if (str.length == 1) return +"0" + str;
    return str;
}

/**
 * Creates fetch parameter from form parameters and http headers
 *
 * @param {string} str input string, should be numeral
 *
 * @return {string} str with at least 2 digit length
 */
function fetchd(data) {
    let f = {
        method: "POST",
    };
    if (data && data != "") f.body = object_to_param_string(data);
    return f;
}

async function fetch_(url, d) {
    var res = await fetch(url, d);
    res = await res.text();
    return res;
}

/**
 * Removes last part of url to get base part of url;
 * For example converts a/b/c/d/ to a/b/c/ (removes d/)
 *
 * @param {string} str input string, should be numeral
 *
 * @return {string} base part of url
 */
function path_base(str) {
    let ret = '';
    var d = str.split("/");
    for (var i = 0; i < d.length - 1; i++)
        ret += d[i] + '/';
    return ret;
}

/**
 * This is where everything binds between html and js
 * 
 * section and scope to bind data
 * 
 * ev to bind events
 *
 * @return {void} 
 */
function rvbind() {
    rivets.bind(document, {
        scope: scope,
        ev: ev,
        sections: sections
    });
}

/**
 * Inserts new_substr at start index of str
 *
 * @param {string} str
 * @param {number} start
 * @param {string} new_substr
 *
 * @return {string} base part of url
 */
function splice(str, start, new_substr) {
    return str.slice(0, start) + new_substr + str.slice(start);
}

/**
 * Embed key(from scope) in a str
 *
 * @param {string} str
 *
 * @return {string} base part of url
 */
function key_embed(str) {
    if (str == undefined || typeof str != "string" || str == "" || str.length < 25) {
        console.log("invalid data in embed key");
        return;
    }
    var res = str;
    res = splice(res, 6, scope.self.key[0]);
    res = splice(res, 8, scope.self.key[1]);
    res = splice(res, 9, scope.self.key[2]);
    res = splice(res, 11, scope.self.key[3]);
    res = splice(res, 15, scope.self.key[4]);
    res = splice(res, 17, scope.self.key[5]);
    res = splice(res, 19, scope.self.key[6]);
    res = splice(res, 25, scope.self.key[7]);
    return res;
}

/**
 * Encrypts a string with global key
 * 
 * param key from scope var
 *
 * @param {string} data
 *
 * @return {string} base part of url
 */
function crypt(data) {
    if (data == null) {
        console.log("data == null");
        return null;
    }
    if (scope.self.key == undefined) {
        console.log("user hasn't key...");
        return null;
    }
    if (typeof data != "string") {
        console.log("typeof data != string, ");
        return null;
    }
    if (data == "") return "";
    var enc = "";
    for (var i = 0; i < data.length; i++) {
        enc += String.fromCharCode(data.charCodeAt(i) ^ scope.self.key.charCodeAt(i % scope.self.key.length));
    }
    return enc;
}

/**
 * Creates array of number(pages) for each section
 * based on skip and take. for example returns 2,3,4,5 or 1,2,3.
 * 
 * Maximum count of pages is 5, so if pages be between 1 and n
 * then only the 5 page numbers will be return and page number 1 and
 * page number n, will be static in the html page (1...array...n).
 * Uses paginate_after_need and paginate_before_need functions.
 *
 * @param {string} key section key
 *
 * @return {number[]} array of number, contains pagination numbers
 */
function paginiation(key) {
    if (typeof key == "object")
        key = this.dataset.key;
    // console.log("rows_total: " + scope[key].rows_total);
    var n = parseInt((scope[key].rows_total - 1) / scope.preference_clients.take) + 1;
    if (isNaN(n)) return;
    scope[key].pages = [];
    scope[key].page = Number(scope[key].page);
    if (scope[key].page > n) {
        scope[key].page = 1;
    }

    if (scope[key].page > 3 && !paginate_before_need(n, scope[key].page))
        scope[key].pages.push(scope[key].page - 3);
    if (scope[key].page > 2 && ((paginate_before_need(n, scope[key].page) && scope[key].page - 2 != 1) || !paginate_before_need(n, scope[key].page)))
        scope[key].pages.push(scope[key].page - 2);
    if (scope[key].page > 1 && ((paginate_before_need(n, scope[key].page) && scope[key].page - 1 != 1) || !paginate_before_need(n, scope[key].page)))
        scope[key].pages.push(scope[key].page - 1);

    scope[key].pages.push(scope[key].page);

    if (scope[key].page <= n - 1 && ((paginate_after_need(n, scope[key].page) && scope[key].page + 1 != n) || !paginate_after_need(n, scope[key].page)))
        scope[key].pages.push(scope[key].page + 1);
    if (scope[key].page <= n - 2 && ((paginate_after_need(n, scope[key].page) && scope[key].page + 2 != n) || !paginate_after_need(n, scope[key].page)))
        scope[key].pages.push(scope[key].page + 2);
    if (scope[key].page < n - 3 && !paginate_after_need(n, scope[key].page))
        scope[key].pages.push(scope[key].page + 3);

    scope[key].page_count = n;
    return scope[key].pages;
}

/**
 * Checks if needed to add a page before current page of pagination or not.
 *
 * @param {number} n number of pages
 * @param {number} scope_page current page number of paginitaion
 *
 * @return {boolean} true/false
 */
function paginate_after_need(n, scope_page) {
    if (n > 3 && scope_page <= n - 2)
        return true;
    return false;
}

/**
 * Checks if needed to add a page after current page of pagination or not.
 *
 * @param {number} n number of pages
 * @param {number} scope_page current page number of paginitaion
 *
 * @return {boolean} true/false
 */
function paginate_before_need(n, scope_page) {
    if (n > 3 && scope_page > 2)
        return true;
    return false;
}

/**
 * Binds section data to charts, basically generate charts
 * currently support 2 type of charts, line and pie
 *
 * @param {string} key section key
 *
 * @return {void} 
 */
function bind_charts(key) {
    Chart.defaults.global.defaultFontFamily = 'Rubik';
    for (var i = 0; i < scope[key].sections.length; i++)
        if (scope[key].sections[i] && scope[key].sections[i].type == 'chart') {
            var prop = scope[key].sections[i];
            if (scope[key].sections[i].mode == 'line') {
                ev.set_chart_line('#' + prop.key + ' .canvash canvas', prop.name, prop.data);
            }
            if (scope[key].sections[i].mode == 'pie') {
                ev.set_chart_pie('#' + prop.key + ' .canvash canvas', prop.name, prop.data, true);
            }
        }
}

/**
 * Reads file bytes as data url (async)
 *
 * @param {File} file
 *
 * @return {string} base64 string data file 
 */
async function file_to_base64(file) {
    return new Promise(resolve => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function () {
            resolve(reader.result);
        }
        reader.onerror = function (error) {
            resolve(error);
        }
    });
}

/**
 * @typedef {Object} file_result
 * @property {string} title name of file
 * @property {string} src data url of file
 * @property {string} type type of file
 */
/**
 * Reads files data, name and type(async).
 * 
 * If multiple be true, reads all files
 * else reads the first file.
 *
 * @param {File[]} files
 * @param {bool[]} multiple
 *
 * @return {file_result[]} base64 string data file 
 */
async function get_uploaded_files(files, multiple = false) {
    let res;
    if (multiple) {
        res = [];
        for (let i = 0; i < files.length; i++) {
            let res_i = await file_to_base64(files[i]);
            res.push({
                title: files[i].name,
                src: res_i,
                file_type: files[0].type
            });
        }
    } else {
        res = await file_to_base64(files[0]);
        res = {
            title: files[0].name,
            src: res,
            file_type: files[0].type
        };
    }
    return res;
}

/**
 * Checks value is undefined or not
 *
 * @param {Object} x
 *
 * @return {boolean} true/false 
 */
function _true(x) {
    var ret = x !== undefined;
    return ret;
}

/**
 * Checks value is true or checked
 *
 * @param {Object} val
 *
 * @return {boolean} true/false 
 */
function chk_val(val) {
    if (val.toString() == 'true' || val.toString() == 'True' || val.toString() == 'checked')
        return true;
    return false;
}

/**
 * Checks value is exist in array or not
 *
 * @param {any} x
 * @param {any[]} arr
 *
 * @return {boolean} true/false 
 */
function is_in(x, arr) {
    for (var i = 0; i < arr.length; i++)
        if (x == arr[i])
            return true;
    return false;
}

/**
 * Validates email with regex
 *
 * @param {string} email
 *
 * @return {boolean} true/false 
 */
function validate_email(email) {
    if (!email) return false;
    var reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return reg.test(String(email).toLowerCase());
}

/**
 * Validates password by checking minimum length
 *
 * @param {string} password
 *
 * @return {boolean} true/false 
 */
function validate_password(password) {
    if (!password) return false;
    return password.length >= 6;
}

/**
 * Validates password with regex
 *
 * @param {string} phone
 *
 * @return {boolean} true/false 
 */
function validate_phone(phone) {
    if (!phone) return false;
    var reg = /^\d+$/;
    return reg.test(String(phone).toLowerCase());
}
//#endregion

//#region handlers
/**
 * Clears local storage and redirect.
 * 
 * @return {void} redirects to login page
 */
function logout() {
    // return;
    localStorage.removeItem("user");
    localStorage.removeItem("do");
    window.location.href = "login";
}

/**
 * Sends login form on pressing enter
 *
 * @param {object} obj xhr parameters as an object.
 *
 * @return {string} stringified parameters.
 */
function keyup_handle(e) {
    if (e.keyCode == 13) { //enter
        if ($("#login_form") && scope.login_section) {
            ev.login();
            return;
        }
    }
}

/**
 * Hides all autocomplete elements on clicking anywhere except autocomplete elements.
 * 
 * Autocomplete element should contains these dataset:
 * 
 * @param {string} key section key from dataset
 * @param {string} prop section property name from dataset
 * @param {string} prop2 autocomplete property name from dataset
 * @param {string} prop_i autocomplete property index from dataset
 *
 *
 * @return {void} 
 */
function autocomplete_hide() {
    window.addEventListener("click", function (e) {
        if (e.target.dataset.hasOwnProperty("auto_key")) return;
        if (e.target.classList.contains("autoc")) return;
        $$(".autocomplete").forEach(ac => {
            if (scope[ac.dataset.key] && scope[ac.dataset.key][ac.dataset.prop] &&
                ac.dataset.prop2 && ac.dataset.prop_i &&
                scope[ac.dataset.key][ac.dataset.prop][ac.dataset.prop_i] &&
                scope[ac.dataset.key][ac.dataset.prop][ac.dataset.prop_i][ac.dataset.prop2] &&
                scope[ac.dataset.key][ac.dataset.prop][ac.dataset.prop_i][ac.dataset.prop2].length > 0) {
                ac.parentElement.querySelector("input").classList.remove("autoc_active");
                scope[ac.dataset.key][ac.dataset.prop][ac.dataset.prop_i][ac.dataset.prop2] = [];
            }
        });
    });
}

/**
 * Sends a ping to the server to confirm current credential. 
 * 
 * On failure, logout.
 * 
 * Else updates self object, sets theme and direction.
 *
 * @return {void} 
 */
async function ping(i = 0) {
    // pre
    var d = {
        token: scope.self.token,
        action: "self",
        section: "dashboard",
    };
    d = params_to(d);

    // do
    try {
        d = await fetch_(scope.url.server + "xhr", fetchd(d));
    } catch (ex) {
        if (i >= 3) {
            console.log("ping failed: " + x.message);
            toast("ping failed: " + x.message);
            logout();
        }
        setTimeout(function () {
            ping(i + 1);
        }, (i + 1) * 1000);
    }

    // post
    if (!d || d == "") {
        console.log("In ping, fail to connect!");
        toast("In ping, fail to connect!");
        logout();
    }
    if (typeof d == "object") {
        toast(d.str);
        console.log("In ping, bad data!");
        logout();
        return;
    }
    d = params_from(d);
    d = JSON.parse(d);
    if (d.code == "200") {
        if (typeof d.data == "string") d.data = JSON.parse(d.data);
        var k = scope.self.key;
        var t = scope.self.token;
        scope.self = d.data;
        scope.self.key = k;
        scope.self.token = t;
        localStorage.setItem("user", crypt(JSON.stringify(scope.self)));
        //
        document.body.classList.remove('dark');
        document.body.classList.remove('light');
        document.body.classList.add(scope.self.theme);
        document.body.classList.add(scope.self.language_.direction);
        window.setTimeout(function () {
            $(".body_inner").classList.add('true');
        }, 500);
        //
    } else {
        toast(d.str);
        console.log("In ping, code is not 200");
        logout();
    }
}

/**
 * Setups index page 
 *
 * @return {void} 
 */
async function index_init() {
    await ping();
    loading(true);
    ev.get_preference_client();
    ev.get("notifications");
    $("#main").addEventListener("click", function (e) {
        ev.top_popup_hide(e);
        ev.filter_hide(e);
        if (e.target.dataset.hasOwnProperty("auto_key")) return;
        $$(".autocomplete").forEach(ac => {
            if (scope[ac.dataset.key] && scope[ac.dataset.key].auto_show) {
                ac.classList.remove("true");
                scope[ac.dataset.key].auto_show = false;
            }
        });
    });
    $('._item_section_').click();
    if($('._item_section_.wtrue_wf') == null){
        $('._item_section_').click();
    } else {
        $('._item_section_.wtrue_wf').click();
    }
    loading(false);
}

/**
 * In index page, gets self from local storage and check is it valid or not.
 * 
 * In login page, gets register obj to load last register state.
 *
 * @return {void} in index, if self doesn't exist or be corrupted, then it will logout user
 */
function self_init() {
    var is_login = window.location.href.indexOf('login') != -1;
    var _do = localStorage.getItem("do");
    if (_do == null || _do == "null" || _do == "") {
        if (!is_login) {
            console.log("In self_init, not authed!");
            logout();
        }
        return;
    }
    scope.self.key = atob(_do);
    var self = localStorage.getItem("user");
    if (self == null || self == "null" || self == "") {
        if (!is_login) {
            console.log("In self_init, not authed!");
            logout();
        }
        return;
    }
    try {
        scope.self = JSON.parse(crypt(self));
    } catch (e) {
        if (!is_login) {
            console.log("In self_init, not authed!");
            logout();
        }
        return;
    }
    if (self == null || self == "null" || self == "") {
        if (!is_login) {
            console.log("In self_init, not authed!");
            logout();
        }
        return;
    }
    if (is_login) {
        let register = localStorage.getItem("register");
        if (register == null || register == "null" || register == "") {
            return;
        }
        try {
            scope.register = JSON.parse(crypt(register));
        } catch (e) { }
    }
}

/**
 * Gets preferences, languages, modules and schema from server
 * 
 * @return {void}
 */
async function consts_init() {
    if (!scope.self || !scope.self.token)
        return;

    //get preferences
    const res_pref = await fetch(scope.url.server + "pref", fetchd(params_to({
        token: scope.self.token
    })));
    const txt_pref = await res_pref.text();
    scope.pref = JSON.parse(utf8_decode(atob(txt_pref)));
    $('title').innerText = scope.pref.app_name;

    //get language dictionary
    const res_dic = await fetch(scope.url.server + "dic", fetchd(params_to({
        token: scope.self.token
    })));
    const txt_dic = await res_dic.text();
    scope.dic = JSON.parse(utf8_decode(atob(txt_dic)));

    //check logged in or not
    if (window.location.href.indexOf('login') != -1) { //is login
        return new Promise(resolve => {
            resolve('resolved');
        });
    }

    //get modules
    const res_modules = await fetch(scope.url.server + "modules", fetchd(params_to({
        token: scope.self.token
    })));
    const txt_modules = await res_modules.text();
    scope.modules_top = JSON.parse(utf8_decode(atob(txt_modules)));
    if (scope.modules_top.length != 0) {
        scope.url.server = scope.modules_top[0].addr;
        scope.logo = scope.modules_top[0].logo;
        if (scope.url.server[scope.url.server.length - 1] != '/')
            scope.url.server += "/";
    }

    //get schema
    const res_schema = await fetch(scope.url.server + "schema", fetchd(params_to({
        token: scope.self.token
    })));
    const d = await res_schema.text();
    return new Promise(resolve => {
        //
        var consts_ = JSON.parse(utf8_decode(atob(d)));
        if (consts_.length == 0) {
            console.log("In consts_init, bad data!");
            return logout();
        }
        //
        for (var i = 0; i < consts_.length; i++) {
            //console.log(consts_[i].key);
            if (!consts_[i].key)
                continue;
            scope[consts_[i].key] = {};
            if (!ev[consts_[i].key]) ev[consts_[i].key] = {};
            scope[consts_[i].key].key = consts_[i].key.toString();
            scope[consts_[i].key].name = consts_[i].name.toString();
            scope[consts_[i].key].data = [];
            scope[consts_[i].key].data_ = {};
            scope[consts_[i].key].errors = [];
            scope[consts_[i].key].rows_total = 0;
            scope[consts_[i].key].page_count = 0;
            scope[consts_[i].key].pages = [];
            scope[consts_[i].key].page = 1;
            scope[consts_[i].key].s = "";
            scope[consts_[i].key].c = 0;
            var singleton = consts_[i].key.slice(0, consts_[i].key.length - 1).toString();
            scope[consts_[i].key].form_id = "#form_" + consts_[i].key;
            singleton = singleton.toUpperCase();
            scope[consts_[i].key].form_header = consts_[i].form_header;
            scope[consts_[i].key].modal_selector = "#modal_" + [consts_[i].key];
            scope[consts_[i].key].list_action = consts_[i].list_action;
            scope[consts_[i].key].tab = "base";
            scope[consts_[i].key].schema = "schema";
            scope[consts_[i].key].objs = [];
            //
            var keys = Object.keys(consts_[i]);
            for (var j = 0; j < keys.length; j++) {
                scope[consts_[i].key][keys[j]] = consts_[i][keys[j]];
                if (scope[consts_[i].key].wrap && scope[consts_[i].key].wrap != 'wrapper')
                    scope[consts_[i].key].wrap_true = true;
            }
            scope[consts_[i].key].date_from = consts_[i].date_from;
            scope[consts_[i].key].date_to = consts_[i].date_to;
            //
            scope[consts_[i].key].objs = [];
            scope[consts_[i].key].tabs = [];
            //
            sections.push(scope[consts_[i].key]);
        }
        //
        for (var i = 0; i < consts_.length; i++) {
            var section = consts_[i];
            if (!section)
                continue;
            //
            if (section.rel)
                if ((section.rel && scope[section.rel])) {
                    if (section.mode == 'embed')
                        scope[section.rel].objs.push(section);
                    else if (section.mode == 'tab')
                        scope[section.rel].tabs.push(section);
                }
        }
        // for (var i = 0; i < consts_.length; i++)
        //     console.log(consts_[i].key);
        //
        resolve('resolved');
    });
}

/**
 * Initialize the app
 * 
 * Calls proper functions according to user state(logged in or not)
 * 
 * @return {void}
 */
async function init() {
    rvbind();
    if (location.href.indexOf('offer') != -1) {
        loading(true);
        await ev.vendor_offer_get_url();
        await ev.vendor_offer_get();
        loading(false);
        $(".body_inner").classList.add('true');
        return;
    } else if(location.href.indexOf('login') != -1) {
        var url = new URL(window.location);
        ev.get_packages();
        scope.forgot.secret = url.searchParams.get("secret");
        if(scope.forgot.secret && scope.forgot.secret != ""){
            scope.forgot.name = url.searchParams.get("name");
            ev.login_section_change(4);
        }
        let section = url.searchParams.get("s");
        if(section && section == "r"){
            scope.login_section = 2;
        }
    }
    try {
        self_init();
        await consts_init();
    } catch (ex) {
        console.log("in init, logout");
        console.log(ex);
        logout();
    }
    if (location.href.indexOf('login') == -1 && location.href.indexOf('offer') == -1) { //is index
        index_init();
    }
    loading(false);
    //
    // var inputs = $$("input");
    // for (var i = 0; i < inputs.length; i++) {
    //     inputs[i].addEventListener("keyup", ev.keyup);
    // }
}

async function main() {
    fetch(window.location.origin + path_base(window.location.pathname) + "/srv.json").then(function (res) {
        return res.json();
    }).then(function (resp) {
        scope.url.server = resp.root;
        //
        init();
    }).catch(err => {
        console.log(err);
    });
    document.addEventListener("keyup", keyup_handle);
    autocomplete_hide();
    img_def = $("#img_def") ? $("#img_def").src : "";
}

//this is where everything start
document.addEventListener("DOMContentLoaded", main);

//#endregion