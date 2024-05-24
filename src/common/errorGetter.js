/**
 * Function to extract error information from an Axios error object.
 * @param {object} errorToSet - Axios error object.
 * @returns {string} - Extracted error message.
 */
function errorGetter(errorToSet) {
    let error = "";
    if(errorToSet.response) {
        const {data} = errorToSet.response;
        if(data!==undefined) {
            error = data;
        }  
    }
    if(error==="") {
        error = "An unexpected error occurred.";
    }
    return error;
}

export default errorGetter;