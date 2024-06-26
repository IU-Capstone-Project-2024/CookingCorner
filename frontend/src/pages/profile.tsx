import ProfileDescription from "@/components/profile/profile-description";
import ProfileImage from "@/components/profile/profile-image";
import { Button } from "@/components/ui/button";
import { getUser } from "@/lib/utils";
import { User } from "@/typings/types";
import { useLoaderData } from "react-router-dom";

export async function loader() {
  const user = await getUser();
  return user;
}

const Profile = () => {
  const { img, ...data } = useLoaderData() as User;

  return (
    <section className="flex flex-col items-center justify-between gap-4">
      <ProfileImage img={img} />
      <ProfileDescription data={data} />
      <Button variant="recipeCard">Edit</Button>
    </section>
  );
};

export default Profile;
