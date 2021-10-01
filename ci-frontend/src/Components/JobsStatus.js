const JobsDuration = ({ stats }) => {
  return (
    <>
      {/* <Card style={{ width: "15pc" }} bg={Dark} border="dark"> */}
       
            <h5>Number of Successes: {stats.results.success}</h5>
            <h5>Number of Failures: {stats.results.failure}</h5>
            <h5>Number of Cancels: {stats.results.cancel}</h5>

      {/* </Card>{" "} */}
    </>
  );
}

export default JobsDuration;