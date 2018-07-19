import fetch from "../util/fetch-fill";
import URI from "urijs";
import { resolve } from "path";

// /records endpoint
window.path = "http://localhost:3000/records";

// Your retrieve function plus any additional functions go here ...
function retrieve(options) {

    let obj = {previousPage:null, nextPage:null, ids:[], open:[], closedPrimaryCount:0}
    /* var p = new Promise((resolve, reject) => {
        setTimeout(resolve, 100, {"previousPage":null,"nextPage":null,"ids":[],"open":[],"closedPrimaryCount":0})
    }).then(data => data) */
    //console.log(new URI())

    let apiPath = window.path + '?limit=10'
    return fetch(apiPath).then(records => records.json())
        .then(data => {
            data.forEach(item => {
                obj.ids.push(item.id)
                item.isPrimary = isPrimaryColor(item.color)
                
                if (item.disposition === 'open') {
                    obj.open.push(item)
                } else {
                    item.isPrimary? obj.closedPrimaryCount++ : null
                }
            })
            obj.nextPage = 2

            return obj
        }).catch(function(error) {
            console.log(error)
        })

}

function isPrimaryColor(color) {
    if (color === 'red' 
        || color === 'blue' 
        || color === 'yellow'
    ) {
        return true
    }
    return false
}

export default retrieve;
