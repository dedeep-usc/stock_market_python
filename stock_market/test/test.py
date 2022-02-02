from stock_market.skel.skel_res import SkelRes

import logging


@SkelRes()
def test_custom_get():
    logging.info("You hit the test_custom_get method successfully.")
    return {
        "_code": 200,
        "message": "Your custom get route is successfully working."
    }


@SkelRes()
def test_custom_error():
    logging.info("You hit the test_custom_error method successfully.")
    return {
        "_code": 500,
        "message": "Your custom error route is successfully working."
    }