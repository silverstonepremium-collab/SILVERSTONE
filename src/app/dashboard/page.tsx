export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold mb-8">Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard label="Active Shipments" value="24" />
          <StatCard label="Completed Today" value="18" />
          <StatCard label="Fleet Utilization" value="87%" />
          <StatCard label="On-Time Rate" value="96%" />
        </div>
      </div>
    </div>
  );
}

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
      <p className="text-slate-400 text-sm mb-2">{label}</p>
      <p className="text-3xl font-bold text-blue-400">{value}</p>
    </div>
  );
}
