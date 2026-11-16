"use client";

import React from "react";
import { ShieldCheck, Zap, Globe, Gauge } from "lucide-react";

export default function MetricsSection() {
  const metrics = [
    {
      label: "Enterprise Uptime SLA",
      value: "99.99%",
      desc: "Guaranteed high availability across 300+ global edge points of presence.",
      icon: <Globe className="text-blue-400" size={20} />,
      badge: "GLOBAL REDUNDANCY",
    },
    {
      label: "Global Edge Latency",
      value: "<35ms",
      desc: "Instant GraphQL query resolution with multi-region intelligent caching.",
      icon: <Zap className="text-cyan-400" size={20} />,
      badge: "EDGE OPTIMIZED",
    },
    {
      label: "Faster Space Publishing",
      value: "10x",
      desc: "From raw CAD upload to live interactive web floorplan in minutes.",
      icon: <Gauge className="text-emerald-400" size={20} />,
      badge: "DRACO COMPRESSION",
    },
    {
      label: "Security & Compliance",
      value: "SOC-2",
      desc: "Bank-grade encryption in transit and at rest with immutable audit logs.",
      icon: <ShieldCheck className="text-indigo-400" size={20} />,
      badge: "TYPE II CERTIFIED",
    },
  ];

  return (
    <section className="relative w-full py-24 bg-[#08090d] text-[#f8fafc] border-y border-white/[0.06] overflow-hidden flex flex-col items-center justify-center">
      <div className="w-full max-w-7xl mx-auto px-6 sm:px-8 flex flex-col items-center">
        <div className="text-center max-w-3xl mx-auto mb-14 flex flex-col items-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] text-xs font-mono text-slate-300 mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>PLATFORM TELEMETRY & PERFORMANCE</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight text-center">
            Engineered for mission-critical spatial applications.
          </h2>
        </div>

        <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 justify-center">
          {metrics.map((m, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-[#0f131c] border border-white/[0.08] hover:border-blue-500/30 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/[0.06] flex items-center justify-center">
                    {m.icon}
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-white/[0.04] text-slate-400 border border-white/[0.06]">
                    {m.badge}
                  </span>
                </div>

                <div className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight font-mono">
                  {m.value}
                </div>

                <div className="mt-2 text-sm font-semibold text-slate-200">
                  {m.label}
                </div>

                <p className="mt-2 text-xs text-slate-400 leading-relaxed">
                  {m.desc}
                </p>
              </div>

              <div className="mt-5 pt-3 border-t border-white/[0.04] text-[11px] font-mono text-cyan-400">
                Verified Benchmark
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
