export function renderAdminContactEmail({ name, email, phone, message }: any) {
  return `
    <div>
      <img src="${process.env.EMAIL_LOGO_URL || ''}" alt="logo" style="height:40px"/>
      <h2>New contact submission</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone:</strong> ${phone || 'N/A'}</p>
      <p><strong>Message:</strong><br/>${message}</p>
    </div>
  `;
}

export function renderUserAutoReply({ name }: any) {
  return `
    <div>
      <img src="${process.env.EMAIL_LOGO_URL || ''}" alt="logo" style="height:40px"/>
      <p>Hi ${name},</p>
      <p>Thanks for reaching out to NJ Creative Firm. We received your message and will get back to you shortly.</p>
      <p>— NJ Creative Firm</p>
    </div>
  `;
}
