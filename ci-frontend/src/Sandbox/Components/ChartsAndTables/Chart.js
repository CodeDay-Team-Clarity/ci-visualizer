import { useParams } from "react-router-dom";

const Chart = props => {
  const { job } = useParams();

  return (
    <div className="container-fluid">
      <div className="row justify-content-start">
        <div className="col align-self-end">
          <h1>Hello from {job}</h1>
        </div>
      </div>
    </div>
  );
};

export default Chart;
