// Button Colors
import indigo from "@material-ui/core/colors/indigo"; // planned
import brown from "@material-ui/core/colors/brown"; // postponed
import red from "@material-ui/core/colors/red"; // cancelled
import amber from "@material-ui/core/colors/amber"; // created
import green from "@material-ui/core/colors/green"; //completed


const CREATED = amber;
const PLANNED = indigo;
const POSTPONED = brown;
const CANCELLED = red;
const COMPLETED = green;



const statusColors = {
    created: CREATED,
    planned: PLANNED,
    postponed: POSTPONED,
    cancelled: CANCELLED,
    completed: COMPLETED,
}

const statusButton = {
    
}



export {statusColors, statusButton};