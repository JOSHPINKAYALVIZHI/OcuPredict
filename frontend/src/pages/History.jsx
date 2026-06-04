import {
  useEffect,
  useState
} from "react";

import axios from "axios";

function History() {

  const [data, setData] =
    useState([]);

  useEffect(() => {

    axios
      .get(
        "http://127.0.0.1:5000/history"
      )
      .then((res) =>
        setData(res.data)
      );

  }, []);

  return (
    <div className="container">

      <h1>
        Patient History
      </h1>

      {data.map((item) => (

        <div
          key={item.id}
          className="card"
        >

          <h3>
            {item.patient_id}
          </h3>

          <p>
            {item.anemia_risk}
          </p>

        </div>

      ))}

    </div>
  );
}

export default History;