import React, { useState } from "react";
import Navbar from "../../components/layout/Navbar";
import Sidebar from "../../components/layout/Sidebar";
import "bootstrap/dist/css/bootstrap.min.css";
// You will need to create and import this component if you haven't yet
import AcceptOffer from "./AcceptOffer"; 

const mockApplicationData = {
  APP001: {
    applicationId: "APP001",
    fullName: "Alice Smith",
    pan: "ABCDE1234F",
    email: "alice.smith@example.com",
    creditScore: 780,
  },
  APP002: {
    applicationId: "APP002",
    fullName: "Bob Johnson",
    pan: "FGHIJ5678K",
    email: "bob.johnson@example.com",
    creditScore: 650,
  },
  APP003: {
    applicationId: "APP003",
    fullName: "Charlie Brown",
    pan: "KLMNO9012P",
    email: "charlie.brown@example.com",
    creditScore: 750,
  },
};

export default function ViewOffer() {
  const [applicationId, setApplicationId] = useState("");
  const [details, setDetails] = useState(null);
  const [error, setError] = useState("");

  const handleCheckOffer = () => {
    setError("");
    setDetails(null);

    const record = mockApplicationData[applicationId];

    if (!record) {
      setError(" No record found for this Application ID");
      return;
    }

    setDetails(record);

    if (record.creditScore < 750) {
      const emailSubject = `Offer Rejection for Application ID: ${record.applicationId}`;
      const emailBody = `Dear ${record.fullName},\n\nYour loan application with Application ID ${record.applicationId} has been rejected due to a credit score below the required threshold of 750. We encourage you to review your credit report and reapply in the future.\n\nSincerely,\nYour Bank`;
      window.open(
        `mailto:${record.email}?subject=${encodeURIComponent(
          emailSubject
        )}&body=${encodeURIComponent(emailBody)}`
      );
    }
  };

  const renderStatusAlert = () => {
    if (!details) return null;

    if (details.creditScore >= 750) {
      return (
        <div className="alert alert-success mt-3 text-center">
          Offer Accepted! Proceed to the next step.
        </div>
      );
    } else {
      return (
        <div className="alert alert-warning mt-3 text-center">
          Offer Rejected. An email notification has been sent.
        </div>
      );
    }
  };

  return (
    <div className="container-fluid p-0">
      <Navbar />
      <div className="row g-0">
        <Sidebar />
        <div className="col-12 col-md-9 col-lg-10 p-4">
          <div className="card shadow-lg p-4">
            <h2 className="mb-4 text-center">View Offer</h2>
            <div className="mb-3">
              <label className="form-label">Application ID:</label>
              <input
                type="text"
                className="form-control form-control-lg"
                placeholder="Enter Application ID"
                value={applicationId}
                onChange={(e) => setApplicationId(e.target.value)}
              />
            </div>
            <button
              className="btn btn-success w-100 mb-3"
              onClick={handleCheckOffer}
            >
              Check Offer
            </button>
            {error && (
              <div className="alert alert-danger text-center">{error}</div>
            )}
            {details && (
              <div className="credit-score mt-4">
                <p><b>Application ID:</b> {details.applicationId}</p>
                <p><b>Name:</b> {details.fullName}</p>
                <p><b>Email:</b> {details.email}</p>
                <p><b>PAN:</b> {details.pan}</p>
                <p><b>Credit Score:</b> {details.creditScore}</p>
                <p><b>Status:</b> {details.creditScore >= 750 ? " Approved" : " Rejected"}</p>
              </div>
            )}
            {renderStatusAlert()}
            {details && details.creditScore >= 750 && <AcceptOffer />}
          </div>
        </div>
      </div>
    </div>
  );
}
