export async function getAnnouncementsAPICall(route, token, announcementType){
    try{
        let res = await fetch(route + `${announcementType}`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`,
            },
        });
        return res;
    }
    catch(error){
        console.log("getAnnouncementsAPICall Error: " + error);
    }
}

export async function createNewAnnouncementAPICall(route, token, data){
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
        console.log("createNewAnnouncementAPICall Error: " + error);
    }
}