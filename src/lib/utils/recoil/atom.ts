import { atom } from "recoil";

export const userAtom = atom({
  key: "userAtom",
  default: {
    id: 0,
    username: "",
    isActive: false,
    roleId: 0,
    cartItems: [],
    cartId: 0,
    fullName: "",
    email: "",
    image: "",
  },
});
