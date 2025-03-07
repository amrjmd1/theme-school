/* eslint-disable @next/next/no-sync-scripts */
import { Linkedin, Twitter } from "lucide-react";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-muted py-4 px-6">
      <div className=" mx-auto flex items-center gap-4 text-sm text-gray-600">
        <p>
          Made with ❤️ by{" "}
          <span className="font-semibold text-gray-800">Amr Dar</span>
        </p>

        <Link
          href="https://www.upwork.com/freelancers/amrdar2?mp_source=share"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-500 hover:text-gray-800"
          aria-label="Upwork"
        >
          <svg
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5"
            fill="currentColor"
          >
            <path d="m18.561 13.158c-1.102 0-2.135-.467-3.074-1.227l.228-1.076.008-.042c.207-1.143.849-3.06 2.839-3.06 1.492 0 2.703 1.212 2.703 2.703-.001 1.489-1.212 2.702-2.704 2.702zm0-8.14c-2.539 0-4.51 1.649-5.31 4.366-1.22-1.834-2.148-4.036-2.687-5.892h-2.736v7.112c-.002 1.406-1.141 2.546-2.547 2.548-1.405-.002-2.543-1.143-2.545-2.548v-7.112h-2.736v7.112c0 2.914 2.37 5.303 5.281 5.303 2.913 0 5.283-2.389 5.283-5.303v-1.19c.529 1.107 1.182 2.229 1.974 3.221l-1.673 7.873h2.797l1.213-5.71c1.063.679 2.285 1.109 3.686 1.109 3 0 5.439-2.452 5.439-5.45 0-3-2.439-5.439-5.439-5.439z" />
          </svg>
        </Link>

        <Link
          href="https://www.linkedin.com/in/amrjmd1/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-500 hover:text-gray-800"
          aria-label="LinkedIn"
        >
          <Linkedin className="w-5 h-5" />
        </Link>

        <Link
          href="https://x.com/devamrdar"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-500 hover:text-gray-800"
          aria-label="Twitter"
        >
          <Twitter className="w-5 h-5" />
        </Link>
        <script
          data-name="BMC-Widget"
          // data-cfasync="false"
          src="https://cdnjs.buymeacoffee.com/1.0.0/widget.prod.min.js"
          data-id="devamrdar"
          data-description="Support me on Buy me a coffee!"
          data-message=""
          data-color="#5F7FFF"
          data-position="Right"
          data-x_margin="18"
          data-y_margin="18"
        />
      </div>
    </footer>
  );
};

export default Footer;
