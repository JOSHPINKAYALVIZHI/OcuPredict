class Predictor:

    def analyze(self, features):

        avg_red = sum(
            f["red"]
            for f in features
        ) / len(features)

        avg_brightness = sum(
            f["brightness"]
            for f in features
        ) / len(features)

        result = {}

        # Anemia Risk

        if avg_red < 90:
            result["anemia"] = "High Risk"

        elif avg_red < 120:
            result["anemia"] = "Moderate Risk"

        else:
            result["anemia"] = "Low Risk"

        # Fatigue

        if avg_brightness < 70:
            result["fatigue"] = "High"

        elif avg_brightness < 100:
            result["fatigue"] = "Moderate"

        else:
            result["fatigue"] = "Low"

        result["conjunctiva_score"] = round(
            avg_red,
            2
        )

        result["brightness_score"] = round(
            avg_brightness,
            2
        )

        return result