import cv2
import numpy as np


class FeatureExtractor:

    def extract(self, image_path, eyes):

        image = cv2.imread(image_path)

        if image is None:
            raise Exception(
                "Image not found"
            )

        mean_b = np.mean(
            image[:, :, 0]
        )

        mean_g = np.mean(
            image[:, :, 1]
        )

        mean_r = np.mean(
            image[:, :, 2]
        )

        gray = cv2.cvtColor(
            image,
            cv2.COLOR_BGR2GRAY
        )

        brightness = np.mean(
            gray
        )

        contrast = np.std(
            gray
        )

        return [{
            "red": float(mean_r),
            "green": float(mean_g),
            "blue": float(mean_b),
            "brightness": float(brightness),
            "contrast": float(contrast)
        }]