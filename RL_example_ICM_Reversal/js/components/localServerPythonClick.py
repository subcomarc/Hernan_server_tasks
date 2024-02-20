from flask import Flask, jsonify, request, Response
from flask_cors import CORS
import pyautogui

CLICKapp = Flask(__name__)
# CORS(CLICKapp)
# CORS(CLICKapp, resources={r"/*": {"origins": "http://127.0.0.1:5000"}})
CORS(CLICKapp, supports_credentials=True), 

@CLICKapp.route('/click', methods=['GET'])

def click():
    # Get x and y coordinates from request arguments
    x = request.args.get('x', default=100, type=int)
    y = request.args.get('y', default=100, type=int)
    clicktest = 0

     # Perform three consecutive mouse clicks at (x, y)
    for _ in range(3):
        pyautogui.click(x, y)
        clicktest = clicktest+1

    # response.headers['Access-Control-Allow-Origin'] = 'http://127.0.0.1:5000'
    # return jsonify(success=True, message=f"Clicked at ({x}, {y})")
    return jsonify(clicktest)


if __name__ == '__main__':
    CLICKapp.run(host='0.0.0.0', debug=True, ssl_context='adhoc')