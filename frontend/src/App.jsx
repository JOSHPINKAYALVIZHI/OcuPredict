import { useState } from "react";
import axios from "axios";
import { useDropzone } from "react-dropzone";
import {
Eye,
Upload,
Activity,
AlertTriangle
} from "lucide-react";

function App() {
const [file, setFile] = useState(null);
const { getRootProps, getInputProps } =
  useDropzone({
    accept: {
      "image/*": []
    },
    multiple: false,

    onDrop: (acceptedFiles) => {
      setFile(acceptedFiles[0]);
    }
  }); 
const [result, setResult] = useState(null);
const [loading, setLoading] = useState(false);

const analyzeImage = async () => {
if (!file) {
alert("Please select an eye image");
return;
}

```
setLoading(true);

const formData = new FormData();
formData.append("image", file);

try {
  const response = await axios.post(
    "http://127.0.0.1:5000/predict",
    formData
  );

  setResult(response.data);
} catch (err) {
  console.error(err);
  alert("Analysis Failed");
}

setLoading(false);
```

};

return (
<div
style={{
minHeight: "100vh",
background:
"linear-gradient(135deg,#eef5ff,#f7fbff)",
padding: "40px",
fontFamily: "Segoe UI"
}}
>
<div
style={{
maxWidth: "1200px",
margin: "auto"
}}
>
<div
style={{
background: "#fff",
borderRadius: "20px",
padding: "25px",
boxShadow:
"0 10px 30px rgba(0,0,0,0.08)"
}}
>
<h1
style={{
display: "flex",
alignItems: "center",
gap: "10px"
}}
> <Eye size={40} />
OcuPredict AI </h1>

```
      <p
        style={{
          color: "#666"
        }}
      >
        AI-Powered Ocular Biomarker Screening Platform
      </p>
    </div>

    <div
      style={{
        marginTop: "30px",
        background: "#fff",
        padding: "30px",
        borderRadius: "20px",
        boxShadow:
          "0 10px 30px rgba(0,0,0,0.08)"
      }}
    >
      <h2>Upload Eye Image</h2>

      <div
  {...getRootProps()}
  style={{
    border: "3px dashed #2563eb",
    borderRadius: "20px",
    padding: "40px",
    textAlign: "center",
    background: "#f8fbff",
    cursor: "pointer",
    transition: "0.3s"
  }}
>
  <input {...getInputProps()} />

  <h2>📤 Upload Eye Image</h2>

  <p>
    Drag & Drop an eye image here
  </p>

  <p>
    or click to browse files
  </p>
</div>

{file && (
  <div
    style={{
      marginTop: "25px",
      textAlign: "center"
    }}
  >
    <img
      src={URL.createObjectURL(file)}
      alt="preview"
      style={{
        width: "280px",
        height: "280px",
        objectFit: "cover",
        borderRadius: "20px",
        border: "4px solid #2563eb",
        boxShadow:
          "0 10px 25px rgba(0,0,0,0.15)"
      }}
    />

    <p
      style={{
        marginTop: "10px"
      }}
    >
      {file.name}
    </p>
  </div>
)}

      <br />
      <br />

      <button
        onClick={analyzeImage}
        style={{
          background: "#2563eb",
          color: "white",
          border: "none",
          padding: "12px 24px",
          borderRadius: "10px",
          cursor: "pointer"
        }}
      >
        <Upload size={18} />
        {" "}
        {loading
          ? "Analyzing..."
          : "Analyze Eye"}
      </button>
    </div>

    {result && (
      <>
      <div
  style={{
    display: "grid",
    gridTemplateColumns:
      "repeat(auto-fit,minmax(220px,1fr))",
    gap: "20px",
    marginTop: "25px"
  }}
>
  <div
    style={{
      background: "#ffffff",
      padding: "20px",
      borderRadius: "16px",
      boxShadow:
        "0 4px 12px rgba(0,0,0,0.08)"
    }}
  >
    <h3>🩸 Conjunctiva Score</h3>

    <h1
      style={{
        color: "#2563eb"
      }}
    >
      {
        result.biomarkers
          ?.conjunctiva_score
      }
    </h1>
  </div>

  <div
    style={{
      background: "#ffffff",
      padding: "20px",
      borderRadius: "16px",
      boxShadow:
        "0 4px 12px rgba(0,0,0,0.08)"
    }}
  >
    <h3>☀️ Brightness Score</h3>

    <h1
      style={{
        color: "#16a34a"
      }}
    >
      {
        result.biomarkers
          ?.brightness_score
      }
    </h1>
  </div>
</div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit,minmax(250px,1fr))",
            gap: "20px",
            marginTop: "30px"
          }}
        >
          <div
            style={{
              background: "#fff",
              padding: "20px",
              borderRadius: "20px"
            }}
          >
            <Activity />
            <h3>Anemia Risk</h3>
            <h2
  style={{
    color:
      result.assessment.anemia_risk ===
      "High Risk"
        ? "red"
        : "green"
  }}
>
  {result.assessment.anemia_risk}
</h2>
          </div>

          <div
            style={{
              background: "#fff",
              padding: "20px",
              borderRadius: "20px"
            }}
          >
            <Activity />
            <h3>Fatigue Level</h3>
            <h2
  style={{
    color:
      result.assessment.fatigue_risk ===
      "High Risk"
        ? "red"
        : "green"
  }}
>
  {result.assessment.fatigue_risk}
</h2>
          </div>

          <div
            style={{
              background: "#fff",
              padding: "20px",
              borderRadius: "20px"
            }}
          >
            <Eye />
            <h3>Patient ID</h3>
            <h2>
              {result.patient_id}
            </h2>
          </div>
        </div>

        <div
          style={{
            background: "#fff",
            padding: "25px",
            borderRadius: "20px",
            marginTop: "25px"
          }}
        >
          <h2>
            <AlertTriangle />
            Recommendation
          </h2>

          <p>
            {result.recommendation}
          </p>
        </div>
      </>
    )}
  </div>
</div>

);
}
export default App;
