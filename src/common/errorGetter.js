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