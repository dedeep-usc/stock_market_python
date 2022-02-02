from main import app

import stock_market.test as test

api_routes = []

api_routes += test.api_routes


def configure_app_routes():
    for route in api_routes:
        api_url = route[0]
        handler = route[1]
        methods = route[2]
        app.add_url_rule(api_url, "{}|{}".format(route, handler), handler, methods=methods)
