interface StepCardProps {
  step: number;
  img?: string | null;
  description: string;
}

const StepCard = ({ step, img, description }: StepCardProps) => {
  return (
    <div className="flex w-screen max-w-[330px] flex-col items-center gap-2 text-wrap rounded-lg border-2 border-mainBlack p-1">
      <h2 className="font-bold">Step {step}</h2>
      <img
        src={`${img === null || img === undefined ? "/no_image.svg" : "/" + img}`}
        className="max-h-[200px] w-full max-w-[300px] object-cover"
      />
      <p className="max-w-[320px] text-center">{description}</p>
    </div>
  );
};

export default StepCard;
