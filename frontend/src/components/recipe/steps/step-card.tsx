interface StepCardProps {
  step: number;
  img: string | null;
  description: string;
}

const StepCard = ({ step, img, description }: StepCardProps) => {
  return (
    <div className="flex w-screen max-w-[330px] flex-col items-center gap-2 text-wrap rounded-lg border-2 border-mainBlack p-1">
      <h2 className="font-bold">Step {step}</h2>
      <img
        src={
          img === undefined
            ? "/no_image.svg"
            : `https://storage.yandexcloud.net/cooking-corner-backet/${img}`
        }
        className={`max-h-[200px] w-full max-w-[300px] rounded-md object-cover ${img !== undefined && "border-2 border-mainBlack"}`}
      />
      <p className="max-w-[320px] text-center">{description}</p>
    </div>
  );
};

export default StepCard;
