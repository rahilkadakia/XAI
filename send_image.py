from flask import send_file, make_response

def send_image(filename):
    return send_file(f'Output/{filename}.png')