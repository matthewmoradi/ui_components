//#region login/register

//#region register
/**
 * Checks coworkers email in register step 3.
 * 
 * @param {object} scope.register.coworkers from scope var
 *
 * @return {void} shows proper error in html.
 */
ev.register_check_emails = function () {
    for (let i = 0; i < scope.register.coworkers.length; i++) {
        if (validate_email(scope.register.coworkers[i].email) == false) {
            scope.register.coworkers[i].email_err = true;
            scope.register.coworkers[i].email_err_txt = "Please enter a valid email.";
        } else {
            scope.register.coworkers[i].email_err = false;
            scope.register.coworkers[i].email_err_txt = "";
        }
    }
}

/**
 * Shows proper payment method logo in register step 4.
 * 
 * @param {object} scope.payments from scope var
 *
 * @return {void} shows proper logo in html.
 */
ev.bind_payments = function () {
    let card_number = dirty_num_to_num(this.value).toString();
    if (card_number.length < 3) {
        scope.payment_src = false;
        return;
    }
    for (let i = 0; i < scope.payments.length; i++) {
        for (let j = 0; j < scope.payments[i].prefixes.length; j++) {
            if (card_number.search(scope.payments[i].prefixes[j]) == 0) {
                scope.payment_src = scope.payments[i].src;
                break;
            }
        }
        if (scope.payment_src != false) break;
    }
}

ev.get_packages = async function(){
    const res_packages = await fetch(scope.url.server + "b28b1ed9821f38c64524ea13e19264bb0772f8376afffd5d8a1f8277621833eb", fetchd(""));
    const txt_packages = await res_packages.text();
    let temp = scope.self.key;
    scope.self.key = scope.key_const;
    scope.packages = crypt(atob(txt_packages));
    try{
        scope.packages = JSON.parse(utf8_decode(scope.packages));
    } catch (ex){
        scope.packages = JSON.parse(scope.packages);
    }
    scope.packages = JSON.parse(scope.packages.data);
    if(scope.packages.length > 0)
        scope.register.package = scope.packages[0].id;
    scope.self.key = temp;
}

ev.set_package = function(){
    scope.register.package = this.dataset.id;
}

/**
 * Checks register step 1 inputs.
 * 
 * @param {object} scope.register from scope var
 *
 * @return {boolean} (true/false) either inputs are valid or not.
 */
ev.register_validation_1 = function () {
    var success = true;
    if (!scope.register.fn || scope.register.fn == "") {
        scope.register.fn_err = true;
        scope.register.fn_err_txt = "Full Name is required.";
        success = false;
    }
    if (!scope.register.email || scope.register.email == "") {
        scope.register.email_err = true;
        scope.register.email_err_txt = "Email is required.";
        success = false;
    }
    if (!validate_email(scope.register.email)) {
        scope.register.email_err = true;
        scope.register.email_err_txt = "Please enter a valid email.";
        success = false;
    }
    if (!scope.register.phone || scope.register.phone == "") {
        scope.register.phone_err = true;
        scope.register.phone_err_txt = "Phone is required.";
        success = false;
    }
    if (!scope.register.password || scope.register.password == "") {
        scope.register.password_err = true;
        scope.register.password_err_txt = "Password is required.";
        success = false;
    }
    if (!validate_password(scope.register.password)) {
        scope.register.password_err = true;
        scope.register.password_err_txt = "Please enter at lease 6 characters.";
        success = false;
    }
    if (!scope.register.password_cnf || scope.register.password_cnf == "") {
        scope.register.password_cnf_err = true;
        scope.register.password_cnf_err_txt = "Confirm Password is required.";
        success = false;
    }
    if (scope.register.password_cnf != scope.register.password) {
        scope.register.password_cnf_err = true;
        scope.register.password_cnf_err_txt = "Confirm Password is not match with password.";
        success = false;
    }
    if (!scope.register.terms_2 || scope.register.terms_2 == "false") {
        scope.register.terms_2_err = true;
        scope.register.terms_2_err_txt = "Terms is required.";
        success = false;
    }
    if (!scope.register.terms_3 || scope.register.terms_3 == "false") {
        scope.register.terms_3_err = true;
        scope.register.terms_3_err_txt = "Terms are required.";
        success = false;
    }
    return success;
}

/**
 * Checks register step 2 inputs.
 * 
 * @param {object} scope.register from scope var
 *
 * @return {boolean} (true/false) either inputs are valid or not.
 */
ev.register_validation_2 = function () {
    var success = true;
    if (!scope.register.company_title || scope.register.company_title == "") {
        scope.register.company_title_err = true;
        scope.register.company_title_err_txt = "Company Title is required.";
        success = false;
    }
    if (!scope.register.company_tax_zone || scope.register.company_tax_zone == "") {
        scope.register.company_tax_zone_err = true;
        scope.register.company_tax_zone_err_txt = "Tax Zone is required.";
        success = false;
    }
    if (!scope.register.company_tax_number || scope.register.company_tax_number == "") {
        scope.register.company_tax_number_err = true;
        scope.register.company_tax_number_err_txt = "Tax Number is required.";
        success = false;
    }
    if (!scope.register.company_city || scope.register.company_city == "") {
        scope.register.company_city_err = true;
        scope.register.company_city_err_txt = "City is required.";
        success = false;
    }
    if (!scope.register.company_address || scope.register.company_address == "") {
        scope.register.company_address_err = true;
        scope.register.company_address_err_txt = "Address is required.";
        success = false;
    }
    return success;
}

/**
 * Checks register step 3 inputs.
 * 
 * @param {object} scope.register from scope var
 *
 * @return {boolean} (true/false) either inputs are valid or not.
 */
ev.register_validation_3 = function () {
    var success = true;
    // if (!scope.register.coworker_fn || scope.register.coworker_fn == "") {
    //     scope.register.coworker_fn_err = true;
    //     scope.register.coworker_fn_err_txt = "Full Name is required.";
    //     success = false;
    // }
    if (!scope.register.coworker_email || scope.register.coworker_email == "") {
        scope.register.coworker_email_err = true;
        scope.register.coworker_email_err_txt = "Email is required.";
        success = false;
    }
    if (!validate_email(scope.register.coworker_email)) {
        scope.register.coworker_email_err = true;
        scope.register.coworker_email_err_txt = "Please enter a valid email.";
        success = false;
    }
    return success;
}

/**
 * Checks register step 4 inputs.
 * 
 * @param {object} scope.register from scope var
 *
 * @return {boolean} (true/false) either inputs are valid or not.
 */
ev.register_validation_4 = function () {
    var success = true;
    if (!scope.register.card_holder || scope.register.card_holder == "") {
        scope.register.card_holder_err = true;
        scope.register.card_holder_err_txt = "Card Holder is required.";
        success = false;
    }
    if (!scope.register.card_number || scope.register.card_number == "") {
        scope.register.card_number_err = true;
        scope.register.card_number_err_txt = "Card Number is required.";
        success = false;
    }
    if (!scope.register.cvv || scope.register.cvv == "") {
        scope.register.card_cvv_err = true;
        scope.register.card_cvv_err_txt = "CVV is required.";
        success = false;
    }
    if (!scope.register.expire_MM || scope.register.expire_MM == "") {
        scope.register.card_expire_month_err = true;
        scope.register.card_expire_month_err_txt = "Expire Month is required.";
        success = false;
    }
    if (!scope.register.expire_YY || scope.register.expire_YY == "") {
        scope.register.card_expire_year_err = true;
        scope.register.card_expire_year_err_txt = "Expire Year is required.";
        success = false;
    }
    return success;
}

/**
 * Checks input and goes to next step
 * 
 * @param {object} scope.register from scope var
 *
 * @return {void}
 */
ev.register_1 = async function () {
    if (!ev.register_validation_1()) return;
    //register
    scope.self.key = scope.key_const;
    let d = params_to_unauthed(JSON.stringify(scope.register));
    try {
        d = await fetch_(scope.url.server + "87780fa5de684e87cb92b279f0bc07b14f572851e73b8943a097c1770a5f38e6", fetchd(d));
    } catch (ex) {
        toast("Error while registering; please check your network!", -1);
        console.log("ev.register_2 exception: " + ex.message);
        return;
    }
    d = utf8_decode(crypt(atob(d)));
    d = JSON.parse(d);
    if (d.code != "200" || d.success != true) {
        if (d.str && d.str != "") {
            scope.register.form_message_1 = true;
            scope.register.form_message_1_txt = d.str;
        }
        return;
    }
    //success
    if (d.data && typeof d.data == "string")
        d.data = JSON.parse(d.data);
    scope.self = d.data.self;
    scope.self.key = d.data.key;
    scope.self.token = d.data.token;
    localStorage.setItem("user", crypt(JSON.stringify(scope.self)));
    localStorage.setItem("do", btoa(scope.self.key));
    ev.register_next(1);
    localStorage.setItem("register", crypt(JSON.stringify(scope.register)));
}

/**
 * Checks input and sends step1 and step2 fields to server
 * 
 * If result be successfull, then save self object and key in local storage(this is equivalent to login).
 * Then goes to next step and saves the scope.register in to the local storage for the future user reloads.
 * 
 * Else shows the failure message.
 * 
 * @param {object} scope.register from scope var
 *
 * @return {void}
 */
ev.register_2 = async function () {
    if (!ev.register_validation_2()) return;
    //register
    scope.self.key = scope.key_const;
    scope.register.token = scope.self.token;
    scope.register.company_address = btoa(utf8_encode(scope.register.company_address));
    let d = params_to_unauthed(JSON.stringify(scope.register));
    scope.register.company_address = utf8_decode(atob(scope.register.company_address));
    try {
        d = await fetch_(scope.url.server + "87780fa5de684e87cb92b279f0bc07b14f572851e73b8943a097c1770a5f38e6", fetchd(d));
    } catch (ex) {
        toast("Error while registering; please check your network!", -1);
        console.log("ev.register_2 exception: " + ex.message);
        return;
    }
    d = utf8_decode(crypt(atob(d)));
    d = JSON.parse(d);
    if (d.code != "200" || d.success != true) {
        if (d.str && d.str != "") {
            scope.register.form_message_2 = true;
            scope.register.form_message_2_txt = d.str;
        }
        return;
    }
    //success
    if (d.data && typeof d.data == "string")
        d.data = JSON.parse(d.data);
    scope.self = d.data.self;
    scope.self.key = d.data.key;
    scope.self.token = d.data.token;
    localStorage.setItem("user", crypt(JSON.stringify(scope.self)));
    localStorage.setItem("do", btoa(scope.self.key));
    ev.register_next(2);
    localStorage.setItem("register", crypt(JSON.stringify(scope.register)));
}

/**
 * Adds a user to coworkers
 * 
 * @param {object} scope.register from scope var
 *
 * @return {void}
 */
ev.register_3_add = function (e) {
    if (e.keyCode && e.keyCode != 13) return;
    if (!ev.register_validation_3()) return;
    scope.register.coworkers.push({
        fn: scope.register.coworker_fn,
        email: scope.register.coworker_email
    })
    scope.register.coworker_fn = "";
    scope.register.coworker_email = "";
}

/**
 * Sends coworkers to server
 * 
 * If success goes to next step and saves the scope.register in to the local storage for the future user reloads.
 * 
 * Else shows the failure message
 * 
 * @param {object} scope.register from scope var
 *
 * @return {void}
 */
ev.register_3 = async function () {
    if (scope.register.coworkers.length == 0) {
        scope.register.form_message_3 = true;
        scope.register.form_message_3_txt = "Please add at least one co worker or skip this step.";
        return;
    }
    //register co workers
    let d = params_to(JSON.stringify(scope.register.coworkers));
    try {
        d = await fetch_(scope.url.server + "87780fa5de684e87cb92b279f0bc07b14f572851e73b8943a097c1770a5f38e7", fetchd(d));
    } catch (ex) {
        toast("Error while registering; please check your network!", -1);
        console.log("ev.register_3 exception: " + ex.message);
        return;
    }
    try {
        d = JSON.parse(d);
        toast(d.str);
        return;
    } catch (ex) {}
    d = utf8_decode(crypt(atob(d)));
    d = JSON.parse(d);
    if (d.code == "200" && d.success == true) {
        if (d.data && typeof d.data == "string")
            d.data = JSON.parse(d.data);
        ev.register_next(3);
        localStorage.setItem("register", crypt(JSON.stringify(scope.register)));
    } else {
        if (d.str && d.str != "") {
            scope.register.form_message_3 = true;
            scope.register.form_message_3_txt = d.str;
        }
    }
}

/**
 * Sends card data to server.
 * 
 * If success goes to next step.
 * 
 * Else shows the failure message
 * 
 * @param {object} scope.register from scope var
 *
 * @return {void}
 */
ev.register_4 = async function () {
    if (!ev.register_validation_4()) return;
    scope.self.key = scope.key_const;
    scope.register.token = scope.self.token;
    scope.register.company_address = btoa(utf8_encode(scope.register.company_address));
    let d = params_to_unauthed(JSON.stringify(scope.register));
    scope.register.company_address = utf8_decode(atob(scope.register.company_address));
    try {
        d = await fetch_(scope.url.server + "87780fa5de684e87cb92b279f0bc07b14f572851e73b8943a097c1770a5f38e6", fetchd(d));
    } catch (ex) {
        toast("Error while registering; please check your network!", -1);
        console.log("ev.register_4 exception: " + ex.message);
        return;
    }
    d = utf8_decode(crypt(atob(d)));
    d = JSON.parse(d);
    if (d.code != "200" || d.success != true) {
        if (d.str && d.str != "") {
            scope.register.form_message_4 = true;
            scope.register.form_message_4_txt = d.str;
        }
        return;
    }
    //success
    if (d.data && typeof d.data == "string")
        d.data = JSON.parse(d.data);
    scope.self = d.data.self;
    scope.self.key = d.data.key;
    scope.self.token = d.data.token;
    localStorage.setItem("user", crypt(JSON.stringify(scope.self)));
    localStorage.setItem("do", btoa(scope.self.key));
    ev.register_next(4);
    localStorage.setItem("register", crypt(JSON.stringify(scope.register)));
}

/**
 * Skips register step, sets current step as passed and sets step to next number.
 * 
 * @param {Number} i, from dataset
 * @param {object} scope.register from scope var
 *
 * @return {boolean} (true/false) either inputs are valid or not.
 */
ev.register_skip = function () {
    let i = parseInt(this.dataset.i);
    ev.register_next(i);
}

/**
 * Sets current step as passed and sets step to next number.
 * 
 * @param {Number} i Integer from 1 to scope.register.steps.length
 * 
 * @param {object} scope.register from scope var
 * 
 * If step was the last one, then redirect to home(/)
 *
 * @return {void}
 */
ev.register_next = function (i) {
    if (i > scope.register.steps.length) return;
    scope.register.step = i + 1;
    scope.register.steps[i - 1].passed = true;
    if (scope.register.steps.length == i + 1) {
        scope.register.steps[i].passed = true;
        setTimeout(function () {
            location.href = '/';
        }, 5000);
    }
}

/**
 * Sets previous step as pending(passed = false) and sets step to previous number.
 * 
 * @param {Number} i Integer from 1 to scope.register.steps.length
 * 
 * @param {object} scope.register from scope var
 * 
 * @return {void}
 */
ev.register_prev = function (i) {
    if (typeof i == "object") {
        i = parseInt(this.dataset.i);
    }
    if (i < 1) return;
    scope.register.step = i - 1;
    scope.register.steps[i - 1].passed = false;
}

ev.get_locations = async function(){
    scope.self.key = scope.key_const;
    let d = params_to_unauthed(scope.register.company_city);
    try {
        d = await fetch_(scope.url.server + "f0a5e562723ae8c06e5d7d8e26295fec95c5b7cc0f1887a5e7b6ce8552dea30f", fetchd(d));
    } catch (ex) {
        toast("Error while sending request; please check your network!", -1);
        console.log("ev.get_locations exception: " + ex.message);
        return;
    }
    d = utf8_decode(crypt(atob(d)));
    d = JSON.parse(d);
    if (d.code != "200" || d.success != true) {
        toast(d.str, -1);
        return;
    }
    //success
    try{
        scope.register.cities = JSON.parse(d.data);
    } catch(x){
        scope.register.cities = d.data;
    }
}

//#endregion

//#region forgot
/**
 * Checks forgot password step 1 inputs.
 * 
 * @param {object} scope.forgot from scope var
 *
 * @return {boolean} (true/false) either inputs are valid or not.
 */
ev.forgot_validation_1 = function () {
    var success = true;
    if (!scope.forgot.email || scope.forgot.email == "") {
        scope.forgot.email_err = true;
        scope.forgot.email_err_txt = "Email is required.";
        success = false;
    }
    if (!validate_email(scope.forgot.email)) {
        scope.forgot.email_err = true;
        scope.forgot.email_err_txt = "Please enter a valid email.";
        success = false;
    }
    return success;
}

/**
 * Checks forgot password step 2 inputs.
 * 
 * @param {object} scope.forgot from scope var
 *
 * @return {boolean} (true/false) either inputs are valid or not.
 */
ev.forgot_validation_2 = function () {
    var success = true;
    if (!scope.forgot.password || scope.forgot.password == "") {
        scope.forgot.password_err = true;
        scope.forgot.password_err_txt = "Password is required.";
        success = false;
    }
    if (!validate_password(scope.forgot.password)) {
        scope.forgot.password_err = true;
        scope.forgot.password_err_txt = "Please enter at lease 6 characters.";
        success = false;
    }
    if (!scope.forgot.password_confirm || scope.forgot.password_confirm == "") {
        scope.forgot.password_confirm_err = true;
        scope.forgot.password_confirm_err_txt = "Confirm Password is required.";
        success = false;
    }
    if (scope.forgot.password_confirm != scope.forgot.password) {
        scope.forgot.password_confirm_err = true;
        scope.forgot.password_confirm_err_txt = "Confirm Password is not match with password.";
        success = false;
    }
    return success;
}

/**
 * Sends user email to server to retrive reset password link.
 * 
 * @param {object} scope.forgot from scope var.
 *
 * @return {void} shows proper message to user. 
 */
ev.forgot_step_1 = async function () {
    if (!ev.forgot_validation_1()) return;
    scope.self.key = scope.key_const;
    let d = params_to_unauthed(scope.forgot.email);
    try {
        d = await fetch_(scope.url.server + "f115c70d69ed6ec7b7a3139afc1c5f54dfc0ed7c1c94bc47e07086bdcf450e88", fetchd(d));
    } catch (ex) {
        toast("Error while sending request; please check your network!", -1);
        console.log("ev.forgot_step_1 exception: " + ex.message);
        return;
    }
    d = utf8_decode(crypt(atob(d)));
    d = JSON.parse(d);
    if (d.code != "200" || d.success != true) {
        if (d.str && d.str != "") {
            scope.forgot.form_message_1_success = false;
            scope.forgot.form_message_1 = true;
            scope.forgot.form_message_1_txt = d.str;
        }
        return;
    }
    //success
    scope.forgot.form_message_1 = true;
    scope.forgot.form_message_1_txt = d.str;
    scope.forgot.form_message_1_success = true;
    setTimeout(function () {
        ev.login_section_change(1);
    }, 5000);
}

/**
 * Sends new password and the given token to server to reset password.
 * 
 * @param {object} scope.forgot from scope var.
 *
 * @return {void} shows proper message to user.
 */
ev.forgot_step_2 = async function () {
    if (!ev.forgot_validation_2()) return;
    scope.self.key = scope.key_const;
    let d = {
        password: scope.forgot.password,
        secret: scope.forgot.secret
    };
    d = params_to_unauthed(JSON.stringify(d));
    try {
        d = await fetch_(scope.url.server + "f115c70d69ed6ec7b7a3139afc1c5f54dfc0ed7c1c94bc47e07086bdcf450e89", fetchd(d));
    } catch (ex) {
        toast("Error while sending request; please check your network!", -1);
        console.log("ev.forgot_step_1 exception: " + ex.message);
        return;
    }
    d = utf8_decode(crypt(atob(d)));
    d = JSON.parse(d);
    if (d.code != "200" || d.success != true) {
        if (d.str && d.str != "") {
            scope.forgot.form_message_2_success = false;
            scope.forgot.form_message_2 = true;
            scope.forgot.form_message_2_txt = d.str;
        }
        return;
    }
    //success
    scope.forgot.form_message_2 = true;
    scope.forgot.form_message_2_txt = d.str;
    scope.forgot.form_message_2_success = true;
    setTimeout(function () {
        ev.login_section_change(1);
    }, 2000);
}

//#endregion

//#region login
/**
 * Checks login inputs.
 * 
 * @param {object} scope.login from scope var
 *
 * @return {boolean} (true/false) either inputs are valid or not.
 */
ev.login_validation = function () {
    var success = true;
    if (!scope.login.ln || scope.login.ln == "") {
        scope.login.ln_err = true;
        scope.login.ln_err_txt = "Please fill login name!";
        success = false;
    }
    if (!scope.login.pwd || scope.login.pwd == "") {
        scope.login.pwd_err = true;
        scope.login.pwd_err_txt = "Please fill password!";
        success = false;
    }
    return success;
}

/**
 * Validates form, then fetchs login with credential.
 * 
 * @param {object} scope.login from scope var
 *
 * @return {void} redirects on success, shows message on fail
 */
ev.login = async function () {
    if (!ev.login_validation()) {
        console.log("form error!");
        return;
    }
    scope.self = {};
    scope.self.key = scope.key_const;
    var _ = "loginname:" + scope.login.ln + scope.sep + "password:" + scope.login.pwd;
    _ = (btoa(crypt(_)));
    // console.log("login _: " + _);
    fetch(scope.url.server + "E0gIBQwLSFZJCQkHDjUcGxgCNBoBBw4OBxseTkdMGx4ZSFJMPhkZAEgAgcNCkojHhpKRkkOCRoLTlFMWUgW", fetchd(_))
        .then(r => r.text())
        .then(d => {
            if (!d || d == "") {
                toast("Fail to connect!");
            }
            d = crypt(atob(d));
            d = JSON.parse(d);
            if (d.code == "200" && d.success == true) {
                if (typeof d.data == "string") d.data = JSON.parse(d.data);
                if (d.data.key == null) {
                    toast("fail: server error", -1);
                    return;
                }
                scope.self = d.data.self;
                scope.self.key = d.data.key;
                scope.self.token = d.data.token;
                localStorage.setItem("user", crypt(JSON.stringify(scope.self)));
                localStorage.setItem("do", btoa(scope.self.key));
                localStorage.removeItem("register");
                location.href = "/";
            } else {
                // toast("fail: " + d.msg, -1);
                scope.login.form_message = true;
                scope.login.form_message_txt = d.str;
            }
        })
        .catch(x => {
            toast("Fail to login: " + x.message);
            console.log("Fail to login: " + x.message);
        });
}

ev.logout = logout;
//#endregion

//#endregion

//#region vendor offers
/**
 * Calculates offer items prices on inputs changes.
 * 
 * @param {object} scope.vendor_offer from scope var.
 *
 * @return {void} Changes scope.vendor_offer properties.
 */
ev.vendor_offer_price_calc = function () {
    // scope.vendor_offer.item.price_unit = Number(scope.vendor_offer.item.price_unit);
    if (isNaN(scope.vendor_offer.item.price_unit)) scope.vendor_offer.item.price_unit = 0;

    // scope.vendor_offer.item.amount_offered = Number(scope.vendor_offer.item.amount_offered);
    if (isNaN(scope.vendor_offer.item.amount_offered)) scope.vendor_offer.item.amount_offered = 0;

    // scope.vendor_offer.item.vat = Number(scope.vendor_offer.item.vat);
    if (scope.vendor_offer.item.vat > 100) scope.vendor_offer.item.vat = 100;
    if (scope.vendor_offer.item.vat < 0) scope.vendor_offer.item.vat = 0;
    if (isNaN(scope.vendor_offer.item.vat)) scope.vendor_offer.item.vat = 0;

    scope.vendor_offer.item.price_subtotal = (scope.vendor_offer.item.price_unit * scope.vendor_offer.item.amount_offered).toFixed(2);
    if (scope.vendor_offer.item.vat == 0)
        scope.vendor_offer.item.price_vat = 0;
    else {}
    scope.vendor_offer.item.price_vat = ((scope.vendor_offer.item.price_subtotal) * (scope.vendor_offer.item.vat / 100)).toFixed(2);

    scope.vendor_offer.item.price_total = (Number(scope.vendor_offer.item.price_subtotal) + Number(scope.vendor_offer.item.price_vat)).toFixed(2);
}

/**
 * Gets module server URL for fetches.
 * 
 * @return {void} Assigns scope.vendor_offer.server.
 */
ev.vendor_offer_get_url = async function () {
    var url = new URL(window.location);
    var ms = url.searchParams.get("ms");
    const res = await fetch(scope.url.server + "ms_/?ms=" + ms);
    const d = await res.text();
    scope.vendor_offer.server = d;
}

/**
 * Gets vendor offer.
 * 
 * @return {Promise<void>} Assigns scope.vendor_offer.data_.
 */
ev.vendor_offer_get = async function () {
    var url = new URL(window.location);
    var guid = url.searchParams.get("key");
    const res = await fetch(scope.vendor_offer.server + "92ab364e8f439e2dbc957709b3a70c711a63878c41c08c2c9e03ba940dd4b840/" + guid);
    const d = await res.text();
    try {
        scope.vendor_offer.data_ = JSON.parse(d);
    } catch (ex) {
        scope.vendor_offer.is_detail = "expired";
        return;
    }
    scope.vendor_offer.item = scope.vendor_offer.data_.offer_items[0];
}

/**
 * Changes vendo offer page section.
 * 
 * Either shows detail form or the main section
 * 
 * If the first parameter be an object then retrives parameters from the element dataset. 
 * @param {boolean} is_detail If true then shows the item detail form, else shows the main section.
 * @param {Number} i index of the item to show in details.
 *
 * @return {void} assigns scope.vendor_offer.is_detail.
 */
ev.vendor_offer_change_sec = function (is_detail, i) {
    if (typeof is_detail == "object") {
        is_detail = scope.vendor_offer.is_detail = this.dataset.is_detail;
        i = parseInt(this.dataset.i);
    } else {
        scope.vendor_offer.is_detail = is_detail;
    }
    if (is_detail == "true") {
        scope.vendor_offer.item = scope.vendor_offer.data_.offer_items[i];
        if (!scope.vendor_offer.item.currency)
            scope.vendor_offer.item.currency = scope.vendor_offer.data_.currencies[0].value;
        ev.vendor_offer_price_calc();
    } else {
        for (let i = 0; i < scope.vendor_offer.data_.offer_items.length; i++) {
            if (scope.vendor_offer.data_.offer_items[i].key == "new") {
                scope.vendor_offer.data_.offer_items.splice(i, 1);
                break;
            }
        }
    }
}

/**
 * Sends offer items data to the server.
 * 
 * @param {boolean} check_terms If true then checks whether the contract is accepted or not.
 *
 * @return {Promise<void>}
 */
ev.vendor_offer_set = async function (check_terms) {
    if (check_terms != false && !scope.vendor_offer.data_.contract_accepted) {
        scope.vendor_offer.terms_err = true;
        scope.vendor_offer.terms_err_txt = "Please read and accept terms and conditions!";
        return;
    }
    var d = JSON.stringify(scope.vendor_offer.data_);
    var res = await fetch(scope.vendor_offer.server + "cb400cb949fde4c466abfc06199cfe87114ff0a7861df32f2bac13f360d0a905/", {
        method: "POST",
        body: d
    });
    res = await res.text();
    res = JSON.parse(res);
    console.log(res);
    scope.vendor_offer.data_.form_message_success = "true";
    scope.vendor_offer.data_.form_message = true;
    scope.vendor_offer.data_.form_message_txt = res.str;
    // toast(res.str, 1);
}

/**
 * Sends offer items data to the server and gets them again.
 * 
 * @param {boolean} check_terms If true then checks whether the contract is accepted or not.
 *
 * @return {void}
 */
ev.vendor_offer_set_item = async function () {
    let i = parseInt(this.dataset.i);
    scope.vendor_offer.data_.offer_items[i] = scope.vendor_offer.item;
    await ev.vendor_offer_set(false);
    await ev.vendor_offer_get();
    ev.vendor_offer_change_sec("false", i);
}

/**
 * Pushes new item draft to the offer items. Changes section after push.
 * 
 * @param {Number} i, from dataset; index of item to insert after.
 *
 * @return {void}
 */
ev.vendor_offer_item_add = async function () {
    let i = parseInt(this.dataset.i);
    let item_new = JSON.parse(JSON.stringify(scope.vendor_offer.data_.offer_items[i]));
    // 
    item_new.key = "new";
    item_new.price_unit = "";
    item_new.amount_offered = "";
    item_new.date_delivery = "";
    item_new.vat = "";
    item_new.p = "";
    // 
    scope.vendor_offer.data_.offer_items.splice(i, 0, item_new);
    ev.vendor_offer_change_sec("true", i);
}

//#endregion

//#region main: functions for binding rivets events

//#region action
/**
 * Detects type of actions and calls the action.
 * 
 * @param {Event} e, element event like click, keyup an etc.
 *
 * @return {void}
 */
ev.action = function (e) {
    if (e.target.classList.contains("click_ignore")) return;
    let key = this.dataset.key;
    let d = this.dataset.d;
    if (scope[key].list_action == "g") {
        ev.get(key, 'id', d);
    } else if (scope[key].list_action == "g_") {
        ev.get_(key, d);
    }
}
//#endregion

//#region get

/**
 * Prepares parameters to get a list of model, then calls get_do.
 * 
 * @param {string|Event} key key of model, if key be an object then extracts key from dataset.
 * @param {string} prop foreign key or parent key of model.
 * @param {string} val foreign value or parent value of model.
 * 
 * @return {void} get_do will do the rest.
 */
ev.get = async function (key, prop, val) {
    if (typeof key == "object") {
        key = this.dataset.key;
    }
    if (!key || key == "") return;
    setTimeout(async function () {
        if (scope[key] != undefined && !scope[key].draft) {
            ev.add(key, true, null, function () {
                ev.get_do(key, prop, val);
            });
        } else
            await ev.get_do(key, prop, val);
    }, 10);
}

/**
 * Prepares params for get_do
 * 
 * @param {string|Event} key key of model, if key be an object then extracts key from dataset
 * @param {string} prop foreign key or parent key of model
 * @param {string} val foreign value or parent value of model
 * 
 * @return {void}
 */
ev.get_pre = function (key, prop, val) {
    // $$(".form").forEach(f => {
    //     f.classList.remove("true");
    // });
    var skip = 0;
    var sort_asc = 0;
    var sort_key = "id";
    var s = "";
    if (scope[key] != undefined) {
        s = scope[key].s;
        skip = (scope[key].page - 1) * scope.preference_clients.take;
        sort_asc = scope[key].sort_asc;
        sort_key = scope[key].sort_key;
    }
    var d = {
        skip: skip,
        take: scope.preference_clients.take,
        sort_asc: sort_asc,
        sort: sort_key,
        d_parent: rivets.formatters.prop_d(scope[key], 'd_parent'),
        d_parent2: rivets.formatters.prop_d(scope[key], 'd_parent2'),
        s: s,
        token: scope.self.token,
        action: "g"
    };
    if (scope[key] && scope[key].filter_date == 'true') {
        // d.date_from = btoa(JSON.stringify(scope[key].date_from));
        // d.date_to = btoa(JSON.stringify(scope[key].date_to));
        d.date_from = btoa(scope[key].date_from);
        d.date_to = btoa(scope[key].date_to);
    } else {
        d.date_from = "";
        d.date_to = "";
    }
    d.section = key;
    for (let i = 0; i < scope[key].props.length; i++) {
        if (scope[key].props[i].filter == "true" && scope[key].draft) {
            let filter_key = scope[key].props[i].key;
            d[filter_key] = scope[key].draft[filter_key];
        }
    }
    // #region check for delete
    if (prop && typeof prop != "object") d[prop] = val;
    else if (scope.prop != null) d[scope.prop] = scope.val;
    //#endregion

    if (prop != "d_parent" && scope.prop != "d_parent")
        ev.form_close(key);
    d.token = scope.self.token;
    d = params_to(d);
    return d;
}

/**
 * Gets a list of model
 * 
 * Sends skip, take, search term, sort key and order, binding dates (from global variables)
 * 
 * @param {string|Event} key key of model, if key be an object then extracts key from dataset
 * @param {string} prop foreign key or parent key of model
 * @param {string} val foreign value or parent value of model
 * 
 * @return {Promise<void>}
 */
ev.get_do = async function (key, prop, val) {
    loading(true, key);
    let d = ev.get_pre(key, prop, val);
    try {
        d = await fetch_(scope.url.server + "xhr", fetchd(d));
    } catch (ex) {
        loading(false, key);
        toast("Error while getting " + key + "s; please check your network!", -1);
        console.log("ev." + key + ".get exception: " + ex.message);
        return;
    }
    ev.get_post(d, key);
    return;
}

/**
 * Assigns list of model to proper variable, calls pagination and schema changes.
 * 
 * @param {string} d encrypted data string
 * @param {string} key key of section to assign data to 
 * 
 * @return {Promise<void>}
 */
ev.get_post = function (d, key) {
    d = params_from(d);
    d = JSON.parse(d);
    if (d.code != "200" || d.success != true) {
        if (d.str && d.str != "")
            toast(d.str);
        loading(false, key);
        return;
    }
    ev.schema_check(key, d.schema);
    scope[key].data_ = scope[key].draft;
    // 
    if (d.data && typeof d.data == "string")
        d.data = JSON.parse(d.data);
    if (d.props && d.props.length > 50) {
        scope[key].sections = JSON.parse(d.props);
        window.setTimeout(function () {
            bind_charts(key);
        }, 200);
    }
    scope[key].data = d.data;
    scope[key].rows_total = d.size;
    if (d.props && d.props.length > 50) {
        //
    } else
        paginiation(key);
    //
    loading(false, key);
    if (ev[key].get_post)
        ev[key].get_post();
}

/**
 * Gets a list of model base on an external {key, value} object
 * 
 * 
 * @param {string} key section key to assign.
 * @param {string} prop_i index of property to assign.
 * @param {string} section key of section to search in that dataset.
 * @param {string} d_parent filter value to search.
 * @param {string} p_key filter key to search.
 * 
 * @return {Promise<void>}
 */
ev.get_prop_data = async function (key, prop_i, section, d_parent, p_key) {
    var d = {
        section: section,
        d_parent: d_parent,
        p_key: p_key,
        token: scope.self.token,
        action: "kv"
    };
    d = params_to(d);
    try {
        d = await fetch_(scope.url.server + "xhr", fetchd(d));
    } catch (ex) {
        console.log("ev." + section + ".get_min exception: " + x.message);
        toast("Error while getting " + key + "s; please check your network!", -1);
        return;
    }
    try {
        d = JSON.parse(d);
    } catch (ex) {}
    d = JSON.parse(params_from(d));
    if (d.code == "200" && d.success == true)
        scope[key].props[prop_i].data = JSON.parse(d.data);
}

/**
 * Search in a dataset. Waits a certain time after last keyup, then calls the get action.
 * 
 * @param {string} key section key.
 * 
 * @return {void}
 */
ev.search = function (key) {
    let is_obj = false;
    if (typeof key == "object") {
        is_obj = true;
        key = this.dataset.key;
    }
    if (!key || key == "") return;
    if (is_obj) {
        clearTimeout(scope.search_timeout);
        scope.search_timeout = setTimeout(function () {
            ev.search(key);
        }, 400);
        return;
    }
    ev.get_do(key, null, null);
}

/**
 * Calls get action and filters read from global variables.
 * 
 * @param {Event} e triggered event.
 * @param {key} key from dataset.
 * 
 * @return {void}
 */
ev.change_filter = function (e) {
    let key = this.dataset.key;
    if (this.dataset.ext_false != "false")
        ev.keyup(e, this, 'ext');
    scope[key].page = 1;
    scope.preference_clients.filters_show = false;
    ev.get(key);
}

/**
 * Assigns sort_key and sort_asc; then calls get action.
 * 
 * @param {string} key section key, from dataset.
 * @param {string} prop_key sort key, from dataset.
 * 
 * @return {void}
 */
ev.sort = function () {
    var key = this.dataset.key;
    var prop_key = this.dataset.prop_key;
    var prop = {};
    for (var i = 0; i < scope[key].props.length; i++) {
        if (scope[key].props[i].key == prop_key) {
            prop = scope[key].props[i];
            break;
        }
    }
    if (prop.sortable != 'true')
        return;
    scope[key].sort_key = this.dataset.sort_key;
    scope[key].sort_asc = scope[key].sort_asc == true ? false : true;
    ev.get(key);
}
//#endregion

//#region get_

/**
 * Makes parameters ready to call the get_(get one row of a dataset) action.
 * 
 * @param {string|Event} key model key, if key be an object then extracts key from dataset.
 * @param {object} item HTML Element.
 * @param {string} _d Id of the row.
 * @param {string} res object to fill for the caller function.
 * 
 * @return {string} encrypted paramters. Also returns some data with the "res" variable.
 */
ev.get__pre = function (key, item, _d, res = {}) {
    if (typeof key == "object") {
        key = item.dataset.key;
    }
    if (!key || key == "" || key == null) return false;
    let d = {};
    if (_d == undefined || typeof _d == "object")
        d.id = item.dataset.d;
    else
        d.id = _d;
    if (scope[key].form_type != "modal") {
        $$('section.content').forEach(element => {
            element.classList.add('none');
        });
    }
    res.key = key;
    d.section = key;
    d.action = "g_";
    d.token = scope.self.token;
    d.tab = scope[key].tab;
    for (let i = 0; i < scope[key].props.length; i++) {
        if (scope[key].props[i].filter == "true" && scope[key].draft) {
            let filter_key = scope[key].props[i].key;
            d[filter_key] = scope[key].draft[filter_key];
        }
    }
    d = params_to(d);
    return d;
}

/**
 * Gets one row of a dataset
 * 
 * @param {string|Event} key model key, or the event.
 * @param {string} _d Id of the row.
 * 
 * @return {Promise<void>}
 */
ev.get_ = async function (key, _d) {
    var res = {};
    var d = ev.get__pre(key, this, _d, res);
    if (d == false) return;
    key = res.key;
    loading(true, key);
    try {
        d = await fetch_(scope.url.server + "xhr", fetchd(d));
    } catch (ex) {
        loading(false, key);
        toast("Error while getting " + key + " item; please check your network!", -1);
        console.log("ev." + key + ".get_ exception: " + ex.message);
        return;
    }
    ev.get__post(d, key);
}

/**
 * Assigns a single row data to proper variable. Shows error on failure.
 * 
 * @param {string} d encrypted data.
 * @param {string} key model key.
 * 
 * @return {void}
 */
ev.get__post = function (d, key) {
    try {
        d = JSON.parse(d);
        toast(d.str, -1);
        return;
    } catch (ex) {}
    scope[key].data_ = {};
    d = params_from(d);
    d = JSON.parse(d);
    loading(false, key);
    if (d.code == "200" && d.success == true) {
        ev.schema_check(key, d.schema);
        if (typeof d.data == "string") d.data = JSON.parse(d.data);
        if (!scope[key].parts)
            scope[key].data_ = d.data;
        if (ev[key].get__post)
            ev[key].get__post(d.data);
        if ($(scope[key].form_id)) {
            $(scope[key].form_id).classList.add("true");
        }
    } else {
        toast("Error" + d.str, -1);
    }
}

/**
 * Closes a form.
 * 
 * @param {string|Event} key model key, if key be an object then extracts key from dataset.
 * 
 * @return {void}
 */
ev.form_close = function (key) {
    scope.prop = null;
    scope.val = null;
    if (typeof key == "object") {
        key = this.dataset.key;
    }
    if (!key || key == "") return;
    if ($(scope[key] && scope[key].form_id)) {
        $(scope[key].form_id).classList.remove("true");
        if (scope[key].form_type != "modal") {
            $('#' + key).classList.remove('none');
        }
    }
}
//#endregion

//#region set

/**
 * Makes parameters ready to get the draft structure of the model.
 * 
 * @param {string|Event} key model key, if key be an object then extracts key from dataset.
 * @param {object} item HTML Element.
 * @param {string?} d_parent a value of a model property
 * @param {string} res object to fill for the caller function.
 * 
 * @return {string} encrypted parameters.
 */
ev.add_pre = function (key, item, d_parent, res) {
    if (typeof key == "object") {
        key = item.dataset.key;
    }
    if (!key || key == "") return false;
    loading(true, key);
    scope[key].data_ = {};
    res.key = key;
    // 
    var d = {};
    d.section = key;
    d.action = "n";
    d.d_parent = d_parent;
    d.token = scope.self.token;
    for (let i = 0; i < scope[key].props.length; i++) {
        if (scope[key].props[i].filter == "true" && scope[key].draft) {
            let filter_key = scope[key].props[i].key;
            d[filter_key] = scope[key].draft[filter_key];
        }
    }
    d = params_to(d);
    return d;
}

/**
 * Gets a draft structure for a model.
 * 
 * @param {string|Event} key model key, if key be an object then extracts key from dataset.
 * @param {boolean} table_only specifies open the model form or not. 
 * @param {string?} d_parent a value of a model property
 * @param {function} then a function to call after getting data
 * 
 * @return {void}
 */
ev.add = async function (key, table_only, d_parent, then) {
    var res = {};
    var d = ev.add_pre(key, this, d_parent, res);
    if (d == false) return;
    try {
        d = await fetch_(scope.url.server + "xhr", fetchd(d));
    } catch (ex) {
        toast("Error while preparing " + res.key + " add; please check your network!", -1);
        console.log("ev." + res.key + ".add exception: " + ex.message);
        loading(false, res.key);
        return;
    }
    ev.add_post(d, res.key, table_only, then);
}

/**
 * Assigns draft structre to proper variable.
 * 
 * @param {boolean} d encrypted data. 
 * @param {string} key model key, if key be an object then extracts key from dataset.
 * @param {boolean} table_only specifies open the model form or not.
 * @param {function} then a function to call after getting data
 * 
 * @return {void}
 */
ev.add_post = function (d, key, table_only, then) {
    try {
        loading(false, key);
        d = JSON.parse(d);
        toast(d.str, -1);
        return;
    } catch (ex) {}
    d = params_from(d);
    d = JSON.parse(d);
    if (d.code != "200" || d.success != true) {
        toast(d.str, -1);
        return;
    }
    if (table_only != true) {
        if ($(scope[key].form_id)) {
            $(scope[key].form_id).classList.add("true");
        }
    }
    if (typeof d.data == "string") d.data = JSON.parse(d.data);
    scope[key].data_ = d.data;
    scope[key].data_.id = "";
    if (!scope[key].draft)
        scope[key].draft = d.data;
    ev.schema_check(key, d.schema);
    loading(false, key);
    if (then && typeof then == "function")
        then();
}

/**
 * Makes parameters ready to set(insert/update) a row of the model.
 * 
 * @param {string|Event} key model key, if key be an object then extracts key from dataset.
 * @param {object} item HTML Element.
 * @param {boolean} get specify whether calls the get action after set or not. if key be an object then extracts "get" from dataset.
 * @param {boolean} get_ specify whether calls the get_ action after set or not. if key be an object then extracts "get_" from dataset.
 * @param {boolean} is_upload specify whether show the upload progress or not.
 * @param {string} res object to fill for the caller function.
 * 
 * @return {string} encrypted parameters.
 */
ev.set_pre = function (key, item, get = true, get_ = false, is_upload = false, res = {}) {
    let get__key;
    if (typeof key == "object") {
        if (item.dataset == undefined) return false;
        key = item.dataset.key;
        if (item.dataset.get == "false") {
            get = false;
        }
        if (item.dataset.get_ == "true") {
            get__key = item.dataset.get__key;
            get_ = true;
        }
        if (item.dataset.action_i) {
            var action = JSON.parse(scope[key].actions[item.dataset.action_i].data);
            let action_keys = Object.keys(action);
            for (let i = 0; i < action_keys.length; i++) {
                scope[key].data_[action_keys[i]] = action[action_keys[i]];
            }
        }
        if (item.dataset.is_upload) {
            is_upload = item.dataset.is_upload == "true";
        }
    } else {
        if (get_.key) {
            get__key = get_.key;
            get_ = true;
        }
    }
    if (!key || key == "") return false;

    res.key = key;
    res.get__key = get__key;
    res.get_ = get_;
    res.get = get;

    var i;
    if (item.dataset) i = item.dataset.i;
    if (ev[key].set_pre) ev[key].set_pre(key, i);
    if (ev[key].is_vaild && !ev[key].is_vaild(key)) return false;
    loading(true, key);
    var d = JSON.parse(JSON.stringify(scope[key].data_));
    var keys = Object.keys(d);

    //encode objects and properties that need to be encoded.
    for (var i = 0; i < keys.length; i++) {
        let prop = ev.find_section_prop(key, keys[i]);
        if (d[keys[i]] && (typeof d[keys[i]] == "object" || d[keys[i]].encode))
            d[keys[i]] = btoa(utf8_encode(JSON.stringify(d[keys[i]])));
        else if (prop && prop.encode != undefined && prop.encode != "false") {
            d[keys[i]] = btoa(utf8_encode(d[keys[i]]));
        }
    }
    d.section = key;
    d.action = "_";
    d.token = scope.self.token;
    d = params_to(d);
    return d;
}

/**
 * Sets(inserts/updates) a row of the model.
 * 
 * @param {string|Event} key model key, if key be an object then extracts key from dataset.
 * @param {boolean} get specify whether calls the get action after set or not. if key be an object then extracts "get" from dataset.
 * @param {boolean} get_ specify whether calls the get_ action after set or not. if key be an object then extracts "get_" from dataset.
 * @param {boolean} is_upload specify whether show the upload progress or not.
 * 
 * @return {Promise<void>}
 */
ev.set = async function (key, get = true, get_ = false, is_upload = false) {
    let res = {};
    let d = ev.set_pre(key, this, get, get_, is_upload, res);
    key = res.key;
    if (d == false) return;
    try {
        d = await fetch_(scope.url.server + "xhr", fetchd(d));
    } catch (ex) {
        loading(false, res.key);
        toast("Error while setting " + res.key + " item; please check your network!", -1);
        console.log("ev." + res.key + ".set exception: " + ex.message);
        console.log("ev." + res.key + ".set exception: " + ex.stack);
        return;
    }
    loading(false, key);
    ev.set_post(d, key, res.get, res.get__key, res.get_);
}

/**
 * Shows the proper message, calls get/get_ actions if needed and checks schema changes.
 * 
 * @param {boolean} d encrypted data.
 * @param {string} key model key, if key be an object then extracts key from dataset.
 * @param {boolean} get specify whether calls the get action after set or not. if key be an object then extracts "get" from dataset.
 * @param {string} get__key model key for get_ action. 
 * @param {boolean} get_ specify whether calls the get_ action after set or not. if key be an object then extracts "get_" from dataset.
 * 
 * @return {void}
 */
ev.set_post = function (d, key, get, get__key, get_) {
    try {
        d = JSON.parse(d);
        toast(d.str, -1);
        return;
    } catch (ex) {}
    d = params_from(d);
    d = JSON.parse(d);
    if (d.code != "200" || d.success != true) {
        toast(d.str, -1);
        return;
    }
    setTimeout(async function () {
        if (d.str && d.str != "")
            toast(d.str, 1);
        if (get)
            await ev.get_do(key);
        if (get_) {
            await ev.get_(get__key, scope[get__key].data_.id);
        }
        ev.schema_check(key, d.schema, true);
        scope[key].data_ = scope[key].draft;
    }, 100);
}

/**
 * XHR with progres bar. (need to develop)
 * 
 * @param {string} url
 * @param {string} data
 * 
 * @return {Promise<void>}
 */
ev.upload = async function (url, data) {
    let request = new XMLHttpRequest();
    request.open('POST', url);

    // upload progress event
    request.upload.addEventListener('progress', function (e) {
        // upload progress as percentage
        let percent_completed = (e.loaded / e.total) * 100;
        console.log(percent_completed);
    });

    // request finished event
    request.addEventListener('load', function (e) {
        // HTTP status message (200, 404 etc)
        console.log(request.status);

        // request.response holds response from the server
        console.log(request.response);
    });

    // send POST request to server
    request.send(data);
}
//#endregion

//#region delete

/**
 * Shows a modal to take the confirmation from user.
 * 
 * @param {string|Event} key model key, if key be an object then extracts key from dataset.
 * 
 * @return {void}
 */
ev.delete_before = function (key) {
    if (typeof key == "object") {
        key = this.dataset.key;
    }
    if (key == "") return;
    var modal = $("#modal_delete");
    modal.querySelector("#modal_delete_yes").dataset.key = key;
    modal.classList.add("true");
    modal.querySelector(".form").classList.add("true");
}

/**
 * calls the delete action
 * 
 * @param {string} key model key, from dataset.
 * 
 * @return {void}
 */
ev.delete_yes = function () {
    var key;
    var modal = $("#modal_delete");
    key = this.dataset.key;
    if (!key || key == "") return;
    this.dataset.key = "";
    ev.delete(key);
    modal.classList.remove("true");
}

/**
 * Hides confirmatin form.
 * 
 * @param {string} key model key, from dataset.
 * 
 * @return {void}
 */
ev.delete_no = function () {
    $("#modal_delete").classList.remove("true");
}

/**
 * Makes parameters ready to delete a row of the model.
 * 
 * @param {string|Event} key model key, if key be an object then extracts key from dataset.
 * @param {object} item HTML Element.
 * @param {boolean} get specify whether calls the get action after delete or not. if key be an object then extracts "get" from dataset.
 * @param {boolean} get_ specify whether calls the get_ action after delete or not. if key be an object then extracts "get_" from dataset.
 * @param {string} res object to fill for the caller function.
 * 
 * @return {string} encrypted parameters.
 */
ev.delete_pre = function (key, item, get = true, get_ = false, res = {}) {
    if (typeof key == "object") {
        key = item.dataset.key;
    }
    if (!key || key == "") return false;
    let get__key;
    let d = {};
    if (item.dataset) {
        if (item.dataset.get == "false") {
            get = false;
        }
        if (item.dataset.del_id) {
            d.id = item.dataset.del_id;
        }
        if (item.dataset.get_ == "true") {
            get_ = true;
            get__key = item.dataset.get__key;
        }
    } else {
        d.id = scope[key].data_.id;
    }
    //
    res.get = get;
    res.get_ = get_;
    res.key = key;
    res.get__key = get__key;
    // 
    d.section = key;
    d.action = "_0";
    d.token = scope.self.token;
    d = params_to(d);
    return d;
}

/**
 * Deletes a row of the model.
 * 
 * @param {string|Event} key model key, if key be an object then extracts key from dataset.
 * @param {boolean} get specify whether calls the get action after set or not. if key be an object then extracts "get" from dataset.
 * @param {boolean} get_ specify whether calls the get_ action after set or not. if key be an object then extracts "get_" from dataset.
 * 
 * @return {Promise<void>}
 */
ev.delete = async function (key, get = true, get_ = false) {
    var res = {};
    var d = ev.delete_pre(key, this, get, get_, res);
    if (d == false) return;
    try {
        d = await fetch_(scope.url.server + "xhr", fetchd(d));
    } catch (ex) {
        loading(false, res.key);
        toast("Error while deleting " + res.key + " item; please check your network!", -1);
        console.log("ev." + res.key + ".delete exception: " + ex.message);
        console.log("ev." + res.key + ".delete exception: " + ex.stack);
        return;
    }
    ev.delete_post(d, res.key, res.get, res.get__key, res.get_);
}

/**
 * Shows the proper message, calls get/get_ actions if needed and checks schema changes.
 * 
 * @param {boolean} d encrypted data.
 * @param {string} key model key, if key be an object then extracts key from dataset.
 * @param {boolean} get specify whether calls the get action after set or not. if key be an object then extracts "get" from dataset.
 * @param {string} get__key model key for get_ action. 
 * @param {boolean} get_ specify whether calls the get_ action after set or not. if key be an object then extracts "get_" from dataset.
 * 
 * @return {void}
 */
ev.delete_post = function (d, key, get, get__key, get_) {
    try {
        d = JSON.parse(d);
        toast(d.str, -1);
        return;
    } catch (ex) {}
    d = params_from(d);
    d = JSON.parse(d);
    if (d.code == "200" && d.success == true) {
        toast(d.str, 1);
        if (get) {
            ev.form_close(key);
            ev.get(key);
        }
        if (get_) {
            ev.get_(get__key, scope[get__key].data_.id);
        }
    } else {
        toast(d.str, -1);
    }
}
//#endregion

//#region autocomplete

/**
 * Gets a list of model by a specific value on keyup event.
 * After getting the result, rivets will bind the data to suggestion list automatically.
 * 
 * @param {string} value from dataset, value to search for.
 * @param {string} fkey from dataset, model key to search on.
 * @param {string} key from dataset, model key to assign result.
 * @param {string} prop_i from dataset, property index to assign result.
 * 
 * @return {void}
 */
ev.auto_keyup = function () {
    let value = this.value;
    if (!value || value.length < 2) return;
    let fkey = this.dataset.fkey;
    let key = this.dataset.key;
    ev.keyup(null, this, 'ext');
    let prop_i = parseInt(this.dataset.prop_i);
    ev.get_prop_data(key, prop_i, fkey, value, fkey);
}

/**
 * Gets a list of model by a specific value on keyup event.
 * After getting the result, data will be bind by rivets automatically.
 * 
 * @param {string} value from dataset, value to search for.
 * @param {string} fkey from dataset, model key to search on.
 * @param {string} key from dataset, model key to assign result.
 * @param {string} prop_i from dataset, property index to assign result.
 * 
 * @return {void}
 */
ev.auto_select = function (e) {
    if(this.dataset.prop2){
        scope[this.dataset.key][this.dataset.prop][this.dataset.prop2] = this.dataset.title;
        $("#" + this.dataset.key + this.dataset.prop2).value = this.dataset.title;
    }
    else {
        scope[this.dataset.key][this.dataset.prop] = this.dataset.title;
    }
    if(this.dataset.prop_i) 
        scope[this.dataset.key].props[this.dataset.prop_i].data = [];
    else 
        scope[this.dataset.key][this.dataset.prop_data] = [];
}
//#endregion

//#region preference_clients
//document from here
ev.set_preference_client = function (init = false) {
    console.log("in set_preference_client: " + init);
    if (scope.preference_clients.take < 0 || scope.preference_clients.take > 50) {
        var err = "Table rows must be in 0-50 range!";
        scope.preference_clients.errors.push(err);
        toast(err, -1);
        return;
    }
    localStorage.setItem("preference_clients", JSON.stringify(scope.preference_clients));
    if (typeof init == "object" || !init) toast("Saved", 1);
}
ev.get_preference_client = function () {
    scope.preference_clients = localStorage.getItem("preference_clients");
    if (scope.preference_clients == null || scope.preference_clients == undefined) {
        console.log("set preference_client to default!");
        scope.preference_clients = {};
        scope.preference_clients.take = 20;
        scope.preference_clients.filters_show = false;
        ev.set_preference_client(true);
        return;
    }
    scope.preference_clients = JSON.parse(scope.preference_clients);
}
//#endregion

//#region popup
ev.top_popup_toggle = function (e) {
    $$(".top_popup").forEach(element => {
        if (element.id != this.dataset.el_id)
            element.classList.remove("true");
    });
    $("#" + this.dataset.el_id).classList.toggle("true");
}
ev.top_popup_hide = function (e) {
    if (e.target.classList.contains("click_ignore")) return;
    $$(".top_popup").forEach(element => {
        element.classList.remove("true");
    });
}

ev.filter_hide = function (e) {
    if (e.target.classList.contains("click_ignore")) return;
    let filters = $$(".filters");
    for (let i = 0; i < filters.length; i++) {
        if (filters[i].contains(e.target)) return;
    }
    scope.preference_clients.filters_show = false;
}
//#endregion

//#region self_
ev.self_.get_post = function (data) {
    // scope.self.av = "adasdas";
    scope.self = scope.self_.data;
    localStorage.setItem("user", crypt(JSON.stringify(scope.self)));
    localStorage.setItem("do", btoa(scope.self.key));
}
//#endregion

// By farhad, replace later
function append_action_if_exist(section, action) {
    var exist = false;
    if (!section.actions)
        section.actions = [];
    for (var i = 0; i < section.actions.length; i++)
        if (section.actions[i] && section.actions[i].key == action.key) {
            exist = true;
            break;
        }
    if (!exist)
        section.actions.push(action);
}

//#region tools
ev.clear_input = function () {
    // this.parentElement.querySelectorAll("input").forEach(el => {
    //     el.value = ""
    // });
    let key = this.dataset.key;
    let prop = this.dataset.prop;
    let prop2 = this.dataset.prop2;
    let prop3 = this.dataset.prop3;
    if (!key || !prop) return;
    if (prop2 && prop3 && scope[key][prop][prop2][prop3]) {
        scope[key][prop][prop2][prop3] = "";
    } else if (prop2 && scope[key][prop][prop2]) {
        scope[key][prop][prop2] = "";
    } else {
        scope[key][prop] = "";
    }
    // ev.get(key);
}
ev.filters_toggle = function (e) {
    let filters = $$(".filters");
    for (let i = 0; i < filters.length; i++) {
        if (filters[i].contains(e.target)) return;
    }
    scope.preference_clients.filters_show = !scope.preference_clients.filters_show;
}
ev.schema_check = function (key, schema, form_open = false) {
    if (schema && schema.length > 50) {
        schema = JSON.parse(schema);
        if (schema.props) scope[key].props = schema.props;
        if (schema.draft && schema.draft != "" && schema.draft != undefined) {
            scope[key].draft = schema.draft;
            scope[key].draft = JSON.parse(JSON.stringify(scope[key].draft));
        }
        if (schema.actions)
            scope[key].actions = schema.actions;
        if (schema.form_header) scope[key].form_header = schema.form_header;
        if (schema.list_action) scope[key].list_action = schema.list_action;
        if (schema.add != undefined && schema.add != "") scope[key].add = schema.add;
        if (schema.has_table) scope[key].has_table = schema.has_table;
        if (schema.alter != undefined && schema.alter != "") scope[key].alter = schema.alter;
        if (schema.delete != undefined && schema.delete != "") scope[key].delete = schema.delete;
        if (schema.form_type) scope[key].form_type = schema.form_type;
        if (schema.back != undefined && schema.back != "") scope[key].back = schema.back;
        if (schema.issues) scope[key].issues = schema.issues;
        //
        if (schema.actions_append)
            for (var i = 0; i < schema.actions_append.length; i++)
                append_action_if_exist(scope[key], schema.actions_append[i]);
        //
        if (schema.actions_remove) {
            for (var i = 0; i < schema.actions_remove.length; i++)
                for (var j = 0; j < scope[key].actions.length; j++)
                    if (scope[key].actions[j] && schema.actions_remove[i] == scope[key].actions[j].key)
                        scope[key].actions = "";
            var actions_new = [];
            for (var j = 0; j < scope[key].actions.length; j++)
                if (scope[key].actions[i] != "")
                    actions_new.push(scope[key].actions[i]);
            scope[key].actions = actions_new;
        }

        if (schema.props_show) {
            for (var i = 0; i < schema.props_show.length; i++) {
                for (var j = 0; j < scope[key].props.length; j++) {
                    if (scope[key].props[j] && schema.props_show[i] == scope[key].props[j].key) {
                        scope[key].props[j].min = "true";
                        // scope[key].props[j].v = "true";
                    }
                }
            }
        }

        if (schema.props_hidden) {
            for (var i = 0; i < schema.props_hidden.length; i++) {
                for (var j = 0; j < scope[key].props.length; j++) {
                    if (scope[key].props[j] && schema.props_hidden[i] == scope[key].props[j].key) {
                        scope[key].props[j].min = "false";
                        // scope[key].props[j].v = "false";
                    }
                }
            }
        }
        //
        if (form_open && schema.in_form == "true") {
            $(scope[key].form_id).classList.add("true");
        }
        if (schema.props_allow)
            for (var i = 0; i < scope[key].props.length; i++)
                if (!is_in(scope[key].props[i].key, schema.props_allow))
                    scope[key].props[i].alter = 'false';
    }
}
ev.keyup = async function (e, item, src) {
    // ///////////////
    if (!src || src != 'ext')
        item = this;
    //
    if (item.dataset["override"] == 'false')
        return;
    //
    if (item.classList && item.classList.contains("disabled"))
        return;

    var value = item.value;
    if (item.type == "checkbox") {
        value = item.checked;
    }
    if (item.type == "radio") {
        value = item.value;
    }
    if (item.classList && item.classList.contains("_file_")) {
        const value_ = await file_to_base64(item.files[0]);
        value = value_;
        item.type = "text";
        item.type = "file";
    }
    /// ///////////////
    var key = item.dataset["key"];
    var prop = item.dataset["prop"];
    var prop2 = item.dataset["prop2"];
    var prop3 = item.dataset["prop3"];
    var prop4 = item.dataset["prop4"];
    var prop5 = item.dataset["prop5"];
    var prop6 = item.dataset["prop6"];
    var push = item.dataset["push"];
    //
    var type = item.dataset["type"];
    if (type == 'arr_chk') {
        if (!scope[key][prop][prop2])
            scope[key][prop][prop2] = [];
        for (let i = 0; i < scope[key][prop][prop2].length; i++) {
            if (scope[key][prop][prop2][i].key == prop3) {
                scope[key][prop][prop2][i].value = value;
                break;
            }
        }
        return;
    }
    if (type == 'inner') {
        var fkey = item.dataset.fkey;
        scope[key][prop] = scope[key].draft;
        scope[key][prop].d_parent = scope[fkey].data_.id;
    }
    //
    if (push && push == "true") {
        var d = item.dataset.d;
        if (prop2 != undefined && prop3 != undefined && _true(scope[key][prop]) && _true(scope[key][prop][prop2])) {
            if (!scope[key][prop][prop2][prop3] || typeof scope[key][prop][prop2][prop3] != "object")
                scope[key][prop][prop2][prop3] = [];
            if (value == true) {
                scope[key][prop][prop2][prop3].push(d);
            } else {
                array_remove(scope[key][prop][prop2][prop3], d);
            }

        } else if (prop2 != undefined && _true(scope[key][prop])) {
            if (!scope[key][prop][prop2] || typeof scope[key][prop][prop2] != "object")
                scope[key][prop][prop2] = [];
            if (value == true) {
                scope[key][prop][prop2].push(d);
            } else {
                array_remove(scope[key][prop][prop2], d);
            }
        } else {
            if (!scope[key][prop] || typeof scope[key][prop] != "object")
                scope[key][prop] = [];
            if (value == true) {
                scope[key][prop].push(d);
            } else {
                array_remove(scope[key][prop], d);
            }
        }
        return;
    }
    if (key && prop != undefined && _true(scope[key])) {
        if (prop2 != undefined && prop3 != undefined && prop4 != undefined && prop5 != undefined && prop6 != undefined &&
            _true(scope[key][prop]) && _true(scope[key][prop][prop2]) && _true(scope[key][prop][prop2][prop3]) &&
            _true(scope[key][prop][prop2][prop3][prop4]) && _true(scope[key][prop][prop2][prop3][prop4][prop5]))
            scope[key][prop][prop2][prop3][prop4][prop5][prop6] = value;

        else if (prop2 != undefined && prop3 != undefined && prop4 != undefined && prop5 != undefined &&
            _true(scope[key][prop]) && _true(scope[key][prop][prop2]) && _true(scope[key][prop][prop2][prop3]) && _true(scope[key][prop][prop2][prop3][prop4]))
            scope[key][prop][prop2][prop3][prop4][prop5] = value;

        else if (prop2 != undefined && prop3 != undefined && prop4 != undefined &&
            _true(scope[key][prop]) && _true(scope[key][prop][prop2]) && _true(scope[key][prop][prop2][prop3]))
            scope[key][prop][prop2][prop3][prop4] = value;

        else if (prop2 != undefined && prop3 != undefined && _true(scope[key][prop]) && _true(scope[key][prop][prop2]))
            scope[key][prop][prop2][prop3] = value;

        else if (prop2 != undefined && _true(scope[key][prop]))
            scope[key][prop][prop2] = value;

        else scope[key][prop] = value;
    }
    // if (key && prop && _true(scope[key]) && !prop2) // && _true(scope[key][prop])
    //     scope[key][prop] = value;
    // else if (key && prop && prop2 && _true(scope[key]) && _true(scope[key][prop]) && !prop3 && !prop4) // && _true(scope[key][prop][prop2])
    //     scope[key][prop][prop2] = value;
    // else if (key && prop && prop2 && prop3 && _true(scope[key]) && !prop4) // && _true(scope[key][prop][prop2][prop3])
    //     scope[key][prop][prop2][prop3] = value;
    // else if (key && prop && prop2 && prop3 && prop4 && _true(scope[key])) // && scope[key][prop][prop2][prop3][prop4])
    //     scope[key][prop][prop2][prop3][prop4] = value;
    //
    if (item.dataset["schema_reload"] == 'true') {
        ev.add(key, false, value, function () {});
    }
    //
    if (item.classList && item.classList.contains("_file_")) {
        scope[key][prop] = JSON.parse(JSON.stringify(scope[key][prop]));
    }
};
ev.change_src = function (e) {
    this.parentElement.querySelector("._file_").click();
};
ev.arr_push = function () {
    var key = this.dataset.key;
    var prop = this.dataset.prop;
    var prop2 = this.dataset.prop2;
    var prop_key = rivets.formatters.concat_(prop2, "arr_key");
    var prop_value = rivets.formatters.concat_(prop2, "arr_value");
    var obj = {
        key: scope[key][prop][prop_key],
        value: scope[key][prop][prop_value]
    };
    $("#" + prop_key).value = "";
    $("#" + prop_value).value = "";
    if (!scope[key][prop][prop2]) scope[key][prop][prop2] = [];
    scope[key][prop][prop2].push(obj);
    scope[key][prop] = JSON.parse(JSON.stringify(scope[key][prop]));
}
ev.arr_pop = function () {
    var key = this.dataset.key;
    var prop = this.dataset.prop;
    var prop2 = this.dataset.prop2;
    var prop3 = this.dataset.prop3;
    var i = this.dataset.i;
    if (!key || !prop || !i) return;
    i = parseInt(i);
    if (prop2 && prop3)
        scope[key][prop][prop2][prop3].splice(i, 1);
    else if (prop2)
        scope[key][prop][prop2].splice(i, 1);
    else
        scope[key][prop].splice(i, 1);
    scope[key][prop] = JSON.parse(JSON.stringify(scope[key][prop]));
}
ev.clear_error = function () {
    var key = this.dataset.p0;
    var prop = this.dataset.p1;
    var prop2 = this.dataset.p2;
    if (!key || !prop) return;
    if (prop2) {
        scope[key][prop][prop2] = false;
        return;
    }
    scope[key][prop] = false;
}
ev.form_message_hide = function () {
    var key = this.dataset.key;
    var prop = this.dataset.prop;
    var prop2 = this.dataset.prop2;
    if (!key || !prop) return;
    if (prop2) {
        scope[key][prop][prop2] = false;
        return;
    }
    scope[key][prop] = false;
}
ev.onsection = function () {
    var item = this;
    var key = this.dataset["key"];
    //remove all true classes
    //add true class to this
    //add true class to wrapper
    if (this.dataset["wrapper"] == "wrapper") {
        var _false = false;
        if (this.classList.contains('wtrue'))
            _false = true;
        for (var i = 0; i < sections.length; i++) {
            if (sections[i].wrap && sections[i].wrap == key)
                sections[i].wrap_true = _false;
            else if (sections[i].wrap && sections[i].wrap != "wrapper")
                sections[i].wrap_true = true;
            if (sections[i].key == key)
                sections[i].wtrue = !_false;
            else
                sections[i].wtrue = false;
        }
        return;
    }
    $$(".form").forEach(f => {
        f.classList.remove("true");
    });
    if (scope[key].has_table == "false") {
        ev.get_(key, "");
    } else if (scope[key].page != 1 || section_current != key) {
        scope.pages = [];
        scope.search.s = "";
        scope.search.s_ = "";
        scope.rows_total = 0;
        scope.prop = null;
        scope.val = null;
        //scope[key].page = 1;
        // scope.skip = 0;
        // scope.sort_asc = 0;
        // scope.sort_key = "id";
        ev.get(key);
    }
    $$('section.content').forEach(element => {
        element.classList.add('none');
    });
    $$('.aside .item').forEach(element => {
        element.classList.remove('true');
        if (element.dataset.key == item.dataset.wrapper) {
            element.classList.add('true');
        }
    });
    item.classList.add('true');
    if (scope[key].has_table == "true")
        $('#' + key).classList.remove('none');
    document.documentElement.scrollTo(0, 0);
    section_current = key;
}
ev.onform = function (e) {
    if (e.target.classList.contains("inside"))
        return;
    if (e.target.classList.contains("form"))
        ev.form_close(this.dataset.key);
}
ev.textarea_clear = function () {
    let ta_id = this.dataset.ta_id;
    let ta = $("#" + ta_id);
    ta.value = "";
}
ev.setColor = function () {
    scope[this.dataset.key].data_.color = this.dataset.color;
    this.parentElement.querySelectorAll('div').forEach(function (element) {
        element.classList.remove('true');
    });
    this.classList.add('true');
}
ev.img_set = function () {
    var modal_selector = scope[this.dataset.key].modal_selector;
    $(modal_selector).classList.remove("true");
    scope[this.dataset.key].data_[this.dataset.prop] = this.dataset.d;
}
ev.addkey = function () {
    var key = this.dataset.key;
    var prop = this.dataset.prop;
    var prop2 = this.dataset.prop2;
    if (!scope[key][prop][prop2])
        scope[key][prop][prop2] = [];
    else
        scope[key][prop][prop2].push({
            Key: '',
            Value: ''
        });
    scope[key][prop] = JSON.parse(JSON.stringify(scope[key][prop]));
}
ev.set_chart_pie = function (selector, _title, _data, is_dic) {
    if (selector == undefined) {
        console.log("set_chart_pie, selector is null");
        return;
    }
    if (_data == undefined) {
        console.log("set_chart_pie, _data is null");
        return;
    }
    var parent = $(selector).parentElement;
    parent.removeChild($(selector));
    parent.appendChild(document.createElement('canvas'));
    if (scope.charts[selector]) {
        scope.charts[selector].destroy();
    }
    //
    var ctx = $(selector).getContext('2d');
    var i = 0;
    var datasets_bgs = [];
    var datasets_data = [];
    var _labels = [];
    _data.forEach(item => {
        if (is_dic) {
            _labels.push(item.key);
            datasets_data.push(item.value);
            datasets_bgs.push(scope.colors[i % scope.colors.length - 1]);
        }
        if (!is_dic) {
            _labels.push(Object.keys(item)[0]);
            datasets_data.push(Object.values(item)[1]);
            datasets_bgs.push(item.color);
        }
        i++;
    });
    var config = {
        type: 'pie',
        data: {
            datasets: [{
                label: _title,
                data: datasets_data,
                backgroundColor: datasets_bgs,
            }],
            labels: _labels
        },
        options: {
            responsive: true,
            aspectRatio: _labels.length > 15 ? 0.85 : 1.3,
            rtl: false,
            legend: {
                'display': true,
                position: 'bottom',
                labels: {
                    boxWidth: 40,
                    align: 'start'
                }
            }
        }
    };
    new Chart(ctx, config);
    // if (!scope.charts[selector])
    //     scope.charts[selector] = new Chart(ctx, config);
    // else {
    //     scope.charts[selector].config = config;
    //     scope.charts[selector].update();
    // }
}
ev.set_chart_line = function (selector, _title, _data) {
    var parent = $(selector).parentElement;
    parent.removeChild($(selector));
    parent.appendChild(document.createElement('canvas'));
    if (scope.charts[selector]) {
        scope.charts[selector].destroy();
    }
    var ctx = $(selector).getContext('2d');
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    var i = parseInt(Math.random() * scope.colors.length - 1) + 1;
    //
    if (scope.charts[selector])
        scope.charts[selector].data.datasets.forEach(function (dataset) {
            dataset.data = [];
        });
    //
    var config = {
        type: 'line',
        data: {
            labels: _data.x,
            datasets: [{
                label: _title,
                data: _data.y,
                backgroundColor: scope.colors[i],
                borderColor: scope.colors[i],
                fill: false,
            }]
        },
        options: {
            responsive: true,
            title: {
                display: true,
                text: _title
            },
            tooltips: {
                mode: 'index',
                intersect: false,
            },
            hover: {
                mode: 'nearest',
                intersect: true
            },
            animation: {
                duration: 800 // general animation time
            },
            responsiveAnimationDuration: 0.2,
            scales: {
                xAxes: [{
                    display: true,
                    scaleLabel: {
                        display: true,
                        labelString: 'Day'
                    }
                }],
                yAxes: [{
                    display: true,
                    scaleLabel: {
                        display: true,
                        labelString: 'Value'
                    }
                }]
            }
        }
    };
    new Chart(ctx, config);
    //scope.charts[selector] = new Chart(ctx, config);
}
ev.page_change = function () {
    scope[this.dataset.key].page = this.dataset.d;
    ev.get(this.dataset.key);
}
ev.sort_set_listioner = function () {
    $$("table thead th.cp").forEach(th => {
        try {
            th.addEventListener("click", function () {
                if (this.dataset == undefined || this.dataset.sort_key == undefined) return;
                scope.prop = null;
                scope.val = null;
                var key = this.dataset.sort_key;
                if (scope.sort_key == key) {
                    if (scope.sort_asc == 1) {
                        scope.sort_asc = 0;
                        this.querySelector("span").classList.add("desc");
                    } else {
                        scope.sort_asc = 1;
                        this.querySelector("span").classList.remove("desc");
                    }
                } else {
                    scope.sort_asc = 1;
                    this.querySelector("span").classList.remove("desc");
                }
                scope.sort_key = key;
                ev.get(th.parentElement.parentElement.dataset.key, this.dataset.prop, this.dataset.d);
            });
        } catch (x) {}
    });
}
ev.set_tab = function (item) {
    if (this.classList.contains("disable")) return;
    var t_old = scope[this.dataset.key].tab;
    scope[this.dataset.key].tab = this.dataset.tab;
    if (this.dataset.gkey && this.dataset.d) {
        scope.prop = this.dataset.prop;
        scope.val = this.dataset.d;
        ev.get(this.dataset.gkey, this.dataset.prop, this.dataset.d);
    }
    if (this.dataset.g_ && scope[this.dataset.key] && scope[this.dataset.key].data_ &&
        (!scope[this.dataset.key].data_[this.dataset.tab] || scope[this.dataset.key].data_[this.dataset.tab].length < 1))
        ev.get_(this.dataset.key, scope[this.dataset.key].data_.id);
    if (this.dataset.set) {
        var i = parseInt(this.dataset.i);
        scope[this.dataset.key].data_[this.dataset.tab] = scope[this.dataset.key].data_[t_old][i][this.dataset.prop];
    }
    ev.sort_set_listioner();
}
ev.row_new = function () {
    if (scope[this.dataset.key][this.dataset.prop] == undefined) scope[this.dataset.key][this.dataset.prop] = [];
    var d = {};
    if (this.value)
        d[this.dataset.prop_] = this.value;
    scope[this.dataset.key][this.dataset.prop].push(d);
    this.value = undefined;
}
ev.row_del = function () {
    if (scope[this.dataset.key][this.dataset.prop] == undefined) return;
    if (this.dataset.id != undefined) {
        scope[this.dataset.key].data_.id = this.dataset.id;
        ev.delete(this.dataset.key);
    } else {
        scope[this.dataset.key][this.dataset.prop].splice(this.dataset.i, 1);
    }
    if (this.dataset.key == "invoice_stuffs") {
        ev.invoice_stuffs.calc_amount();
    }
    this.value = undefined;
}
ev.file_to_base64 = async function () {
    let files = this.files;
    if (files.length == 0) return;
    // 
    let fkey = this.dataset.fkey;
    let prop = this.dataset.prop;
    let prop2 = this.dataset.prop2;
    let prop3 = this.dataset.prop3;
    let prop4 = this.dataset.prop4;
    let prop_last;
    let multiple = this.hasAttribute("multiple");
    let target;
    if (prop2 && prop3 && prop4) {
        target = scope[fkey][prop][prop2][prop3];
        prop_last = prop4;
    } else if (prop2 && prop3) {
        target = scope[fkey][prop][prop2];
        prop_last = prop3;
    } else if (prop2) {
        target = scope[fkey][prop];
        prop_last = prop2;
    } else {
        target = scope[fkey];
        prop_last = prop;
    }
    let res = await get_uploaded_files(files, multiple);
    if (multiple) {
        target[prop_last] = target[prop_last].concat(res);
    } else {
        target[prop_last] = res;
    }
    if (this.dataset.set = "true") {
        let key = this.dataset.key;
        let d_parent = this.dataset.d_parent;
        ev.attachments_set(res, key, fkey, d_parent);
    }
    this.type = "text";
    this.type = "file";
    //optional -> if file is image and .preveiw exist
    try {
        let img = this.parentElement.querySelector(".preview");
        img.src = "";
    } catch (x) {

    }
}
ev.drop_handle = async function (e) {
    console.log('File(s) dropped');
    // Prevent default behavior (Prevent file from being opened)
    e.preventDefault();
    let d_parent = this.dataset.d_parent;
    let key = this.dataset.key;
    let fkey = this.dataset.fkey;
    let prop = this.dataset.prop;
    let prop2 = this.dataset.prop2;

    let files = [];
    if (e.dataTransfer.items) {
        // Use DataTransferItemList interface to access the file(s)
        for (var i = 0; i < e.dataTransfer.items.length; i++) {
            if (e.dataTransfer.items[i].kind === 'file') {
                var file = e.dataTransfer.items[i].getAsFile();
                files.push(file);
            }
        }
    } else {
        // Use DataTransfer interface to access the file(s)
        files = e.dataTransfer.files;
    }
    if (files.length == 0) return;
    let res = await get_uploaded_files(files, true);
    if(prop2){
        if (!scope[fkey][prop][prop2]) scope[fkey][prop][prop2] = [];
        scope[fkey][prop][prop2] = scope[fkey][prop][prop2].concat(res);
    } else {
        if (!scope[fkey][prop]) scope[fkey][prop] = [];
        scope[fkey][prop] = scope[fkey][prop].concat(res);
    }
    console.log(res.length + ' File(s) converted!');
    if(key) ev.attachments_set(res, key, fkey, d_parent);
}
ev.attachments_set = function (attachments, key, fkey, d_parent) {
    let get_ = false;
    for (let i = 0; i < attachments.length; i++) {
        scope[key].data_ = attachments[i];
        scope[key].data_.d_parent = d_parent;
        if (i == attachments.length - 1) {
            get_ = {
                key: fkey
            };
        }
        ev.set(key, false, get_);
    }
}
ev.drag_handle = function (e) {
    e.preventDefault();
}
ev.is_active = function () {
    if (document.activeElement != this) {
        this.value = "";
        return;
    };
    this.value = scope.search.s;
}
ev.menu_toggle = function () {
    $("#main").classList.toggle("expand");
}
ev.find_section_prop = function (key, prop) {
    for (let i = 0; i < sections.length; i++) {
        if (sections[i].key == key) {
            for (let j = 0; j < sections[i].props.length; j++) {
                if (sections[i].props[j].key == prop)
                    return sections[i].props[j];
            }
        }
    }
    return null;
}
ev.modules_change = function () {

}
ev.login_section_change = function (d) {
    if (typeof d == "object") {
        d = parseInt(this.dataset.d);
    }
    scope.login_section = d;
}
ev.modal_text_set = function () {
    let modal = $("#modal_text");
    modal.querySelector(".header_text").innerText = this.dataset.header;
    modal.querySelector(".body").innerText = this.dataset.body;
    modal.querySelector(".form").classList.add("true");
    modal.classList.add("true");
}
ev.modal_close = function () {
    let modal = $("#" + this.dataset.modal_id);
    modal.classList.remove("true");
}
//#endregion

//#endregion

//#region custom binders
rivets.binders['style-*'] = function (el, value) {
    el.style.setProperty(this.args[0], value);
};
rivets.binders['_bind-*'] = function (el, val) {
    if (val == undefined) return;
    var dd = this.args[0];
    if (dd == 'd' && el.type != "radio") {
        el.value = val;
    } else
        el[dd] = val;
    if (dd == 'src') {
        if (val == undefined || val == "1") el.classList.add("none");
        else el.classList.remove("none");
        el.value = val;
    }
    if (el.type == "checkbox") {
        if (!chk_val(val)) {
            el.value = false;
            el.checked = false;
        } else {
            el.value = true;
            el.checked = true;
        }
    }
    if (el.type == "radio") {
        if (!chk_val(val)) {
            el.checked = false;
            el.dataset.checked = false;
        } else {
            el.checked = true;
            el.dataset.checked = true;
        }
    }
};
rivets.binders['if_'] = function (el, val) {
    if (el == null || val == undefined) return null;
    // if(el.parentElement == null) {
    //     console.log(el);
    //     return;
    // }
    if (val == false || val == "false" || val == undefined) {
        // console.log(el);
        // console.log(val);
        // console.log(this.args);
        el = $("#" + el.id);
        if (el == null) {
            return null;
        }
        el.parentElement.removeChild(el);
    }
    return null;
};

//#endregion

//#region formatters: read rivets guidline to understand formatters
rivets.formatters.div = function (x, y) {
    if (x == undefined || y == undefined || y == 0) return 0;
    return x / y;
}
rivets.formatters.percentage = function (c, arr) {
    if (c == undefined || arr == undefined || arr.length == 0) return 0;
    return (((c - 1) / (arr.length - 1)) * 100) + "%";
}
rivets.formatters.parse = function (x) {
    if (x == undefined || x == null) return false;
    if (x == "true") return true;
    if (x == "false") return false;
    if (!isNaN(Number(x))) return Number(x);
    return x;
}
rivets.formatters.disallow_alter = function (alter, id) {
    if (id == "" || id == undefined) return false;
    if (alter == "false" || alter == false) return true;
    return false;
}
rivets.formatters.eq = function (x, y) {
    if (x == undefined || y == undefined) return false;
    return x == y;
}
rivets.formatters.neq = function (x, y) {
    if (x == undefined || y == undefined) return false;
    return x != y;
}
rivets.formatters.eq_raw = function (x, y) {
    return x == y;
}
rivets.formatters.neq_raw = function (x, y) {
    return x != y;
}
rivets.formatters.and = function (x, y) {
    if (x == undefined || y == undefined) return false;
    return x && y;
}
rivets.formatters.or = function (x, y) {
    if (x == undefined || y == undefined) return false;
    return x || y;
}
rivets.formatters.or_ = function (x, y) {
    if (x == undefined || y == undefined) return false;
    if (x == "true" || x == true || x == 1) return true;
    if (y == "true" || y == true || y == 1) return true;
    return false;
}
rivets.formatters.and_str = function (x, y) {
    if (x == undefined || x == null || y == undefined || y == null) return false;
    if (x == "true" && y == "true") return true;
    return false;
}
rivets.formatters.eq_obj = function (x) {
    if (x == 'obj')
        return true;
    return false;
}
rivets.formatters.is_true = function (x) {
    if (x == 'true' || x == true || x == 1)
        return true;
    return false;
}
rivets.formatters.len = function (arr) {
    if (!arr) return 0;
    return arr.length;
}
rivets.formatters.not = function (x) {
    if (x == undefined) return x;
    return !x;
}
rivets.formatters.datetime = function (obj) {
    var date = new Date(obj).toLocaleDateString() + ' ' + new Date(obj).toLocaleTimeString();
    if (!date) return "";
    return date;
}
rivets.formatters.date = function (obj) {
    var date = new Date(obj);
    if (!date) return "";
    date = date.getFullYear() + "-" + min2(date.getMonth() + 1) + "-" + min2(date.getDate());
    return date;
}
rivets.formatters.utcdatetime = function (long) {
    var date = utclong_to_dt(long);
    if (!date) return "";
    return date;
}
rivets.formatters.keys = function (obj) {
    if (!obj) return [];
    return Object.keys(obj);
}
rivets.formatters.plus_one = function (i) {
    return i + 1;
}
rivets.formatters.minus_one = function (i) {
    return i - 1;
}
rivets.formatters.nonegative = function (i) {
    if (i < 0) return 0;
    return i;
}
rivets.formatters.empty_string = function (str) {
    if (str == undefined || str == "") return "";
    return str;
}
rivets.formatters.isnt_null_or_empty = function (str) {
    if (str == undefined || typeof str != "string" || str == "") return false;
    return true;
}
rivets.formatters.prefix = function (a, b) {
    if (a == undefined || b == undefined) return "";
    return b + a;
}
rivets.formatters.concat_ = function (a, b) {
    if (a == undefined || b == undefined) return "";
    return a.toString() + b.toString();
}
rivets.formatters.concat_before = function (a, b) {
    if (a == undefined || b == undefined) return "";
    return b.toString() + a.toString();
}
rivets.formatters.at = function (arr, i, prop) {
    if (arr == undefined || i == undefined) return "";
    var res = arr[i];
    if (prop) return res[prop];
    return res;
}
rivets.formatters.val = function (data, key) {
    if (typeof (data) != "object") {
        this.value = data;
        return "";
    }
    if (!data)
        return "";
    if (data[key] != undefined && data[key] != null)
        return data[key];
    return "";
}
rivets.formatters.val2 = function (data, key, key2) {
    if (typeof (data) != "object") {
        this.value = data;
        return "";
    }
    if (data[key] && data[key][key2])
        return data[key][key2];
    return "";
}
rivets.formatters.val3 = function (data, key, key2, key3) {
    if (data && data[key] && data[key][key2] && data[key][key2][key3])
        return data[key][key2][key3];
    return "";
}
rivets.formatters.val4 = function (data, key, key2, key3, key4) {
    if (data && data[key] && data[key][key2] && data[key][key2][key3] && data[key][key2][key4])
        return data[key][key2][key3][key4];
    return "";
}
rivets.formatters.val_dt = function (data, key) {
    if (data && data[key]) {
        return rivets.formatters.datetime(data[key]);
    }
    return "";
}
rivets.formatters.val_date = function (data, key) {
    if (data && data[key]) {
        return rivets.formatters.date(data[key]);
    }
    return "";
}
rivets.formatters.val_num = function (data, key) {
    if (data[key]) {
        var val = data[key].toString();
        val = val.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        return val;
    }
    return "";
}
rivets.formatters.id_rnd = function () {
    return '_' + parseInt(Math.random() * 1000000000);
}
rivets.formatters.val_props = function (data, key) {
    if (data[key] && data[key].props)
        console.log(data[key].props);
    if (data[key] && data[key].props)
        return data[key].props;
    return [];
}
rivets.formatters.val_obj_keys = function (data, key) {
    console.log(key);
    if (!data[key])
        return [];
    if (typeof data[key] != Object)
        return [];
    var d = Object.keys(data[key]);
    return d;
}
rivets.formatters.val_arr = function (data, key1, key2, index) {
    if (data[key1] && data[key1][index] && data[key1][index][key2])
        return data[key1][index][key2];
    return {};
}
rivets.formatters.true_and_eq = function (param1, param2, param3) {
    if (!rivets.formatters.is_true(param1))
        return false;
    return param2 == param3;
}
rivets.formatters.val_dic = function (data, fkey, prop_data) {
    if (!data[fkey])
        return "";
    return data[fkey][prop_data];

}
rivets.formatters.val_has = function (data, key, val) {
    if (!data[key])
        return false;
    for (var i = 0; i < data[key].length; i++)
        if (data[key][i] == val)
            return true;
    return false;
}
rivets.formatters.val_has_checked = function (data, key, val) {
    if (!data[key])
        return false;
    for (var i = 0; i < data[key].length; i++)
        if (data[key][i] == val)
            return "checked";
    return false;
}
rivets.formatters.prop_d = function (section, d) {
    if (!section || (!section.draft || Object.keys(section.draft).length == 0))
        return "";
    for (var i = 0; i < section.props.length; i++)
        if (section.props[i].filter_d == d)
            return section.draft[section.props[i].key];
    return "";
}
rivets.formatters.keys = function (obj) {
    if (!obj)
        return [];
    return Object.keys(obj);
}
rivets.formatters.keys_val = function (data, key) {
    var val = rivets.formatters.val(data, key);
    if (!val)
        return [];
    return Object.keys(val);
}
rivets.formatters.keys_val_i0 = function (data, key) {
    var val = rivets.formatters.val(data, key);
    if (!val || val.length == 0)
        return [];
    return Object.keys(val[0]);
}
rivets.formatters.contains = function (x, y) {
    return x.toString().indexOf(y) != -1;
}
rivets.formatters.contains_arr_prop = function (arr, prop, val) {
    if (!arr || !arr[prop]) return false;
    return arr[prop].indexOf(val) != -1;
}
rivets.formatters.show_section = function (section) {
    return section.has_section == 'true' || section.wrap == 'wrapper';
}
rivets.formatters.concat = function (a, b) {
    if (a == undefined) return b;
    if (b == undefined) return a;
    if (typeof a != "string") return b;
    if (typeof b != "string") return a;
    return a + " " + b;
}
rivets.formatters.parent_filter = function (arr, parent_prop, parent) {
    var res = [];
    arr.forEach(c => {
        if (c[parent_prop] == parent)
            res.push(c);
    });
    return res;
}
rivets.formatters.is_undefined = function (x) {
    return x == undefined;
}
rivets.formatters.divide = function (x, y) {
    if (x == undefined || y == undefined) return x;
    if (y == 0) return Infinity;
    return x / y;
}
rivets.formatters.slice = function (arr, start, end) {
    if (arr == undefined) return [];
    if (start == undefined || end == undefined) return [];
    return arr.slice(start, end);
}
rivets.formatters.sep3 = function (str) {
    let char_grouping = '.';
    let char_decimal = ',';
    if (str == undefined || str == null) return "";
    try {
        str = str.toString();
    } catch (x) {
        return "";
    }
    var is_negative = false;
    if (str[0] == "-") is_negative = true;
    str = (dirty_num_to_num(str)).toString();
    let last = str.indexOf('.');
    if (last == -1) last = str.length;
    let str_end = str.substr(last + 1, str.length);
    if(str_end != "") str_end = char_decimal + str_end;
    str = str.substr(0, last);
    var set_i = str.length % 3;
    var res = "";
    for (var i = 0; i < str.length; i++) {
        if (i != 0 && i % 3 == set_i) {
            res += char_grouping;
        }
        res += str[i];
    }
    if (is_negative) res = "-" + res + str_end;
    return res + str_end;
}
rivets.formatters.sep4 = function (str) {
    if (str == undefined) return "";
    try {
        str = str.toString();
    } catch (x) {
        return "";
    }
    str = (dirty_num_to_num(str)).toString();
    var res = "";
    for (var i = 0; i < str.length; i++) {
        if (i != 0 && i % 4 == 0) res += " ";
        res += str[i];
    }
    return res;
}
rivets.formatters.show_props = function (props) {
    if (!props || typeof props != "object" || !props.length) return false;
    for (let i = 0; i < props.length; i++) {
        if (props[i].filter == "true" && props[i].v == "true") return true;
    }
    return false;
}
rivets.formatters.show_props_filters = function (props) {
    if (!props || typeof props != "object" || !props.length) return false;
    for (let i = 0; i < props.length; i++) {
        if (props[i].filter == "true" && props[i].v == "true" && props[i].type != 'toggle' && props[i].type != 'radio')
            return true;
    }
    return false;
}
rivets.formatters.has_img = function (src, show) {
    if (!src || src == "" || src == "1" || src == "data" || src.length < 5)
        return show == "false" ? true : false;
    return show == "true" ? true : false;
}
rivets.formatters.has_actions = function (actions, position) {
    if (!actions || actions.length == 0) return false;
    for (let i = 0; i < actions.length; i++) {
        if (position != undefined) {
            if (actions[i] && actions[i].position == position)
                return true;
        } else {
            return true;
        }
    }
    return false;
}
rivets.formatters.is_hidden = function (prop, id) {
    if (prop.v == "false" || (id == "" && prop.draft == "false") || prop.form == "false") {
        return true;
    }
    return false;
}
rivets.formatters.show_submit = function (alter, add, id) {
    if (add == "true" && (id == undefined || id == "")) {
        return true;
    }
    if (alter == "true" && (id != "")) {
        return true;
    }
    return false;
}
rivets.formatters.paginate_after_need = paginate_after_need;
rivets.formatters.paginate_before_need = paginate_before_need;
//#endregion