/**
 * Place to collect all helper functions
 */
import './image.js'
import './form.js'

window.dateString = data => {
    var d = new Date(data);
    return d.getDate()  + "-" + (d.getMonth()+1) + "-" + d.getFullYear() + " " + d.getHours() + ":" + d.getMinutes() + ":" +  d.getSeconds();
}