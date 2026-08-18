import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { FaCertificate, FaTimes, FaExternalLinkAlt } from "react-icons/fa";
import { CERTIFICATES } from "../constants/data.js";

// Load every PDF in assets/certificates so new files just work.
const certFiles = import.meta.glob("../assets/certificates/*.pdf", {
  eager: true,
  import: "default",
});

function fileUrl(filename) {
  const match = Object.keys(certFiles).find((p) => p.endsWith(filename));
  return match ? certFiles[match] : null;
}

function CertificatesModal({ colors }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    function onKeyDown(e) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = prevOverflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  const modal = open
    ? createPortal(
        <div
          className="fixed inset-0 flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          style={{
            zIndex: 2147483647,
            isolation: "isolate",
          }}
          onClick={() => setOpen(false)}
        >
          <div
            className="absolute inset-0"
            style={{
              background: "rgba(15, 17, 26, 0.55)",
              backdropFilter: "blur(8px)",
              WebkitBackdropFilter: "blur(8px)",
            }}
            aria-hidden="true"
          />
          <div
            onClick={(e) => e.stopPropagation()}
            className={`relative w-full max-w-md rounded-2xl shadow-2xl p-5 sm:p-6 border-2 ${colors.card} ${colors.border}`}
            style={{ borderColor: "#eebbc3" }}
          >
            <div className="flex items-center justify-between mb-4">
              <h3
                className={`text-lg font-semibold flex items-center gap-2 ${colors.accent}`}
              >
                <FaCertificate /> Certificates
              </h3>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close"
                className={`${colors.icon} opacity-70 hover:opacity-100 transition`}
              >
                <FaTimes />
              </button>
            </div>

            <div className="flex flex-col gap-3">
              {CERTIFICATES.map((cert) => {
                const url = fileUrl(cert.file);
                return (
                  <div
                    key={cert.file}
                    className={`rounded-xl p-3 border ${colors.border} flex items-center justify-between gap-3`}
                  >
                    <div className="min-w-0">
                      <div
                        className={`font-semibold text-sm truncate ${colors.text}`}
                      >
                        {cert.title}
                      </div>
                      <div
                        className={`text-xs opacity-70 truncate ${colors.text}`}
                      >
                        {cert.issuer}
                      </div>
                    </div>
                    <div className="flex items-center gap-3 shrink-0">
                      {cert.verifyUrl && (
                        <a
                          href={cert.verifyUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`text-xs underline ${colors.accent} hover:opacity-80 flex items-center gap-1`}
                        >
                          Verify <FaExternalLinkAlt size={10} />
                        </a>
                      )}
                      {url && (
                        <a
                          href={url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`text-xs font-semibold underline ${colors.accent} hover:opacity-80`}
                        >
                          View
                        </a>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>,
        document.body,
      )
    : null;

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="relative group"
        aria-label="View Certificates"
      >
        <span
          className={`inline-flex items-center justify-center rounded-full ${colors.icon} ${colors.card} shadow-md`}
          style={{
            width: 38,
            height: 38,
            fontSize: 24,
          }}
        >
          <FaCertificate />
        </span>
        <span className="absolute -bottom-7 left-1/2 -translate-x-1/2 text-xs bg-[#b8c1ec] text-white px-2 py-0.5 rounded opacity-0 group-hover:opacity-100 transition whitespace-nowrap">
          Certificates
        </span>
      </button>
      {modal}
    </>
  );
}

export default CertificatesModal;
