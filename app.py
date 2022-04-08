from flask import Flask
import os
from flask import Flask, flash, request, redirect, render_template, send_from_directory, Response, send_file
from flask_cors import CORS
from werkzeug.utils import secure_filename
from XAI import *
# from flask_pymongo import PyMongo
from OpenCV_Implementation import *
import certifi
# from pymongo import MongoClient
import random
import json


ca = certifi.where()

app = Flask(__name__)
CORS(app)
app.secret_key = 'HocusPocus'

# client = MongoClient(URI, tlsCAFile=ca)


UPLOAD_FOLDER = os.getcwd() + '/Output'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

ALLOWED_EXTENSIONS = {'txt', 'pdf', 'png', 'jpg', 'jpeg', 'gif', 'avi'}


def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS


@app.route("/", methods=['POST', 'GET'])
def home():
    return "Working", 200


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
            file.save(os.path.join(os.getcwd() + "\\Uploads\\", filename))

            extractImages(filename)
            OpenCV_Wrapper(filename)

            filename = os.path.splitext(filename)[0]
            file_number = str(random.randint(8, 32))
            path = f'Frames\\{file_number}.jpg'

            output = Predict_Class(path)
            output = json.dumps(output)

            LIME_Implementation(path, filename)
            return output, 200

    elif request.method == 'GET':
        return render_template('upload.html')


@app.route('/Output/<filename>')
def download_file(filename):
    return send_from_directory(UPLOAD_FOLDER, filename)

# docker build -t docker_image_name .
# docker run --rm -it -p 7000:5000 docker_image_name


@app.route('/<file_name>', methods=['POST', 'GET'])
def getImage(file_name):
    file = 'Output/' + file_name + '.png'
    return send_file(file, mimetype='image/png'), 200


@app.route('/video/<file_name>', methods=['POST', 'GET'])
def getVideo(file_name):
    file = 'video_output.avi'
    return send_file(file)
    # return url_for('static', filename='style.css')
    # return send_file(file), 200


if __name__ == '__main__':
    # app.run(host='127.0.0.1', debug=True) # For Local
    app.run(host='0.0.0.0', debug=True)  # For Docker
