import React from "react";
import Link from "next/link";
import { Terminal } from "lucide-react";

const Header: React.FC = () => {
  return (
    <header className="text-gray-800 p-4">
      <nav className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold">
          Theme School
        </Link>
        <ul className="flex space-x-4">
          <li>
            <Link
              href="mailto:amrjmd1@gmail.com?subject=Let's create a new App together!"
              className="flex flex-row items-center px-2 rounded-sm group hover:text-gray-200 hover:bg-gray-900"
            >
              <Terminal size={14} className="group-hover:text-gray-50"/>
              &nbsp;npx&nbsp;
              <span className="group-hover:text-green-600">create-next-app</span>
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
