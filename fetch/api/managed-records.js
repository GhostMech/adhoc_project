import fetch from "../util/fetch-fill";
import URI from "urijs";
import { resolve } from "path";

// /records endpoint
window.path = "http://localhost:3000/records";

// Your retrieve function plus any additional functions go here ...
function retrieve() {

    var p = new Promise((resolve, reject) => {
        setTimeout(resolve, 100, {"previousPage":null,"nextPage":null,"ids":[],"open":[],"closedPrimaryCount":0})
    }).then(data => console.log(data))
    return p

    let apiPath = window.path
    //console.log(options)
    if (options && options.constructor.name === 'Object') {
        if (options.page) {
            apiPath = apiPath + "?page=" + options.page
        } else {
            apiPath = apiPath + "?page=1"
        }
        if (options.limit) {
            apiPath = apiPath + "&limit=" + options.limit
        } else {
            apiPath = apiPath + "&limit=10"
        }
    } else {
        apiPath = apiPath + "?page=1&limit=10"
    }

    // limit to 10 items PER PAGE
    // ie retrieve({page: 2, colors: ["red", "brown"]})
    /*
    fetch(apiPath)
        .then(function(response) {
            if (!response) {
                throw new Error(response)
            }
            //console.log(apiPath)
            return response.json()
        })
    */
}

export default retrieve;
