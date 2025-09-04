from flask import Flask, request, jsonify

app = Flask(__name__)

@app.route("/api/square", methods=["POST"])
def square():
    n = request.json["number"]
    return jsonify({"result": n*n})

if __name__ == "__main__":
    app.run(debug=True)
