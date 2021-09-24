import React from "react";

export default function JobsDuration({ stats }) {
  return (
    <div>
      <Card style={{ width: "15pc" }} bg={Dark} border="dark">
        <Card.Body>
          <Card.Title>jobs data</Card.Title>
          <Card.Text>
            <h5>Number of Successes: {stats.stats.Successes}</h5>
            <h5>Number of Failures: {stats.stats.Failures}</h5>
            <h5>Number of Cancels: {stats.stats.Cancels}</h5>
            <h5>Average build time: {stats.stats.Average}</h5>
          </Card.Text>
        </Card.Body>
      </Card>{" "}
    </div>
  );
}
