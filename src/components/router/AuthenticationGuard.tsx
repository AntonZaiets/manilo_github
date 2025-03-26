import * as React from "react";
import { useAppSelector } from "store/hooks";
import { selectUser } from "store/authSlice";

interface Props {
  render: (props: { isAuthenticated: boolean }) => React.ReactNode;
}

export const AuthenticationGuard = ({ render }: Props) => {
  const user = useAppSelector(selectUser);

  return (
    <>
      {render({
        isAuthenticated: user.fetchStatus === "success",
      })}
    </>
  );
};
