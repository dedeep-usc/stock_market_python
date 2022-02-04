import logging
import json
import datetime
from dateutil.relativedelta import relativedelta

from stock_market.common import xhr
from stock_market.finhub_data.constants import FINHUB_COMPANY_INFO_URL, FINHUB_COMPANY_QUOTE_URL, \
    FINHUB_COMPANY_RECOMMENDATION_URL, FINHUB_COMPANY_CHART_URL, FINHUB_COMPANY_NEWS_URL
from stock_market.secrets import FINHUB_ENDPOINT, FINHUB_API_KEY


def build_post_request(self, url, request_params):
    data = {
        "url": url,
        "method": "POST",
        "data": request_params,
        "headers": {'Content-Type': 'application/json'},
        "deadline": 25
    }
    return data


def build_get_request(url):
    data = {
        "url": url,
        "method": "GET",
        "deadline": 25
    }
    return data


def get_company_info(company):
    logging.info(f"Trying to get info on company: {company} from finhub.")
    url = FINHUB_ENDPOINT + FINHUB_COMPANY_INFO_URL.format(company, FINHUB_API_KEY)
    logging.info(f"get company info url: {url}")
    request_data = build_get_request(url)
    logging.info(f"request data: {request_data}")
    response = xhr.xhr_send(request_data)
    if not response:
        logging.error("Network error while trying to connect to finhub.")
        return {
            "error": "Network error while trying to connect to finhub."
        }

    if response.status_code != 200:
        logging.eror(f"Response status code from fihnub not 200. Status code: {response.status_code}")
        logging.error(f"Response from finhub: {str(response.text)}")
        return {
            "error": "Status code not 200 from finhub. Please try later."
        }

    logging.info(f"Response from finhub: {str(response.text)}")
    finhub_data = json.loads(response.content)
    logging.info(f"finhub_data: {finhub_data}")
    if not finhub_data:
        return {
            "error": f"Finhub didn't return any data for the company: {company}. Please ensure that the company symbol is right."
        }
    return finhub_data


def get_company_quote(company):
    logging.info(f"Trying to get quote on company: {company} from finhub.")
    url = FINHUB_ENDPOINT + FINHUB_COMPANY_QUOTE_URL.format(company, FINHUB_API_KEY)
    logging.info(f"get company quote url: {url}")
    request_data = build_get_request(url)
    logging.info(f"request data: {request_data}")
    response = xhr.xhr_send(request_data)
    if not response:
        logging.error("Network error while trying to connect to finhub.")
        return {
            "error": "Network error while trying to connect to finhub."
        }

    if response.status_code != 200:
        logging.eror(f"Response status code from finhub not 200. Status code: {response.status_code}")
        logging.error(f"Response from finhub: {str(response.text)}")
        return {
            "error": "Status code not 200 from finhub. Please try later."
        }

    logging.info(f"Response from finhub: {str(response.text)}")
    finhub_data = json.loads(response.content)
    logging.info(f"finhub_data: {finhub_data}")
    return finhub_data


def get_company_recommendation(company):
    logging.info(f"Trying to get recommendation on company: {company} from finhub.")
    url = FINHUB_ENDPOINT + FINHUB_COMPANY_RECOMMENDATION_URL.format(company, FINHUB_API_KEY)
    logging.info(f"get company recommendation url: {url}")
    request_data = build_get_request(url)
    logging.info(f"request data: {request_data}")
    response = xhr.xhr_send(request_data)
    if not response:
        logging.error("Network error while trying to connect to finhub.")
        return {
            "error": "Network error while trying to connect to finhub."
        }

    if response.status_code != 200:
        logging.eror(f"Response status code from finhub not 200. Status code: {response.status_code}")
        logging.error(f"Response from finhub: {str(response.text)}")
        return {
            "error": "Status code not 200 from finhub. Please try later."
        }

    logging.info(f"Response from finhub: {str(response.text)}")
    finhub_data = json.loads(response.content)
    logging.info(f"finhub_data: {finhub_data}")

    if not finhub_data:
        logging.error(f"Finhub didn't return any data for the company: {company}")
        return {
            "error": f"Finhub didn't return any data for the company: {company}. Please ensure that the company symbol is right."
        }
    return finhub_data


def get_company_chart_data(company):
    logging.info(f"Trying to get chart_data on company: {company} from finhub.")
    current_time = datetime.datetime.now()
    from_time = current_time - relativedelta(months=6, days=1)
    logging.info(f"current_time: {current_time}, from_time: {from_time}")

    current_timestamp = int(current_time.timestamp())
    from_timestamp = int(from_time.timestamp())
    logging.info(f"current_timestamp: {current_timestamp}, from_time: {from_timestamp}")

    url = FINHUB_ENDPOINT + FINHUB_COMPANY_CHART_URL.format(company, from_timestamp, current_timestamp, FINHUB_API_KEY)
    logging.info(f"get company chart url: {url}")
    request_data = build_get_request(url)
    logging.info(f"request data: {request_data}")
    response = xhr.xhr_send(request_data)
    if not response:
        logging.error("Network error while trying to connect to finhub.")
        return {
            "error": "Network error while trying to connect to finhub."
        }

    if response.status_code != 200:
        logging.eror(f"Response status code from finhub not 200. Status code: {response.status_code}")
        logging.error(f"Response from finhub: {str(response.text)}")
        return {
            "error": "Status code not 200 from finhub. Please try later."
        }

    logging.info(f"Response from finhub: {str(response.text)}")
    finhub_data = json.loads(response.content)
    logging.info(f"finhub_data: {finhub_data}")
    if finhub_data.get("s") != "ok":
        logging.error(f"finhub_data['s']: {finhub_data.get('s')}")
        return {
            "error": f"Finhub didn't return any data for the company: {company}. Please ensure that the company symbol is right."
        }
    return finhub_data


def get_company_news(company):
    logging.info(f"Trying to get news on company: {company} from finhub.")
    current_time = datetime.datetime.now()
    from_time = current_time - relativedelta(days=30)
    logging.info(f"current_time: {current_time}, from_time: {from_time}")

    current_timestamp = current_time.strftime("%Y-%m-%d")
    from_timestamp = from_time.strftime("%Y-%m-%d")
    logging.info(f"current_timestamp: {current_timestamp}, from_time: {from_timestamp}")

    url = FINHUB_ENDPOINT + FINHUB_COMPANY_NEWS_URL.format(company, from_timestamp, current_timestamp, FINHUB_API_KEY)
    logging.info(f"get company news url: {url}")
    request_data = build_get_request(url)
    logging.info(f"request data: {request_data}")
    response = xhr.xhr_send(request_data)
    if not response:
        logging.error("Network error while trying to connect to finhub.")
        return {
            "error": "Network error while trying to connect to finhub."
        }

    if response.status_code != 200:
        logging.eror(f"Response status code from finhub not 200. Status code: {response.status_code}")
        logging.error(f"Response from finhub: {str(response.text)}")
        return {
            "error": "Status code not 200 from finhub. Please try later."
        }

    logging.info(f"Response from finhub: {str(response.text)}")
    finhub_data = json.loads(response.content)
    logging.info(f"finhub_data: {finhub_data}")
    if not finhub_data:
        logging.error(f"Finhub didn't return any data for the company: {company}")
        return {
            "error": f"Finhub didn't return any data for the company: {company}. Please ensure that the company symbol is right."
        }
    return finhub_data


def get_company_all_data(company):
    logging.info(f"getting all information about the company: {company}.")
    logging.info(f"getting {company} chart data.")

    chart_data = get_company_chart_data(company)
    logging.info(f"chart_data: {chart_data}")
    if "error" in chart_data:
        return chart_data

    logging.info(f"getting {company} info data.")
    company_info = get_company_info(company)
    logging.info(f"company_info: {company_info}")
    if "error" in company_info:
        return company_info

    logging.info(f"getting {company} quote")
    quote_data = get_company_quote(company)
    logging.info(f"quote_data: {quote_data}")
    if "error" in quote_data:
        return quote_data

    logging.info(f"getting {company} recommendation.")
    recommendation_data = get_company_recommendation(company)
    logging.info(f"recommendation_data: {recommendation_data}")
    if "error" in recommendation_data:
        return recommendation_data

    logging.info(f"getting {company} news.")
    news_data = get_company_news(company)
    logging.info(f"news_data: {news_data}")
    if "error" in news_data:
        return news_data

    return {
        "chart_data": chart_data,
        "info_data": company_info,
        "quote_data": quote_data,
        "recommendation_data": recommendation_data,
        "news_data": news_data,
        "company": company
    }

