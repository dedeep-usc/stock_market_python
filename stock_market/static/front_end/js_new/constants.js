// backend server stuff

// const ENDPOINT='http://0.0.0.0:9080'
const ENDPOINT="https://stock-marketket-python-331122.appspot.com"
const COMPANY_INFO_API="/api/get/company/info?company="
const COMPANY_QUOTE_API="/api/get/company/quote?company="
const COMPANY_RECOMMENDATION_API="/api/get/company/recommendation?company="
const COMPANY_CHART_API="/api/get/company/chart?company="
const COMPANY_NEWS_API="/api/get/company/news?company="

// elements ids

 const SEARCH_SYMBOL_ID="search_symbol"
 const SEARCH_BOX_ID="search_box"
 const X_MARK_ID="x_mark"
 const CONTENT_DIV="content_div"
 const MAIN_CONTENT_DIV="main_content_div"

 const COMPANY_BUTTON_ID="company_button"
 const STOCK_SUMMARY_BUTTON_ID="stock_summary_button"
 const CHARTS_BUTTON_ID="charts_button"
 const NEWS_BUTTON_ID="news_button"

 const COMPANY_CONTENT_TAB_ID="company_tab"
 const STOCK_SUMMARY_CONTENT_TAB_ID="stock_summary_tab"
 const CHARTS_CONTENT_TAB_ID="charts_tab"
 const NEWS_CONTENT_TAB_ID="news_tab"

 const ERROR_MSG_DIV="error_msg_div"

 const COMPANY_LOG_ELEMENT="company_logo"
 const COMPANY_TAG_NAME = "company_tab_name"
 const COMPANY_TAB_STOCK_SYMBOL = "company_tab_stock_symbol"
 const COMPANY_TAB_STOCK_EXCHANGE_CODE = "company_tab_stock_exchange_code"
 const COMPANY_TAB_IPO_DATE = "company_tab_ipo_date"
 const COMPANY_TAB_CATEGORY = "company_tab_category"

 const SS_TAB_STOCK_TICKER_SYMBOL="ss_tab_stock_ticker_symbol"
 const SS_TAB_TRADING_DAY="ss_tab_trading_day"
 const SS_TAB_PCP="ss_tab_pcp"
 const SS_TAB_OP="ss_tab_op"
 const SS_TAB_HP="ss_tab_hp"
 const SS_TAB_LP="ss_tab_lp"
 const SS_TAB_CHANGE="ss_tab_change_num"
 const SS_TAB_CHANGE_PERC="ss_tab_change_perc_num"
 const SS_TAB_CHANGE_SIGN=""
 const SS_TAB_CHANGE_PERC_SIGN=""
 const SS_TAB_CHANGE_SIGN_CLASS="movement_symbol"

 const SS_TAB_NEG_CHANGE_URL="/static/imgs/stock_market/RedArrowDown.png"
 const SS_TAB_POS_CHANGE_URL="/static/imgs/stock_market/GreenArrowUp.png"

 const SS_NUMBER="ss_number"
 const S_NUMBER="s_number"
 const H_NUMBER="h_number"
 const B_NUMBER="b_number"
 const SB_NUMBER="sb_number"

 const INDIVIDUAL_NEWS_TABS="individual_news_tabs"

 const HIGHCHARTS_TAB_ID="highcharts_tab"

 const STOCK_SUMMARY_TAB_DIVS="stock_summary_tab_divs"


// elements classes

 const TAB_BUTTON_CLASS="tab_buttons"
 const TAB_CONTENT_CLASS="tab_contents"

// Error messages

 const COMPANY_MISSING_MSG="Please fill out this field."

// tab to content mapper

 const TAB_CONTENT_ID_MAPPER = {
    [COMPANY_BUTTON_ID]: COMPANY_CONTENT_TAB_ID,
    [STOCK_SUMMARY_BUTTON_ID]: STOCK_SUMMARY_CONTENT_TAB_ID,
    [CHARTS_BUTTON_ID]: CHARTS_CONTENT_TAB_ID,
    [NEWS_BUTTON_ID]: NEWS_CONTENT_TAB_ID
}
