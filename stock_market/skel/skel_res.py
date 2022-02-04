import datetime
import logging
import traceback
import json

from flask import Response, request


class MyException(Exception):
    pass


def SkelRes():
    def wrap(functionHandler):
        def inner_function(*args, **kwargs):
            headers = dict()
            headers['Access-Control-Allow-Origin'] = 'true'
            headers['Access-Control-Allow-Headers'] = 'Origin, X-Requested-With, Content-Type, Accept'
            headers['Access-Control-Allow-Methods'] = 'POST, GET, OPTIONS, DELETE'
            headers['Access-Control-Allow-Credentials'] = 'true'
            headers['Content-Type'] = 'application/json'

            response_template = {
            }

            try:
                result = functionHandler(*args, **kwargs)
            except Exception as e:
                logging.exception(e)
                raise MyException(traceback.format_exc())

            code = result.get("_code", 200) if type(result) == dict else 200

            if "_code" in result:
                result.pop("_code")

            response_template["code"] = code
            response_template["result"] = result

            response = Response(json.dumps(response_template, default=str))
            response.headers = headers
            response.status_code = code

            return response

        return inner_function

    return wrap
