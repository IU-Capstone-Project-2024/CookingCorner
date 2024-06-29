import ProfileDescription from "@/components/profile/profile-description";
import ProfileImage from "@/components/profile/profile-image";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/services/queries";

const Profile = () => {
  const data = useAuth();

  if (data.isPending) {
    return <div>Loading data</div>;
  }

  if (data.isError) {
    return <div>Error occured</div>;
  }

  return (
    <section className="container flex flex-col items-center justify-between gap-4">
      <ProfileImage img={data.data.image_path} />
      <ProfileDescription data={data.data} />
      <Button variant="recipeCard">Edit</Button>
    </section>
  );
};

export default Profile;
