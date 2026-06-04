from flask import Flask
from flask import request
from flask import jsonify

from flask_cors import CORS

import os

from ai.eye_detector import EyeDetector
from ai.feature_extractor import FeatureExtractor
from ai.predictor import Predictor

from backend.supabase_client import supabase


app = Flask(__name__)

CORS(app)


UPLOAD_FOLDER = "uploads"

os.makedirs(
    UPLOAD_FOLDER,
    exist_ok=True
)


detector = EyeDetector()

extractor = FeatureExtractor()

predictor = Predictor()


@app.route("/")
def home():

    return {
        "project": "OcuPredict AI",
        "status": "Running"
    }


@app.route("/predict", methods=["POST"])
def predict():

    if "image" not in request.files:

        return jsonify({
            "error": "No image uploaded"
        }), 400

    image = request.files["image"]

    path = os.path.join(
        UPLOAD_FOLDER,
        image.filename
    )

    image.save(path)

    eyes = detector.detect(path)

    if eyes is None:

        return jsonify({
            "error": "Eyes not detected"
        })

    features = extractor.extract(
        path,
        eyes
    )

    report = predictor.analyze(
        features
    )

    response = {

        "patient_id": "OP001",

        "screening_type":
        "Ocular Biomarker Screening",

        "biomarkers": {

            "conjunctiva_score":
            report["conjunctiva_score"],

            "brightness_score":
            report["brightness_score"]

        },

        "assessment": {

            "anemia_risk":
            report["anemia"],

            "fatigue_level":
            report["fatigue"]

        },

        "recommendation": (

            "Further clinical evaluation recommended."

            if report["anemia"] != "Low Risk"

            else "No significant risk detected."

        )

    }

    try:

        supabase.table(
            "patient_reports"
        ).insert({

            "patient_id":
            response["patient_id"],

            "anemia_risk":
            response["assessment"]["anemia_risk"],

            "fatigue_level":
            response["assessment"]["fatigue_level"],

            "recommendation":
            response["recommendation"]

        }).execute()

    except Exception as e:

        print(
            "Supabase Error:",
            e
        )

    return jsonify(
        response
    )


@app.route("/history")
def history():

    data = supabase.table(
        "patient_reports"
    ).select("*").order(
        "id",
        desc=True
    ).execute()

    return jsonify(
        data.data
    )


if __name__ == "__main__":

    app.run(
        debug=True,
        host="0.0.0.0",
        port=5000
    )   