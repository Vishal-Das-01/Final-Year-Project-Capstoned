import { getBytes, ref } from "firebase/storage";
import { storage } from "../config/firebase.config";

export async function getFile(downloadURL, fileName, contentType) {
      try {

        const filePath = downloadURL;

        const fileRef = ref(storage, filePath);

        const file = await getBytes(fileRef);

        const blob = new Blob([file], { type: contentType });

        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = fileName;
  
        document.body.appendChild(link);
        link.click();
  
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);

      } catch (error) {
        console.log(error);
        alert('Error getting file');
      }
}