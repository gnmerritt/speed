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

@app.route("/delay")
@app.route("/delay/<int:ms>")
def delay(ms=200):
    time.sleep(0.001*ms)
    return render_template("delay.html", **{
        'time':ms,
        'url':url_for("delay", ms=ms),
        'slower':url_for("delay", ms=ms + 200),
        'faster':url_for("delay", ms=max(0, ms - 200)),
    })

@app.route("/empty")
def empty():
    return "Add a left-side url to start timing"

@app.route("/sameorigin")
def sameorigin():
    return "<br>".join([
        "Looks like your browser is enforcing the same-origin policy (this is normal).",
        "Follow the steps at one of the following links to disable it (dev only!)",
        '<a target="_" href="http://stackoverflow.com/questions/3102819/chrome-disable-same-origin-policy">Fix for Chrome</a>',
        '<a target="_" href="https://addons.mozilla.org/en-US/firefox/addon/forcecors/">Firefox plugin</a>',
      ])

if __name__ == "__main__":
    app.run(debug=True, port=5002, host='0.0.0.0')
