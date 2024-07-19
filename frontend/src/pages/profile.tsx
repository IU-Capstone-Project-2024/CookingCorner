import LoadingPage from "@/components/profile/loading-page";
import ProfileDescription from "@/components/profile/profile-description";
import ProfileImage from "@/components/profile/profile-image";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/services/queries";
import { FaPen } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const profileData = useAuth();
  const navigate = useNavigate();

  if (profileData.isError) {
    return <div>Error occured</div>;
  }

  if (profileData.isFetching) {
    return <LoadingPage />;
  }

  return (
    <section className="flex flex-col items-center justify-between gap-4 px-4">
      <ProfileImage img={profileData.data.image_path} />
      <ProfileDescription data={profileData.data} />
      <Button
        variant="recipeCard"
        size={"lg"}
        onClick={() => navigate("/profile/edit")}
        className="flex w-72 items-center gap-2 font-inter text-lg"
      >
        Edit
        <FaPen size={20} />
      </Button>
      <Button
        variant="recipeCard"
        size={"lg"}
        onClick={() => {
          localStorage.clear();
          navigate("/sign-in");
        }}
        className="flex w-72 items-center gap-2 bg-hover-secondary font-inter text-lg"
      >
        Log out
      </Button>
    </section>
  );
};

export default Profile;
