export function renderAdminContactEmail({ 
  firstName, 
  lastName, 
  email, 
  phone, 
  address, 
  companyName, 
  helpMessage, 
  selectedServices, 
  dateTime, 
  signature,
  companyLogo 
}: any) {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #FFD700, #FFA500); padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
        .logo { height: 50px; margin-bottom: 10px; }
        .content { background: #ffffff; padding: 30px; border: 1px solid #e0e0e0; border-radius: 0 0 10px 10px; }
        .field { margin-bottom: 20px; padding-bottom: 15px; border-bottom: 1px solid #f0f0f0; }
        .label { font-weight: 600; color: #555; text-transform: uppercase; font-size: 12px; margin-bottom: 5px; }
        .value { color: #333; font-size: 15px; }
        .services-list { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 5px; }
        .service-tag { background: #f0f0f0; padding: 5px 12px; border-radius: 15px; font-size: 13px; }
        .company-logo { max-width: 150px; margin-top: 10px; border-radius: 8px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <img src="${process.env.EMAIL_LOGO_URL || ''}" alt="NJ Creative Firm" class="logo"/>
          <h1 style="color: #000; margin: 10px 0 0 0; font-size: 24px;">New Project Enquiry</h1>
        </div>
        <div class="content">
          <div class="field">
            <div class="label">Client Name</div>
            <div class="value">${firstName} ${lastName}</div>
          </div>
          
          <div class="field">
            <div class="label">Company</div>
            <div class="value">${companyName}</div>
          </div>
          
          <div class="field">
            <div class="label">Contact Information</div>
            <div class="value">
              <strong>Email:</strong> ${email}<br/>
              <strong>Phone:</strong> ${phone}
              ${address ? `<br/><strong>Address:</strong> ${address}` : ''}
            </div>
          </div>
          
          <div class="field">
            <div class="label">Services Required</div>
            <div class="services-list">
              ${selectedServices?.map((s: string) => `<span class="service-tag">${s}</span>`).join('') || 'Not specified'}
            </div>
          </div>
          
          ${dateTime ? `
          <div class="field">
            <div class="label">Preferred Meeting Date/Time</div>
            <div class="value">${new Date(dateTime).toLocaleString('en-US', { dateStyle: 'full', timeStyle: 'short' })}</div>
          </div>
          ` : ''}
          
          <div class="field">
            <div class="label">Project Description</div>
            <div class="value" style="white-space: pre-wrap;">${helpMessage}</div>
          </div>
          
          ${signature ? `
          <div class="field">
            <div class="label">Signature</div>
            <div class="value" style="font-style: italic;">${signature}</div>
          </div>
          ` : ''}
          
          ${companyLogo ? `
          <div class="field">
            <div class="label">Company Logo</div>
            <img src="${process.env.BACKEND_URL || 'http://localhost:8787'}${companyLogo}" alt="Company Logo" class="company-logo"/>
          </div>
          ` : ''}
        </div>
      </div>
    </body>
    </html>
  `;
}

export function renderUserAutoReply({ name }: any) {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #FFD700, #FFA500); padding: 40px; text-align: center; border-radius: 10px 10px 0 0; }
        .logo { height: 60px; margin-bottom: 15px; }
        .content { background: #ffffff; padding: 40px; border: 1px solid #e0e0e0; border-radius: 0 0 10px 10px; }
        .message { font-size: 16px; line-height: 1.8; color: #555; }
        .cta { background: linear-gradient(135deg, #FFD700, #FFA500); color: #000; padding: 15px 30px; text-decoration: none; border-radius: 8px; display: inline-block; margin: 20px 0; font-weight: 600; }
        .footer { text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e0e0e0; color: #888; font-size: 13px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <img src="${process.env.EMAIL_LOGO_URL || ''}" alt="NJ Creative Firm" class="logo"/>
          <h1 style="color: #000; margin: 0; font-size: 28px;">Thank You for Reaching Out!</h1>
        </div>
        <div class="content">
          <p class="message">Hi <strong>${name}</strong>,</p>
          
          <p class="message">
            Thank you for your interest in NJ Creative Firm! We've received your project enquiry and our team is excited to learn more about your vision.
          </p>
          
          <p class="message">
            One of our specialists will review your submission and get back to you within <strong>24-48 hours</strong> to discuss how we can bring your ideas to life.
          </p>
          
          <p class="message">
            In the meantime, feel free to explore our portfolio and latest projects on our website.
          </p>
          
          <div style="text-align: center;">
            <a href="https://njcreativefirm.com/portfolio" class="cta">View Our Portfolio</a>
          </div>
          
          <div class="footer">
            <p><strong>NJ Creative Firm</strong></p>
            <p>Seaside Estate, Ajah, Lagos, Nigeria</p>
            <p>Email: projects@njcreativefirm.com | Phone: +234 903 496 4186</p>
            <p style="margin-top: 15px; color: #aaa;">
              This is an automated message. Please do not reply directly to this email.
            </p>
          </div>
        </div>
      </div>
    </body>
    </html>
  `;
}
