import { ReloadIcon } from "@radix-ui/react-icons";

const LoadingIndicator = () => {
  return (
    <div className="flex w-full items-center justify-center">
      <ReloadIcon className="animate-spin" width={30} height={30} />
    </div>
  );
};

export default LoadingIndicator;
