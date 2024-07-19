import Toast from "@/components/toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { UploadFields, UploadSchema } from "@/schemas/upload.schema";
import { useUpload } from "@/services/mutations";
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
  const uploadMutation = useUpload();

  const submit: SubmitHandler<UploadFields> = async (data) => {
    const response = await uploadMutation.mutateAsync(data.link);
    if (response.status === 200) {
      navigate("/recipes/create", { state: response.data });
    }
  };

  return (
    <div className="flex max-w-[390px] flex-col gap-2 px-4">
      <Button variant={"icon"} size={"icon"} onClick={() => navigate("/home")}>
        <FaArrowLeft size={20} />
      </Button>
      {!uploadMutation.isPending ? (
        <div className="flex flex-col gap-2">
          <p className="font-inter text-sm font-medium">
            Provide a link to a site that has a cooking recipe and we will
            create a recipe from it and add it to your list.
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

          {uploadMutation.isError && (
            <Toast message={"Can't generate a recipe, please try again."} />
          )}
        </div>
      ) : (
        <div className="flex flex-col items-center">
          <p className="font-inter text-lg font-semibold">
            Generating your recipe...
          </p>
          <img src="/upload.gif" alt="upload gif" width={134} />
        </div>
      )}
    </div>
  );
};

export default Upload;
