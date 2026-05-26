import os
from flask import Flask, render_template, send_from_directory

# Force Python to look in your main root directory for all files
app = Flask(__name__, template_folder=os.getcwd(), static_folder=os.getcwd())

@app.route('/')
def home():
    if os.path.exists('index.html'):
        return render_template('index.html')
    return render_template('templates/index.html')

# Custom route to find style.css and script.js even if folders are mixed up
@app.route('/static/<path:filename>')
def serve_static(filename):
    if os.path.exists(os.path.join('static', filename)):
        return send_from_directory('static', filename)
    return send_from_directory(os.getcwd(), filename)

if __name__ == '__main__':
    app.run(debug=True)
