import {
  Navbar,
  NavbarBrand,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  NavbarContent,
  NavbarItem,
  Button,
} from "@heroui/react";
import { useTheme } from "@heroui/use-theme";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";

export const GymEzyLogo = () => {
  return (
    <svg fill="none" height="36" viewBox="0 0 32 32" width="36">
      <path
        clipRule="evenodd"
        d="M17.6482 10.1305L15.8785 7.02583L7.02979 22.5499H10.5278L17.6482 10.1305ZM19.8798 14.0457L18.11 17.1983L19.394 19.4511H16.8453L15.1056 22.5499H24.7272L19.8798 14.0457Z"
        fill="currentColor"
        fillRule="evenodd"
      />
    </svg>
  );
};

export default function NavBar() {
  const menuItems = [
    { label: "About", path: "/about" },
    { label: "Working", path: "/working" },
    { label: "Login", path: "/auth/login" },
    { label: "Sign Up", path: "/auth/register" },
  ];

  const { theme, setTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigateTo = useNavigate();
  const location = useLocation();

  return (
    <Navbar
      disableAnimation
      isBordered
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}
    >
      <NavbarContent className="sm:hidden" justify="start">
        <NavbarMenuToggle />
      </NavbarContent>

      <NavbarContent className="sm:hidden pr-3" justify="center">
        <NavbarBrand
          onClick={() => {
            navigateTo("/");
            setIsMenuOpen(false);
          }}
          className="cursor-pointer"
        >
          <GymEzyLogo />
          <p
            className={`${
              location.pathname === "/" && "text-blue-600"
            } transition-all font-bold text-inherit`}
          >
            GymEzy
          </p>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarBrand
          onClick={() => {
            navigateTo("/");
            setIsMenuOpen(false);
          }}
          className="cursor-pointer"
        >
          <GymEzyLogo />
          <p
            className={`${
              location.pathname === "/" && "text-blue-600"
            } transition-all font-bold text-inherit`}
          >
            GymEzy
          </p>
        </NavbarBrand>
        <NavbarItem isActive={location.pathname === "/about"}>
          <Link to={"/about"}>
            <p
              className={`${
                location.pathname === "/about" &&
                "text-blue-600 underline underline-offset-8"
              } transition-all`}
            >
              About
            </p>
          </Link>
        </NavbarItem>
        <NavbarItem isActive={location.pathname === "/working"}>
          <Link to={"/working"}>
            <p
              className={`${
                location.pathname === "/working" &&
                "text-blue-600 underline underline-offset-8"
              } transition-all`}
            >
              Working
            </p>
          </Link>
        </NavbarItem>
      </NavbarContent>

      <NavbarContent justify="end" className="gap-10">
        <NavbarItem className="hidden lg:flex">
          <Button
            color="primary"
            variant="light"
            onPress={() => navigateTo("/auth/login")}
          >
            Login
          </Button>
        </NavbarItem>
        <NavbarItem className="hidden lg:flex">
          <Button
            color="primary"
            variant="shadow"
            onPress={() => navigateTo("/auth/register")}
          >
            Sign Up
          </Button>
        </NavbarItem>
      </NavbarContent>

      <NavbarMenu>
        {menuItems.map((item) => (
          <NavbarMenuItem
            key={item.path}
            onClick={() => {
              navigateTo(item.path);
              setIsMenuOpen(false);
            }}
          >
            <p
              className={`${
                item.path === location.pathname &&
                "text-blue-600 underline underline-offset-8"
              } cursor-pointer transition-all`}
            >
              {item.label}
            </p>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
}
