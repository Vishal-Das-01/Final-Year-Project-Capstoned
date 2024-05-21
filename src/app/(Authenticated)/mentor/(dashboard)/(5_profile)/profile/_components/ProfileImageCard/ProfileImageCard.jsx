"use client";
import { removeAuthDetails, setProfilePicture } from "@/provider/redux/features/AuthDetails";
import { ImageFileType } from "@/utils/constants/enums";
import { deleteFile } from "@/utils/firebase/deleteFile";
import { uploadFile } from "@/utils/firebase/uploadFile";
import { callAPI } from "@/utils/helpers/callAPI";
import { BACKEND_ROUTES } from "@/utils/routes/backend_routes";
import { FRONTEND_ROUTES } from "@/utils/routes/frontend_routes";
import { HttpStatusCode } from "axios";
import { set } from "mongoose";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useRef, useState } from "react";
import { MdAdd } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";

function ProfileImageCard({ profileImage, mentorID }) {
  const fileInputRef = useRef(null);
  const [image, setImage] = useState(
    profileImage?.image || "/defaultProfile.jpg"
  );
  const [tempImage, setTempImage] = useState(
    profileImage?.image || "/defaultProfile.jpg"
  );
  const [fileDetails, setFileDetails] = useState(null);
  const [fileType, setFileType] = useState(null);
  const [updating, setUpdating] = useState(false);
  const [loading, setLoading] = useState(false);
  const authDetails = useSelector((state) => state.AuthDetails);
  const dispatch = useDispatch();
  const router = useRouter();

  const handleUpdate = async (ID) => {
    if (tempImage === image) {
      console.log("No changes made.");
    } else {
      setLoading(true);
      
      if (image !== "/defaultProfile.jpg") {
        await deleteFile(image);
      }

      const fileURL = await uploadFile(
        fileDetails,
        ID,
        "profile_pictures/mentor/",
        fileDetails.type
      );

      const accessToken = authDetails.accessToken;
      const response = await callAPI(
        "PATCH",
        accessToken,
        BACKEND_ROUTES.updateProfileMentor,
        { profileImage: { image: fileURL, extension: fileType } }
      );
      if (response.status === HttpStatusCode.Ok) {
        setFileDetails(null);
        setFileType(null);
        setImage(fileURL);
        setLoading(false);
        setUpdating(false);
        setTempImage(fileURL);
        dispatch(setProfilePicture({profileImage: fileURL}));
      } else if (response.status === HttpStatusCode.Unauthorized) {
        const responseLogOut = await fetch(BACKEND_ROUTES.logout, {
          method: "POST",
        });
        if (responseLogOut.status === HttpStatusCode.Ok) {
          dispatch(removeAuthDetails());
          router.replace(FRONTEND_ROUTES.landing_page);
        }
      }
    }
  };

  const handleCancel = () => {
    setTempImage(image);
    setFileDetails(null);
    setUpdating(false);
    setFileType(null);
  };

  const handleUpload = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (file.type === "image/jpeg" || file.type === "image/png") {
        if (file.type === "image/jpeg") setFileType(ImageFileType.JPEG);
        else if (file.type === "image/png") setFileType(ImageFileType.PNG);
        else if (file.type === "image/jpg") setFileType(ImageFileType.JPG);
        const reader = new FileReader();
        reader.onload = (e) => {
          setTempImage(e.target.result);
          setFileDetails(file);
        };
        reader.readAsDataURL(file);
      } else {
        alert("Please select a JPG or PNG file.");
      }
    }
  };

  return (
    <>
      <div className="relative h-36 w-36 rounded-full overflow-hidden mb-3 text-center">
        {updating ? (
          <Image alt={"Failed to load image."} src={tempImage} fill />
        ) : (
          <Image alt={"Failed to load image."} src={image} fill />
        )}
      </div>

      {updating && (
        <input
          type="file"
          className="hidden"
          ref={fileInputRef}
          onChange={handleFileChange}
        />
      )}

      {updating ? (
        <div className="flex flex-row items-center justify-center w-full space-x-3">
          <button
            type="submit"
            onClick={handleCancel}
            disabled={loading}
            className={`w-1/6 text-center text-xs font-montserrat font-semibold rounded-lg tracking-widest text-white bg-red-500 border-2 border-black ${loading? "" : "hover:bg-white hover:border-2 hover:black hover:text-black hover:font-semibold hover:font-montserrat hover:text-xs"}`}
          >
            Cancel
          </button>
          <button
            type="submit"
            onClick={async () => handleUpdate(mentorID)}
            disabled={loading}
            className={`w-1/6 text-center text-xs font-montserrat font-semibold rounded-lg tracking-widest text-white bg-green-500 border-2 border-black ${loading? "" : "hover:bg-white hover:border-2 hover:black hover:text-black hover:font-semibold hover:font-montserrat hover:text-xs"}`}
          >
            Save
          </button>
          <button
            type="submit"
            onClick={handleUpload}
            disabled={loading}
            className={`w-1/6 text-center text-xs font-montserrat font-semibold rounded-lg tracking-widest text-white bg-black border-2 border-black ${loading? "" : "hover:bg-white hover:border-2 hover:black hover:text-black hover:font-semibold hover:font-montserrat hover:text-xs"}`}
          >
            Upload
          </button>
        </div>
      ) : (
        <button
          type="submit"
          onClick={() => setUpdating(true)}
          className="w-1/6 text-center text-xs font-montserrat font-semibold rounded-lg tracking-widest text-white bg-black border-2 border-black hover:bg-white hover:border-2 hover:black hover:text-black hover:font-semibold hover:font-montserrat hover:text-xs"
        >
          Edit
        </button>
      )}
    </>
  );
}

export default ProfileImageCard;
