import { FaPlus } from "react-icons/fa6";

interface SettingsProps {}

const Settings = ({}: SettingsProps) => {
  return (
    <section className="flex h-12 w-full items-center justify-between border-2 border-x-transparent border-y-mainBlack bg-hover-secondary">
      <FaPlus />
      <div>Category</div>
    </section>
  );
};

export default Settings;
