import React from "react";

export default function JobsDuration({ stats }) {
  return (
    <div>
      <Card style={{ width: "15pc" }} bg={Dark} border="dark">
        <Card.Body>
          <Card.Title>jobs data</Card.Title>
          <Card.Text>
            <h5>Number of Successes: {stats.results.successes}</h5>
            <h5>Number of Failures: {stats.results.failures}</h5>
            <h5>Number of Cancels: {stats.results.cancels}</h5>
          </Card.Text>
        </Card.Body>
      </Card>{" "}
    </div>
  );
}
