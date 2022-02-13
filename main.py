import logging

from flask import Flask, jsonify, send_from_directory

app = Flask(__name__, static_folder="stock_market/static", static_url_path="/static")

from app_configuration import configure_application
configure_application()


@app.route('/')
def hello_world():
    return '<h1>Hello! The server is up and running.</h1>'


@app.errorhandler(404)
def page_not_found(e):
    response = {
        "status": "404 not Found",
        "message": "The requested url was not found on the server"
    }
    return jsonify(response), 404


@app.errorhandler(500)
def internal_server_error(e):
    print(e)
    response = {
        "status": "500 Internal Server Error.",
        "message": ""
    }
    return jsonify(response), 500

