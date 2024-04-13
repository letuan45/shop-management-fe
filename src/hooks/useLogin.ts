import { jwtDecode } from "jwt-decode";
import { IJWTTokenPayload } from "@/interfaces/auth";
import { useCookies } from "react-cookie";
import { useRecoilState } from "recoil";
import { userAtom } from "@/lib/utils/recoil/atom";
import { useCallback } from "react";

export const useLogin = () => {
  const [, setCookie] = useCookies(["accessToken", "refreshToken"]);
  const [, setUser] = useRecoilState(userAtom);

  const loginAction = useCallback(
    (accessToken: string, refreshToken: string) => {
      const decodedAT = jwtDecode<IJWTTokenPayload>(accessToken);
      const decodedRT = jwtDecode<IJWTTokenPayload>(refreshToken);

      const expireAT = decodedAT.exp * 1000;
      const expireRT = decodedRT.exp * 1000;

      setCookie("accessToken", accessToken, { expires: new Date(expireAT) });
      setCookie("refreshToken", refreshToken, { expires: new Date(expireRT) });

      const user = {
        id: decodedAT.id,
        username: decodedAT.username,
        isActive: decodedAT.isActive,
        roleId: decodedAT.roleId,
        cartId: decodedAT.cartId,
        cartItems: decodedAT.cartItems,
        email: decodedAT.email,
        fullName: decodedAT.fullName,
        image: decodedAT.image,
      };
      setUser(user);
      localStorage.setItem("user", JSON.stringify(user));
    },
    [setCookie, setUser],
  );

  return { loginAction };
};
