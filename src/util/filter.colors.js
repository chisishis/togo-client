import indigo from "@material-ui/core/colors/indigo"; // planned
import brown from "@material-ui/core/colors/brown"; // postponed
import red from "@material-ui/core/colors/red"; // cancelled
import amber from "@material-ui/core/colors/amber"; // created
import green from "@material-ui/core/colors/green"; //completed

const statusColors = {
    created: amber,
    planned: indigo,
    postponed: brown,
    cancelled: red,
    completed: green,
}

export {statusColors};