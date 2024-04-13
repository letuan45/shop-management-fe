import { Link, NavLink } from "react-router-dom";
import Logo from "./Logo";
import {
  BackpackIcon,
  BookmarkIcon,
  CubeIcon,
  DoubleArrowLeftIcon,
  GearIcon,
  HomeIcon,
  PersonIcon,
  ReloadIcon,
  StarIcon,
} from "@radix-ui/react-icons";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import Gitbutton from "./Gitbutton";
import ToggleThemeButton from "./ToggleThemeButton";
import { useEffect, useState } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { userAtom } from "@/lib/utils/recoil/atom";
import { useRecoilState } from "recoil";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { useLogout } from "@/hooks/useLogout";

const NAVIGATION_LINKS = [
  {
    id: 1,
    cateName: "CHUNG",
    links: [
      {
        id: 1,
        icon: <HomeIcon />,
        bigIcon: <HomeIcon width={18} height={18} />,
        name: "Trang chủ",
        link: "/home",
      },
      {
        id: 2,
        icon: <BackpackIcon />,
        bigIcon: <BackpackIcon width={18} height={18} />,
        name: "Bán hàng",
        link: "/selling",
      },
      {
        id: 3,
        icon: <StarIcon />,
        bigIcon: <StarIcon width={18} height={18} />,

        name: "Khách hàng",
        link: "/customer",
      },
      {
        id: 4,
        icon: <BookmarkIcon />,
        bigIcon: <BookmarkIcon width={18} height={18} />,

        name: "Giao dịch",
        link: "/order",
      },
    ],
  },
  {
    id: 2,
    cateName: "QUẢN LÝ",
    links: [
      {
        id: 1,
        icon: <PersonIcon />,
        bigIcon: <PersonIcon width={18} height={18} />,
        name: "Nhân sự",
        link: "/employee",
      },
      {
        id: 2,
        icon: <CubeIcon />,
        bigIcon: <CubeIcon width={18} height={18} />,
        name: "Sản phẩm",
        link: "/product",
      },
    ],
  },
];

const Layout = (props: { children: JSX.Element }) => {
  const [user, setUser] = useRecoilState(userAtom);
  const [sidebarIsExpansed, setSidebarIsExpansed] = useState(true);
  const { logoutAction, isPending } = useLogout();

  useEffect(() => {
    if (user.id === 0) {
      const storageUser = localStorage.getItem("user");
      const userObj = storageUser ? JSON.parse(storageUser) : undefined;
      if (userObj) {
        setUser(userObj);
      }
    }
  }, [user, setUser]);

  const toggleSidebarHandler = () => {
    setSidebarIsExpansed((oldState) => !oldState);
  };

  const logoutHandler = () => {
    logoutAction();
  };

  const navItemClasses = `rounded-md my-2 block ${sidebarIsExpansed ? "px-4 py-2" : "p-3"} hover:bg-purple-500 hover:rounded-md hover:bg-clip-padding hover:backdrop-filter hover:backdrop-blur-sm hover:bg-opacity-30 ease-in flex items-center duration-100`;

  const navItemActiveClasses = `rounded-md my-2 block ${sidebarIsExpansed ? "px-4 py-2" : "p-3"} flex items-center duration-200 bg-gradient-to-r from-blue-500 via-indigo-500 to-violet-500 shadow-md shadow-indigo-500/20`;

  return (
    <div className="relative flex bg-gray-100 dark:bg-slate-900">
      {/* Side Bar */}
      <aside
        className={`fixed left-0 top-0 h-screen ${sidebarIsExpansed ? "w-[220px]" : "w-[80px]"} bg-violet-950/100 text-white drop-shadow-sm duration-300 dark:bg-blue-950`}
      >
        <div
          className={`relative flex h-16 items-center border-b border-gray-400 px-4 py-3 ${!sidebarIsExpansed ? "justify-center" : ""}`}
        >
          <button
            className="absolute right-0 top-[100%] z-10 -translate-y-1/2 translate-x-1/2 rounded-full bg-slate-700 p-2 shadow-sm"
            onClick={toggleSidebarHandler}
          >
            <DoubleArrowLeftIcon
              className={`duration-200 ${!sidebarIsExpansed ? "rotate-180" : ""}`}
            />
          </button>
          <div className="flex items-center justify-center">
            <Logo size="small" />
            <h1
              className={` ml-2 ${sidebarIsExpansed ? "show" : "hidden"} duration-300`}
            >
              Dashboard
            </h1>
          </div>
        </div>
        <nav className="p-4">
          {!sidebarIsExpansed && (
            <ul>
              {NAVIGATION_LINKS.map((outerItem) => {
                return (
                  <div key={outerItem.id} className="my-3">
                    <h3 className="text-center text-sm text-gray-400">
                      {outerItem.cateName}
                    </h3>
                    <ul className="my-2">
                      {outerItem.links.map((item) => {
                        return (
                          <li key={item.id}>
                            <TooltipProvider delayDuration={100}>
                              <Tooltip>
                                <TooltipTrigger>
                                  <NavLink
                                    to={item.link}
                                    className={({ isActive }) =>
                                      isActive
                                        ? navItemActiveClasses
                                        : navItemClasses
                                    }
                                  >
                                    {item.bigIcon}
                                  </NavLink>
                                </TooltipTrigger>
                                <TooltipContent side="right">
                                  <p className="text-md uppercase">
                                    {item.name}
                                  </p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                );
              })}
            </ul>
          )}
          {sidebarIsExpansed && (
            <ul>
              {NAVIGATION_LINKS.map((outerItem) => {
                return (
                  <div key={outerItem.id} className="my-3">
                    <h3 className="text-sm text-gray-400">
                      {outerItem.cateName}
                    </h3>
                    <ul className="my-2">
                      {outerItem.links.map((item) => {
                        return (
                          <li key={item.id}>
                            <NavLink
                              to={item.link}
                              className={({ isActive }) =>
                                isActive ? navItemActiveClasses : navItemClasses
                              }
                            >
                              {item.icon}
                              <span className="text-md ml-2">{item.name}</span>
                            </NavLink>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                );
              })}
            </ul>
          )}
        </nav>
      </aside>
      <div
        className={`w-full ${sidebarIsExpansed ? "ml-[220px]" : "ml-[80px]"}`}
      >
        {/* Header */}
        <div className="flex h-16 items-center justify-between px-8 py-4 text-sm shadow-lg dark:bg-slate-950">
          <div>
            Tài khoản{" "}
            <span className="rounded-md bg-gradient-to-r from-green-500 to-green-600 px-2 py-1 text-xs font-semibold text-white">
              ADMIN
            </span>
          </div>
          <div className="flex items-center">
            <Gitbutton />
            <div className="mx-6">
              <ToggleThemeButton />
            </div>
            <Avatar>
              <AvatarImage
                src={user.image}
                alt={user.fullName}
                className="object-cover"
              />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div className="ml-2 flex flex-col justify-center">
              <span className="font-semibold text-slate-700 dark:text-gray-300">
                {user.fullName}
              </span>
              <span className="text-xs text-slate-500 dark:text-gray-400">
                {user.email}
              </span>
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="ml-4">
                  <GearIcon width={20} height={20} />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>Tài khoản</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem>
                    <Link to="/">Thông tin nhân viên</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link to="/">Thông tin tài khoản</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link to="/">Hỗ trợ</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={logoutHandler}>
                    Đăng xuất
                    {isPending && <ReloadIcon className="ml-1 animate-spin" />}
                  </DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        <main className="block h-full  px-6 py-4">{props.children}</main>
      </div>
    </div>
  );
};

export default Layout;
