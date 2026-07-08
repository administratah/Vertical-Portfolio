import { motion } from "framer-motion"
import { Link } from "wouter"
import { Download, ArrowLeft, ExternalLink, FileText } from "lucide-react"

/* Served from /public — BASE_URL keeps it correct under any deploy base. */
const PDF_URL = `${import.meta.env.BASE_URL}Portfolio.pdf`

const E = "easeOut" as const

export default function PortfolioDoc() {
  return (
    <div id="top" className="min-h-screen bg-background text-foreground flex flex-col">
      {/* ─── Minimal top bar (route-aware, no homepage hash links) ─── */}
      <header className="fixed top-0 inset-x-0 z-50 bg-background/85 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-[1700px] mx-auto px-6 md:px-12 lg:px-20 h-16 flex items-center justify-between">
          <Link
            href="/"
            className="group flex items-center gap-2.5 text-[11px] uppercase tracking-[0.25em] text-muted-foreground hover:text-foreground transition-colors duration-300 font-sans font-medium"
          >
            <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform duration-150" />
            Back
          </Link>

          <Link
            href="/"
            className="font-display text-base font-bold tracking-widest text-foreground hover:text-accent transition-colors duration-300 italic"
          >
            Saji Ali.
          </Link>

          <a
            href={PDF_URL}
            download="Saji_Ali_Portfolio.pdf"
            className="group flex items-center gap-2 text-[11px] uppercase tracking-[0.25em] text-accent hover:text-foreground transition-colors duration-300 font-sans font-medium border-b border-accent/40 pb-px"
          >
            <Download className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Download PDF</span>
          </a>
        </div>
      </header>

      {/* ─── Content ─── */}
      <main className="flex-1 flex flex-col pt-24 pb-16 px-6 md:px-12 lg:px-20 max-w-[1400px] w-full mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: E }}
          className="flex flex-col gap-6"
        >
          {/* Heading + actions */}
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div>
              <div className="flex items-center gap-3">
                <span className="text-accent text-xs font-sans tabular-nums">01</span>
                <span className="w-6 h-px bg-white/20" />
                <span className="text-[10px] uppercase tracking-[0.5em] text-muted-foreground font-sans">
                  Portfolio
                </span>
              </div>
              <h1 className="mt-4 font-display text-4xl md:text-5xl font-bold tracking-tight">
                Full Portfolio
              </h1>
              <p className="mt-3 text-sm text-muted-foreground max-w-xl leading-relaxed font-sans">
                A complete look at selected work, credits and case studies. Read it below, or
                download the full document.
              </p>
            </div>

            <div className="flex flex-wrap gap-3 shrink-0">
              <a
                href={PDF_URL}
                download="Saji_Ali_Portfolio.pdf"
                className="group flex items-center gap-2.5 text-[11px] uppercase tracking-[0.28em] font-sans font-medium border border-foreground/22 px-7 py-3.5 hover:bg-foreground hover:text-background transition-colors duration-200"
              >
                <Download className="w-3.5 h-3.5" />
                Download PDF
              </a>
              <a
                href={PDF_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 text-[11px] uppercase tracking-[0.28em] font-sans font-medium text-muted-foreground hover:text-foreground transition-colors duration-200 px-4 py-3.5"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                Open in new tab
              </a>
            </div>
          </div>

          {/* Embedded viewer */}
          <div className="relative w-full border border-border rounded-sm overflow-hidden bg-muted/30">
            <iframe
              src={`${PDF_URL}#view=FitH`}
              title="Saji Ali — Portfolio (PDF)"
              className="w-full h-[78vh] min-h-[520px]"
            >
              {/* Fallback for browsers that can't render inline PDFs */}
            </iframe>

            {/* Mobile / no-inline-PDF fallback overlay lives beneath the iframe */}
          </div>

          {/* Fallback note (visible; mobile browsers often can't inline PDFs) */}
          <p className="text-xs text-muted-foreground/80 font-sans flex items-center gap-2">
            <FileText className="w-3.5 h-3.5 shrink-0" />
            Can&rsquo;t see the document?{" "}
            <a
              href={PDF_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent hover:text-foreground underline underline-offset-4 transition-colors"
            >
              Open the PDF directly
            </a>
            .
          </p>
        </motion.div>
      </main>
    </div>
  )
}
