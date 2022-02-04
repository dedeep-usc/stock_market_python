import logging
import urllib.parse
import urlfetch
import json


def _http_get_request(url, params=None, headers=None, data=None, deadline=500, return_response=False):
    headers = headers or {}
    logging.info("Deadline: {}".format(deadline))
    if params:
        url = '{}?{}'.format(url, urllib.parse.urlencode(params or {}))

    try:
        result = urlfetch.fetch(
            url=url,
            method="GET",
            headers=headers,
            timeout=int(deadline))
        return result

    except urlfetch.URLError as e:
        error = str(e)
        logging.exception(e)

    except Exception as e:
        error = str(e)
        logging.exception(e)


def _http_post_request(url, params=None, data=None, headers=None, deadline=500, return_response=False):
    headers = headers or {'Content-Type': 'application/json'}
    logging.info("Deadline: {}".format(deadline))
    url_with_params = '{}?{}'.format(url, urllib.parse.urlencode(params or {}))

    if data:
        if isinstance(data, dict) or isinstance(data, list):
            data = json.dumps(data)
    deadline = deadline or 500
    logging.info("Deadline: {}".format(deadline))
    try:
        result = urlfetch.post(
            url=url_with_params,
            data=data,
            headers=headers,
            timeout=int(deadline))
        return result

    except urlfetch.URLError as e:
        logging.exception(e)

    except Exception as e:
        logging.exception(e)


def xhr_send(options, return_response=False):
    # --------------------------------------------------------------------
    # Handles synchronous http request
    #
    # @options <dict> @keys descriptions below
    # {
    #   'url'     : <string> complete url to submit request
    #   'mehthod' : <string> GET|POST
    #   'params'  : <dict> data in-request as url or form parameters
    #   'data'    : <dict> data in-request as json
    #   'headers' : <dict> HTTP headers, whenever applicable
    # }
    #
    # @return<tuple> (responseTxt<string>, status_code<int>)
    #   - The calling function should handle response txt to convert to
    #     necessary format.
    # --------------------------------------------------------------------
    method = options.pop('method')
    options["return_response"] = return_response

    if method in ['get', 'GET']:
        return _http_get_request(**options)

    if method in ['post', 'POST']:
        return _http_post_request(**options)

    raise ValueError('XHR: Unhandled method error.')