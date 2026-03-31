import { redirect } from "next/navigation";

import { auth } from "@/auth";
import { AppChrome } from "@/components/sidebar/app-chrome";

export default async function ProtectedLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();

  if (!session) {
    redirect("/login");
  }

  return <AppChrome>{children}</AppChrome>;
}
