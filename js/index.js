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

//#region slider
var pos_start = 0;
var pos_end = 0;
var clicked = false;
var zIndex_max = 10000;
function slider_next(){
    var imgs = slider.querySelectorAll(".img");
    let i = parseInt(this.dataset.i);
    let i_next = (i+1) % imgs.length;
    imgs[i].style.zIndex = zIndex_max;
    imgs[i].classList.add("smooth");
    imgs[i_next].style.zIndex = zIndex_max;
    imgs[i_next].classList.remove("smooth");
    imgs[i_next].style.left = 100 + "%";
    setTimeout(function(){
        imgs[i_next].classList.add("smooth");
        slider_iter(true, i);
    }, 100);
}

function slider_add_smooth(){
    slider.querySelectorAll(".img").forEach(el => {
        el.classList.add("smooth");
    });
}

function slider_remove_smooth(){
    slider.querySelectorAll(".img").forEach(el => {
        el.classList.remove("smooth");
    });
}

function slider_prev(){
    var imgs = slider.querySelectorAll(".img");
    let i = parseInt(this.dataset.i);
    let i_prev = i>0?(i-1):(imgs.length-1);
    imgs[i].style.zIndex = zIndex_max;
    imgs[i].classList.add("smooth");
    imgs[i_prev].style.zIndex = zIndex_max;
    imgs[i_prev].classList.remove("smooth");
    imgs[i_prev].style.left = -100 + "%";
    setTimeout(function(){
        imgs[i_prev].classList.add("smooth");
        slider_iter(false, i);
    }, 100);
}

function slider_iter(next, i){
    var slider = document.querySelector("#slider .imgs");
    var imgs = slider.querySelectorAll(".img");
    if(next) {
        let i_next = (i+1) % imgs.length;
        imgs[i].style.left = -100 + "%";
        imgs[i_next].style.left = "0";
        $("#slider_next").dataset.i = (i+1) % imgs.length;
        $("#slider_prev").dataset.i = (i+1) % imgs.length;
    }
    else {
        let i_prev = i>0?(i-1):(imgs.length-1);
        imgs[i].style.left = 100 + "%";
        imgs[i_prev].style.left = "0";
        $("#slider_next").dataset.i = i>0?(i-1):(imgs.length-1);
        $("#slider_prev").dataset.i = i>0?(i-1):(imgs.length-1);
    }
}

function slider_mousedown(e){
    e.preventDefault();
    pos_start = e.clientX;
    clicked = true;
    slider_remove_smooth();
}

function slider_mousemove(e){
    e.preventDefault();
    e.stopPropagation();
    if(clicked == false) return;
    var imgs = slider.querySelectorAll("#slider .img");
    var x = e.clientX;
    var diffrent = x - pos_start;
    this.style.left = diffrent + "px";
    this.style.zIndex = 1000;
    var width = this.getBoundingClientRect().width;
    //
    var i = parseInt(this.dataset.i);
    var i_next = (i+1) % imgs.length;
    var i_prev = i>0?(i-1):(imgs.length-1);
    if(diffrent >= 0){
        imgs[i_prev].style.left = (-width) + diffrent + "px";
        imgs[i_prev].style.zIndex = zIndex_max;
        imgs[i_prev].classList.remove("smooth");
    } else {
        imgs[i_next].style.left = width + diffrent + "px";
        imgs[i_next].style.zIndex = zIndex_max;
        imgs[i_next].classList.remove("smooth");
    }
}

function slider_mouseup(e){
    e.preventDefault();
    clicked = false;
    slider_add_smooth();
    pos_end = e.clientX;
    if(pos_end > pos_start + 10){
        slider_iter(false, parseInt(this.dataset.i));
    }
    else if(pos_end < pos_start - 10){
        slider_iter(true, parseInt(this.dataset.i));
    }
}

function slider_listeners(){
    var i = 0;
    var imgs = slider.querySelectorAll("#slider .img");
    imgs.forEach(el => {
        el.addEventListener("mousedown", slider_mousedown);
        el.addEventListener("mousemove", slider_mousemove);
        el.addEventListener("mouseup", slider_mouseup);
        el.style.zIndex = -1;
        el.dataset.i = i++;
    });
    imgs[0].style.zIndex = 1;
    $("#slider_next").addEventListener("click", slider_next);
    $("#slider_prev").addEventListener("click", slider_prev);
}
//#endregion

//#region handlers
async function main() {
    slider_listeners();
}

document.addEventListener("DOMContentLoaded", main);
//#endregion