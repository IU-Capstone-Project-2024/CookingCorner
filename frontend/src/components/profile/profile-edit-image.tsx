import { User } from "@/types/types";
import { useImperativeHandle, useRef, useState } from "react";
import { UseFormRegister } from "react-hook-form";
import { FaCamera } from "react-icons/fa6";

interface ProfileEditImageProps {
  img: string | null;
  register: UseFormRegister<User>;
}

const ProfileEditImage = ({ img, register }: ProfileEditImageProps) => {
  const imageRef = useRef<HTMLInputElement>(null);
  const { ref, onChange, ...rest } = register("image_path");
  const [image, setImage] = useState(
    img ? `https://storage.yandexcloud.net/cooking-corner-backet/${img}` : null,
  );

  useImperativeHandle(ref, () => imageRef.current);

  function handleImageChange(e: any) {
    setImage(URL.createObjectURL(e.target.files[0]));
  }

  return (
    <section className="sticky top-0 z-10 flex w-full flex-col items-center border-b border-mainBlack bg-primary py-4">
      <div className="relative">
        <img
          src={image === null ? "/no_profile_image.png" : `${image}`}
          alt="profile photo"
          onClick={() => imageRef.current?.click()}
          className="size-60 cursor-pointer rounded-full border-2 border-mainBlack"
        />
        <span
          className="absolute bottom-4 right-4 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-hover"
          onClick={() => imageRef.current?.click()}
        >
          <FaCamera size={18} color="white" />
        </span>
      </div>
      <input
        type="file"
        ref={imageRef}
        hidden
        onChange={(e) => {
          onChange(e);
          handleImageChange(e);
        }}
        {...rest}
        accept="image/png, image/jpeg, image/jpg"
      />
    </section>
  );
};

export default ProfileEditImage;
