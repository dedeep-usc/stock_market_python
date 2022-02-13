from stock_market.front_end.apis import get_home_page_api

api_routes = [
    ("/api/stock/home", get_home_page_api, ["GET"]),
]
