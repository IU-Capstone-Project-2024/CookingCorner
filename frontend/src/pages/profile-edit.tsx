import ProfileEditImage from "@/components/profile/profile-edit-image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { prepareDataForEdit } from "@/lib/utils";
import { ProfileEditSchema } from "@/schemas/profile-edit.schema";
import { useEditUserImage, useProfileEdit } from "@/services/mutations";
import { useAuth } from "@/services/queries";
import { User } from "@/types/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { FaPen } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

const ProfileEdit = () => {
  const profileData = useAuth();
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm<User>({
    resolver: zodResolver(ProfileEditSchema),
  });

  const profileEditMutation = useProfileEdit();
  const editUserImageMutation = useEditUserImage();

  const submit: SubmitHandler<User> = (data) => {
    if (data.image_path?.length == 1) {
      const formData = new FormData();
      console.log(data.image_path[0]);
      formData.append("file", data.image_path[0]);
      editUserImageMutation.mutate(formData);
    }
    if (editUserImageMutation.isSuccess) {
      const newData = prepareDataForEdit(data);
      profileEditMutation.mutate(newData, {
        onSettled: () => navigate("/profile"),
      });
    }
  };

  if (profileData.isError) {
    return <p>Error</p>;
  }

  if (profileData.isFetching || profileData.isLoading) {
    return <p>Loading</p>;
  }

  return (
    <div className="px-4">
      <form
        className="flex flex-col items-center gap-4 py-4"
        onSubmit={handleSubmit(submit)}
      >
        <ProfileEditImage
          img={profileData.data.image_path}
          register={register}
        />
        <Button
          variant="recipeCard"
          size={"lg"}
          type="submit"
          className="mb-4 flex w-72 items-center gap-2 font-inter text-lg"
        >
          Save
          <FaPen size={20} />
        </Button>
        <Input
          {...register("username")}
          placeholder="Username"
          label="Username"
          defaultValue={
            profileData.data.username === null ? "" : profileData.data.username
          }
        />
        <Input
          {...register("name")}
          placeholder="Name"
          label="Name"
          defaultValue={
            profileData.data.name === null ? "" : profileData.data.name
          }
        />
        <Input
          {...register("surname")}
          placeholder="Surname"
          label="Surname"
          defaultValue={
            profileData.data.surname === null ? "" : profileData.data.surname
          }
        />
        <Input
          {...register("email")}
          placeholder="Email"
          label="Email"
          defaultValue={
            profileData.data.email === null ? "" : profileData.data.email
          }
        />
        <Input
          type={"number"}
          {...register("cooking_experience")}
          placeholder="Cooking experience"
          label="Cooking experience"
          defaultValue={
            profileData.data.cooking_experience === null
              ? ""
              : profileData.data.cooking_experience
          }
        />
      </form>
    </div>
  );
};

export default ProfileEdit;
