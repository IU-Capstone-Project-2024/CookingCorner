import { User } from "@/types/types";

interface ProfileDescriptionProps {
  data: Omit<User, "img">;
}

const ProfileDescription = ({ data }: ProfileDescriptionProps) => {
  console.log(data);
  return (
    <section className="flex max-w-[330px] flex-col gap-2 truncate font-inter text-2xl font-medium text-mainBlack md:max-w-full">
      <p className="truncate text-wrap">Username: {data.username}</p>
      {data.name !== "" && (
        <p className="truncate text-wrap">Name: {data.name}</p>
      )}
      {data.surname !== "" && (
        <p className="truncate text-wrap">Surname: {data.surname}</p>
      )}
      {data.email !== "" && (
        <p className="truncate text-wrap">Email: {data.email}</p>
      )}
      {data.cooking_experience !== null && (
        <p className="truncate text-wrap">
          Cooking experience: {data.cooking_experience} years
        </p>
      )}
    </section>
  );
};

export default ProfileDescription;
