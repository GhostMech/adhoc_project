import fetch from "../util/fetch-fill";
import URI from "urijs";
import { resolve } from "path";

// /records endpoint
window.path = "http://localhost:3000/records";

// Your retrieve function plus any additional functions go here ...
function retrieve(options) {
   
    let uri = new URI({
        protocol: "http",
        hostname: "localhost",
        port: 3000,
        query: "limit=10",
        path: "/records"
    });


    if (options && options.page !== undefined) {
        console.log(options);
        uri.query += "&offset=" + ((options.page * 10) - 10);
    }
    
    // Call fetch API; return resolved Promise of the transformed response
    return fetch(uri)
    
    // Convert the response into an array
    .then(response => response.json())
    
    // Add the "isPrimary" Boolean property to every item in the array
    .then(responseArray => {
        
        if (responseArray.length) {

            // The unmodified colors collection
            let colorsCollection = {};
                responseArray.map((item, index) => {
                    responseArray[index].isPrimary = isPrimaryColor(item.color);
                    return item;
                });
            
                // Create a collection from the response array. 
                
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
                
                if (options && options.page !== undefined) {
                    colorsCollection.nextPage = options.page < 50? options.page + 1 : null;
                    colorsCollection.previousPage = options.page > 1? options.page - 1 : null;
                } else {
                    colorsCollection.nextPage = null;
                    colorsCollection.previousPage = null;
                }

                return colorsCollection;
            } else {

                return responseArray;
            }
        })
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
