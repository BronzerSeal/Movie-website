"use client";
import { layoutConfig } from "@/config/layoutConfig";
import { siteConfig } from "@/config/siteConfig";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Input,
  DropdownItem,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  Avatar,
  Button,
} from "@heroui/react";
import Image from "next/image";
import { redirect, usePathname } from "next/navigation";
import RegistrationModal from "../modals/registration.modal";
import LoginModal from "../modals/login.modal";
import { useState } from "react";
import { signOutFunc } from "@/actions/sign-out";
import { useAuthStore } from "@/store/auth.store";
import { searchService } from "@/services/search.service";
import { useRouter } from "next/navigation";

export const SearchIcon = ({
  size = 24,
  strokeWidth = 1.5,
  ...props
}: {
  size: number;
  strokeWidth?: number;
}) => {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      focusable="false"
      height={size}
      role="presentation"
      viewBox="0 0 24 24"
      width={size}
      {...props}
    >
      <path
        d="M11.5 21C16.7467 21 21 16.7467 21 11.5C21 6.25329 16.7467 2 11.5 2C6.25329 2 2 6.25329 2 11.5C2 16.7467 6.25329 21 11.5 21Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={strokeWidth}
      />
      <path
        d="M22 22L20 20"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={strokeWidth}
      />
    </svg>
  );
};

export const Logo = () => {
  return (
    <Image
      src={"/logo.svg"}
      alt={siteConfig.title}
      width={24}
      height={24}
      priority
    />
  );
};

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const { isAuth, session, status, setAuthState } = useAuthStore();

  const [isRegistrationOpen, setIsRegistrationOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  const [searchValue, setSearchValue] = useState("");

  const changeSearchValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const handleSearchValue = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const search = async (MovieName: string) => {
      const resp = await searchService.getMovieByName(MovieName);
      redirect(`/movie/${resp.results[0].id}`);
    };
    if (e.key === "Enter") {
      search(searchValue);
      setSearchValue("");
    }
  };

  const handleSignOut = async () => {
    try {
      await signOutFunc();
    } catch (error) {
      console.log("Error", error);
    }

    setAuthState("unauthenticated", null);
    window.location.reload();
  };

  const getNavItems = () => {
    return siteConfig.navItems.map((item) => {
      const isActive = pathname === item.href;
      return (
        <NavbarItem key={item.href}>
          <Link
            href={item.href}
            className={`px-3 py-1 
          ${isActive ? "text-[#d13a3a]" : "text-gray-300"}
          hover:text-[#d13a3a] 
          transition-colors duration-200
          `}
          >
            {item.label}
          </Link>
        </NavbarItem>
      );
    });
  };

  return (
    <Navbar
      isBordered
      position="sticky"
      className="bg-[#211111] text-white"
      style={{ height: layoutConfig.headerHeight }}
    >
      <NavbarContent justify="start">
        <NavbarBrand className="mr-4">
          <Logo />
          <p className="hidden sm:block font-bold text-2xl ml-2">CineView</p>
        </NavbarBrand>

        <NavbarContent className="hidden sm:flex gap-4" justify="center">
          {getNavItems()}
        </NavbarContent>
      </NavbarContent>

      <NavbarContent as="div" className="items-center" justify="end">
        <Input
          onChange={changeSearchValue}
          onKeyDown={handleSearchValue}
          value={searchValue}
          classNames={{
            base: "max-w-full sm:max-w-[10rem] h-10",
            mainWrapper: "h-full",
            input: "text-small !text-white placeholder-gray-400", // важно: !text-white
            inputWrapper: `
      h-full font-normal 
      bg-transparent 
      hover:bg-transparent 
      focus-within:bg-transparent 
      border border-transparent 
      hover:border-red-500 
      focus-within:border-red-500 
      transition-colors duration-200
      data-[hover=true]:bg-transparent
      data-[focus=true]:bg-transparent
    `,
          }}
          placeholder="Search"
          size="sm"
          startContent={<SearchIcon size={18} />}
          type="search"
        />

        {status === "loading" ? (
          <p>Загрузка...</p>
        ) : !isAuth ? (
          <>
            <NavbarItem className="hidden lg:flex">
              <Button
                as={Link}
                href="#"
                variant="flat"
                className="bg-[#d13a3a] hover:bg-[#d13a3a] text-white font-semibold px-5 rounded-md transition-colors"
                onPress={() => setIsLoginOpen(true)}
              >
                Логин
              </Button>
            </NavbarItem>
            <NavbarItem>
              <Button
                as={Link}
                href="#"
                variant="flat"
                className="bg-[#db4113] hover:bg-[#f0410c] text-white font-semibold px-5 rounded-md transition-colors"
                onPress={() => setIsRegistrationOpen(true)}
              >
                Регистрация
              </Button>
            </NavbarItem>
          </>
        ) : (
          <Dropdown placement="bottom-end">
            <DropdownTrigger>
              <Avatar
                isBordered
                as="button"
                className="transition-transform"
                color="danger"
                name={session?.user?.name || "user"}
                size="sm"
                src={
                  session?.user?.image ||
                  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRxtrl0ohoaUwmcQnPCoWlgM3zuA6-3zXX7PQ&s"
                }
              />
            </DropdownTrigger>
            <DropdownMenu aria-label="Profile Actions" variant="flat">
              <DropdownItem key="profile" className="h-14 gap-2">
                <p className="font-semibold">Signed in as</p>
                <p className="font-semibold">{session?.user?.email}</p>
              </DropdownItem>
              <DropdownItem key="settings">My Settings</DropdownItem>
              <DropdownItem key="help_and_feedback">
                Help & Feedback
              </DropdownItem>
              <DropdownItem key="logout" color="danger" onClick={handleSignOut}>
                Log Out
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        )}
      </NavbarContent>

      <RegistrationModal
        isOpen={isRegistrationOpen}
        onClose={() => setIsRegistrationOpen(false)}
      />
      <LoginModal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
    </Navbar>
  );
}
