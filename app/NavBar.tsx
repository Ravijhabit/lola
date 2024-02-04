"use client";

import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";

export default function NavBar() {
  const session = useSession();
  const isLoggedIn = session.status === "authenticated" ? true : false;

  return (
    <header className="flex justify-between p-2 m-2">
      <Link
        href="/"
        className="font-black text-3xl md:text-5xl text-emerald-600"
      >
        <h1>LOLA</h1>
      </Link>

      {isLoggedIn ? (
        <>
          {/* <div className="flex gap-2 items-center">
            <button type="button" className="">
              Trade
            </button>
            <button type="button" className="">
              Sell
            </button>
          </div> */}

          <div className="flex gap-4 items-center">
            <Link
              href={`/users/${session.data?.user?.id}`}
              className="flex items-center gap-1"
            >
              <Image
                src={session.data?.user?.image ?? ""}
                alt={session.data?.user?.name ?? ""}
                width={40}
                height={40}
                className="rounded-full"
              />
              <p className="text-xs font-bold hidden md:block">
                {session.data?.user?.name}
              </p>
            </Link>

            <button
              type="button"
              className="text-white bg-emerald-600 hover:bg-emerald-800 focus:ring-4 focus:ring-emerald-300 font-medium rounded-lg text-sm p-2.5"
              onClick={() => signOut()}
            >
              Sign out
            </button>
          </div>
        </>
      ) : (
        <button type="button">
          <Link
            href="/api/auth/signin"
            className="text-white bg-emerald-600 hover:bg-emerald-800 focus:ring-4 focus:ring-emerald-300 font-medium rounded-lg text-sm p-2.5"
          >
            Log In
          </Link>
        </button>
      )}
    </header>
  );
}
