function Report() {

  const report =
    JSON.parse(
      localStorage.getItem(
        "report"
      )
    );

  if (!report)
    return <h2>No Report</h2>;

  return (
    <div className="container">

      <h1>
        Screening Report
      </h1>

      <h3>
        Patient:
        {report.patient_id}
      </h3>

      <p>
        Anemia Risk:
        {
          report.assessment
            .anemia_risk
        }
      </p>

      <p>
        Fatigue:
        {
          report.assessment
            .fatigue_level
        }
      </p>

      <p>
        Recommendation:
        {
          report.recommendation
        }
      </p>

    </div>
  );
}

export default Report;