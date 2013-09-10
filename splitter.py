import time
from flask import Flask, render_template, url_for

app = Flask(__name__)

@app.route("/")
def splitter():
    return render_template("splitter.html")

@app.route("/delay/<int:ms>")
def delay(ms):
    time.sleep(0.001*ms)
    return render_template("delay.html", time=ms,
                           url=url_for("delay", ms=ms))

@app.route("/empty")
def empty():
    return "Add a left-side url to start timing"

if __name__ == "__main__":
    app.run(debug=True)
