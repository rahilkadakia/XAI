import tensorflow as tf
from tensorflow.keras.applications.vgg16 import preprocess_input    
import shap
import numpy as np
from PIL import Image
from skimage.segmentation import mark_boundaries
from lime import lime_image
import matplotlib.pyplot as plt
from flask import send_file

model = tf.keras.models.load_model('Models/VGG16')

def f(x):
    tmp = x.copy()
    tmp = preprocess_input(tmp)
    return model(tmp)

def SHAP_Implementation(file, filename):
    img = Image.open(file)
    img = img.resize((256, 256))
    img = img.convert('RGB')
    img = np.asarray(img)
    new_img = np.expand_dims(img, axis=0)
    new_img = new_img.astype('float32')

    class_names = ['Angry', 'Fear', 'Happiness', 'Sadness', 'Surprise', 'Disgust', 'Contempt', 'Other']

    masker = shap.maskers.Image("inpaint_ns", new_img[0].shape)
    explainer = shap.Explainer(f, masker, output_names=class_names)
    shap_values = explainer(new_img[0:], max_evals=50, batch_size=5, outputs=shap.Explanation.argsort.flip[:8])

    op = shap.image_plot(shap_values)
    print(type(op))
    return "123"

def LIME_Implementation(file, filename):
    img = Image.open(file)
    img = img.resize((256, 256))
    img = img.convert('RGB')
    img = np.asarray(img)
    new_img = np.expand_dims(img, axis=0)
    new_img = new_img.astype('float32')

    explainer = lime_image.LimeImageExplainer()
    explanation = explainer.explain_instance(new_img[0].astype('double'), model.predict, top_labels=3, hide_color=0, num_samples=50)

    temp_1, mask_1 = explanation.get_image_and_mask(explanation.top_labels[0], positive_only=True, negative_only=False, num_features=10, hide_rest=True)
    temp_2, mask_2 = explanation.get_image_and_mask(explanation.top_labels[0], positive_only=False, negative_only=True, num_features=10, hide_rest=True)

    fig, (ax1, ax2) = plt.subplots(1, 2, figsize=(15,15))
    ax1.imshow(mark_boundaries(temp_1, mask_1))
    ax2.imshow(mark_boundaries(temp_2, mask_2))
    ax1.axis('off')
    ax2.axis('off')
    
    fig.savefig(f'Output/{filename}.png')

    # return "200"
    # return send_file(f'Output/{filename}.png')