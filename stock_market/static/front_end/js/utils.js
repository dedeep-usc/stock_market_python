import * as constants from './constants.js'
// import Highcharts from 'https://code.highcharts.com/highcharts.src.js'
import Highstock from 'https://code.highcharts.com/es-modules/masters/highcharts.src.js';
import 'https://code.highcharts.com/es-modules/masters/modules/accessibility.src.js';
import 'https://code.highcharts.com/es-modules/masters/highcharts-more.src.js'


export function searchSymbol() {
    var company_symbol = document.getElementById(constants.SEARCH_BOX_ID).value;
    console.log(`company symbol from search box: ${company_symbol}`);

    if (company_symbol == null || company_symbol == "") {
        console.log(`company symbol is null. Raising the kind of pop up.`);
        document.getElementById(constants.SEARCH_BOX_ID).setCustomValidity(constants.COMPANY_MISSING_MSG);
        document.getElementById(constants.SEARCH_BOX_ID).reportValidity();
        return;
    }

    // Get all information from the backend and display it 

    // set error tab to display: none
    document.getElementById(constants.ERROR_MSG_DIV).style.display = "none"
    
    // set all news tab display to none
    set_news_tab_display_none()
    // Company info tab



    get_company_info(company_symbol);
    get_stock_quote(company_symbol);
    get_company_recommendation(company_symbol);
    get_company_news(company_symbol);
    get_stock_candles(company_symbol);
}

export function highcharts_build(data){
    console.log(Highstock)
    Highstock.stockChart('container', {


        title: {
            text: 'AAPL stock price by minute'
        },

        subtitle: {
            text: 'Using ordinal X axis'
        },

        xAxis: {
            gapGridLineWidth: 0
        },

        rangeSelector: {
            buttons: [{
                type: 'hour',
                count: 1,
                text: '1h'
            }, {
                type: 'day',
                count: 1,
                text: '1D'
            }, {
                type: 'all',
                count: 1,
                text: 'All'
            }],
            selected: 1,
            inputEnabled: false
        },

        series: [{
            name: 'AAPL',
            type: 'area',
            data: data,
            gapSize: 5,
            tooltip: {
                valueDecimals: 2
            },
            fillColor: {
                linearGradient: {
                    x1: 0,
                    y1: 0,
                    x2: 0,
                    y2: 1
                },
                stops: [
                    [0, Highcharts.getOptions().colors[0]],
                    [1, Highcharts.color(Highcharts.getOptions().colors[0]).setOpacity(0).get('rgba')]
                ]
            },
            threshold: null
        }]
    });
}

export function get_stock_candles(company_symbol) {
    var company_stock_candles_url = constants.ENDPOINT + constants.COMPANY_CHART_API + company_symbol;
    console.log(`company_news_url: ${company_stock_candles_url}`)
    ajax_request(company_stock_candles_url, handle_stock_candles_response);
}

export function handle_stock_candles_response(result, status, xhr) {
    console.log(JSON.stringify(result));
    console.log(status);
    console.log(xhr);
    if (check_error()) {
        handle_error();
        return;
    }

    fill_stock_candles(result);
}

export function fill_stock_candles(result) {
    result = result.result;
    // candles = result.c;
    // times = result.t;
    // volumes = result.v;
    var date_price = result.date_price;
    var date_volume = result.date_volume;

    highcharts_build(date_price);
}

export function set_news_tab_display_none() {
    var i;
    // set all news div display to hidden
    var ind_news_tabs = document.getElementsByClassName(constants.INDIVIDUAL_NEWS_TABS);

    for (i=0; i<ind_news_tabs.length; i++) {
        ind_news_tabs[i].style.display = "none"
    }
}

export function get_company_news(company_symbol) {
    var company_news_url = constants.ENDPOINT + constants.COMPANY_NEWS_API + company_symbol;
    console.log(`company_news_url: ${company_news_url}`)
    ajax_request(company_news_url, handle_company_news_response);
    
}

export function handle_company_news_response(result, status, xhr) {
    console.log(JSON.stringify(result));
    console.log(status);
    console.log(xhr);
    if (check_error()) {
        handle_error();
        return;
    }

    fill_compnay_news_data(result);
}

export function fill_compnay_news_data(result) {
    result = result.result;
    var i;
    // set all news div display to hidden
    var ind_news_tabs = document.getElementsByClassName(constants.INDIVIDUAL_NEWS_TABS);

    for (i=0; i<ind_news_tabs.length; i++) {
        ind_news_tabs[i].style.display = "none"
    }

    // set content from the news data 
    var count = 0;

    for (i=0; i<result.length; i++) {
        if (!check_valid_news_data(result[i])) {
            console.log(`Skipping result no: ${i} as all required information is not present.`)
            continue;
        }
        if (count == 5) {
            break;
        }
        ind_news_tabs[count].style.display = "flex";
        var ind_news_tab_children = ind_news_tabs[count].children;
        fill_news_iamge_div(ind_news_tab_children[0], result[i]);
        fill_news_tab_content(ind_news_tab_children[1], result[i])
        count += 1;
    }
}

export function fill_news_tab_content(news_content_div, result) {
    var news_content_div_children = news_content_div.children;
    news_content_div_children[0].innerHTML = result.headline;
    news_content_div_children[1].innerHTML = convert_unix_epoch_to_datetime(result.datetime);
    news_content_div_children[2].children[0].href = result.url;
}

export function convert_unix_epoch_to_datetime(unix_epoch) {
    var MONTH_NAMES = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];
    var d = new Date(unix_epoch*1000);
    var d_str = d.getDate() + " " + MONTH_NAMES[d.getMonth()] + ", " + d.getFullYear();
    return d_str;
}

export function fill_news_iamge_div(news_img_div, result) {
    console.log(result.image);
    var url = "url(" + result.image + ")"
    news_img_div.style.backgroundImage = url;
}

export function check_valid_news_data(news_data) {
    if (news_data.image == undefined || news_data.image == null || news_data.image == "") {
        return false;
    }

    if (news_data.url == undefined || news_data.url == null || news_data.url == "") {
        return false;
    }

    if (news_data.headline == undefined || news_data.headline == null || news_data.headline == "") {
        return false;
    }

    if (news_data.datetime == undefined || news_data.datetime == null || news_data.datetime == "") {
        return false;
    }

    return true;
}

export function get_company_recommendation(company_symbol) {
    var company_recom_url = constants.ENDPOINT + constants.COMPANY_RECOMMENDATION_API + company_symbol;
    console.log(`company_recom_url: ${company_recom_url}`);
    ajax_request(company_recom_url, handle_company_recom_response);
}

export function handle_company_recom_response(result, status, xhr) {
    console.log(JSON.stringify(result));
    console.log(status);
    console.log(xhr);
    if (check_error()) {
        handle_error();
        return;
    }

    fill_company_recom_data(result);
}

export function fill_company_recom_data(result) {
    result = result.result[0];

    document.getElementById(constants.SS_NUMBER).innerHTML = result.strongSell;
    document.getElementById(constants.S_NUMBER).innerHTML = result.sell;
    document.getElementById(constants.H_NUMBER).innerHTML = result.hold;
    document.getElementById(constants.B_NUMBER).innerHTML = result.buy;
    document.getElementById(constants.SB_NUMBER).innerHTML = result.strongBuy;

}

export function get_stock_quote(company_symbol) {
    var company_quote_url = constants.ENDPOINT + constants.COMPANY_QUOTE_API + company_symbol;
    console.log(`company_quote_url: ${company_quote_url}`);
    ajax_request(company_quote_url, handle_company_quote_response);
}

export function handle_company_quote_response(result, status, xhr) {
    console.log(JSON.stringify(result));
    console.log(status);
    console.log(xhr);

    if (check_error()) {
        handle_error();
        return;
    }

    fill_company_quote_data(result);
}

export function fill_company_quote_data(result) {
    result = result.result;
    var MONTH_NAMES = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];
    var d = new Date(result.t*1000);
    console.log(d.toLocaleString());
    console.log(d.getMonth());
    var d_str = d.getDate() + " " + MONTH_NAMES[d.getMonth()] + ", " + d.getFullYear();
    document.getElementById(constants.SS_TAB_TRADING_DAY).innerHTML = d_str;

    document.getElementById(constants.SS_TAB_PCP).innerHTML = result.pc;
    document.getElementById(constants.SS_TAB_OP).innerHTML = result.o;
    document.getElementById(constants.SS_TAB_HP).innerHTML = result.h;
    document.getElementById(constants.SS_TAB_LP).innerHTML = result.l;
    document.getElementById(constants.SS_TAB_CHANGE).innerHTML = result.d;
    document.getElementById(constants.SS_TAB_CHANGE_PERC).innerHTML = result.dp;

    if (result.d < 0) {
        set_sign_for_movement_div(constants.SS_TAB_NEG_CHANGE_URL);
    } else if (result.d > 0) {
        set_sign_for_movement_div(constants.SS_TAB_POS_CHANGE_URL);
    } else {
        set_sign_for_movement_div("");
    }
}

export function set_sign_for_movement_div(url) {
    var i, signs;
    signs = document.getElementsByClassName(constants.SS_TAB_CHANGE_SIGN_CLASS);

    for (i=0; i<signs.length; i++) {
        signs[i].style.backgroundImage = "url(" + url + ")";
    }
}

export function handle_ajax_error(result, status, xhr) {
    console.log(`error result: ${JSON.stringify(result)}`);
    console.log(`error status: ${status}`);
    console.log(`error xhr: ${xhr}`);
    // console.log(result.responseText);
    // console.log(Object.prototype.toString.call(result.responseText));
    result = JSON.parse(result.responseText).result;
    // console.log(result);
    // console.log(Object.prototype.toString.call(result));
    var company = result.company;
    console.log(`company from result: ${company}`);
    var company_symbol = document.getElementById(constants.SEARCH_BOX_ID).value;
    console.log(`company symbol from search box: ${company_symbol}`);
    if (company != company_symbol.toUpperCase()) {
        return;
    }
    // document.getElementById(constants.CONTENT_DIV).style.display = "none";
    // document.getElementById(constants.ERROR_MSG_DIV).style.display = "block";

    handle_error();

}

export function handle_error() {
    document.getElementById(constants.CONTENT_DIV).style.display = "none";
    document.getElementById(constants.ERROR_MSG_DIV).style.display = "block";
}

export function get_company_info(company_symbol) {
    var company_info_url = constants.ENDPOINT + constants.COMPANY_INFO_API + company_symbol;
    console.log(`company_info_url: ${company_info_url}`)
    ajax_request(company_info_url, handle_company_info_response)
}

export function handle_company_info_response(result, status, xhr) {
    console.log(JSON.stringify(result));
    console.log(status);
    console.log(xhr);

    if (check_error()) {
        handle_error();
        return
    }

    // Make all buttons and div to correct state
    handle_search_btn_displays();

    // Add all data required
    fill_company_info_data(result);

}

export function fill_company_info_data(result) {
    result = result.result;
    
    // company logo
    var url = "url(" + result.logo + ")"
    document.getElementById(constants.COMPANY_LOG_ELEMENT).style.backgroundImage = url;

    document.getElementById(constants.COMPANY_TAG_NAME).innerHTML = result.name || "NAME";
    document.getElementById(constants.COMPANY_TAB_STOCK_SYMBOL).innerHTML = result.ticker || "TICK";
    document.getElementById(constants.SS_TAB_STOCK_TICKER_SYMBOL).innerHTML = result.ticker || "TICK";
    document.getElementById(constants.COMPANY_TAB_STOCK_EXCHANGE_CODE).innerHTML = result.exchange || "NASDAQ NMS - GLOBAL MARKET";
    document.getElementById(constants.COMPANY_TAB_IPO_DATE).innerHTML = result.ipo || "1970-01-01";
    document.getElementById(constants.COMPANY_TAB_CATEGORY).innerHTML = result.finnhubIndustry || "undefined";

}

export function check_error() {
    var error_display_val = document.getElementById(constants.ERROR_MSG_DIV).style.display;
    console.log(`error_display_val: ${error_display_val} in 'check_error'.`)
    return error_display_val == "block"
}

export function ajax_request(url, handler) {
    console.log(`Making AJAX request to url: ${url}.`)
    $.ajax({
        url: url,
        success: handler,
        error: handle_ajax_error
    });
}

export function handle_search_btn_displays() {
    // Remove active status from all buttons
    remove_active_status_tag_buttons();

    // make all content divs invisible
    remove_company_content_divs();

    // Show the whole content div
    document.getElementById(constants.CONTENT_DIV).style.display = "block";

    // Show the contents of the div for the company tab
    document.getElementById(constants.TAB_CONTENT_ID_MAPPER[constants.COMPANY_BUTTON_ID]).style.display = "block";

    // Set company class attribute to active
    document.getElementById(constants.COMPANY_BUTTON_ID).className.replace(" active", "");
    document.getElementById(constants.COMPANY_BUTTON_ID).className += " active";
}

export function x_mark() {
    console.log("Clearing out data and search box");
    document.getElementById(constants.CONTENT_DIV).style.display = "none";
    document.getElementById(constants.ERROR_MSG_DIV).style.display = "none";
    remove_searchbox_error();
    document.getElementById(constants.SEARCH_BOX_ID).value = null;
}

export function remove_searchbox_error() {
    console.log("Removing search box error")
    document.getElementById(constants.SEARCH_BOX_ID).setCustomValidity("");
    document.getElementById(constants.SEARCH_BOX_ID).reportValidity();
}


export function tab_button_click(target_element) {
    console.log(target_element);
    console.log(target_element.className);
    console.log(target_element.id);

    // Remove active status from all buttons
    remove_active_status_tag_buttons();

    // make all content divs invisible
    remove_company_content_divs();

    // set div of the tab to display: block
    console.log(`content element id: ${constants.TAB_CONTENT_ID_MAPPER[target_element.id]}`)
    document.getElementById(constants.TAB_CONTENT_ID_MAPPER[target_element.id]).style.display = "block";

    // set class of the appropeiate tag button to active    
    target_element.className += " active";

}

export function remove_active_status_tag_buttons() {
    var tab_buttons, i;
    tab_buttons = document.getElementsByClassName(constants.TAB_BUTTON_CLASS)

    for (i=0; i<tab_buttons.length; i++) {
        tab_buttons[i].className = tab_buttons[i].className.replace(" active", "");
    }
}

export function remove_company_content_divs() {
    var i, tab_contents;
    tab_contents = document.getElementsByClassName(constants.TAB_CONTENT_CLASS);

    for (i=0; i<tab_contents.length; i++) {
        tab_contents[i].style.display = "none";
    }
}