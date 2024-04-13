import { useCookies } from "react-cookie";
import { useRecoilState, useResetRecoilState } from "recoil";
import { userAtom } from "@/lib/utils/recoil/atom";
import { useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { logout } from "@/services/authService";
import { useMutation } from "@tanstack/react-query";
import { useToast } from "@/components/ui/use-toast";

export const useLogout = () => {
  const { toast } = useToast();
  const { mutate, data, isPending, isError, error } = useMutation({
    mutationKey: ["logout"],
    mutationFn: logout,
  });
  const navigate = useNavigate();
  const [, , removeCookie] = useCookies(["accessToken", "refreshToken"]);
  const resetUserAtom = useResetRecoilState(userAtom);
  const [user] = useRecoilState(userAtom);

  useEffect(() => {
    if (data) {
      removeCookie("accessToken");
      removeCookie("refreshToken");
      resetUserAtom();
      localStorage.removeItem("user");
      navigate("/");
    } else if (isError) {
      toast({
        title: "Thông báo: xác thực",
        description: "Đăng xuất thất bại!",
        variant: "destructive",
      });
    }
  }, [data, isError, error, navigate, removeCookie, resetUserAtom, toast]);

  const logoutAction = useCallback(() => {
    mutate(user.id);
  }, [mutate, user]);

  return { logoutAction, isPending };
};
