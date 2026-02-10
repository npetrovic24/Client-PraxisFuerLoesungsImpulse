import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { AppHeader } from "@/components/app-header";

export default async function MemberLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("full_name, role")
    .eq("id", user.id)
    .single();

  return (
    <div className="flex h-screen flex-col">
      <AppHeader userName={profile?.full_name || user.email || "Mitglied"} />
      <main className="flex-1 overflow-y-auto bg-secondary p-6">
        {children}
      </main>
    </div>
  );
}
