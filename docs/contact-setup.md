# Contact form setup

The portfolio posts to the same-origin `/api/contact` Vercel Function, which sends an email through [Resend](https://resend.com/docs/api-reference/emails/send-email). A successful response means Resend accepted the message, not that it has reached the inbox.

1. [Verify a domain or subdomain in Resend](https://resend.com/docs/dashboard/domains/introduction). Configure the DNS records Resend provides.
2. Create a [Resend API key](https://resend.com/docs/dashboard/api-keys/introduction) with sending access for that domain.
3. In the portfolio’s Vercel project, open **Settings → Environment Variables**. Set these variables for the intended environments:
   - `RESEND_API_KEY`: the Resend sending key. Mark as sensitive when supported.
   - `CONTACT_FROM_EMAIL`: a plain mailbox address on the verified sender domain.
   - `CONTACT_TO_EMAIL`: the mailbox meant to receive portfolio enquiries (the portfolio lists `Imegufavour30@gmail.com`).
4. Redeploy after adding the variables. Once permitted to send an actual test, submit a marked test message through the deployed page. Verify both the Resend delivery record and the recipient inbox; use Reply to verify the visitor’s email is set correctly. If the function lacks configuration, it responds with 503 and the page directs visitors to WhatsApp or email.

Never put credentials in client code, `VITE_` variables, or version control. For local API testing, use `vercel dev` with server-side development environment variables; plain `vite` does not host Vercel Functions. Run `node --test tests/contact.test.mjs` to check the submission flow with mocked delivery. These tests send no real email.

The endpoint accepts POSTed JSON from its own origin and rejects oversized requests, invalid fields, and the honeypot. A warm function instance allows five provider attempts per IP and thirty total attempts in a ten-minute window; this counter resets when an instance restarts and is not shared between instances. For a durable site-wide limit in production, add a deployment-level rule for `POST /api/contact` in [Vercel Firewall](https://vercel.com/docs/vercel-firewall/vercel-waf/rate-limiting) where available. Contact text is sent only to Resend, and provider errors are logged without message content, addresses, or secrets.
