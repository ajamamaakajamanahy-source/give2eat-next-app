export default function AdminPage() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-12 space-y-6">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight">
          Admin Panel
        </h1>
        <p className="mt-2 text-sm text-white/70">
          This panel will let admins review listings, handle reports, and ban
          users once role-based access control is wired to Supabase Auth.
        </p>
      </div>

      <div className="rounded-2xl border border-white/10 bg-white/5 p-6 text-sm text-white/70">
        <p>
          Next steps after login is enabled:
        </p>
        <ul className="mt-2 list-disc space-y-1 pl-5">
          <li>View all active and expired listings.</li>
          <li>Delete suspicious or unsafe listings.</li>
          <li>Review reports from receivers and donors.</li>
          <li>Ban users who violate community guidelines.</li>
        </ul>
      </div>
    </div>
  );
}

