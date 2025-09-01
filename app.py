from flask import Flask, render_template, request, jsonify

app = Flask(__name__)



# Example: Python function that returns data
@app.route("/api/square", methods=["POST"])
def square():
    data = request.get_json()  # get { "number": 5 }
    n = data["number"]
    return jsonify({"result": n * n})


