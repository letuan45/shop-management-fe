import { useQuery } from "@tanstack/react-query";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { getAccount } from "@/services/authService";
import UserForm from "../forms/UserForm";

interface Props {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  userId: number;
  employeeId: number;
  onRegister?: (
    employeeId: number,
    roleId: number,
    username: string,
    password: string,
  ) => void;
  onUpdateUser?: (
    userId: number,
    password: string,
    roleId: number,
    isActive: boolean,
    isUpdatePwd: boolean,
  ) => void;
  registerIsLoading: boolean;
  updateUserIsLoading: boolean;
}

const UserManagerDialog = ({
  isOpen,
  setIsOpen,
  userId,
  employeeId,
  registerIsLoading,
  updateUserIsLoading,
  onRegister,
  onUpdateUser,
}: Props) => {
  const { data: userData } = useQuery({
    queryKey: ["get-user", userId],
    queryFn: () => getAccount({ userId }),
    enabled: userId !== undefined && userId > 0,
  });

  const registerHandler = (
    employeeId: number,
    roleId: number,
    username: string,
    password: string,
  ) => {
    if (onRegister) {
      onRegister(employeeId, roleId, username, password);
    }
  };

  const updateUserHandler = (
    userId: number,
    password: string,
    roleId: number,
    isActive: boolean,
    isUpdatePwd: boolean,
  ) => {
    if (onUpdateUser) {
      onUpdateUser(userId, password, roleId, isActive, isUpdatePwd);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="min-w-[350px] max-sm:min-w-[300px]">
        <DialogHeader>
          <DialogTitle>Quản lý tài khoản nhân viên</DialogTitle>
          <DialogDescription className="italic">
            Lưu ý: nếu bạn thay đổi mật khẩu, mật khẩu sẽ được thay đổi mặc định
            user123456 khi không điền thông tin
          </DialogDescription>
        </DialogHeader>
        {!userData && (
          <UserForm
            onRegister={registerHandler}
            user={undefined}
            employeeId={employeeId}
            isLoading={registerIsLoading}
          />
        )}
        {userData && (
          <UserForm
            onUpdateUser={updateUserHandler}
            user={userData}
            isLoading={updateUserIsLoading}
          />
        )}
      </DialogContent>
    </Dialog>
  );
};

export default UserManagerDialog;
