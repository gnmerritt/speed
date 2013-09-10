import time
from flask import Flask, render_template, url_for

app = Flask(__name__)

@app.route("/")
@app.route("/split")
@app.route("/split/<initial>")
@app.route("/split/<initial>/s/<subst>/<replacement>")
def splitter(initial="/empty", subst="", replacement=""):
    return render_template("splitter.html", **{
        'initial':initial,
        'subst':subst,
        'replacement':replacement,
    })

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
