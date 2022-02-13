// backend server stuff

export const ENDPOINT='http://0.0.0.0:9080'
export var COMPANY_INFO_API="/api/get/company/info?company="
export const COMPANY_QUOTE_API="/api/get/company/quote?company="
export const COMPANY_RECOMMENDATION_API="/api/get/company/recommendation?company="
export const COMPANY_CHART_API="/api/get/company/chart?company="
export const COMPANY_NEWS_API="/api/get/company/news?company="

// elements ids

export const SEARCH_SYMBOL_ID="search_symbol"
export const SEARCH_BOX_ID="search_box"
export const X_MARK_ID="x_mark"
export const CONTENT_DIV="content_div"
export const MAIN_CONTENT_DIV="main_content_div"

export const COMPANY_BUTTON_ID="company_button"
export const STOCK_SUMMARY_BUTTON_ID="stock_summary_button"
export const CHARTS_BUTTON_ID="charts_button"
export const NEWS_BUTTON_ID="news_button"

export const COMPANY_CONTENT_TAB_ID="company_tab"
export const STOCK_SUMMARY_CONTENT_TAB_ID="stock_summary_tab"
export const CHARTS_CONTENT_TAB_ID="charts_tab"
export const NEWS_CONTENT_TAB_ID="news_tab"

export const ERROR_MSG_DIV="error_msg_div"

export const COMPANY_LOG_ELEMENT="company_logo"
export const COMPANY_TAG_NAME = "company_tab_name"
export const COMPANY_TAB_STOCK_SYMBOL = "company_tab_stock_symbol"
export const COMPANY_TAB_STOCK_EXCHANGE_CODE = "company_tab_stock_exchange_code"
export const COMPANY_TAB_IPO_DATE = "company_tab_ipo_date"
export const COMPANY_TAB_CATEGORY = "company_tab_category"

export const SS_TAB_STOCK_TICKER_SYMBOL="ss_tab_stock_ticker_symbol"
export const SS_TAB_TRADING_DAY="ss_tab_trading_day"
export const SS_TAB_PCP="ss_tab_pcp"
export const SS_TAB_OP="ss_tab_op"
export const SS_TAB_HP="ss_tab_hp"
export const SS_TAB_LP="ss_tab_lp"
export const SS_TAB_CHANGE="ss_tab_change_num"
export const SS_TAB_CHANGE_PERC="ss_tab_change_perc_num"
export const SS_TAB_CHANGE_SIGN=""
export const SS_TAB_CHANGE_PERC_SIGN=""
export const SS_TAB_CHANGE_SIGN_CLASS="movement_symbol"

export const SS_TAB_NEG_CHANGE_URL="/static/imgs/stock_market/RedArrowDown.png"
export const SS_TAB_POS_CHANGE_URL="/static/imgs/stock_market/GreenArrowUp.png"

export const SS_NUMBER="ss_number"
export const S_NUMBER="s_number"
export const H_NUMBER="h_number"
export const B_NUMBER="b_number"
export const SB_NUMBER="sb_number"

export const INDIVIDUAL_NEWS_TABS="individual_news_tabs"


// elements classes

export const TAB_BUTTON_CLASS="tab_buttons"
export const TAB_CONTENT_CLASS="tab_contents"

// Error messages

export const COMPANY_MISSING_MSG="Please fill out this field."

// tab to content mapper

export const TAB_CONTENT_ID_MAPPER = {
    [COMPANY_BUTTON_ID]: COMPANY_CONTENT_TAB_ID,
    [STOCK_SUMMARY_BUTTON_ID]: STOCK_SUMMARY_CONTENT_TAB_ID,
    [CHARTS_BUTTON_ID]: CHARTS_CONTENT_TAB_ID,
    [NEWS_BUTTON_ID]: NEWS_CONTENT_TAB_ID
}
