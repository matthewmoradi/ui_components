var scope = {};
var ev = {};
var sections = [];
ev.dashboard = {};
ev.notifications = {};
ev.todos = {};

scope.page = 1;
scope.pages = [];
scope.page_count = [];
scope.rows_total = 0;
scope.sort_asc = 0;
scope.sort_key = "id";

/////////////////////
scope.url = {};
scope.url.server = "";
scope.sep = ";";
scope.pref = {};
scope.self = {};
scope.self.time_zone = "Europe/Istanbul";
scope.self.time_format = "en-TR";
scope.self.theme = "light";
scope.key_const = "JpTkdJeEMlVEYzJZ";

////////////////////dashboard
scope.date_from = {};
scope.date_to = {};
scope.search = {};
scope.search_ready = false;
scope.search_timeout = null;
scope.skip = 0;

ev.self_ = {};
scope.charts = {};
scope.login = {};
scope.login_section = 1;
scope.register = {};
scope.login.form_error_txt = "error";
// scope.register.form_error_1_txt = "The mail you used is registered in our system.";
// scope.register.form_error_1 = true;
scope.register.terms_1 = "false";
scope.register.terms_2 = "false";
scope.register.terms_3 = "false";
scope.register.sales_agreement = "https://romsis.com.tr/6698kisiselverilerinkorunmasikanunu.pdf";
scope.register.step = 1;
scope.register.package = "";
scope.packages = [];
scope.register.cities = [];

scope.register.steps = [{
    title: "Your Information",
    number: 1,
    passed: false,
}, {
    title: "Company Information",
    number: 2,
    passed: false,
}, {
    title: "Invite Co-Workers",
    number: 3,
    passed: false,
}, {
    title: "Payment info",
    number: 4,
    passed: false,
}, {
    title: "Completed",
    number: 5,
    passed: false,
}];

scope.card_months = [{
    title: "1 - Jan",
    value: 1
},{
    title: "2 - Feb",
    value: 2
},{
    title: "3 - Mar",
    value: 3
},{
    title: "4 - Apr",
    value: 4
},{
    title: "5 - May",
    value: 5
},{
    title: "6 - Jun",
    value: 6
},{
    title: "7 - Jul",
    value: 7
},{
    title: "8 - Aug",
    value: 8
},{
    title: "9 - Sep",
    value: 9
},{
    title: "10 - Oct",
    value: 10
},{
    title: "11 - Nov",
    value: 11
},{
    title: "12 - Dec",
    value: 12
}]

scope.card_years = [{
    title: "2020",
    value: 2020
},{
    title: "2021",
    value: 2021
},{
    title: "2022",
    value: 2022
},{
    title: "2023",
    value: 2023
},{
    title: "2024",
    value: 2024
},{
    title: "2025",
    value: 2025
},{
    title: "2026",
    value: 2026
},{
    title: "2027",
    value: 2027
},{
    title: "2028",
    value: 2028
},{
    title: "2029",
    value: 2029
},{
    title: "2030",
    value: 2030
},{
    title: "2031",
    value: 2031
}]

scope.register.coworkers = [];
scope.payment_src = false;
scope.logo = "assets/images/logo.png";
scope.payments = [
    {
        name: "Visa",
        src: "assets/icons/visa.svg",
        prefixes: ["4"],
        lens: [13, 16]
    }, {
        name: "Master",
        src: "assets/icons/master.svg",
        prefixes: ["5"],
        lens_valid: [16]
    }, {
        name: "American Express",
        src: "assets/icons/amex.svg",
        prefixes: ["34", "37"],
        lens_valid: [15]
    }, {
        name: "Troy",
        src: "assets/icons/troy.svg",
        prefixes: ["979200", "979289"],
        lens_valid: [16]
    }
];

scope.forgot = {};

scope.dic = {};
var section_current = "";
var img_def;
var toast_timeout;
var toast_top = 7;
var toast_top_default = 7;
var toast_right_default = -40;
var toast_right_true = 42;
//some colors to use for different places like charts and etc.
scope.colors = [
    "#922b21", "#943126", "#6c3483", "#1f618d", "#2874a6", "#148f77", "#117a65", "#1e8449", "#239b56", "#b7950b", "#b9770e", "#af601a", "#a04000", "#b3b6b7", "#909497", "#717d7e", "#283747", "#212f3d"
];

scope.vendor_offer = {};
scope.vendor_offer.is_detail = "false";
scope.vendor_offer.server = "/";