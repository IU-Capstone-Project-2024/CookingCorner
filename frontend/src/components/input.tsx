import { InputHTMLAttributes, useState } from "react";
import { FieldError, UseFormRegister } from "react-hook-form";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
import { Button } from "./ui/button";

interface IFormInputProps extends InputHTMLAttributes<HTMLInputElement> {
  id: string;
  type: string;
  name: string;
  label: string;
  error: FieldError | undefined;
  register: UseFormRegister<any>;
}

const FormInput = ({
  id,
  type,
  name,
  label,
  error,
  register,
}: IFormInputProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative flex flex-col justify-center text-xl">
      <input
        {...register(name)}
        id={id}
        type={isOpen ? "text" : type}
        name={name}
        placeholder={label}
        className="border-b-[1px] border-black bg-transparent outline-none"
      />
      {type === "password" && (
        <Button
          className="absolute right-0 top-0"
          variant={"iconWithoutBorder"}
          size={"icon"}
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
        >
          {isOpen ? <FaRegEyeSlash /> : <FaRegEye />}
        </Button>
      )}
      {error && (
        <div className="mt-2 text-sm text-rose-500">{error.message}</div>
      )}
    </div>
  );
};

export default FormInput;
