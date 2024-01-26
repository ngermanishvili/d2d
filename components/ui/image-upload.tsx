"use client";
import { CldUploadWidget } from "next-cloudinary";
import { useEffect, useState } from "react";
import { ImageIcon, TrashIcon } from "@radix-ui/react-icons";
import Image from "next/image";

import { Button } from "@/components/ui/button";

interface ImageUploadProps {
  disabled?: boolean;
  onChange: (value: string) => void;
  onRemove: (value: string) => void;
  value: string[];
}
const ImageUpload: React.FC<ImageUploadProps> = ({
  disabled,
  onChange,
  onRemove,
  value,
}) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const onUpload = (result: any) => {
    onChange(result.info.secure_url);
  };

  if (!isMounted) {
    return null;
  }

  return (
    <div>
      <div className="mb-4 ml-4 flex items-center w-[300px] gap-4">
        {value.map((url) => (
          <div
            key={url}
            className="relative w-[150px] h-[150px] ml-[80px] mt-[50px] rounded-lg overflow-hidden"
          >
            <div className="z-10 absolute top-2 right-4">
              <Button
                type="button"
                onClick={() => onRemove(url)}
                variant="destructive"
                size="icon"
              >
                <TrashIcon className="w-4 h-4" />
              </Button>
            </div>

            <Image fill className="object-cover" alt="image" src={url} />
          </div>
        ))}
      </div>
      <CldUploadWidget onUpload={onUpload} uploadPreset="setazgik">
        {({ open }) => {
          const onClick = () => {
            open();
          };
          return (
            <Button
              className="w-[170px] ml-4"
              type="button"
              disabled={disabled}
              variant="secondary"
              onClick={onClick}
            >
              <ImageIcon className="h-4 w-4 mr-2" />
              ატვირთე ფოტო
            </Button>
          );
        }}
      </CldUploadWidget>
    </div>
  );
};

export default ImageUpload;
