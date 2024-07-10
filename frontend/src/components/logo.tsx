import logo from "../assets/images/cookingLogo.svg";

const Logo = () => {
  return (
    <div className="flex flex-col items-center justify-center">
      <img src={logo} alt="logo" />
      <h1 className="w-fit text-3xl font-bold drop-shadow-xl">
        Cooking Corner
      </h1>
    </div>
  );
};

export default Logo;
