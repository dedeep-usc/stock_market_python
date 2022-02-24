from flask import request
import logging

from stock_market.finhub_data.utils import get_company_info, get_company_quote, get_company_recommendation, \
    get_company_chart_data, get_company_news, get_company_all_data
from stock_market.skel.skel_res import SkelRes


def error(code, msg, company="NA"):
    return {
        "_code": code,
        "message": msg,
        "company": company
    }


@SkelRes()
def get_company_info_api():
    company = request.args.get("company")
    if not company:
        logging.error("'company' parameter not passed in the request")
        return error(400, "The parameter 'company' is required.")

    company = company.upper()
    result = get_company_info(company)
    if "error" in result:
        return error(500, result.get("error"), company=company)

    return result


@SkelRes()
def get_company_quote_api():
    company = request.args.get("company")
    if not company:
        logging.error("'company' parameter not passed in the request")
        return error(400, "The parameter 'company' is required.")

    company = company.upper()
    result = get_company_quote(company)
    if "error" in result:
        return error(500, result.get("error"), company=company)

    return result


@SkelRes()
def get_company_recommendation_api():
    company = request.args.get("company")
    if not company:
        logging.error("'company' parameter not passed in the request")
        return error(400, "The parameter 'company' is required.")

    company = company.upper()
    result = get_company_recommendation(company)
    if "error" in result or not result:
        # return error(500, result.get("error"), company=company)
        return [{
            "strongSell": "NA",
            "sell": "NA",
            "hold": "NA",
            "buy": "NA",
            "strongBuy": "NA"
        }]

    return result


@SkelRes()
def get_company_chart_api():
    company = request.args.get("company")
    if not company:
        logging.error("'company' parameter not passed in the request")
        return error(400, "The parameter 'company' is required.")

    company = company.upper()
    result = get_company_chart_data(company)
    if "error" in result:
        return error(500, result.get("error"), company=company)

    return result


@SkelRes()
def get_company_news_api():
    company = request.args.get("company")
    if not company:
        logging.error("'company' parameter not passed in the request")
        return error(400, "The parameter 'company' is required.")

    company = company.upper()
    result = get_company_news(company)
    if "error" in result:
        return error(500, result.get("error"), company=company)

    return result


@SkelRes()
def get_company_all_data_api():
    company = request.args.get("company")
    if not company:
        logging.error("'company' parameter not passed in the request")
        return error(400, "The parameter 'company' is required.")

    company = company.upper()
    result = get_company_all_data(company)
    if "error" in result:
        return error(500, result.get("error"), company=company)

    return result

