export async function markProjectFinishedAPICall(route, token, data){
    try{
        let res = await fetch(route, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(data)
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