export async function getCompaniesAPICall(route, token){
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
        console.log("getCompaniesAPICall Error: " + error);
    }
}

export async function createNewCompanyAPICall(route, token, data){
    try{
        let res = await fetch(route, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${token}`,
            },
            body: JSON.stringify(data)
        });
        return res;
    }
    catch(error){
        console.log("createNewCompanyAPICall Error: " + error);
    }
}

export async function deleteCompanyAPICall(route, token){
    try{
        let res = await fetch(route, {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${token}`,
            },
        });
        return res;
    }
    catch(error){
        console.log("deleteCompanyAPICall Error: " + error);
    }
}