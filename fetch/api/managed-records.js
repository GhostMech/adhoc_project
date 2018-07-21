import fetch from "../util/fetch-fill";
import URI from "urijs";
import { resolve } from "path";

// /records endpoint
window.path = "http://localhost:3000/records";

// Your retrieve function plus any additional functions go here ...
function retrieve(options) {

    // The unmodified colors collection
    let colorsCollection = {previousPage:null, nextPage:null, ids:[], open:[], closedPrimaryCount:0};

    // Hard-code the 10 item limit
    let apiPath = window.path + "?limit=10";

    // Call fetch API; return resolved Promise of the transformed response
    return fetch(apiPath)

        // Convert the response into an array
        .then(response => response.json())

        // Add the "isPrimary" Boolean property to every item in the array
        .then(responseArray => {
            responseArray.map((item, index) => {
                responseArray[index].isPrimary = isPrimaryColor(item.color);
                return item;
            });
            console.log(responseArray)
        })
        /*
        // Create a collection from the response array.
        .then(responseArray => {

            console.log(responseArray)
            /*
            // Gather all item ids
            colorsCollection.ids = responseArray
                .map(item => item.id);

            // Gather only "open-disposition" items
            colorsCollection.open = responseArray
                .filter(item => item.disposition === "open");

            // Count the number of "closed-disposition" primary-color items
            colorsCollection.closedPrimaryCount = responseArray
                .filter(item => item.disposition === "closed")
                .map(item => Number(item.isPrimary))
                .reduce((prev, curr) => prev + curr);
            
        })
        */
        .catch(e => console.log(e));

}

// Check if color is a primary color; return Boolean
function isPrimaryColor(color) {
    switch(color) {
        case "red":
        case "blue":
        case "yellow":
            return true;
        default:
            return false;
    }
}

export default retrieve;
