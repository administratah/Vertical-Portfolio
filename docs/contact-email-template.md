# Contact form — notification email template

Reference for the branded email you receive when someone submits the contact form.

> **Where this lives:** the sending code is **not in this repo**. The contact form
> (`artifacts/portfolio/src/components/ContactForm.tsx`) POSTs to the external
> `https://api.sajiali.com/contact` backend (a separate Replit deployment), which
> sends the email via **Resend** (`from: contact@contact.sajiali.com` →
> `to: salam@sajiali.com` → ImprovMX forwards to Gmail). See the memory note
> `contact-email-pipeline`. This file is a copy-paste reference to apply *there*.

## What to change in the Resend `send` call

```js
await resend.emails.send({
  // Named sender so the inbox "from" column is recognizable
  from: 'sajiali.com <contact@contact.sajiali.com>',
  to: 'salam@sajiali.com',
  // Reply goes straight to the visitor
  reply_to: email,
  // Distinctive, structured subject (this is what shows in the inbox list)
  subject: `New enquiry · ${subject} · ${name}`,
  html: buildHtml({ name, email, subject, message }),
  // Keep a plain-text version too as a fallback if you have one:
  // text: `Name: ${name}\nEmail: ${email}\nSubject: ${subject}\n\n${message}`,
});
```

The three inbox-standout levers, in order of impact: **named `from`**, **structured `subject`**, **`reply_to` = visitor's email**.

## The HTML builder

```js
function esc(s = "") {
  return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function buildHtml({ name, email, subject, message }) {
  return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#e9e4d8;padding:32px 12px;">
  <tr><td align="center">
    <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="width:600px;max-width:600px;background:#fbf9f5;border:1px solid #e4ddd2;border-radius:8px;overflow:hidden;font-family:Arial,Helvetica,sans-serif;">
      <tr><td style="height:5px;background:#a97e3f;font-size:0;line-height:0;">&nbsp;</td></tr>
      <tr><td style="padding:28px 36px 20px;border-bottom:1px solid #eee6d8;">
        <div style="font-size:11px;letter-spacing:3px;text-transform:uppercase;color:#a97e3f;font-weight:bold;">New Enquiry</div>
        <div style="font-family:Georgia,serif;font-size:26px;color:#1c1a17;margin-top:8px;font-weight:bold;">sajiali.com &mdash; Contact Form</div>
        <div style="font-size:13px;color:#8a8378;margin-top:6px;">A new message just came in through your portfolio.</div>
      </td></tr>
      <tr><td style="padding:26px 36px 8px;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
          <tr><td style="padding:8px 0;font-size:11px;letter-spacing:2px;text-transform:uppercase;color:#9a9188;width:110px;vertical-align:top;">From</td>
              <td style="padding:8px 0;font-size:16px;color:#1c1a17;font-weight:bold;">${esc(name)}</td></tr>
          <tr><td style="padding:8px 0;font-size:11px;letter-spacing:2px;text-transform:uppercase;color:#9a9188;vertical-align:top;">Email</td>
              <td style="padding:8px 0;font-size:15px;"><a href="mailto:${esc(email)}" style="color:#a97e3f;text-decoration:none;">${esc(email)}</a></td></tr>
          <tr><td style="padding:8px 0;font-size:11px;letter-spacing:2px;text-transform:uppercase;color:#9a9188;vertical-align:top;">Subject</td>
              <td style="padding:8px 0;"><span style="display:inline-block;background:#f4ecdc;border:1px solid #e6d6b8;color:#8a6a33;border-radius:20px;padding:4px 12px;font-size:13px;">${esc(subject)}</span></td></tr>
        </table>
      </td></tr>
      <tr><td style="padding:14px 36px 6px;">
        <div style="font-size:11px;letter-spacing:2px;text-transform:uppercase;color:#9a9188;margin-bottom:10px;">Message</div>
        <div style="background:#ffffff;border:1px solid #eee6d8;border-left:3px solid #a97e3f;border-radius:4px;padding:18px 20px;font-size:15px;line-height:1.6;color:#34302b;white-space:pre-wrap;">${esc(message)}</div>
      </td></tr>
      <tr><td style="padding:24px 36px 8px;">
        <a href="mailto:${esc(email)}?subject=Re:%20${encodeURIComponent(subject)}" style="display:inline-block;background:#1c1a17;color:#fbf9f5;text-decoration:none;font-size:12px;letter-spacing:2px;text-transform:uppercase;padding:14px 28px;border-radius:4px;">Reply to ${esc(name)} &rarr;</a>
      </td></tr>
      <tr><td style="padding:22px 36px 30px;border-top:1px solid #eee6d8;">
        <div style="font-size:12px;color:#9a9188;">Sent from the contact form at <a href="https://sajiali.com" style="color:#a97e3f;text-decoration:none;">sajiali.com</a></div>
      </td></tr>
    </table>
  </td></tr>
</table>`;
}
```

## Notes

- `esc()` guards against broken layout / HTML injection from special characters in the submitted fields.
- `white-space:pre-wrap` preserves the visitor's line breaks in the message.
- Table-based layout + inline styles = maximum email-client compatibility (Gmail, Outlook, Apple Mail).
- Palette matches the site's neutral brand: paper `#fbf9f5`, ink `#1c1a17`, gold accent `#a97e3f`.
- After editing the backend, redeploy it and send a test through the live form to confirm.
