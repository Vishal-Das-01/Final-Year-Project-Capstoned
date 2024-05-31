export async function getAnnouncementsAPICall(route, token, announcementType){
    try{
        let res = await fetch(route + `${announcementType}?limit=${10000}`, {
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

export async function postAnnouncementAPICall(route, token, data){
    try{
        let res = await fetch(route, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${token}`,
            },
            body: data
        });
        return res;
    }
    catch(error){
        console.log("postAnnouncementAPICall Error: " + error);
    }
}

export async function updateAnnouncementAPICall(route, token, data){
    try{
        let res = await fetch(route, {
            method: "PATCH",
            headers: {
                "Authorization": `Bearer ${token}`,
            },
            body: JSON.stringify(data)
        });
        return res;
    }
    catch(error){
        console.log("updateAnnouncementAPICall Error: " + error);
    }
}

export async function deleteAnnouncementAPICall(route, token){
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
        console.log("deleteAnnouncementAPICall Error: " + error);
    }
}