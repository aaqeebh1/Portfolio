import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY')

serve(async (req) => {
  const { name, email, message } = await req.json()

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${RESEND_API_KEY}`,
    },
    body: JSON.stringify({
      from: 'Contact Form <aaqeebhussain.com>', 
      to: ['aaqeebh1@googlemail.com'], 
      subject: `New Message from ${name}`,
      html: `<p><strong>Email:</strong> ${email}</p><p><strong>Message:</strong> ${message}</p>`,
    }),
  })

  const data = await res.json()
  return new Response(JSON.stringify(data), { headers: { 'Content-Type': 'application/json' } })
})