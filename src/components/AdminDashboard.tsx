import { useState } from "react";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { SignedIn, SignedOut, SignIn, useClerk } from "@clerk/clerk-react";
import { Search, LogOut, Download, QrCode, X } from "lucide-react";
import { QRCodeSVG } from "qrcode.react";

export default function AdminDashboardWrapper() {
  return (
    <>
      <SignedIn>
        <AdminDashboard />
      </SignedIn>
      <SignedOut>
        <div className="flex min-h-[100dvh] items-center justify-center bg-[var(--color-cs-light-bg)]">
          <SignIn routing="hash" />
        </div>
      </SignedOut>
    </>
  );
}

function AdminDashboard() {
  const [searchTerm, setSearchTerm] = useState("");
  const [showQR, setShowQR] = useState(false);
  const { signOut } = useClerk();

  const leads = useQuery(api.leads.list) || [];
  const stats = useQuery(api.leads.stats) || { total: 0, today: 0 };
  const publicUrl = window.location.origin;

  const filteredLeads = leads.filter(
    (lead) =>
      lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.organisation.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.email.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const exportCSV = async () => {
    const headers = ["Name", "Organisation", "Email", "Phone", "Time", "Date"];
    const rows = leads.map((lead) => {
      const d = new Date(lead.createdAt);
      return [
        `"${lead.name.replace(/"/g, '""')}"`,
        `"${lead.organisation.replace(/"/g, '""')}"`,
        lead.email,
        lead.phone,
        d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        d.toLocaleDateString(),
      ].join(",");
    });

    const csvContent = [headers.join(","), ...rows].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `craft-silicon-osr-leads-${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  const downloadQR = () => {
    const svg = document.getElementById("booth-qr-code");
    if (!svg) return;
    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const img = new Image();
    img.onload = () => {
      // Create padding block
      const padding = 32;
      canvas.width = img.width + padding * 2;
      canvas.height = img.height + padding * 2;
      if (ctx) {
        ctx.fillStyle = "white";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, padding, padding);
        const pngFile = canvas.toDataURL("image/png");
        const downloadLink = document.createElement("a");
        downloadLink.download = "booth-qr-code.png";
        downloadLink.href = `${pngFile}`;
        downloadLink.click();
      }
    };
    // Ensure all characters properly encode over btoa
    img.src = "data:image/svg+xml;base64," + btoa(unescape(encodeURIComponent(svgData)));
  };

  return (
    <div className="min-h-[100dvh] bg-[var(--color-cs-light-bg)] pb-12">
      {/* Header */}
      <header className="sticky top-0 z-10 flex items-center justify-between bg-[var(--color-cs-navy-mid)] px-[1.75rem] py-[1.1rem]">
        <div className="flex items-baseline gap-4">
          <h1 className="text-[15px] font-medium text-white">Booth Leads</h1>
          <span className="text-[12px] font-normal text-[var(--color-cs-blue-dark)]">
            {stats.total} total
          </span>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => setShowQR(true)}
            className="flex items-center gap-2 rounded-[6px] border border-[rgba(255,255,255,0.15)] bg-[rgba(255,255,255,0.1)] px-[15px] py-[7px] text-[12px] font-medium text-white transition hover:bg-[rgba(255,255,255,0.2)]"
          >
            <QrCode size={14} /> Get QR Code
          </button>
          <button
            onClick={exportCSV}
            className="flex items-center gap-2 rounded-[6px] border border-[rgba(10,106,226,0.35)] bg-[rgba(10,106,226,0.12)] px-[15px] py-[7px] text-[12px] font-medium text-[var(--color-cs-blue-dark)] transition hover:bg-[rgba(10,106,226,0.2)]"
          >
            <Download size={14} /> Export CSV
          </button>
          <button
            onClick={() => signOut()}
            className="flex items-center gap-2 rounded-[6px] border border-[rgba(255,255,255,0.10)] bg-[rgba(255,255,255,0.05)] px-[15px] py-[7px] text-[12px] font-normal text-[rgba(255,255,255,0.45)] transition hover:bg-[rgba(255,255,255,0.1)] hover:text-white"
          >
            <LogOut size={14} /> Sign out
          </button>
        </div>
      </header>

      {/* QR Code Modal Overlay */}
      {showQR && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#071426]/80 px-4 backdrop-blur-sm">
          <div className="relative w-full max-w-[420px] rounded-[16px] bg-white p-8 shadow-2xl">
            <button
              onClick={() => setShowQR(false)}
              className="absolute right-4 top-4 text-[#071426]/40 transition hover:text-[#071426]"
            >
              <X size={20} />
            </button>
            <div className="flex flex-col items-center text-center">
              <h2 className="text-[20px] font-medium tracking-[-0.5px] text-[#071426]">
                Booth QR Code
              </h2>
              <p className="mt-2 text-[14px] text-[#071426]/60">
                Visitors can scan this code to access the lead capture form directly on their devices.
              </p>
              <div className="mt-8 overflow-hidden rounded-[12px] border border-[#071426]/10 bg-white p-6 shadow-sm">
                <QRCodeSVG
                  id="booth-qr-code"
                  value={publicUrl}
                  size={200}
                  level="H"
                  includeMargin={false}
                  fgColor="#071426"
                />
              </div>
              <button
                onClick={downloadQR}
                className="mt-8 flex w-full items-center justify-center gap-2 rounded-[10px] bg-[var(--color-cs-blue)] py-[14px] text-[15px] font-medium text-white shadow-md transition-all hover:bg-[var(--color-cs-blue-dark)] hover:-translate-y-[1px]"
              >
                <Download size={18} /> Download High-Res QR
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="mx-auto mt-8 w-full max-w-[1100px] px-6 lg:px-8">
        {/* Stats Row */}
        <div className="grid grid-cols-[repeat(auto-fit,minmax(130px,1fr))] gap-[12px]">
          <div className="rounded-[10px] border-[0.5px] border-[var(--color-cs-light-border)] bg-[var(--color-cs-light-surface)] px-[1.25rem] py-[1.1rem] shadow-[0_2px_16px_rgba(7,20,38,0.10)]">
            <h3 className="text-[10px] font-medium uppercase tracking-[0.08em] text-[rgba(7,20,38,0.45)]">
              Total Leads
            </h3>
            <p className="mt-1 text-[28px] font-medium tracking-[-0.5px] text-[#071426]" style={{ fontVariantNumeric: "tabular-nums" }}>
              {stats.total}
            </p>
          </div>
          <div className="rounded-[10px] border-[0.5px] border-[var(--color-cs-light-border)] bg-[var(--color-cs-light-surface)] px-[1.25rem] py-[1.1rem] shadow-[0_2px_16px_rgba(7,20,38,0.10)]">
            <h3 className="text-[10px] font-medium uppercase tracking-[0.08em] text-[rgba(7,20,38,0.45)]">
              Today
            </h3>
            <p className="mt-1 text-[28px] font-medium tracking-[-0.5px] text-[#071426]" style={{ fontVariantNumeric: "tabular-nums" }}>
              {stats.today}
            </p>
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative mt-[32px] w-full max-w-[400px]">
          <Search
            className="absolute left-[14px] top-1/2 -translate-y-1/2 text-[rgba(7,20,38,0.35)]"
            size={16}
          />
          <input
            type="text"
            placeholder="Search name, organisation, email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full rounded-[8px] border-[0.5px] border-[rgba(7,20,38,0.15)] bg-white py-[10px] pl-[40px] pr-[14px] text-[14px] text-[#071426] placeholder-[rgba(7,20,38,0.35)] outline-none transition-colors duration-160 ease-out focus:border-[var(--color-cs-blue)]"
          />
        </div>

        {/* Table */}
        <div className="mt-6 w-full overflow-x-auto rounded-[10px] border-[0.5px] border-[var(--color-cs-light-border)] bg-white shadow-[0_4px_24px_rgba(7,20,38,0.15)]">
          <div className="min-w-[560px]">
            <table className="w-full text-left">
              <thead>
                <tr>
                  <th className="border-b-[0.5px] border-[rgba(7,20,38,0.08)] px-[14px] py-[11px] text-[10px] font-medium uppercase tracking-[0.07em] text-[rgba(7,20,38,0.40)]">
                    Name
                  </th>
                  <th className="border-b-[0.5px] border-[rgba(7,20,38,0.08)] px-[14px] py-[11px] text-[10px] font-medium uppercase tracking-[0.07em] text-[rgba(7,20,38,0.40)]">
                    Organisation
                  </th>
                  <th className="border-b-[0.5px] border-[rgba(7,20,38,0.08)] px-[14px] py-[11px] text-[10px] font-medium uppercase tracking-[0.07em] text-[rgba(7,20,38,0.40)]">
                    Email
                  </th>
                  <th className="border-b-[0.5px] border-[rgba(7,20,38,0.08)] px-[14px] py-[11px] text-[10px] font-medium uppercase tracking-[0.07em] text-[rgba(7,20,38,0.40)]">
                    Phone
                  </th>
                  <th className="border-b-[0.5px] border-[rgba(7,20,38,0.08)] px-[14px] py-[11px] text-[10px] font-medium uppercase tracking-[0.07em] text-[rgba(7,20,38,0.40)]">
                    Time
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredLeads.map((lead, idx) => {
                  const d = new Date(lead.createdAt);
                  const isRecent = Date.now() - lead.createdAt < 30 * 60 * 1000;
                  return (
                    <tr
                      key={lead._id || idx}
                      className="group border-b-[0.5px] border-[rgba(7,20,38,0.05)] transition-colors duration-100 last:border-b-0 hover:bg-[#F7F9FC]"
                    >
                      <td className="px-[14px] py-[13px] text-[15px] font-medium text-[var(--text-light-1)]">
                        {lead.name}
                      </td>
                      <td className="px-[14px] py-[13px] text-[15px] font-bold text-[var(--text-light-1)]">
                        {lead.organisation}
                      </td>
                      <td className="px-[14px] py-[13px] text-[13px] text-[rgba(7,20,38,0.60)]">
                        {lead.email}
                      </td>
                      <td className="px-[14px] py-[13px] text-[13px] text-[rgba(7,20,38,0.60)]">
                        {lead.phone}
                      </td>
                      <td className="relative px-[14px] py-[13px] text-[13px] text-[rgba(7,20,38,0.60)]">
                        {d.toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                        {isRecent && (
                          <span className="absolute right-4 top-1/2 h-[6px] w-[6px] -translate-y-1/2 rounded-full bg-amber-500" />
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            {filteredLeads.length === 0 && (
              <div className="px-6 py-12 text-center text-[14px] text-[rgba(7,20,38,0.50)]">
                No leads found. Share the QR code!
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
