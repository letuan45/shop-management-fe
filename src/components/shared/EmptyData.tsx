import { ExclamationTriangleIcon } from "@radix-ui/react-icons";

const EmptyData = () => {
  return (
    <div className="flex w-full flex-col items-center justify-center">
      <ExclamationTriangleIcon width={28} height={28} />
      <p className="mt-2">Không có dữ liệu bạn cần tìm</p>
    </div>
  );
};

export default EmptyData;
