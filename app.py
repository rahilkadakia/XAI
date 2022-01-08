from flask import Flask
import os
from flask import Flask, flash, request, redirect, render_template
from werkzeug.utils import secure_filename
from PIL import Image
import base64
import io

app = Flask(__name__)

ALLOWED_EXTENSIONS = {'txt', 'pdf', 'png', 'jpg', 'jpeg', 'gif'}

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@app.route("/", methods=['POST', 'GET'])
def homepage():
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
            im = Image.open(file)
            data = io.BytesIO()
            im.save(data, "PNG")
            encoded_img_data = base64.b64encode(data.getvalue())
            return render_template("index.html", img_data=encoded_img_data.decode('utf-8'))
 
    elif request.method == 'GET':
        return render_template('upload.html')

if __name__ == '__main__':
    app.run(host='127.0.0.1', debug=True)    