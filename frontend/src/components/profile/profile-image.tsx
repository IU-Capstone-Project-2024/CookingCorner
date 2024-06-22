interface ProfileImageProps {
  img: string | null;
}

const ProfileImage = ({ img }: ProfileImageProps) => {
  return (
    <img
      src={img === null ? "no_profile_image.png" : img}
      alt="profile photo"
      className="size-60 rounded-full border-2 border-mainBlack"
    />
  );
};

export default ProfileImage;
