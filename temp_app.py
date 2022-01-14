from flask import Flask
import os
from flask import Flask, flash, request, redirect, render_template, send_from_directory
from werkzeug.utils import secure_filename
from send_image import *

app = Flask(__name__)

UPLOAD_FOLDER = os.getcwd() + '/Output'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

ALLOWED_EXTENSIONS = {'txt', 'pdf', 'png', 'jpg', 'jpeg', 'gif'}

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@app.route("/image", methods=['POST', 'GET'])
def image():
    filename = "007_526"
    output = send_image(filename)
    print(type(output))
    return output


@app.route('/Output/<path:filename>')
def download_file(filename):
    return send_from_directory(UPLOAD_FOLDER, filename, as_attachment=True)

if __name__ == '__main__':
    app.run(host='127.0.0.1', debug=True)    