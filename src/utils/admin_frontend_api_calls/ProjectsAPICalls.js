export async function markProjectFinishedAPICall(route, token){
    try{
        let res = await fetch(route, {
            method: "PATCH",
            headers: {
                "Authorization": `Bearer ${token}`
            },
        });
        return res;
    }
    catch(error){
        console.log("markProjectFinishedAPICall: " + error);
    }
}

export async function getProjectsAPICall(route, token){
    try{
        let res = await fetch(route, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`,
            },
        });
        return res;
    }
    catch(error){
        console.log("getProjectsAPICall Error: " + error);
    }
}