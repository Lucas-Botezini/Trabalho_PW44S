import React, { useEffect, useRef, useState } from "react";
import { Menubar } from "primereact/menubar";
import { Avatar } from "primereact/avatar";
import { Button } from "primereact/button";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/hooks/use-auth";
import { InputSwitch } from "primereact/inputswitch";
import { LoginModal } from "@/components/login";
import { RegisterModal } from "@/components/register";
import type { MenuItem } from "primereact/menuitem";

import type { IGenre } from "@/commons/types";
import GenreService from "@/services/genre-service";
import { Menu } from "primereact/menu";
import { AddessModal } from "@/components/user-addresses-modal";
import { OrdersModal } from "@/components/orders-list";

const TopMenu: React.FC = () => {
  const navigate = useNavigate();
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    return localStorage.getItem("theme") === "dark";
  });
  const { authenticated, handleLogout } = useAuth();

  // Modal Login
  const [loginVisible, setLoginVisible] = useState(false);
  // Modal de Registro
  const [registerVisible, setRegisterVisible] = useState(false);
  // Modal de endereço
  const [addressesVisible, setAddressesVisible] = useState(false);
  // Modal de pedidos
  const [ordersVisible, setOrderVisible] = useState(false);

  // Carregar gêneros de jogos
  const { findAll } = GenreService;
  const [genres, setGenres] = useState<IGenre[]>([]);
  const loadData = async () => {
    const response = await findAll();
    if (response.status === 200) {
      setGenres(Array.isArray(response.data) ? response.data : []);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // Background color and theme management
  useEffect(() => {
    const themeLink = document.getElementById("theme-link") as HTMLLinkElement;
    themeLink.href = darkMode
      ? "https://unpkg.com/primereact/resources/themes/lara-dark-blue/theme.css"
      : "https://unpkg.com/primereact/resources/themes/lara-light-blue/theme.css";
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  const handleLogoutClick = () => {
    handleLogout();
    navigate("/home");
  };

  const menuAvatar = useRef<Menu>(null);

  const avatarItems: MenuItem[] = [
    {
      label: "Meus Endereços",
      icon: "pi pi-user",
      command: () => setAddressesVisible(true),
    },
    {
      label: "Meus Pedidos",
      icon: "pi pi-shopping-bag",
      command: () => setOrderVisible(true),
    },
    { separator: true },
    {
      label: "Sair",
      icon: "pi pi-sign-out",
      command: handleLogoutClick,
    },
  ];

  const generos: MenuItem[] = [
    {
      label: "Gêneros",
      icon: "pi pi-box",
      items: genres.map((genre) => ({
        label: genre.name,
        command: () => navigate(`/game/genre/${genre.id}`),
      })),
    },
  ];

  // Logo
  const start = (
    <div
      className="flex items-center gap-2 cursor-pointer"
      onClick={() => navigate("/")}
    >
      <img
        src="/img/logo.png"
        alt="Logo"
        className="size-16 mr-2"
        height={10}
        style={{ objectFit: "contain" }}
        onClick={() => navigate("/")}
      />
    </div>
  );

  // End section with search, dark mode toggle, avatar and shopping cart
  const end = (
    <div className="flex items-center gap-4 cursor-pointer">
      <div className="flex items-center gap-2">
        <i
          className={`pi pi-sun ${
            darkMode ? "text-gray-400" : "text-yellow-500"
          }`}
          style={{ marginTop: "5px" }}
        />
        <InputSwitch
          checked={darkMode}
          onChange={(e) => setDarkMode(e.value ?? false)}
        />
        <i
          className={`pi pi-moon ${
            darkMode ? "text-blue-300" : "text-gray-400"
          }`}
          style={{ marginTop: "5px" }}
        />
      </div>
      {authenticated && (
        <>
          {/* Botão do carrinho */}
          <Button
            icon="pi pi-shopping-cart"
            className="p-button-text"
            onClick={() => navigate("/shop")}
          />

          {/* Avatar e seu menu */}
          <Menu model={avatarItems} popup ref={menuAvatar} id="avatar_menu" />
          <Avatar
            image="https://api.dicebear.com/9.x/bottts-neutral/svg?seed=Caleb"
            shape="square"
            className="cursor-pointer"
            onClick={(e) => menuAvatar.current?.toggle(e)}
          />
        </>
      )}
      {!authenticated && (
        <Button
          label="Login"
          className="p-button-text"
          onClick={() => setLoginVisible(true)}
        />
      )}
      {!authenticated && (
        <Button
          label="Register"
          className="p-button-text"
          onClick={() => setRegisterVisible(true)}
        />
      )}
    </div>
  );

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        width: "100%",
        zIndex: 1000,
        backgroundColor: "var(--surface-ground)",
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
      }}
      className="fixed top-0 left-0 w-full z-50"
    >
      <Menubar model={generos} start={start} end={end} />

      {/* Mostra as modais em tela quando clicado */}
      <LoginModal
        visible={loginVisible}
        onHide={() => setLoginVisible(false)}
      />
      <RegisterModal
        visible={registerVisible}
        onHide={() => setRegisterVisible(false)}
      />
      <AddessModal
        visible={addressesVisible}
        onHide={() => setAddressesVisible(false)}
      />
      <OrdersModal
        visible={ordersVisible}
        onHide={() => setOrderVisible(false)}
      />
    </div>
  );
};

export default TopMenu;
