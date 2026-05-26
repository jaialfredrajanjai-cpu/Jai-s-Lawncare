import os
from flask import Flask, render_template

# This tells Flask to look for index.html in both the templates folder AND the main folder
app = Flask(__name__, template_folder=os.getcwd())

@app.route('/')
def home():
    # Try loading it directly from the root server space
    if os.path.exists('index.html'):
        return render_template('index.html')
    # Backup choice if it finds the folder
    return render_template('templates/index.html')

if __name__ == '__main__':
    app.run(debug=True)
