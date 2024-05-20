"use client";
import { set } from "mongoose";
import Image from "next/image";
import React, { useRef, useState } from "react";
import { MdAdd } from "react-icons/md";

function ProfileImageCard({ profileImage }) {
  const fileInputRef = useRef(null);
  const [image, setImage] = useState(profileImage?.image || "/defaultProfile.jpg");
  const [tempImage, setTempImage] = useState(profileImage?.image || "/defaultProfile.jpg");
  const [updating, setUpdating] = useState(false);

  const handleUpdate = () => {
    if (tempImage === image) {
        console.log("No changes made.");
    } else {
        setImage(tempImage);
    }

    setUpdating(false);
  };

  const handleCancel = () => {
    setTempImage(image)
    setUpdating(false);
  }

  const handleUpload = () => {
    fileInputRef.current.click();
  }

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (file.type === 'image/jpeg' || file.type === 'image/png') {
        const reader = new FileReader();
        reader.onload = (e) => {
          setTempImage(e.target.result);
        };
        reader.readAsDataURL(file);
      } else {
        alert('Please select a JPG or PNG file.');
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
          <input type="file" className="hidden" ref={fileInputRef} onChange={handleFileChange}/>
      )}

      {updating ? (
        <div className="flex flex-row items-center justify-center w-full space-x-3">
          <button
            type="submit"
            onClick={handleCancel}
            className="w-1/6 text-center text-xs font-montserrat font-semibold rounded-lg tracking-widest text-white bg-red-500 border-2 border-black hover:bg-white hover:border-2 hover:black hover:text-black hover:font-semibold hover:font-montserrat hover:text-xs"
          >
            Cancel
          </button>
          <button
            type="submit"
            onClick={handleUpdate}
            className="w-1/6 text-center text-xs font-montserrat font-semibold rounded-lg tracking-widest text-white bg-green-500 border-2 border-black hover:bg-white hover:border-2 hover:black hover:text-black hover:font-semibold hover:font-montserrat hover:text-xs"
          >
            Save
          </button>
          <button
            type="submit"
            onClick={handleUpload}
            className="w-1/6 text-center text-xs font-montserrat font-semibold rounded-lg tracking-widest text-white bg-black border-2 border-black hover:bg-white hover:border-2 hover:black hover:text-black hover:font-semibold hover:font-montserrat hover:text-xs"
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
