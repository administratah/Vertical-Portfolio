import { useEffect } from "react"
import { motion } from "framer-motion"
import { Link } from "wouter"
import { ArrowLeft } from "lucide-react"

const E = "easeOut" as const
const UPDATED = "27 September 2026"
const EMAIL = "sajiali.sa@gmail.com"

function Section({
  num,
  title,
  children,
}: {
  num: string
  title: string
  children: React.ReactNode
}) {
  return (
    <section className="py-8 border-t border-border first:border-t-0">
      <div className="flex items-center gap-3">
        <span className="text-accent text-xs font-sans tabular-nums">{num}</span>
        <span className="w-6 h-px bg-white/20" />
        <span className="text-[10px] uppercase tracking-[0.4em] text-muted-foreground font-sans">
          {title}
        </span>
      </div>
      <div className="mt-5 flex flex-col gap-4 text-sm md:text-[15px] leading-relaxed text-foreground/80 font-sans max-w-[68ch]">
        {children}
      </div>
    </section>
  )
}

export default function Privacy() {
  useEffect(() => {
    const prev = document.title
    document.title = "Privacy Policy — Saji Ali"
    return () => {
      document.title = prev
    }
  }, [])

  return (
    <div id="top" className="min-h-screen bg-background text-foreground flex flex-col">
      {/* Minimal top bar */}
      <header className="fixed top-0 inset-x-0 z-50 bg-background/85 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-[1100px] mx-auto px-6 md:px-12 h-16 flex items-center justify-between">
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
          <span className="w-10" />
        </div>
      </header>

      <main className="flex-1 w-full pt-28 pb-20 px-6 md:px-12">
        <motion.article
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: E }}
          className="max-w-[820px] mx-auto"
        >
          {/* Heading */}
          <div className="pb-8 border-b border-border">
            <div className="flex items-center gap-3">
              <span className="text-accent text-xs font-sans">§</span>
              <span className="w-6 h-px bg-white/20" />
              <span className="text-[10px] uppercase tracking-[0.5em] text-muted-foreground font-sans">
                Legal
              </span>
            </div>
            <h1 className="mt-4 font-display text-4xl md:text-5xl font-bold tracking-tight">
              Privacy Policy
            </h1>
            <p className="mt-3 text-sm text-muted-foreground font-sans">
              Last updated {UPDATED}
            </p>
          </div>

          <Section num="01" title="Overview">
            <p>
              This website (sajiali.com) is the personal portfolio of Saji Ali, a broadcast
              audio engineer based in the UAE. This policy explains what limited information the
              site collects, why, and the choices you have. The site is built to collect as
              little as possible — there is no advertising, no profiling, and no selling of data.
            </p>
          </Section>

          <Section num="02" title="Analytics">
            <p>
              The site uses{" "}
              <a
                href="https://umami.is/docs/faq"
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent hover:text-foreground underline underline-offset-4 transition-colors"
              >
                Umami
              </a>
              , a privacy-focused analytics tool that is{" "}
              <span className="text-foreground">cookieless</span> and does not collect personal
              data. It records aggregate, anonymised figures only — such as page views, the
              referring website, approximate country, and browser or device type. It does not
              use cookies, does not track you across other sites, and cannot be used to identify
              you. Because it stores no personal data and sets no cookies, it operates without a
              consent banner.
            </p>
          </Section>

          <Section num="03" title="Contact Form">
            <p>
              If you use the contact form, the details you submit — your name, email address,
              subject, and message — are sent directly to me so I can reply. This information is
              used solely to respond to your enquiry. It is not added to any mailing list, shared,
              or used for marketing.
            </p>
          </Section>

          <Section num="04" title="Spam Protection (reCAPTCHA)">
            <p>
              The contact form is protected from spam and abuse by{" "}
              <span className="text-foreground">Google reCAPTCHA</span>. To do this, reCAPTCHA
              sets a cookie and processes limited technical data (such as your IP address and
              interaction with the widget) on Google's servers. This is the only cookie the site
              uses, and it exists purely to keep the form secure.
            </p>
            <p>
              Your use of reCAPTCHA is subject to the{" "}
              <a
                href="https://policies.google.com/privacy"
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent hover:text-foreground underline underline-offset-4 transition-colors"
              >
                Google Privacy Policy
              </a>{" "}
              and{" "}
              <a
                href="https://policies.google.com/terms"
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent hover:text-foreground underline underline-offset-4 transition-colors"
              >
                Terms of Service
              </a>
              .
            </p>
          </Section>

          <Section num="05" title="Cookies">
            <p>
              The only cookie set by this site is the functional reCAPTCHA cookie described above,
              which is necessary for spam protection. The site uses no advertising, tracking, or
              analytics cookies.
            </p>
          </Section>

          <Section num="06" title="Hosting & Service Providers">
            <p>
              The site is hosted on GitHub Pages and served through Cloudflare, which provides
              content delivery and security. These providers may process standard technical data
              (such as IP addresses and request logs) as part of delivering and protecting the
              site. The contact form is handled by a small backend service under the same domain.
            </p>
          </Section>

          <Section num="07" title="Data Retention">
            <p>
              Messages you send via the contact form are kept only as long as needed to handle
              your enquiry and any follow-up. Analytics data is aggregate and anonymised, so it
              is not tied to you and is retained only in summary form.
            </p>
          </Section>

          <Section num="08" title="Your Rights">
            <p>
              Depending on your location, you may have rights to access, correct, or request
              deletion of any personal data you have sent me (for example, a message via the
              contact form). To make a request, email{" "}
              <a
                href={`mailto:${EMAIL}`}
                className="text-accent hover:text-foreground underline underline-offset-4 transition-colors"
              >
                {EMAIL}
              </a>{" "}
              and I will respond as soon as I reasonably can.
            </p>
          </Section>

          <Section num="09" title="Contact">
            <p>
              Questions about this policy or your data can be sent to{" "}
              <a
                href={`mailto:${EMAIL}`}
                className="text-accent hover:text-foreground underline underline-offset-4 transition-colors"
              >
                {EMAIL}
              </a>
              . This policy may be updated from time to time; the date at the top reflects the
              latest revision.
            </p>
          </Section>
        </motion.article>
      </main>
    </div>
  )
}
