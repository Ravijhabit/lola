"use client";

import type { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import type { ReactNode } from "react";
// import { Toaster } from "react-hot-toast";

const Providers = ({
  session,
  children,
}: {
  session: Session | null;
  children: ReactNode;
}) => {
  return (
    <SessionProvider
      refetchInterval={10 * 60}
      // refetchOnWindowFocus
      session={session}
    >
      {/* <Toaster position="bottom-right" /> */}
      {children}
    </SessionProvider>
  );
};

export default Providers;
