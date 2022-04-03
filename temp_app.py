from flask import Flask
import os
from flask import Flask, flash, request, redirect, render_template, send_from_directory
from werkzeug.utils import secure_filename
from XAI import *
from send_image import *
from OpenCV_Implementation import *


app = Flask(__name__)
app.secret_key = 'HocusPocus'

UPLOAD_FOLDER = os.getcwd() + '/Output'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

ALLOWED_EXTENSIONS = {'txt', 'pdf', 'png', 'jpg', 'jpeg', 'gif', 'avi'}

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@app.route("/image", methods=['POST', 'GET'])
def image():
    filename = "007_526"
    output = send_image(filename)
    print(type(output))
    return output

@app.route("/opencv", methods=['POST', 'GET'])
def opencv():
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

            OpenCV_Wrapper(filename) # Not returning anything for now
            
            # full_filename = filename + '.png'
            # return render_template("index.html", img_data=full_filename)
            return "200"
 
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
            pred_class = Predict_Class(file)
            LIME_Implementation(file, filename)
            return pred_class, 200


@app.route("/test", methods=['POST', 'GET'])
def Test():
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
            pred_class = Predict_Class(file)

            # Not returning anything for now
            output = LIME_Implementation(file, filename)

            full_filename = filename + '.png'
            file = 'Output/' + full_filename
            return pred_class, 200

 
@app.route('/', methods=['POST', 'GET'])
def home():
    file = 'Output/007_518.png'
    return send_file(file, mimetype='image/gif'), 200


@app.route('/Output/<path:filename>')
def download_file(filename):
    return send_from_directory(UPLOAD_FOLDER, filename, as_attachment=True)

if __name__ == '__main__':
    app.run(host='127.0.0.1', debug=True)    