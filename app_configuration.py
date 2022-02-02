import logging
import google.cloud.logging as gclogger

from flask import request
from stock_market.common.routes import *
from main import app


def configure_application():
    configure_app_routes()
    configure_api_logs()
    configure_logging()


def configure_api_logs():
    def log_requests():
        try:
            logging.info('\n\n=============================================')
            logging.info('>>{}'.format(request))
            logging.info(">>Request Headers: {}".format(request.headers))
            logging.info(">>Request Data: {}".format((request.data or '')[:20000]))
            logging.info(">>Request Params: {}".format(request.args))
            logging.info('-------------------------------------------------')
        except Exception as e:
            logging.error(">>Request Error: {}".format(e))

    def log_responses(response):
        try:
            logging.info('-------------------------------------------------')
            logging.info('>>{}'.format(response))
            logging.info(">>Response headers: {}".format(response.headers))
            logging.info(">>Response data: {}".format((response.data or '')[:20000]))
        except Exception as e:
            logging.error(">>Response Error: {}".format(e))

        return response

    app.before_request(log_requests)
    app.after_request(log_responses)


def configure_logging():
    logging.basicConfig(level=logging.DEBUG)
    # client = gclogger.Client()
    # client.setup_logging()
    pass

