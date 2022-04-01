from flask import Flask
import os
from flask import Flask, flash, request, redirect, render_template, send_from_directory, Response
from flask_cors import CORS
from werkzeug.utils import secure_filename
from XAI import *
from flask_pymongo import PyMongo
from OpenCV_Implementation import *
import certifi
from pymongo import MongoClient
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

# @app.route("/shap", methods=['POST', 'GET'])
# def shap():
#     if request.method == 'POST':

#         if 'file' not in request.files:
#             flash('No file part')
#             return redirect(request.url)

#         file = request.files['file']

#         if file.filename == '':
#             flash('No selected file')
#             return redirect(request.url)

#         if file and allowed_file(file.filename):
#             filename = secure_filename(file.filename)
#             filename = os.path.splitext(filename)[0]
#             output = SHAP_Implementation(file, filename)
#             # return render_template("index.html", img_data=output)
#             return output

#     elif request.method == 'GET':
#         return render_template('upload.html')


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
            filename = os.path.splitext(filename)[0]

            # Not returning anything for now
            output = LIME_Implementation(file, filename)

            full_filename = filename + '.png'
            file = 'Output/' + full_filename
            return "200"
            # return output

    elif request.method == 'GET':
        return render_template('upload.html')


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

            OpenCV_Wrapper(filename)  # Not returning anything for now

            return "200"

    elif request.method == 'GET':
        return render_template('upload.html')


@app.route('/Output/<path:filename>')
def download_file(filename):
    return send_from_directory(UPLOAD_FOLDER, filename, as_attachment=True)

# docker build -t docker_image_name .
# docker run --rm -it -p 7000:5000 docker_image_name


# @app.route('/dbtest')
# def dbtest():
#     return '''
#         <form method = "POST" action = "/dbtest/create" enctype = "multipart/form-data">
#             <input type = "text" name = "filename" />
#             <input type = "file" name = "input_image" />
#             <input type = "submit">
#         </form>
#     '''


# @app.route('/dbtest/create', methods=['POST'])
# def dbcreate():
#     print(request.files)
#     if 'input_image' in request.files:
#         input_image = request.files['input_image']
#         print(input_image)
#         db = client['XAI']
#         # collection = db['test']
#         db.save_file(input_image.filename, input_image)
#         print("SAVEDDD")
#         db.test.insert_one({'filename': request.form.get(
#             'filename'), 'input_image_name': input_image.filename})
#     return 'Done!'


@app.route('/<file_name>', methods=['POST', 'GET'])
def getImage(file_name):
    file = 'Output/' + file_name + '.png'
    return send_file(file, mimetype='image/png'), 200


if __name__ == '__main__':
    # app.run(host='127.0.0.1', debug=True) # For Local
    app.run(host='0.0.0.0', debug=True)  # For Docker
