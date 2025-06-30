import { Outlet } from "react-router-dom";
import TopMenu from "@/components/top-menu";

export function Layout() {
  return (
    <>
      <TopMenu />
      <main style={{ paddingTop: "40px", width: "90vw" }}>
        <Outlet />
      </main>
    </>
  );
}  