import React from "react";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import Button from "./buttons";
import LogoutButton from "./buttonslogout";


const NavItem = ({ icon, label, active = false }: { icon: React.ReactNode; label: string; active?: boolean }) => (
  <a
    href="#"
    className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
      active ? "bg-blue-50 text-blue-600" : "text-gray-600 hover:bg-gray-50"
    }`}
  >
    {icon}
    <span className="text-sm font-medium">{label}</span>
  </a>
);

const DashboardCard = ({ title, description, children }: { title: string; description: string; children: React.ReactNode }) => (
  <div className="bg-white p-6 rounded-xl border border-gray-100">
    <div className="mb-4">
      <h3 className="text-lg font-semibold text-gray-900 mb-1">{title}</h3>
      <p className="text-gray-500 text-sm leading-relaxed">{description}</p>
    </div>
    {children}
  </div>
);

const UserBadge = ({ role, email }: { role: string; email: string }) => (
  <div className="flex items-center gap-3">
    <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center">
      {email[0].toUpperCase()}
    </div>
    <div>
      <div className="text-sm text-gray-900 font-medium">{email}</div>
      <div className="text-xs text-blue-600 font-medium">{role}</div>
    </div>
  </div>
);

const DashboardPage = async () => {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const { data: userData } = await supabase
    .from("users")
    .select("*")
    .eq("email", user.email)
    .single();

  if (userData?.role === "admin") redirect("/login");

  return (
    <div className="flex min-h-screen bg-gray-50">
      <main className="flex-1 p-8">
        <header className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-1">Welcome back!</h1>
            <p className="text-gray-500">Ready to ace your next quiz?</p>
          </div>
          <div className="flex items-center gap-4">
            <UserBadge role={userData?.role || "user"} email={user.email} />
            <LogoutButton />
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <DashboardCard
            title="Quick Quiz"
            description="Test your knowledge with a time-limited challenge"
          >
            <Button>
              Start Now
            </Button>
          </DashboardCard>

          <DashboardCard
            title="Progress Tracking"
            description="Review your historical performance and growth"
          >
            <button className="w-full mt-4 px-4 py-2 text-sm font-medium text-blue-600 border border-blue-100 rounded-lg hover:border-blue-200 transition-colors">
              View History
            </button>
          </DashboardCard>

          <DashboardCard
            title="Learning Resources"
            description="Access study materials and detailed explanations"
          >
            <button className="w-full mt-4 px-4 py-2 text-sm font-medium text-gray-600 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
              Browse Materials
            </button>
          </DashboardCard>
        </div>

        <section className="mt-8 bg-white p-6 rounded-xl border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Recent Activity</h2>
            <button className="text-sm text-blue-600 hover:text-blue-700">View All</button>
          </div>
          <div className="text-gray-500 text-sm p-4 rounded-lg bg-gray-50">
            No recent activity yet. Complete your first quiz to see results!
          </div>
        </section>
      </main>
    </div>
  );
};

export default DashboardPage;
