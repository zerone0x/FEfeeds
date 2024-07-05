"use client";
import { usePathname } from "next/navigation";
import { navLinks } from "../_config/data";
import Link from "next/link";

function Header() {
  const pathname = usePathname();
  const item = navLinks.filter((link) => link.href === pathname);

  if (item.length === 0) {
    return null;
  }
  return (
    <div className="sticky top-0 z-10 bg-white  p-4">
      <Link
        className={`top-mid-header ${
          pathname === item[0].href ? "text-blue-400" : "text-primary-800"
        }`}
        href={item[0].href}
      >
        {item[0].icon}
        <span>{item[0].name}</span>
      </Link>
    </div>
  );
}

export default Header;
