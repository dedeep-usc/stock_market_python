from stock_market.finhub_data.apis import get_company_info_api, get_company_quote_api, get_company_recommendation_api, \
    get_company_chart_api, get_company_news_api, get_company_all_data_api

api_routes = [
    ("/api/get/company/info", get_company_info_api, ["GET"]),
    ("/api/get/company/quote", get_company_quote_api, ["GET"]),
    ("/api/get/company/recommendation", get_company_recommendation_api, ["GET"]),
    ("/api/get/company/chart", get_company_chart_api, ["GET"]),
    ("/api/get/company/news", get_company_news_api, ["GET"]),
    ("/api/get/company/all/data", get_company_all_data_api, ["GET"])
]
