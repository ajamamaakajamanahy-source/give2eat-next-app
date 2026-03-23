export default function ReceiverDashboardPage() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-12 space-y-6">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight">
          Receiver Dashboard
        </h1>
        <p className="mt-2 text-sm text-white/70">
          Once authentication is enabled, your requested food, approval status,
          and pickup details will appear here.
        </p>
      </div>

      <div className="rounded-2xl border border-white/10 bg-white/5 p-6 text-sm text-white/70">
        <p>
          For now, use the <strong>Find Food</strong> page to browse active
          donations. The request flow and status tracking will be wired to
          Supabase once login and user roles are set up.
        </p>
      </div>
    </div>
  );
}

