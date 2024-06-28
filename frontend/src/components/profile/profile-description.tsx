import { User } from "@/types/types";

interface ProfileDescriptionProps {
  data: Omit<User, "img">;
}

const ProfileDescription = ({ data }: ProfileDescriptionProps) => {
  return (
    <section className="flex max-w-[330px] flex-col gap-2 truncate font-inter text-2xl font-medium text-mainBlack md:max-w-full">
      <p className="truncate text-wrap">Username: {data.username}</p>
      {data.name !== null && (
        <p className="truncate text-wrap">Name: {data.name}</p>
      )}
      {data.surname !== null && (
        <p className="truncate text-wrap">Surname: {data.surname}</p>
      )}
      {data.email !== null && (
        <p className="truncate text-wrap">Email: {data.email}</p>
      )}
      {data.experience !== null && (
        <p className="truncate text-wrap">
          Cooking experience: {data.experience} years
        </p>
      )}
    </section>
  );
};

export default ProfileDescription;
