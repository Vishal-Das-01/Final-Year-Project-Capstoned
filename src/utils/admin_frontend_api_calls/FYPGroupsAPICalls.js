export async function getFYPGroupsAPICall(route, token){
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
        console.log("getFYPGroupsAPICall Error: " + error);
    }
}

export async function finalizeAllFYPGroupsAPICall(route, token){
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
        console.log("finalizeAllFYPGroupsAPICall: " + error);
    }
}

export async function finalizeFYPGroupAPICall(route, token){
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
        console.log("finalizeAllFYPGroupsAPICall: " + error);
    }
}

export async function unfinalizeFYPGroupAPICall(route, token){
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
        console.log("finalizeAllFYPGroupsAPICall: " + error);
    }
}