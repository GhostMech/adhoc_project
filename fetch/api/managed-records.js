import fetch from "../util/fetch-fill";
import URI from "urijs";
import { resolve } from "path";

// /records endpoint
window.path = "http://localhost:3000/records";

// Your retrieve function plus any additional functions go here ...
function retrieve(options) {

    // The unmodified colors collection
    let colorsCollection = {previousPage:null, nextPage:null, ids:[], open:[], closedPrimaryCount:0}


    /* var p = new Promise((resolve, reject) => {
        setTimeout(resolve, 100, {"previousPage":null,"nextPage":null,"ids":[],"open":[],"closedPrimaryCount":0})
    }).then(data => data) */
    //console.log(new URI())

    // Hard-code the 10 item limit
    let apiPath = window.path + '?limit=10'

    // Call fetch API; return a modified collection of colors
    return fetch(apiPath)
        .then(records => records.json())
        .then(data => {
            data.forEach(item => {

                // Gather the item ids
                colorsCollection.ids.push(item.id)

                // Set Boolean: is color a primary or not?
                item.isPrimary = isPrimaryColor(item.color)
                
                // Add only "open" disposition items to the collection
                if (item.disposition === 'open') {
                    colorsCollection.open.push(item)
                
                // Otherwise increment counter if any "closed" primary colors exist
                } else {   
                    item.isPrimary? colorsCollection.closedPrimaryCount++ : null
                }
            })

            // Set the pages
            colorsCollection.nextPage = 2

            return colorsCollection
        })
        .catch(function(error) {
            console.log(error)
        })

}

// Check if color is a primary color; return Boolean
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
