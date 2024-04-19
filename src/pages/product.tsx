import ProductForm from "@/components/forms/ProductForm";
import CustomBreadcrumb from "@/components/shared/CustomBreadcrumb";
import CustomPagination from "@/components/shared/CustomPagination";
import EmptyData from "@/components/shared/EmptyData";
import LoadingIndicator from "@/components/shared/LoadingIndicator";
import SearchBar from "@/components/shared/SearchBar";
import TableProduct from "@/components/tables/product/tableProduct";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "@/components/ui/use-toast";
import { queryClient } from "@/lib/utils";
import {
  createCategory,
  createProduct,
  editCategory,
  editProduct,
  getAllCategory,
  getAllProduct,
  getProduct,
} from "@/services/productService";
import {
  CubeIcon,
  Pencil1Icon,
  PlusCircledIcon,
  ReloadIcon,
  StackIcon,
} from "@radix-ui/react-icons";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";

const BREADCRUMB_ITEMS = [
  {
    id: 1,
    href: "/",
    title: "Trang chủ",
  },
  {
    id: 2,
    href: "/product",
    title: "Quản lý sản phẩm",
  },
];

const Product = () => {
  const [createProductDialogIsOpen, setCreateProductDialogIsOpen] =
    useState(false);
  const [searchParams] = useSearchParams();
  const cateNameRef = useRef<HTMLInputElement>(null);
  const editCateNameRef = useRef<HTMLInputElement>(null);
  const [editProductIsOpen, setEditProductIsOpen] = useState(false);
  const [editProductId, setEditProductId] = useState(0);
  const [editCateName, setEditCateName] = useState("");

  const page = searchParams.get("page");
  const search = searchParams.get("search");
  const {
    data: productsData,
    isError: productsIsError,
    isLoading: productsIsLoading,
  } = useQuery({
    queryKey: ["products", page, search],
    queryFn: ({ signal }) => getAllProduct({ signal, page, search }),
  });

  const {
    data: cateData,
    isError: cateIsError,
    isLoading: cateIsLoading,
  } = useQuery({
    queryKey: ["categories"],
    queryFn: ({ signal }) => getAllCategory({ signal }),
  });

  const { data: editProductData, isLoading: editProductDataIsLoading } =
    useQuery({
      queryKey: ["product", { editProductId }],
      queryFn: ({ signal }) => getProduct({ signal, productId: editProductId }),
      enabled: editProductId > 0,
    });

  const { mutate: createCateAction, isPending: createCateIsLoading } =
    useMutation({
      mutationKey: ["createCate"],
      mutationFn: createCategory,
      onSuccess: () => {
        toast({
          title: "Thông báo: Thao tác dữ liệu",
          description: "Tạo danh mục sản phẩm thành công!",
          variant: "success",
        });
        queryClient.invalidateQueries({ queryKey: ["categories"] });
      },
      onError: (error) => {
        toast({
          title: "Thông báo: Thao tác dữ liệu",
          description: error.message,
          variant: "destructive",
        });
      },
    });

  const { mutate: editCateAction, isPending: editCateIsPending } = useMutation({
    mutationKey: ["editCategory"],
    mutationFn: editCategory,
    onSuccess: () => {
      toast({
        title: "Thông báo: Thao tác dữ liệu",
        description: "Sửa danh mục sản phẩm thành công!",
        variant: "success",
      });
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
    onError: (error) => {
      toast({
        title: "Thông báo: Thao tác dữ liệu",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const { mutate: createProductAction, isPending: createProductIsPending } =
    useMutation({
      mutationKey: ["createProduct"],
      mutationFn: createProduct,
      onSuccess: () => {
        toast({
          title: "Thông báo: Thao tác dữ liệu",
          description: "Tạo sản phẩm thành công!",
          variant: "success",
        });
        queryClient.invalidateQueries({ queryKey: ["products"] });
        setCreateProductDialogIsOpen(false);
      },
      onError: (error) => {
        toast({
          title: "Thông báo: Thao tác dữ liệu",
          description: error.message,
          variant: "destructive",
        });
      },
    });

  const { mutate: editProductAction, isPending: editProductIsPending } =
    useMutation({
      mutationKey: ["editProduct"],
      mutationFn: editProduct,
      onSuccess: () => {
        toast({
          title: "Thông báo: Thao tác dữ liệu",
          description: "Sửa sản phẩm thành công",
          variant: "success",
        });
        queryClient.invalidateQueries({ queryKey: ["products"] });
        setEditProductIsOpen(false);
      },
      onError: (error) => {
        toast({
          title: "Thông báo: Thao tác dữ liệu",
          description: error.message,
          variant: "destructive",
        });
      },
    });

  const createCateHandler = () => {
    const categoryName = cateNameRef.current?.value.trim();

    if (categoryName === "") {
      toast({
        title: "Thông báo: Thao tác dữ liệu",
        description: "Dữ liệu không hợp lệ",
        variant: "destructive",
      });
      return;
    }
    createCateAction({ name: categoryName });
  };

  const createProductHandler = (data: FormData | undefined) => {
    data && createProductAction(data);
  };

  const editCateHandler = (newName: string, cateId: number) => {
    if (newName === editCateName) {
      return;
    } else if (newName === "") {
      toast({
        title: "Thông báo: Thao tác dữ liệu",
        description: "Dữ liệu không hợp lệ",
        variant: "destructive",
      });
      return;
    }
    editCateAction({ cateId, cateName: newName });
  };

  const editProductHandler = (
    data: FormData,
    productId: number | undefined,
  ) => {
    productId && editProductAction({ formData: data, productId });
  };

  const openEditProductHandler = (productId: number) => {
    setEditProductIsOpen(true);
    setEditProductId(productId);
  };

  return (
    <div>
      <div className="flex justify-between">
        <div className="mb-4 flex items-center font-semibold">
          <CubeIcon
            className="rounded-full bg-primary p-[0.35rem] text-white shadow-md"
            width={30}
            height={30}
          />
          <h1 className="ml-2">Quản lý sản phẩm</h1>
        </div>
        <CustomBreadcrumb items={BREADCRUMB_ITEMS} />
      </div>
      <Card className="w-full animate-fadeIn">
        <CardHeader>
          <div className="flex w-full items-center justify-between">
            <div>
              <CardTitle>Danh sách sản phẩm</CardTitle>
              <CardDescription className="mt-1">
                Quản lý tài khoản và thông tin sản phẩm
              </CardDescription>
            </div>
            <div className="flex items-center gap-4">
              <SearchBar />
              {/* Create Dialog */}
              <Dialog
                open={createProductDialogIsOpen}
                onOpenChange={setCreateProductDialogIsOpen}
              >
                <DialogTrigger className="inline-flex h-9 items-center justify-center whitespace-nowrap rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50">
                  <PlusCircledIcon className="mr-1" /> Thêm sản phẩm
                </DialogTrigger>
                <DialogContent className="min-w-[650px] max-sm:min-w-[300px]">
                  <DialogHeader>
                    <DialogTitle>Tạo sản phẩm</DialogTitle>
                    <DialogDescription>
                      Những trường có dấu (*) là những trường bắt buộc
                    </DialogDescription>
                  </DialogHeader>
                  {cateData && cateData.length > 0 && (
                    <ProductForm
                      submitAction={createProductHandler}
                      isLoading={createProductIsPending}
                      categories={cateData}
                    />
                  )}
                </DialogContent>
              </Dialog>
              {/* Update Dialog */}
              <Dialog
                open={editProductIsOpen}
                onOpenChange={setEditProductIsOpen}
              >
                <DialogContent className="min-w-[650px] max-sm:min-w-[300px]">
                  <DialogHeader>
                    <DialogTitle>Sửa sản phẩm</DialogTitle>
                    <DialogDescription>
                      Những trường có dấu (*) là những trường bắt buộc
                    </DialogDescription>
                  </DialogHeader>
                  {editProductDataIsLoading && (
                    <div className="grid grid-cols-2 gap-4">
                      <div className="col-span-1">
                        <Skeleton className="my-3 h-[55px] w-full rounded-md" />
                        <Skeleton className="my-3 h-[55px] w-full rounded-md" />
                        <Skeleton className="my-3 h-[55px] w-full rounded-md" />
                        <Skeleton className="my-3 h-[55px] w-full rounded-md" />
                        <Skeleton className="my-3 h-[55px] w-full rounded-md" />
                      </div>
                      <div className="col-span-1">
                        <Skeleton className="my-3 h-[120px] w-full rounded-md" />
                        <Skeleton className="my-3 h-[55px] w-full rounded-md" />
                        <Skeleton className="my-3 h-[55px] w-full rounded-md" />
                      </div>
                    </div>
                  )}
                  {editProductData && cateData && (
                    <ProductForm
                      submitEditAction={editProductHandler}
                      categories={cateData}
                      isLoading={editProductIsPending}
                      product={editProductData}
                      isEdit
                    />
                  )}
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </CardHeader>
        <CardContent className="h-[35rem] overflow-hidden max-lg:h-[23rem] max-md:h-[24rem]">
          {productsIsLoading && <LoadingIndicator />}
          {productsIsError ||
            (productsData && productsData.total === 0 && <EmptyData />)}
          {productsData && (
            <TableProduct
              tableData={productsData.data}
              onEditProduct={openEditProductHandler}
            />
          )}
        </CardContent>
        {productsData && Math.ceil(productsData.total / 5) > 1 && (
          <CardFooter className="flex justify-between">
            <CustomPagination
              totalItem={productsData.total}
              maxItemPerPage={5}
            />
          </CardFooter>
        )}
      </Card>
      <div className="mt-4 grid grid-cols-3 gap-4">
        <Card className="col-span-1 animate-fadeIn">
          <CardHeader>
            <div className="flex w-full items-center justify-between">
              <div>
                <CardTitle>Danh mục sản phẩm</CardTitle>
                <CardDescription className="mt-1">
                  Quản lý danh mục sản phẩm
                </CardDescription>
              </div>
              <div className="flex items-center gap-4">
                {/* Create Dialog */}
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="border-2 border-primary"
                    >
                      Thêm danh mục
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-60">
                    <div className="grid gap-4">
                      <div className="space-y-2">
                        <h4 className="font-medium leading-none">Danh mục</h4>
                        <p className="text-sm text-muted-foreground">
                          Thêm danh mục sản phẩm (không trùng)
                        </p>
                      </div>
                      <div className="grid gap-2">
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="cate-name">Tên</Label>
                          <Input
                            ref={cateNameRef}
                            id="cate-name"
                            defaultValue=""
                            className="col-span-3 h-8"
                          />
                          <Button
                            className="col-span-4"
                            onClick={createCateHandler}
                          >
                            {createCateIsLoading ? (
                              <ReloadIcon className="animate-spin" />
                            ) : (
                              "Xác nhận"
                            )}
                          </Button>
                        </div>
                      </div>
                    </div>
                  </PopoverContent>
                </Popover>
                {/* Update Dialog */}
              </div>
            </div>
          </CardHeader>
          <CardContent className="h-[16rem] overflow-y-auto">
            {cateIsLoading && (
              <div>
                <Skeleton className="my-2 h-10" />
                <Skeleton className="my-2 h-10" />
                <Skeleton className="my-2 h-10" />
                <Skeleton className="my-2 h-10" />
              </div>
            )}
            {cateIsError ||
              (cateData && cateData.length === 0 && <EmptyData />)}
            {cateData && (
              <ul>
                {cateData.map((item) => (
                  <li key={item.id}>
                    <Card className="my-2 flex items-center justify-between px-6 py-2">
                      <div className="item-center flex">
                        <StackIcon className="my-auto block" />
                        <span className="ml-2">{item.name}</span>
                      </div>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            onClick={() => {
                              setEditCateName(item.name);
                            }}
                          >
                            <Pencil1Icon />
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-60">
                          <div className="grid gap-4">
                            <div className="space-y-2">
                              <h4 className="font-medium leading-none">
                                Sửa danh mục
                              </h4>
                              <p className="text-sm text-muted-foreground">
                                Sửa danh mục sản phẩm (không trùng)
                              </p>
                            </div>
                            <div className="grid gap-2">
                              <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="cate-name">Tên</Label>
                                <Input
                                  ref={editCateNameRef}
                                  id="cate-name"
                                  defaultValue={editCateName}
                                  className="col-span-3 h-8"
                                />
                                <Button
                                  className="col-span-4"
                                  onClick={() => {
                                    editCateHandler(
                                      editCateNameRef.current?.value.trim() as string,
                                      item.id,
                                    );
                                  }}
                                >
                                  {editCateIsPending ? (
                                    <ReloadIcon className="animate-spin" />
                                  ) : (
                                    "Xác nhận"
                                  )}
                                </Button>
                              </div>
                            </div>
                          </div>
                        </PopoverContent>
                      </Popover>
                    </Card>
                  </li>
                ))}
              </ul>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Product;
