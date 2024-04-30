import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  FileTextIcon,
  Pencil2Icon,
  PersonIcon,
  ReaderIcon,
} from "@radix-ui/react-icons";
import CardImage from "../assets/images/35.png";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Rectangle,
} from "recharts";
import { useQuery } from "@tanstack/react-query";
import { getHomeBillGraph, getHomeStats } from "@/services/statService";
import LoadingIndicator from "@/components/shared/LoadingIndicator";
import EmptyData from "@/components/shared/EmptyData";
import { useEffect, useState } from "react";

interface IGraph {
  name: string;
  "Số đơn": number;
}

const Home = () => {
  const [graphData, setGraphData] = useState<IGraph[] | undefined>(undefined);
  const {
    data: statsData,
    isLoading: statsDataIsLoading,
    isError: statDataError,
  } = useQuery({
    queryKey: ["get-stat-data"],
    queryFn: ({ signal }) => getHomeStats({ signal }),
  });

  const {
    data: billGraph,
    isLoading: billGraphIsLoading,
    isError: billGraphIsError,
  } = useQuery({
    queryKey: ["get-bill-graph"],
    queryFn: ({ signal }) => getHomeBillGraph({ signal }),
  });

  useEffect(() => {
    if (billGraph) {
      const graphData: IGraph[] = [];
      for (const graphItem of billGraph) {
        graphData.push({ name: graphItem.month, "Số đơn": graphItem.value });
      }
      setGraphData(graphData);
    }
  }, [billGraph]);

  return (
    <section>
      <h1>Trang chủ</h1>
      {statsDataIsLoading && <LoadingIndicator />}
      {!statsDataIsLoading && statDataError && <EmptyData />}
      {statsData && (
        <div className="max- mt-4 grid grid-cols-4 gap-4 max-lg:grid-cols-2 max-md:grid-cols-1">
          <Card className="col-span-1 flex w-full p-6">
            <div className="rounded-md bg-purple-400/40 p-4 dark:bg-purple-400/10">
              <div className="rounded-md bg-primary p-2">
                <FileTextIcon className="text-white" />
              </div>
            </div>
            <div className="ml-4 flex flex-col justify-center">
              <h3 className="font-semibold">Tổng số hóa đơn</h3>
              <h6 className="text-xl font-bold">
                {statsData.totalSellingBill}
              </h6>
            </div>
          </Card>
          <Card className="col-span-1 flex w-full p-6">
            <div className="rounded-md bg-green-400/40 p-4 dark:bg-green-400/10">
              <div className="rounded-md bg-green-500 p-2">
                <Pencil2Icon className="text-white" />
              </div>
            </div>
            <div className="ml-4 flex flex-col justify-center">
              <h3 className="font-semibold">Tổng số sản phẩm</h3>
              <h6 className="text-xl font-bold">{statsData.totalProduct}</h6>
            </div>
          </Card>
          <Card className="col-span-1 flex w-full p-6">
            <div className="rounded-md bg-blue-400/40 p-4 dark:bg-blue-400/10">
              <div className="rounded-md bg-blue-500 p-2">
                <ReaderIcon className="text-white" />
              </div>
            </div>
            <div className="ml-4 flex flex-col justify-center">
              <h3 className="font-semibold">Tổng lượng tồn kho</h3>
              <h6 className="text-xl font-bold">{statsData.totalStocks}</h6>
            </div>
          </Card>
          <Card className="col-span-1 flex w-full p-6">
            <div className="rounded-md bg-yellow-400/40 p-4 dark:bg-yellow-400/10">
              <div className="rounded-md bg-yellow-500 p-2">
                <PersonIcon className="text-white" />
              </div>
            </div>
            <div className="ml-4 flex flex-col justify-center">
              <h3 className="font-semibold">Khách hàng</h3>
              <h6 className="text-xl font-bold">{statsData.totalCustomer}</h6>
            </div>
          </Card>
        </div>
      )}
      <div className="mt-4 grid grid-cols-8 gap-4">
        <Card className="col-span-2 overflow-hidden text-sm max-xl:hidden">
          <div className="relative">
            <div
              style={{ backgroundImage: `url(${CardImage})` }}
              className="h-[260px] w-full brightness-50"
            ></div>
            <div>
              <div className="absolute top-0 p-6">
                <p className="text-xs text-slate-300">
                  Letuan features updates.
                </p>
                <h3 className="my-1 font-semibold text-white">
                  Thông báo cập nhật tính năng
                </h3>
                <div className="my-3 w-2/3 rounded-md bg-white/30 p-4 backdrop-blur-sm">
                  <p className="text-xs text-white">
                    Bổ sung tính năng quên mật khẩu, cơ chế Authentication bằng
                    AccessToken và RefreshToken
                  </p>
                </div>
                <div className="my-3 rounded-lg bg-white/30 p-2 text-white backdrop-blur-sm">
                  <div className="text-xs">
                    Theo dõi mã nguồn mở tại
                    <Link
                      className="ml-1 underline"
                      to="https://github.com/letuan45/shop-management-fe"
                    >
                      Github
                    </Link>
                  </div>
                </div>
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold text-primary">
                  Dự án cá nhân
                </h3>
                <p className="my-2 dark:text-slate-300">
                  Dự án Shop management được triển khai theo kiến trúc
                  micro-servervice.
                </p>
                <Button>Theo dõi portfolio</Button>
                <Button className="mt-2" variant="secondary">
                  Theo dõi Github
                </Button>
              </div>
            </div>
          </div>
        </Card>
        <Card className="col-span-6 max-xl:col-span-8">
          <CardHeader className="border-b border-gray-200">
            <CardTitle>Tổng lượng đơn hàng trong năm</CardTitle>
          </CardHeader>
          <CardContent className="h-[400px] w-full pt-10 max-lg:px-0">
            {billGraphIsLoading && <LoadingIndicator />}
            {!billGraphIsLoading && billGraphIsError && <EmptyData />}
            {billGraph && graphData && (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  width={500}
                  height={300}
                  data={graphData}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip cursor={{ fill: "transparent" }} />
                  <Legend />
                  <Bar
                    radius={[6, 6, 0, 0]}
                    animationDuration={500}
                    dataKey="Số đơn"
                    fill="#8884d8"
                    className="rounded-md fill-primary"
                    activeBar={
                      <Rectangle fill="pink" className="fill-violet-500" />
                    }
                  />
                </BarChart>
              </ResponsiveContainer>
            )}
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default Home;
