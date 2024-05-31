export async function createAccountAPICall(route, token, data){
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
        console.log("createAccountAPICall: " + error);
    }
}

export async function getUsersAPICall(route, token, role){
    try{
        let res = await fetch(route + `${role}?limit=10000`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`,
            },
        });
        return res;
    }
    catch(error){
        console.log("getUsersAPICall Error: " + error);
    }
}