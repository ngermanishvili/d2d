"use client";
import { CldUploadWidget } from "next-cloudinary";
import { useEffect, useState } from "react";
import { ImageIcon, TrashIcon } from "@radix-ui/react-icons";
import usePhotoStore from "@/hooks/photo-store";
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
  const { setPhotoUrl } = usePhotoStore();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const onUpload = (result: any) => {
    onChange(result.info.secure_url);
    setPhotoUrl(result.info.secure_url);
  };

  if (!isMounted) {
    return null;
  }

  return (
    <div>
      <div className="w-full gap-4">
        {value.map((url) => (
          <div key={url} className="w-full flex justify-center">
            <div className="z-10 "></div>
            {/* 
            <Image fill className="object-cover" alt="image" src={url} /> */}
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
              className="w-full"
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
