import { User } from "@/modules/types";

interface ProfileDescriptionProps {
  data: Omit<User, "img">;
}

const ProfileDescription = ({ data }: ProfileDescriptionProps) => {
  return (
    <section className="flex max-w-[330px] flex-col gap-2 truncate font-inter text-2xl font-medium text-mainBlack md:max-w-full">
      <div className="truncate text-wrap">Username: {data.username}</div>
      <div className="truncate text-wrap">Name: {data.name}</div>
      <div className="truncate text-wrap">Surname: {data.surname}</div>
      <div className="truncate text-wrap">Email: {data.email}</div>
      <div className="truncate text-wrap">
        Cooking experience: {data.experience} years
      </div>
    </section>
  );
};

export default ProfileDescription;
