"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import { CgProfile } from "react-icons/cg";
import { CiSettings } from "react-icons/ci";

export default function NavBar() {
  const session = useSession();
  const isLoggedIn = session.status === "authenticated" ? true : false;

  return (
    <header>
      <div>
        <Link href="/">
          <h1 className="font-bold text-2xl md:text-5xl text-cyan-600">LOLA</h1>
        </Link>
      </div>

      {isLoggedIn ? (
        <div className="">
          <button type="button" className="">
            Trade
          </button>
          <button type="button" className="">
            Trade
          </button>

          <CgProfile />
          <CiSettings />
        </div>
      ) : (
        <button type="button" className="btn btn-primary">
          Log In
        </button>
      )}
    </header>
  );
}
