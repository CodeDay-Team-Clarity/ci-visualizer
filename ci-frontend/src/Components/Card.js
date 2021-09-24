const Card = ({component, size, title}) => {
    return (
        <>
            <div className = "row">
                <div className = {`col-${size}`}>
                    <div className = "card bg-light my-2 p-2">
                        <div className = "crad-header text-center">
                            <strong>{`${title}`}</strong>
                        </div>
                        <div className = "card-body">
                            <div className = "table-responsive">
                                {component}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Card
