"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Cookies from "js-cookie";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const navLinks = [
  { href: "/home", label: "الرئيسية" },
  { href: "/notes", label: "ملاحظاتي" },
];

function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const token = Cookies.get("token");

  // Don't show navbar on auth pages
  const authRoutes = ["/login", "/register"];
  if (authRoutes.some((route) => pathname.startsWith(route))) {
    return null;
  }

  const handleLogout = () => {
    Cookies.remove("token");
    router.push("/register");
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-sm">
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-4">
        {/* Logo */}
        <Link
          href="/home"
          className="text-lg font-bold tracking-tight text-primary"
        >
          📝 Sticky Notes
        </Link>

        {/* Navigation Links */}
        <NavigationMenu>
          <NavigationMenuList>
            {navLinks.map((link) => (
              <NavigationMenuItem key={link.href}>
                <NavigationMenuLink
                  asChild
                  className={navigationMenuTriggerStyle()}
                  data-active={pathname === link.href ? true : undefined}
                >
                  <Link href={link.href}>{link.label}</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>

        {/* Auth Actions */}
        <div className="flex items-center gap-2">
          {token ? (
            <Button variant="outline" size="sm" onClick={handleLogout}>
              تسجيل الخروج
            </Button>
          ) : (
            <>
              <Button variant="ghost" size="sm" asChild>
                <Link href="/login">تسجيل الدخول</Link>
              </Button>
              <Button size="sm" asChild>
                <Link href="/register">إنشاء حساب</Link>
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

export default Navbar;
