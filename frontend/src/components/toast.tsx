interface ToastProps {
  message: string;
}

const Toast = ({ message }: ToastProps) => {
  return (
    <div className="flex min-h-12 w-full items-center justify-center rounded-md border-2 border-mainBlack bg-hover-switch text-center font-inter">
      {message}
    </div>
  );
};

export default Toast;
