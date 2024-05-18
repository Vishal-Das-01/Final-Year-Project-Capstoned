export async function callAPI(method, accessToken, url, data) {
    try {
        const response = await fetch(url, {
            method, headers: {
                'Authorization': `Bearer ${accessToken}`,
            },
            body: JSON.stringify(data),
        });
        return response;
    }
    catch (error) {
        alert("An error occurred. Please try again later.")
        console.log(error);
    }
}

// if (response.status === HttpStatusCode.Unauthorized) {
//     console.log("token refreshed")
//     const response = await fetch(BACKEND_ROUTES.refresh, {
//         method: "POST", headers: {
//             'Authorization': `Bearer ${refreshToken.value}`,
//         }
//     });

//     const responseData = await response.json();
//     if (response.status === HttpStatusCode.Ok) {
//         console.log("calling again")
//         const prev_response = await callAPIAgain(method, responseData.accessToken, url, data);
//         return prev_response;

// async function callAPIAgain(method, accessToken, url, data) {
//     try {
//         const response = await fetch(url, {
//             method, headers: {
//                 'Authorization': `Bearer ${accessToken}`,
//             },
//             body: JSON.stringify(data),
//         });
//         if (response.status === HttpStatusCode.Ok) {
//             const responseData = await response.json();
//             return responseData;
//         }
//     }
//     catch (error) {
//         console.log(error);
//     }
// }

