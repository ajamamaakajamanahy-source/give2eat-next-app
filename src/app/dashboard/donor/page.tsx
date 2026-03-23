import { supabase } from "@/lib/supabaseClient";

export const dynamic = "force-dynamic";

async function loadDonorListings() {
  if (!supabase) {
    return [];
  }
  const { data, error } = await supabase
    .from("food_listings")
    .select(
      "id, food_name, quantity, pickup_start_time, pickup_end_time, expiry_time, status"
    )
    .order("pickup_start_time", { ascending: false });

  if (error) {
    throw error;
  }
  return data || [];
}

export default async function DonorDashboardPage() {
  const listings = await loadDonorListings();

  const now = new Date();

  const active = listings.filter(
    (l: any) =>
      l.status === "active" && new Date(l.expiry_time) > now
  );
  const expired = listings.filter(
    (l: any) =>
      l.status === "expired" || new Date(l.expiry_time) <= now
  );

  return (
    <div className="mx-auto max-w-5xl px-6 py-12 space-y-8">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight">
          Donor Dashboard
        </h1>
        <p className="mt-2 text-sm text-white/70">
          Track your active and past donations. Request management and
          collection status will be wired when auth is enabled.
        </p>
      </div>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold">Active Donations</h2>
        <div className="space-y-3 rounded-2xl border border-white/10 bg-white/5 p-4">
          {active.length === 0 && (
            <p className="text-sm text-white/60">
              No active donations yet. Create one from the Donate page.
            </p>
          )}
          {active.map((l: any) => (
            <div
              key={l.id}
              className="flex flex-col gap-2 border-b border-white/10 pb-3 last:border-0 last:pb-0 md:flex-row md:items-center md:justify-between"
            >
              <div>
                <p className="text-sm font-semibold">{l.food_name}</p>
                <p className="text-xs text-white/60">
                  Qty: {l.quantity} • Pickup{" "}
                  {new Date(l.pickup_start_time).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}{" "}
                  –{" "}
                  {new Date(l.pickup_end_time).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>
              <div className="flex gap-2 text-xs">
                <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-emerald-300">
                  Active
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold">Expired Listings</h2>
        <div className="space-y-3 rounded-2xl border border-white/10 bg-white/5 p-4">
          {expired.length === 0 && (
            <p className="text-sm text-white/60">
              No expired listings yet.
            </p>
          )}
          {expired.map((l: any) => (
            <div
              key={l.id}
              className="flex flex-col gap-2 border-b border-white/10 pb-3 last:border-0 last:pb-0 md:flex-row md:items-center md:justify-between"
            >
              <div>
                <p className="text-sm font-semibold">{l.food_name}</p>
                <p className="text-xs text-white/60">
                  Expired at{" "}
                  {new Date(l.expiry_time).toLocaleString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                    day: "2-digit",
                    month: "short",
                  })}
                </p>
              </div>
              <span className="rounded-full bg-zinc-700 px-3 py-1 text-xs text-white/80">
                Expired
              </span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

