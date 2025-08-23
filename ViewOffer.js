// ViewOffer.js
import React, { useState } from "react";
import {
  Container,
  Form,
  Button,
  Card,
  Alert,
  Col,
  Row,
} from "react-bootstrap";
// 1. Import the AcceptOffer component
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
      setError("❌ No record found for this Application ID");
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
    } else {
      console.log(
        "Offer Accepted. Proceed to the next user story (e.g., loan processing, document signing, etc.)"
      );
    }
  };

  return (
    <Container fluid className="d-flex justify-content-center align-items-center min-vh-100">
      <Row className="w-100">
        <Col md={13} lg={10} className="mx-auto">
          <Card className="shadow-lg p-4">
            <Card.Img
              variant="top"
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ2hM9Sum3LlgYvtGHLOQZCQVxj4efOCrkqQA&s"
              alt="SC Logo"
              className="mx-auto d-block mb-3"
              style={{ width: "150px" }}
            />
            <Card.Title
              className="text-center mb-4"
              style={{ color: "#007c4d" }}
            >
              View Offer
            </Card.Title>

            <Form>
              <Form.Group className="mb-3" controlId="applicationIdInput">
                <Form.Label>Application ID:</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Application ID"
                  value={applicationId}
                  onChange={(e) => setApplicationId(e.target.value)}
                />
              </Form.Group>

              <Button
                variant="success"
                className="w-100 mb-3"
                onClick={handleCheckOffer}
              >
                Check Offer
              </Button>
            </Form>

            {error && <Alert variant="danger">{error}</Alert>}

            {details && (
              <div className="credit-score mt-4">
                <p>
                  <b>Application ID:</b> {details.applicationId}
                </p>
                <p>
                  <b>Name:</b> {details.fullName}
                </p>
                <p>
                  <b>Email:</b> {details.email}
                </p>
                <p>
                  <b>PAN:</b> {details.pan}
                </p>
                <p>
                  <b>Credit Score:</b> {details.creditScore}
                </p>
                <p>
                  <b>Status:</b>{" "}
                  {details.creditScore >= 750 ? "✅ Approved" : "❌ Rejected"}
                </p>
              </div>
            )}

            {details && details.creditScore >= 750 && (
              <Alert variant="success" className="mt-3">
                Offer Accepted! Congratulations. Proceed to the next step.
              </Alert>
            )}

            {details && details.creditScore < 750 && (
              <Alert variant="warning" className="mt-3">
                Offer Rejected. An email notification has been sent.
              </Alert>
            )}

            {/* 2. Conditionally render AcceptOffer component */}
            {details && details.creditScore >= 750 && <AcceptOffer />}
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

