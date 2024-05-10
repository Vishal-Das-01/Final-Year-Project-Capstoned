import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../config/firebase.config";

export async function uploadFile(file, name, path, contentType) {
    try {

        const folderPath = path + '/' + name;
        const storageRef = ref(storage, folderPath);

        const metadata = {
            name: name,
            contentType: contentType
        };

        const snapshot = await uploadBytes(storageRef, file, metadata);
        console.log('Uploaded a blob or file!', snapshot);

        const downloadURL = await getDownloadURL(storageRef);
        console.log('File download URL:', downloadURL);

        return downloadURL ;
    } catch (error) {
        console.log(error);
        alert('Error uploading file');
    }
}
