function searchSymbol() {
    var company_symbol = document.getElementById(SEARCH_BOX_ID).value;
    console.log(`company symbol from search box: ${company_symbol}`);

    if (company_symbol == null || company_symbol == "") {
        console.log(`company symbol is null. Raising the kind of pop up.`);
        document.getElementById(SEARCH_BOX_ID).setCustomValidity(COMPANY_MISSING_MSG);
        document.getElementById(SEARCH_BOX_ID).reportValidity();
        return;
    }

    // Get all information from the backend and display it 

    // set error tab to display: none
    document.getElementById(ERROR_MSG_DIV).style.display = "none"
    
    // set all news tab display to none
    set_news_tab_display_none();
    set_charts_tab_display_none();
    set_stock_summary_tab_divs_none();
    // Company info tab

    get_company_info(company_symbol);
    get_stock_quote(company_symbol);
    get_company_recommendation(company_symbol);
    get_company_news(company_symbol);
    get_stock_candles(company_symbol);
}

function set_stock_summary_tab_divs_none() {
    document.getElementsByClassName(STOCK_SUMMARY_TAB_DIVS)[0].style.display="none";
}

function set_charts_tab_display_none() {
    document.getElementById(HIGHCHARTS_TAB_ID).style.display="none";
}

function highcharts_build(result){
    document.getElementById(HIGHCHARTS_TAB_ID).style.display="block";
    Highcharts.stockChart(HIGHCHARTS_TAB_ID, {
        title: {
            text: `Stock Price ${result.company} ${result.date}`
        },

        subtitle:{
            text: `<br/><a href="https://finnhub.io/" target="_blank">Source: Finnhub</a>`,
            useHTML:true,
        },
        xAxis: {
            gapGridLineWidth: 0
        },

        yAxis: [{
            labels: {
                align: 'right',
            },
            title: {
                text: 'Stock Price',
            },
            opposite:false,
        }, {
            labels: {
                align: 'left',
            },
            title: {
                text: 'Volume'
            },
            opposite:true,
        }],

        rangeSelector: {
            buttons: [ {
                type: 'day',
                count: 7,
                text: '7d'
            },{
                type: 'day',
                count: 15,
                text: '15d'
            },{
                type: 'month',
                count: 1,
                text: '1m'
            },{
                type: 'month',
                count: 3,
                text: '3m'
            },
            {
                type: 'month',
                count: 6,
                text: '6m'
            }],
            selected: 0,
            inputEnabled: false
        },

        series: [{
            name: 'Stock Price',
            type: 'area',
            data: result.date_price,
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
        },
        {
            type: 'column',
            name: 'Volume',
            data: result.date_volume,
            yAxis: 1,
            pointWidth: 3
        }
    ]
    });

}

function get_stock_candles(company_symbol) {
    var company_stock_candles_url = ENDPOINT + COMPANY_CHART_API + company_symbol;
    console.log(`company_news_url: ${company_stock_candles_url}`)
    ajax_request(company_stock_candles_url, handle_stock_candles_response);
}

function handle_stock_candles_response(result, status, xhr) {
    console.log(JSON.stringify(result));
    console.log(status);
    console.log(xhr);
    if (check_error()) {
        handle_error();
        return;
    }

    fill_stock_candles(result);
}

function fill_stock_candles(result) {
    result = result.result;
    // candles = result.c;
    // times = result.t;
    // volumes = result.v;
    // var date_price = result.date_price;
    // var date_volume = result.date_volume;

    highcharts_build(result);
}

function set_news_tab_display_none() {
    var i;
    // set all news div display to hidden
    var ind_news_tabs = document.getElementsByClassName(INDIVIDUAL_NEWS_TABS);

    for (i=0; i<ind_news_tabs.length; i++) {
        ind_news_tabs[i].style.display = "none"
    }
}

function get_company_news(company_symbol) {
    var company_news_url = ENDPOINT + COMPANY_NEWS_API + company_symbol;
    console.log(`company_news_url: ${company_news_url}`)
    ajax_request(company_news_url, handle_company_news_response);
    
}

function handle_company_news_response(result, status, xhr) {
    console.log(JSON.stringify(result));
    console.log(status);
    console.log(xhr);
    if (check_error()) {
        handle_error();
        return;
    }

    fill_compnay_news_data(result);
}

function fill_compnay_news_data(result) {
    result = result.result;
    var i;
    // set all news div display to hidden
    var ind_news_tabs = document.getElementsByClassName(INDIVIDUAL_NEWS_TABS);

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

function fill_news_tab_content(news_content_div, result) {
    var news_content_div_children = news_content_div.children;
    news_content_div_children[0].innerHTML = result.headline;
    news_content_div_children[1].innerHTML = convert_unix_epoch_to_datetime(result.datetime);
    news_content_div_children[2].children[0].href = result.url;
}

function convert_unix_epoch_to_datetime(unix_epoch) {
    var MONTH_NAMES = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];
    var d = new Date(unix_epoch*1000);
    var d_str = d.getDate() + " " + MONTH_NAMES[d.getMonth()] + ", " + d.getFullYear();
    return d_str;
}

function fill_news_iamge_div(news_img_div, result) {
    console.log(result.image);
    var url = "url(" + result.image + ")"
    news_img_div.style.backgroundImage = url;
}

function check_valid_news_data(news_data) {
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

function get_company_recommendation(company_symbol) {
    var company_recom_url = ENDPOINT + COMPANY_RECOMMENDATION_API + company_symbol;
    console.log(`company_recom_url: ${company_recom_url}`);
    ajax_request(company_recom_url, handle_company_recom_response);
}

function handle_company_recom_response(result, status, xhr) {
    console.log(JSON.stringify(result));
    console.log(status);
    console.log(xhr);
    if (check_error()) {
        handle_error();
        return;
    }

    fill_company_recom_data(result);
}

function fill_company_recom_data(result) {
    result = result.result[0];

    document.getElementById(SS_NUMBER).innerHTML = result.strongSell || "NA";
    document.getElementById(S_NUMBER).innerHTML = result.sell || "NA";
    document.getElementById(H_NUMBER).innerHTML = result.hold || "NA";
    document.getElementById(B_NUMBER).innerHTML = result.buy || "NA";
    document.getElementById(SB_NUMBER).innerHTML = result.strongBuy || "NA";

}

function get_stock_quote(company_symbol) {
    var company_quote_url = ENDPOINT + COMPANY_QUOTE_API + company_symbol;
    console.log(`company_quote_url: ${company_quote_url}`);
    ajax_request(company_quote_url, handle_company_quote_response);
}

function handle_company_quote_response(result, status, xhr) {
    console.log(JSON.stringify(result));
    console.log(status);
    console.log(xhr);

    if (check_error()) {
        handle_error();
        return;
    }

    fill_company_quote_data(result);
}

function fill_company_quote_data(result) {
    result = result.result;
    var MONTH_NAMES = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];
    var d = new Date(result.t*1000);
    console.log(d.toLocaleString());
    console.log(d.getMonth());
    var d_str = d.getDate() + " " + MONTH_NAMES[d.getMonth()] + ", " + d.getFullYear();
    document.getElementById(SS_TAB_TRADING_DAY).innerHTML = d_str || "11 February, 2022";

    document.getElementById(SS_TAB_PCP).innerHTML = result.pc || 19.1;
    document.getElementById(SS_TAB_OP).innerHTML = result.o || 19.19;
    document.getElementById(SS_TAB_HP).innerHTML = result.h || 19.28;
    document.getElementById(SS_TAB_LP).innerHTML = result.l || 18.515;
    document.getElementById(SS_TAB_CHANGE).innerHTML = result.d || -0.41;
    document.getElementById(SS_TAB_CHANGE_PERC).innerHTML = result.dp || -2.1466;
    console.log(`result.d: ${result.d}`)
    if ((result.d || 0.41) < 0) {
        set_sign_for_movement_div(SS_TAB_NEG_CHANGE_URL);
    } else if ((result.d || 0.41) > 0) {
        set_sign_for_movement_div(SS_TAB_POS_CHANGE_URL);
    } else {
        set_sign_for_movement_div("");
    }

    document.getElementsByClassName(STOCK_SUMMARY_TAB_DIVS)[0].style.display="flex";
}

function set_sign_for_movement_div(url) {
    var i, signs;
    signs = document.getElementsByClassName(SS_TAB_CHANGE_SIGN_CLASS);

    for (i=0; i<signs.length; i++) {
        signs[i].style.backgroundImage = "url(" + url + ")";
    }
}

function handle_ajax_error(result, status, xhr) {
    console.log(`error result: ${JSON.stringify(result)}`);
    console.log(`error status: ${status}`);
    console.log(`error xhr: ${xhr}`);

    result = JSON.parse(result.responseText).result;

    var company = result.company;
    console.log(`company from result: ${company}`);
    var company_symbol = document.getElementById(SEARCH_BOX_ID).value;
    console.log(`company symbol from search box: ${company_symbol}`);
    if (company != company_symbol.toUpperCase()) {
        return;
    }

    handle_error();

}

function handle_error() {
    document.getElementById(CONTENT_DIV).style.display = "none";
    document.getElementById(ERROR_MSG_DIV).style.display = "block";
}

function get_company_info(company_symbol) {
    var company_info_url = ENDPOINT + COMPANY_INFO_API + company_symbol;
    console.log(`company_info_url: ${company_info_url}`)
    ajax_request(company_info_url, handle_company_info_response)
}

function handle_company_info_response(result, status, xhr) {
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

function fill_company_info_data(result) {
    result = result.result;
    
    // company logo
    var url = "url(" + result.logo + ")"
    document.getElementById(COMPANY_LOG_ELEMENT).style.backgroundImage = url;
    if (result.logo == "" || result.logo == null || result.logo == undefined) {
        document.getElementById(COMPANY_LOG_ELEMENT).style.display = "none";
    }
    else {
        document.getElementById(COMPANY_LOG_ELEMENT).style.display = "flex";
    }

    document.getElementById(COMPANY_TAG_NAME).innerHTML = result.name || "NAME";
    document.getElementById(COMPANY_TAB_STOCK_SYMBOL).innerHTML = result.ticker || "TICK";
    document.getElementById(SS_TAB_STOCK_TICKER_SYMBOL).innerHTML = result.ticker || "TICK";
    document.getElementById(COMPANY_TAB_STOCK_EXCHANGE_CODE).innerHTML = result.exchange || "NASDAQ NMS - GLOBAL MARKET";
    document.getElementById(COMPANY_TAB_IPO_DATE).innerHTML = result.ipo || "1970-01-01";
    document.getElementById(COMPANY_TAB_CATEGORY).innerHTML = result.finnhubIndustry || "undefined";

}

function check_error() {
    var error_display_val = document.getElementById(ERROR_MSG_DIV).style.display;
    console.log(`error_display_val: ${error_display_val} in 'check_error'.`)
    return error_display_val == "block"
}

function ajax_request(url, handler) {
    console.log(`Making AJAX request to url: ${url}.`)
    $.ajax({
        url: url,
        success: handler,
        error: handle_ajax_error
    });
}

function handle_search_btn_displays() {
    // Remove active status from all buttons
    remove_active_status_tag_buttons();

    // make all content divs invisible
    remove_company_content_divs();

    // Show the whole content div
    document.getElementById(CONTENT_DIV).style.display = "block";

    // Show the contents of the div for the company tab
    document.getElementById(TAB_CONTENT_ID_MAPPER[COMPANY_BUTTON_ID]).style.display = "block";

    // Set company class attribute to active
    document.getElementById(COMPANY_BUTTON_ID).className.replace(" active", "");
    document.getElementById(COMPANY_BUTTON_ID).className += " active";
}

function x_mark() {
    console.log("Clearing out data and search box");
    document.getElementById(CONTENT_DIV).style.display = "none";
    document.getElementById(ERROR_MSG_DIV).style.display = "none";
    remove_searchbox_error();
    document.getElementById(SEARCH_BOX_ID).value = null;
}

function remove_searchbox_error() {
    console.log("Removing search box error")
    document.getElementById(SEARCH_BOX_ID).setCustomValidity("");
    document.getElementById(SEARCH_BOX_ID).reportValidity();
}


function tab_button_click(target_element) {
    console.log(target_element);
    console.log(target_element.className);
    console.log(target_element.id);

    // Remove active status from all buttons
    remove_active_status_tag_buttons();

    // make all content divs invisible
    remove_company_content_divs();

    // set div of the tab to display: block
    console.log(`content element id: ${TAB_CONTENT_ID_MAPPER[target_element.id]}`)
    document.getElementById(TAB_CONTENT_ID_MAPPER[target_element.id]).style.display = "block";

    // set class of the appropeiate tag button to active    
    target_element.className += " active";

}

function remove_active_status_tag_buttons() {
    var tab_buttons, i;
    tab_buttons = document.getElementsByClassName(TAB_BUTTON_CLASS)

    for (i=0; i<tab_buttons.length; i++) {
        tab_buttons[i].className = tab_buttons[i].className.replace(" active", "");
    }
}

function remove_company_content_divs() {
    var i, tab_contents;
    tab_contents = document.getElementsByClassName(TAB_CONTENT_CLASS);

    for (i=0; i<tab_contents.length; i++) {
        tab_contents[i].style.display = "none";
    }
}