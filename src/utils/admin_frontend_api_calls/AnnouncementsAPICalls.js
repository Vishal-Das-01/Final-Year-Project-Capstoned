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