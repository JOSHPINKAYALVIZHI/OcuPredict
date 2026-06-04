import cv2


class EyeDetector:

    def detect(self, image_path):

        image = cv2.imread(image_path)

        if image is None:
            raise Exception(
                "Image not found"
            )

        gray = cv2.cvtColor(
            image,
            cv2.COLOR_BGR2GRAY
        )

        face_cascade = cv2.CascadeClassifier(
            cv2.data.haarcascades +
            "haarcascade_frontalface_default.xml"
        )

        eye_cascade = cv2.CascadeClassifier(
            cv2.data.haarcascades +
            "haarcascade_eye.xml"
        )

        faces = face_cascade.detectMultiScale(
            gray,
            scaleFactor=1.3,
            minNeighbors=5
        )

        for (x, y, w, h) in faces:

            roi_gray = gray[
                y:y+h,
                x:x+w
            ]

            eyes = eye_cascade.detectMultiScale(
                roi_gray
            )

            return eyes

        return None