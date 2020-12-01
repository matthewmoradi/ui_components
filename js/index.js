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
//#endregion

//#region global functions(tools)
function slider_iter(next){
    var slider = document.querySelector("#slider .imgs");
    var items_count = slider.querySelectorAll(".img").length;
    var slider_item = slider.querySelector(".img");
    var box = slider_item.getBoundingClientRect();
    var transform_current = slider.style.transform.replace(/[^\d.-]/g, '');
    if(transform_current == "") transform_current = 0;
    transform_current = parseInt(transform_current);
    let transform_next = next==true?(transform_current - box.width):(transform_current + box.width);
    //hide next button if the current slide is the last
    if(next && Math.abs(transform_next - box.width) >= box.width * items_count){
        document.querySelector("#slider_next").classList.add("none");
    } else {
        document.querySelector("#slider_next").classList.remove("none");
    }
    //hide previous button if the current slide is the first
    if(!next && transform_next + box.width > 0){
        document.querySelector("#slider_prev").classList.add("none");
    } else {
        document.querySelector("#slider_prev").classList.remove("none");
    }
    slider.style.transform = "translateX(" + (transform_next) + "px)";
}

function slider_next(){
    slider_iter(true);
}

function slider_prev(){
    slider_iter(false);
}
//#endregion

//#region handlers
async function main() {
    $("#slider_next").addEventListener("click", slider_next);
    $("#slider_prev").addEventListener("click", slider_prev);
}

document.addEventListener("DOMContentLoaded", main);
//#endregion