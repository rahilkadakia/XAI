import numpy as np
from PIL import Image
from skimage.segmentation import mark_boundaries
from lime import lime_image
import matplotlib.pyplot as plt
import tensorflow as tf

model = tf.keras.models.load_model('Models/VGG16')

file = 'Frames/1.jpg'

img = Image.open(file)
img = img.resize((256, 256))
img = img.convert('RGB')
img = np.asarray(img)
new_img = np.expand_dims(img, axis=0)
new_img = new_img.astype('float32')

explainer = lime_image.LimeImageExplainer()
explanation = explainer.explain_instance(new_img[0].astype(
    'double'), model.predict, top_labels=3, hide_color=0, num_samples=10)

temp_1, mask_1 = explanation.get_image_and_mask(
    explanation.top_labels[0], positive_only=True, negative_only=False, num_features=10, hide_rest=True)
temp_2, mask_2 = explanation.get_image_and_mask(
    explanation.top_labels[0], positive_only=False, negative_only=True, num_features=10, hide_rest=True)

fig1, ax1 = plt.subplots(1, 1, figsize=(15, 15))
plt.tight_layout(pad=0)

fig2, ax2 = plt.subplots(1, 1, figsize=(15, 15))
plt.tight_layout(pad=0)

ax1.imshow(mark_boundaries(temp_1, mask_1))
ax2.imshow(mark_boundaries(temp_2, mask_2))
ax1.axis('off')
ax2.axis('off')

# fig.savefig(f'open-react-template/public/images/LIME/{filename}.png')
fig1.savefig(f'Output/1.png', bbox_inches = 'tight', pad_inches = 0)
fig2.savefig(f'Output/2.png', bbox_inches = 'tight', pad_inches = 0)