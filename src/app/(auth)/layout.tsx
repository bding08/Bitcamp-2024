import { FC, ReactNode } from "react";

interface AuthLayoutInterface {
  children: ReactNode;
}
const AuthLayout: FC<AuthLayoutInterface> = ({ children }) => {
  return <div className="bg-slate-200 p-10 rounded-lg">{children}</div>;
};

export default AuthLayout;
