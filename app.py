from flask import Flask
import os
from flask import Flask, flash, request, redirect, render_template, send_from_directory
from werkzeug.utils import secure_filename
from XAI import *

app = Flask(__name__)

UPLOAD_FOLDER = os.getcwd() + '/Output'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

ALLOWED_EXTENSIONS = {'txt', 'pdf', 'png', 'jpg', 'jpeg', 'gif'}

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@app.route("/shap", methods=['POST', 'GET'])
def shap():
    if request.method == 'POST':

        if 'file' not in request.files:
            flash('No file part')
            return redirect(request.url)

        file = request.files['file']

        if file.filename == '':
            flash('No selected file')
            return redirect(request.url)

        if file and allowed_file(file.filename):
            filename = secure_filename(file.filename)
            filename = os.path.splitext(filename)[0]
            output = SHAP_Implementation(file, filename)
            # return render_template("index.html", img_data=output)
            return output
 
    elif request.method == 'GET':
        return render_template('upload.html')


@app.route("/lime", methods=['POST', 'GET'])
def lime():
    if request.method == 'POST':

        if 'file' not in request.files:
            flash('No file part')
            return redirect(request.url)

        file = request.files['file']

        if file.filename == '':
            flash('No selected file')
            return redirect(request.url)

        if file and allowed_file(file.filename):
            filename = secure_filename(file.filename)
            filename = os.path.splitext(filename)[0]

            output = LIME_Implementation(file, filename) # Not returning anything for now
            
            full_filename = filename + '.png'
            return render_template("index.html", img_data=full_filename)
            # return output
 
    elif request.method == 'GET':
        return render_template('upload.html')

@app.route('/Output/<path:filename>')
def download_file(filename):
    return send_from_directory(UPLOAD_FOLDER, filename, as_attachment=True)

if __name__ == '__main__':
    app.run(host='127.0.0.1', debug=True)    