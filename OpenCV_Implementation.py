import cv2
import numpy as np
from PIL import Image
import os

def OpenCV_Wrapper(filename):

    pathIn = os.getcwd() + "\\Uploads\\" + filename

    def extractImages():
        count = 0
        vidcap = cv2.VideoCapture(pathIn)
        success, image = vidcap.read()
        success = True

        try:
            while success:
                vidcap.set(cv2.CAP_PROP_POS_MSEC,(count*1000)) # added this line 
                success, image = vidcap.read()
                print ('Read a new frame: ', success)
                image = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
                cv2.imwrite("Frames" + "\\%d.jpg" % (count+1), image) # save frame as JPEG file
                count = count + 1
        except cv2.error:
            OpenCV_Algo()

    class Pixel:
        def __init__(self, file):
            self.img = cv2.imread(file)
            self.img = cv2.resize(self.img, (256, 256))
            self.mask = np.zeros(self.img.shape[:2], np.uint8)
            self.bgdModel = np.zeros((1,65), np.float64)
            self.fgdModel = np.zeros((1,65), np.float64)
            self.rect = (10, 10, 900, 600)
            cv2.grabCut(self.img, self.mask, self.rect, self.bgdModel, self.fgdModel, 5, cv2.GC_INIT_WITH_RECT)
            self.mask2 = np.where((self.mask==2) | (self.mask==0), 0, 1).astype('uint8')
            self.img = self.img * self.mask2[:, :, np.newaxis]
            self.np_img = np.asarray(self.img)

        def return_img(self):
            return self.np_img

    def OpenCV_Algo():
        static_address = os.getcwd() + '\\Frames\\'
        saving_address = os.getcwd() + '\\Processed\\'
        extension = '.jpg'

        file_list = []

        for file in range(40):
            filename = static_address + str(file + 1) + extension
            file_list.append(filename)

        np_list = []

        for file in file_list:
            processed_file = Pixel(file).return_img()
            print(f"File Processed: {file}")
            np_list.append(processed_file)

        for i in range(20):
            np_img1 = np_list[i]
            np_img2 = np_list[i + 20]
            # (np_img1 == np_img2).all() # For comparison of np arrays
            diff1 = np.subtract(np_img2, np_img1)
            diff1 = np.where(diff1 < 230, 0, 255)
            data = Image.fromarray((diff1 * 1).astype(np.uint8)).convert('RGB')
            data.save(saving_address + str(i+1) + ".jpg")
        
        frames_to_video()

    def frames_to_video():

        image_folder = os.getcwd() + "\\Processed"
        # image_folder = 'C:\\Users\\Dell\\OneDrive\\Desktop\\test images\\Anger'
        video_name = 'video_output.avi'

        images = [int(img[:-4]) for img in os.listdir(image_folder) if img.endswith(".jpg")]
        images.sort()

        for i in range(len(images)):
            images[i] = str(images[i]) + ".jpg"

        video = cv2.VideoWriter(video_name, 0, 6, (256, 256))

        for image in images:
            video.write(cv2.imread(os.path.join(image_folder, image)))

        cv2.destroyAllWindows()
        video.release()

        return "200"
    # path = 'C:\\Users\\Dell\\OneDrive\\Desktop\\test images\\Anger'
    # frames_to_video(path)

    extractImages()