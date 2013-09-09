import time
from flask import Flask, render_template

app = Flask(__name__)

@app.route("/")
def splitter():
    return render_template("splitter.html")

@app.route("/delay/<int:ms>")
def delay(ms):
    time.sleep(0.001*ms)
    return "This page loaded in {}ms".format(ms)

if __name__ == "__main__":
    app.run(debug=True)
