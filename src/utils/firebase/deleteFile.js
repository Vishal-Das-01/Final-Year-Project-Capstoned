import { ref, deleteObject } from "firebase/storage";
import { storage } from "../config/firebase.config";

export async function deleteFile(downloadURL) {
    try {

        const filePath = downloadURL;

        const fileRef = ref(storage, filePath);

        await deleteObject(fileRef);

        console.log('File deleted');
    } catch (error) {
        console.log(error);
        alert('Error deleting file');
    }
}
