const JobListCard = ({stats}) => {
    return (
        <>
          {stats.map((job, index) => (
              <div key = {index}>
                <h1>{job.}</h1>
              </div>
          ))}  
        </>
    )
}

export default JobListCard