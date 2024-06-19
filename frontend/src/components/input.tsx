import { InputHTMLAttributes } from "react";
import { FieldError, UseFormRegister } from "react-hook-form";

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
  return (
    <div className="flex flex-col text-xl">
      <input
        {...register(name)}
        id={id}
        type={type}
        name={name}
        placeholder={label}
        className="border-b-[1px] border-black bg-transparent outline-none"
      />
      {error && (
        <div className="mt-2 text-sm text-rose-500">{error.message}</div>
      )}
    </div>
  );
};

export default FormInput;
