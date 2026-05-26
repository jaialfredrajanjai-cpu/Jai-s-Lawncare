from flask import Flask, render_template

app = Flask(__name__)

# This tells Python to load your index.html when you open the site
@app.route('/')
def home():
    return render_template('index.html')

if __name__ == '__main__':
    # This starts the local server
    app.run(debug=True)
