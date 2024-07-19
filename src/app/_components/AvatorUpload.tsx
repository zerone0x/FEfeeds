"use client";
import React, { useRef, useState } from "react";
import { FilePond, registerPlugin } from "react-filepond";
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import "filepond/dist/filepond.min.css";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
import Image from "next/image";

// Register the plugins
registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);

const AvatarUploader = ({ avatar, onUpdate, labelName, isBig = false }) => {
  const [file, setFile] = useState(null);
  const fileInputRef = useRef(null);

  const handleAvatarClick = () => {
    // Trigger FilePond's browse files
    fileInputRef.current?.click();
  };

  return (
    <div>
      <label
        htmlFor="avatar"
        className="text-lg font-medium text-gray-700 sm:text-xl"
      >
        {labelName}
      </label>
      <div className="flex flex-row gap-2">
        {isBig ? (
          <div
            onClick={handleAvatarClick}
            className="relative h-36 w-1/2 cursor-pointer overflow-hidden"
          >
            <Image
              src={avatar}
              alt="Avatar"
              layout="fill"
              objectFit="cover"
              className=""
            />
          </div>
        ) : (
          <div
            onClick={handleAvatarClick}
            className="relative h-16 w-16 cursor-pointer overflow-hidden rounded-full"
          >
            <Image
              src={avatar}
              alt="Avatar"
              layout="fill"
              objectFit="cover"
              className="rounded-full"
            />
          </div>
        )}
        <input
          type="file"
          ref={fileInputRef}
          style={{ display: "none" }}
          onChange={(e) => {
            const file = e.target.files[0] || null;
            setFile(file);
            onUpdate(file);
          }}
        />
        <FilePond
          files={file ? [file] : []}
          allowReorder={false}
          allowMultiple={false}
          onupdatefiles={(fileItems) => {
            const newFile = fileItems.length ? fileItems[0].file : null;
            setFile(newFile);
            onUpdate(newFile);
          }}
          labelIdle=""
        />
      </div>
    </div>
  );
};

export default AvatarUploader;