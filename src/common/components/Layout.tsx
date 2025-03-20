import { PropsWithChildren } from "react";
import Header from "./Header";

export type LayoutProps = PropsWithChildren & {
  className?: string;
};

export default function Layout({ children }: LayoutProps) {
  return (
    <>
      <Header />
      {children}
    </>
  );
}
