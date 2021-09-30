export const Columns = [
    {
        Header:'Job Id',
        Footer:'Job Id',
        accessor: 'id'
    },
    {
        Header:'Avg Duration',
        Footer:'Avg Duration',
        accessor: 'avg_duration'
    },
    {
        Header:'Successes',
        Footer:'Successes',
        accessor: 'results.success'
    },
    {
        Header:'Failures',
        Footer:'Failures',
        accessor: 'results.failure'
    },
    {
        Header:'Cancels',
        Footer:'Cancels',
        accessor: 'results.cancel'
    }
]