import moment from 'moment'

export  function timeformateNow(time) {
    return moment(time).fromNow()
}
export  function timeformateDate(time) {
    return moment(time).format("MMM Do YYYY")
}

export  function timeExpiterDate(time) {
    return moment(time).add('days', 360).format('MMMM Do YYYY')
}

