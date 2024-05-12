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