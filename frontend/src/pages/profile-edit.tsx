import ProfileImage from "@/components/profile/profile-image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { prepareDataForEdit } from "@/lib/utils";
import { ProfileEditSchema } from "@/schemas/profile-edit.schema";
import { useProfileEdit } from "@/services/mutations";
import { useAuth } from "@/services/queries";
import { User } from "@/types/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { FaPen } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

const ProfileEdit = () => {
  const profileData = useAuth();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<User>({
    resolver: zodResolver(ProfileEditSchema),
  });

  const profileEditMutation = useProfileEdit();

  const submit: SubmitHandler<User> = (data) => {
    const newData = prepareDataForEdit(data);
    profileEditMutation.mutate(newData);
    navigate("/profile");
  };

  if (profileData.isError) {
    return <p>Error</p>;
  }

  if (profileData.isPending) {
    return <p>Loading</p>;
  }

  return (
    <div className="px-4">
      <ProfileImage img={profileData.data.image_path} />
      <form
        className="flex flex-col items-center gap-4 py-4"
        onSubmit={handleSubmit(submit)}
      >
        <Button
          variant="recipeCard"
          size={"lg"}
          type="submit"
          className="flex w-72 items-center gap-2 font-inter text-lg"
        >
          Save
          <FaPen size={20} />
        </Button>
        <Input
          {...register("username")}
          placeholder="Username"
          label="Username"
        />
        <Input {...register("name")} placeholder="Name" label="Name" />
        <Input {...register("surname")} placeholder="Surname" label="Surname" />
        <Input {...register("email")} placeholder="Email" label="Email" />
        <Input
          type={"number"}
          {...register("cooking_experience")}
          placeholder="Cooking experience"
          label="Cooking experience"
        />
      </form>
    </div>
  );
};

export default ProfileEdit;
