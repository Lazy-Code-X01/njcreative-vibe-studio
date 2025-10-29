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
  companyLogo,
}: any) {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif; line-height: 1.6; color: #333; background-color: #f8f9fa; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #4B5320, #C6FF00); padding: 40px; text-align: center; border-radius: 12px 12px 0 0; box-shadow: 0 4px 20px rgba(75, 83, 32, 0.3); }
        .logo { height: 60px; margin-bottom: 15px; filter: brightness(0) invert(1); }
        .content { background: #ffffff; padding: 40px; border: 1px solid #e8e9ea; border-radius: 0 0 12px 12px; box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05); }
        .field { margin-bottom: 24px; padding-bottom: 18px; border-bottom: 1px solid #f0f0f0; }
        .label { font-weight: 700; color: #4B5320; text-transform: uppercase; font-size: 11px; letter-spacing: 0.5px; margin-bottom: 6px; }
        .value { color: #2c3e50; font-size: 15px; line-height: 1.6; }
        .services-list { display: flex; flex-wrap: wrap; gap: 10px; margin-top: 8px; }
        .service-tag { background: linear-gradient(135deg, #4B5320, #5a6328); color: #ffffff; padding: 6px 14px; border-radius: 20px; font-size: 13px; font-weight: 600; }
        .company-logo { max-width: 150px; margin-top: 12px; border-radius: 10px; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1); }
        .highlight { color: #4B5320; font-weight: 600; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <img src="${
            process.env.EMAIL_LOGO_URL || ""
          }" alt="NJ Creative Firm" class="logo"/>
          <h1 style="color: #ffffff; margin: 10px 0 0 0; font-size: 28px; font-weight: 700; text-shadow: 0 2px 4px rgba(0,0,0,0.2);">New Project Enquiry</h1>
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
              <span class="highlight">Email:</span> ${email}<br/>
              <span class="highlight">Phone:</span> ${phone}
              ${
                address
                  ? `<br/><span class="highlight">Address:</span> ${address}`
                  : ""
              }
            </div>
          </div>
          
          <div class="field">
            <div class="label">Services Required</div>
            <div class="services-list">
              ${
                selectedServices
                  ?.map((s: string) => `<span class="service-tag">${s}</span>`)
                  .join("") || "Not specified"
              }
            </div>
          </div>
          
          ${
            dateTime
              ? `
          <div class="field">
            <div class="label">Preferred Meeting Date/Time</div>
            <div class="value">${new Date(dateTime).toLocaleString("en-US", {
              dateStyle: "full",
              timeStyle: "short",
            })}</div>
          </div>
          `
              : ""
          }
          
          <div class="field">
            <div class="label">Project Description</div>
            <div class="value" style="white-space: pre-wrap;">${helpMessage}</div>
          </div>
          
          ${
            signature
              ? `
          <div class="field">
            <div class="label">Signature</div>
            <div class="value" style="font-style: italic;">${signature}</div>
          </div>
          `
              : ""
          }
          
          ${
            companyLogo
              ? `
          <div class="field">
            <div class="label">Company Logo</div>
            <img src="${
              process.env.BACKEND_URL || "http://localhost:8787"
            }${companyLogo}" alt="Company Logo" class="company-logo"/>
          </div>
          `
              : ""
          }
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
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif; line-height: 1.6; color: #333; background-color: #f8f9fa; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #4B5320, #C6FF00); padding: 50px 40px; text-align: center; border-radius: 12px 12px 0 0; box-shadow: 0 4px 20px rgba(75, 83, 32, 0.3); }
        .logo { height: 70px; margin-bottom: 20px; filter: brightness(0) invert(1); }
        .content { background: #ffffff; padding: 40px; border: 1px solid #e8e9ea; border-radius: 0 0 12px 12px; box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05); }
        .message { font-size: 16px; line-height: 1.8; color: #2c3e50; margin-bottom: 20px; }
        .cta { background: linear-gradient(135deg, #4B5320, #C6FF00); color: #ffffff; padding: 16px 36px; text-decoration: none; border-radius: 30px; display: inline-block; margin: 25px 0; font-weight: 700; font-size: 15px; box-shadow: 0 6px 20px rgba(75, 83, 32, 0.3); transition: transform 0.3s ease, box-shadow 0.3s ease; }
        .cta:hover { transform: translateY(-2px); box-shadow: 0 8px 25px rgba(198, 255, 0, 0.4); }
        .footer { text-align: center; margin-top: 35px; padding-top: 25px; border-top: 2px solid #e8e9ea; color: #7f8c8d; font-size: 13px; }
        .footer-brand { color: #4B5320; font-weight: 700; font-size: 15px; margin-bottom: 8px; }
        .highlight { color: #4B5320; font-weight: 600; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <img src="${
            process.env.EMAIL_LOGO_URL || ""
          }" alt="NJ Creative Firm" class="logo"/>
          <h1 style="color: #ffffff; margin: 0; font-size: 32px; font-weight: 700; text-shadow: 0 2px 6px rgba(0,0,0,0.2);">Thank You for Reaching Out!</h1>
        </div>
        <div class="content">
          <p class="message">Hi <span class="highlight">${name}</span>,</p>
          
          <p class="message">
            Thank you for your interest in <span class="highlight">NJ Creative Firm</span>! We've received your project enquiry and our team is excited to learn more about your vision.
          </p>
          
          <p class="message">
            One of our specialists will review your submission and get back to you within <span class="highlight">24-48 hours</span> to discuss how we can bring your ideas to life.
          </p>
          
          <p class="message">
            In the meantime, feel free to explore our portfolio and latest projects on our website.
          </p>
          
          <div style="text-align: center;">
            <a href="https://njcreativefirm.com/portfolio" class="cta">View Our Portfolio</a>
          </div>
          
          <div class="footer">
            <p class="footer-brand">NJ Creative Firm</p>
            <p style="margin: 8px 0;">Seaside Estate, Ajah, Lagos, Nigeria</p>
            <p style="margin: 8px 0;">Email: info@creativefirm.com | Phone: +234 903 496 4186</p>
            <p style="margin-top: 20px; color: #95a5a6; font-size: 12px;">
              This is an automated message. Please do not reply directly to this email.
            </p>
          </div>
        </div>
      </div>
    </body>
    </html>
  `;
}
