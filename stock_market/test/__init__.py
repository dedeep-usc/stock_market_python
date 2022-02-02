from stock_market.test.test import test_custom_get, test_custom_error

api_routes = [
    ('/api/stock_market/test/custom_get', test_custom_get, ["GET"]),
    ('/api/stock_market/test/custom/error', test_custom_error, ["GET"]),
]
