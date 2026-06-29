import Link from "next/link";
import { Truck, Package, MapPin, Users } from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Navigation */}
      <nav className="border-b border-slate-700 sticky top-0 z-50 bg-slate-900/80 backdrop-blur">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-blue-400">SILVERSTONE</h1>
          <div className="space-x-6">
            <Link href="/dashboard" className="hover:text-blue-400 transition">
              Dashboard
            </Link>
            <Link href="/shipments" className="hover:text-blue-400 transition">
              Shipments
            </Link>
            <Link href="/about" className="hover:text-blue-400 transition">
              About
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold mb-6">
            Next-Generation Logistics
          </h2>
          <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
            Streamline your delivery operations with real-time tracking, route
            optimization, and intelligent fleet management.
          </p>
          <div className="space-x-4">
            <Link
              href="/signup"
              className="inline-block bg-blue-600 hover:bg-blue-700 px-8 py-3 rounded-lg font-semibold transition"
            >
              Get Started
            </Link>
            <Link
              href="/demo"
              className="inline-block border border-blue-400 hover:bg-blue-400/10 px-8 py-3 rounded-lg font-semibold transition"
            >
              View Demo
            </Link>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-16">
          <FeatureCard
            icon={<Truck className="w-8 h-8" />}
            title="Fleet Management"
            description="Monitor and manage your entire fleet in real-time"
          />
          <FeatureCard
            icon={<Package className="w-8 h-8" />}
            title="Shipment Tracking"
            description="Track every package from warehouse to doorstep"
          />
          <FeatureCard
            icon={<MapPin className="w-8 h-8" />}
            title="Route Optimization"
            description="AI-powered routes for maximum efficiency"
          />
          <FeatureCard
            icon={<Users className="w-8 h-8" />}
            title="Team Collaboration"
            description="Seamless communication across your organization"
          />
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-700 mt-20 py-8 bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-4 text-center text-slate-400">
          <p>&copy; 2026 SILVERSTONE. All rights reserved.</p>
        </div>
      </footer>
    </main>
  );
}

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="bg-slate-800 border border-slate-700 rounded-lg p-6 hover:border-blue-400 transition">
      <div className="text-blue-400 mb-4">{icon}</div>
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-slate-400 text-sm">{description}</p>
    </div>
  );
}
