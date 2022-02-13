import logging
from flask import send_from_directory


def get_home_page_api():
    logging.info("Serving home page.html")
    return send_from_directory('stock_market/static', 'front_end/pages/home_page.html')
