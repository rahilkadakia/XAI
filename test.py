import os
import cv2

def frames_to_video(path):
    image_folder = path
    # image_folder = 'C:\\Users\\Dell\\OneDrive\\Desktop\\test images\\Anger'
    video_name = 'Surprise.avi'

    images = [int(img[:-4]) for img in os.listdir(image_folder) if img.endswith(".jpg")]
    images.sort()

    for i in range(len(images)):
        images[i] = str(images[i]) + ".jpg"

    video = cv2.VideoWriter(video_name, 0, 1, (960, 650))

    for image in images:
        video.write(cv2.imread(os.path.join(image_folder, image)))

    cv2.destroyAllWindows()
    video.release()

    return "200"

path = 'C:\\Users\\Dell\\OneDrive\\Desktop\\test images\\Surprise_2\\'
# frames_to_video(path)

from PIL import Image
import numpy as np
import tensorflow as tf

model = tf.keras.models.load_model('Models/VGG16')

def Predict_Class():
    target_names = ['Anger', 'Contempt', 'Disgust', 'Fear', 'Happiness', 'Other', 'Sadness', 'Surprise']

    for i in range(40):
        path = f'Frames\\{i+1}.jpg'
        img = Image.open(path)
        img = img.resize((256, 256))
        img = img.convert('RGB')
        img = np.asarray(img)
        new_img = np.expand_dims(img, axis=0)
        new_img = new_img.astype('float32')
        np_array = np.asarray(new_img)

        pred = model.predict(np_array)
        max_confidence = np.argmax(pred, axis=1)
        confidence = pred[0][max_confidence]
        confidence = round((confidence[0] * 100), 2)
        pred_class = target_names[max_confidence[0]]

        output = {'class': pred_class, 'confidence': confidence}

        print(output)

Predict_Class()