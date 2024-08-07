import { RecipeSchemaFields } from "@/schemas/recipe.schema";
import { useImperativeHandle, useRef, useState } from "react";
import { UseFormRegister } from "react-hook-form";

interface ImageInput {
  register: UseFormRegister<RecipeSchemaFields>;
  stepNumber: number;
  label: string;
  img?: string;
}

const ImageInput = ({ register, label, stepNumber, img }: ImageInput) => {
  const imageRef = useRef<HTMLInputElement>(null);
  const [image, setImage] = useState(
    img
      ? `https://storage.yandexcloud.net/cooking-corner-backet/${img}`
      : undefined,
  );
  const { ref, onChange, ...rest } = register(
    stepNumber == -1 ? "icon_path" : `steps.${stepNumber}.image_path`,
  );

  useImperativeHandle(ref, () => imageRef.current);

  function handleImageUpload(e: any) {
    const file = e.target.files[0];
    if (file) {
      console.log(1);
      setImage(URL.createObjectURL(e.target.files[0]));
    }
  }

  return (
    <>
      {image && <img src={image} className="w-[200px] rounded-md" />}
      <label
        className="text-md flex h-12 items-center justify-center rounded-md border border-mainBlack bg-hover-switch px-4 py-2 font-bold"
        htmlFor="step-file"
        onClick={() => imageRef.current?.click()}
      >
        {label}
      </label>
      <input
        type="file"
        ref={imageRef}
        hidden
        onChange={(e) => {
          onChange(e);
          handleImageUpload(e);
        }}
        {...rest}
        accept="image/png, image/jpeg, image/jpg"
      />
    </>
  );
};

export default ImageInput;
