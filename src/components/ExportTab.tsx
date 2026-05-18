import { useState } from "react";
import type { OnPageData, SpeedData } from "../types";
import { fetchExport } from "../services/api";
import { Download, FileText } from "lucide-react";

interface Props {
  onpage: OnPageData | null;
  speed: SpeedData | null;
  domain: string;
  url?: string;
}

export default function ExportTab({ onpage, speed, domain, url }: Props) {
  const [agency, setAgency] = useState("NexGenWebLab Pro");
  const [author, setAuthor] = useState("SEO Team");
  const [client, setClient] = useState(domain.toUpperCase());

  const handleDownload = async () => {
    if (!onpage || !speed) return;
    const blob = await fetchExport(
      url || `https://${domain}`,
      onpage,
      speed,
      [],
      agency,
      client,
      author,
    );
    if (!blob) return;
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `${client.replace(/\s+/g, "_")}_SEO_Report.docx`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(a.href);
  };

  return (
    <div className="export-tab">
      <div className="export-header">
        <h4>White Label Report</h4>
        <span className="export-badge">
          <FileText size={14} />
          DOCX export
        </span>
      </div>
      <p className="export-desc">Generate a professional SEO audit document with your own branding.</p>

      <div className="export-form">
        <div className="export-row">
          <div className="export-field">
            <label>Agency name</label>
            <input type="text" value={agency} onChange={(e) => setAgency(e.target.value)} />
          </div>
          <div className="export-field">
            <label>Prepared by</label>
            <input type="text" value={author} onChange={(e) => setAuthor(e.target.value)} />
          </div>
        </div>
        <div className="export-field">
          <label>Client / Project</label>
          <input type="text" value={client} onChange={(e) => setClient(e.target.value)} />
        </div>
      </div>

      {onpage && speed ? (
        <button className="btn-primary btn-full" onClick={handleDownload}>
          <Download size={18} />
          Download DOCX Report
        </button>
      ) : (
        <div className="ai-info">
          <FileText size={20} />
          <span>Run an audit first to generate a report.</span>
        </div>
      )}
    </div>
  );
}
