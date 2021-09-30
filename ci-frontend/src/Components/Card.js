const Card = ({ component, size, title }) => {
  return (
    <>
      <div className="row">
        <div className={`col-${size} mb-3`}>
          <div className="card bg-light my-2 p-2 h-100">
            <div className="crad-header text-center">
              <strong>{`${title}`}</strong>
            </div>
            <div className="card-body">
              <div className="table-responsive">{component}</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Card;
