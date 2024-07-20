interface ProfileImageProps {
  img: string | null;
}

const ProfileImage = ({ img }: ProfileImageProps) => {
  return (
    <section className="sticky top-0 z-10 flex w-full flex-col items-center border-b border-mainBlack bg-primary py-4">
      <img
        src={
          img === null
            ? "/no_profile_image.png"
            : `https://storage.yandexcloud.net/cooking-corner-backet/${img}`
        }
        alt="profile photo"
        className="size-60 cursor-pointer rounded-full border-2 border-mainBlack"
      />
    </section>
  );
};

export default ProfileImage;
