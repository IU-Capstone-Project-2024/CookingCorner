import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { UploadFields, UploadSchema } from "@/schemas/upload.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { FaArrowLeft } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

const Upload = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UploadFields>({
    resolver: zodResolver(UploadSchema),
  });

  const submit: SubmitHandler<UploadFields> = (data) => {
    console.log(data, "Working with llama");
  };

  return (
    <div className="flex flex-col gap-2 px-4">
      <Button variant={"icon"} size={"icon"} onClick={() => navigate("/home")}>
        <FaArrowLeft size={20} />
      </Button>
      <div className="flex flex-col gap-2">
        <p className="font-inter text-sm font-medium">
          Provide a link to a site that has a cooking recipe and we will create
          a recipe from it and add it to your list.
        </p>
        <Input
          placeholder={errors.link ? "Provide link first" : "Link"}
          className={`${errors.link ? "font-medium placeholder:text-red-500" : "placeholder:text-mainBlack-secondary"}`}
          {...register("link")}
        />
        <Button
          variant={"icon"}
          className="mx-auto w-32 font-inter text-lg"
          onClick={handleSubmit(submit)}
        >
          Generate
        </Button>
      </div>
    </div>
  );
};

export default Upload;
