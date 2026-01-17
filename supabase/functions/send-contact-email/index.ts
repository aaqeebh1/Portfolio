import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const RESEND_API_KEY = Deno.env.get('re_MHE3G9rS_Aos1ZQPXWRh4rjy3oQjk8kp1')

serve(async (req) => {
  const { name, email, message } = await req.json()

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${RESEND_API_KEY}`,
    },
    body: JSON.stringify({
      from: 'Contact Form <aaqeebhussain.com>', // Use your verified domain here
      to: ['aaqeebh1@googlemail.com'], // Where YOU want to receive the message
      subject: `New Message from ${name}`,
      html: `<p><strong>Email:</strong> ${email}</p><p><strong>Message:</strong> ${message}</p>`,
    }),
  })

  const data = await res.json()
  return new Response(JSON.stringify(data), { headers: { 'Content-Type': 'application/json' } })
})