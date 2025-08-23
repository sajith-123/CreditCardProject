// src/pages/Offers/AcceptOffer.js
import React, { useState } from "react";
import { Button, Alert, Card } from "react-bootstrap";

function AcceptOffer() {
  const [status, setStatus] = useState(null);

  const handleAccept = () => {
    // For demo purposes, just simulate "success"
    setStatus("success");

    // If you want to simulate failure instead, use:
    // setStatus("error");
  };

  return (
    <div className="container mt-5">
      <Card className="shadow-sm">
        <Card.Body>
          <Card.Title>Accept Credit Limit Offer</Card.Title>
          <Card.Text>
            Please confirm if you want to accept the assigned credit limit for
            this Carbon Credit.
          </Card.Text>

          <Button variant="primary" onClick={handleAccept}>
            Accept Offer
          </Button>

          <div className="mt-3">
            {status === "success" && (
              <Alert variant="success">
                ✅ Offer accepted successfully! <br />
                (In the real system, TPS would be notified, an email sent, and
                PrintShop informed.)
              </Alert>
            )}
            {status === "error" && (
              <Alert variant="danger">
                ❌ Something went wrong while accepting the offer. Please try
                again.
              </Alert>
            )}
          </div>
        </Card.Body>
      </Card>
    </div>
  );
}

export default AcceptOffer;
