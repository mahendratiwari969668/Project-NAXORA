import nodemailer from "nodemailer";

export const getSenderAddress = () => {
  const configuredFrom = process.env.EMAIL_FROM || process.env.EMAIL_USER;
  if (!configuredFrom) {
    return '"NEXORA" <no-reply@nexora.edu>';
  }
  if (configuredFrom.includes("<")) {
    return configuredFrom.trim();
  }
  return `"NEXORA" <${configuredFrom.trim()}>`;
};

const getTransporter = () => {
  const host = process.env.EMAIL_HOST;
  const port = Number(process.env.EMAIL_PORT) || 587;
  const user = process.env.EMAIL_USER;
  const pass = process.env.EMAIL_PASSWORD;
  const secure = process.env.EMAIL_SECURE === "true" || port === 465;

  if (!user || !pass) {
    return null;
  }

  return nodemailer.createTransport({
    host: host || "smtp.gmail.com",
    port,
    secure,
    auth: {
      user: user.trim(),
      pass: pass.trim(),
    },
    connectionTimeout: 10000,
    greetingTimeout: 10000,
    socketTimeout: 15000,
  });
};

export const isEmailConfigured = () => {
  return Boolean(process.env.EMAIL_USER && process.env.EMAIL_PASSWORD);
};

export const verifySmtpConnection = async () => {
  const user = process.env.EMAIL_USER;
  const pass = process.env.EMAIL_PASSWORD;

  if (!user || !pass) {
    return {
      configured: false,
      verified: false,
      message: "SMTP credentials not provided in environment variables.",
    };
  }

  const transporter = getTransporter();
  if (!transporter) {
    return {
      configured: false,
      verified: false,
      message: "Failed to initialize SMTP transporter.",
    };
  }

  try {
    await transporter.verify();
    return {
      configured: true,
      verified: true,
      message: "SMTP connection established and authenticated successfully.",
    };
  } catch (err) {
    return {
      configured: true,
      verified: false,
      message: err.message,
      code: err.code || "SMTP_VERIFY_FAILED",
    };
  }
};

export const sendOtpEmail = async ({
  to,
  otp,
  purpose = "registration",
  firstName = "Member",
  role = "student",
}) => {
  // Only activate dev mode if explicitly configured via OTP_DEV_MODE=true
  const isDevMode = process.env.OTP_DEV_MODE === "true";
  const transporter = getTransporter();
  const isCompany = role === "company";
  const isInstitution = role === "institution";

  const purposeTitle =
    purpose === "login"
      ? isCompany
        ? "Company Login Verification Code"
        : isInstitution
        ? "Institution Login Verification Code"
        : "Login Verification Code"
      : isCompany
      ? "Company Account Verification Code"
      : isInstitution
      ? "Institution Account Verification Code"
      : "Student Account Verification Code";

  const purposeDescription =
    purpose === "login"
      ? isCompany
        ? "use this code to securely sign in to your NEXORA company portal."
        : isInstitution
        ? "use this code to securely sign in to your NEXORA institution portal."
        : "use this code to securely sign in to your NEXORA student account."
      : isCompany
      ? "use this code to verify your official company email address and activate your NEXORA company registration."
      : isInstitution
      ? "use this code to verify your official email address and activate your NEXORA institution registration."
      : "use this code to verify your email address and activate your NEXORA student account.";

  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>${purposeTitle}</title>
      <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f8fafc; margin: 0; padding: 24px; color: #1e293b; }
        .container { max-width: 540px; margin: 0 auto; background: #ffffff; border-radius: 16px; border: 1px solid #e2e8f0; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05); }
        .header { background: #2563eb; padding: 32px 24px; text-align: center; }
        .logo-box { display: inline-block; width: 44px; height: 44px; line-height: 44px; background: #ffffff; color: #2563eb; font-weight: bold; font-size: 22px; border-radius: 10px; margin-bottom: 12px; }
        .header h1 { color: #ffffff; margin: 0; font-size: 22px; font-weight: 700; letter-spacing: 0.5px; }
        .header p { color: #bfdbfe; margin: 4px 0 0; font-size: 13px; }
        .content { padding: 32px 28px; }
        .greeting { font-size: 16px; font-weight: 600; margin-bottom: 12px; color: #0f172a; }
        .message { font-size: 14px; line-height: 1.6; color: #475569; margin-bottom: 24px; }
        .otp-container { text-align: center; margin: 28px 0; }
        .otp-box { display: inline-block; background: #f1f5f9; border: 2px dashed #93c5fd; border-radius: 12px; padding: 16px 36px; font-size: 32px; font-weight: 800; letter-spacing: 10px; color: #1d4ed8; font-family: 'Courier New', Courier, monospace; }
        .expiry-note { font-size: 13px; color: #64748b; text-align: center; margin-top: 8px; }
        .warning-box { background: #fef2f2; border-left: 4px solid #ef4444; padding: 12px 16px; border-radius: 6px; margin: 24px 0; font-size: 12px; color: #991b1b; line-height: 1.5; }
        .spam-note { background: #f0fdf4; border-left: 4px solid #22c55e; padding: 12px 16px; border-radius: 6px; margin: 16px 0; font-size: 12px; color: #15803d; line-height: 1.5; }
        .footer { border-top: 1px solid #f1f5f9; padding: 20px; text-align: center; font-size: 12px; color: #94a3b8; background: #f8fafc; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <div class="logo-box">N</div>
          <h1>NEXORA</h1>
          <p>Academic & Career Intelligence Platform</p>
        </div>
        <div class="content">
          <div class="greeting">Hello ${firstName},</div>
          <div class="message">
            Thank you for registering on NEXORA. Please ${purposeDescription}
          </div>
          <div class="otp-container">
            <div class="otp-box">${otp}</div>
            <div class="expiry-note">⏳ This verification code expires in <strong>10 minutes</strong>.</div>
          </div>
          <div class="spam-note">
            💡 <strong>Inbox Tip:</strong> If this email appeared in your Spam or Junk folder, please click <em>"Report not spam"</em> or move it to your Primary inbox to ensure important institutional notifications are delivered promptly.
          </div>
          <div class="warning-box">
            <strong>Security Alert:</strong> Never share this verification code with anyone. NEXORA staff will never ask for your verification code.
          </div>
        </div>
        <div class="footer">
          &copy; 2026 NEXORA · Connecting Talent, Academia & Industry. All rights reserved.
        </div>
      </div>
    </body>
    </html>
  `;

  const textContent = `
NEXORA - ${purposeTitle}
Hello ${firstName},

Please use the following 6-digit verification code: ${otp}

This code is valid for 10 minutes.
${purposeDescription}

Inbox Tip: If this email is in your Spam or Junk folder, please mark it as Not Spam.
Security note: Never share this verification code with anyone.

NEXORA Academic & Career Intelligence Platform
  `.trim();

  // If a transporter is configured, attempt real SMTP delivery
  if (transporter) {
    try {
      const from = getSenderAddress();
      const replyTo = process.env.EMAIL_USER || undefined;

      const info = await transporter.sendMail({
        from,
        to,
        replyTo,
        subject: `[NEXORA] Your ${purposeTitle}: ${otp}`,
        text: textContent,
        html: htmlContent,
        headers: {
          "X-Priority": "1",
          "X-MSMail-Priority": "High",
          Importance: "high",
        },
      });

      // Verify that SMTP actually accepted recipient
      const wasAccepted =
        Array.isArray(info.accepted) && info.accepted.includes(to);

      if (!wasAccepted) {
        const rejectReason =
          Array.isArray(info.rejected) && info.rejected.length > 0
            ? info.rejected.join(", ")
            : "Recipient not accepted by SMTP server";
        throw new Error(`SMTP server rejected delivery: ${rejectReason}`);
      }

      console.log(
        `[NEXORA EMAIL] SMTP accepted message for ${to} (MessageId: ${info.messageId})`
      );

      return {
        success: true,
        delivered: true,
        provider: "smtp",
        messageId: info.messageId,
        response: info.response,
      };
    } catch (err) {
      console.error(
        `[NEXORA EMAIL ERROR] SMTP delivery failed for ${to} [${err.code || "SEND_FAILED"}]: ${err.message}`
      );

      if (isDevMode) {
        console.warn(
          `\n================================================================================\n[NEXORA DEV MODE] Fallback OTP for ${role} ${to}: [ ${otp} ]\nPurpose: ${purposeTitle} | Valid for 10 minutes\n(Transporter failed: ${err.message})\n================================================================================\n`
        );
        return {
          success: true,
          delivered: false,
          devMode: true,
          warning: "SMTP failed; dev mode OTP logged to console",
        };
      }

      // When OTP_DEV_MODE=false, never fall back silently to terminal OTP logging
      const deliveryErr = new Error(`Email delivery failed via SMTP: ${err.message}`);
      deliveryErr.code = err.code || "SMTP_SEND_FAILED";
      throw deliveryErr;
    }
  }

  // If no transporter configured:
  if (isDevMode) {
    console.log(
      `\n================================================================================\n[NEXORA DEV MODE] OTP for ${role} ${to}: [ ${otp} ]\nPurpose: ${purposeTitle} | Valid for 10 minutes\n(Dev mode active: EMAIL_USER / EMAIL_PASSWORD is not set in server/.env)\n================================================================================\n`
    );
    return {
      success: true,
      delivered: false,
      devMode: true,
      message: "Development mode active: OTP logged to server console",
    };
  }

  // When OTP_DEV_MODE=false, SMTP is strictly required
  const configErr = new Error(
    "Email service is not configured. Please set EMAIL_HOST, EMAIL_PORT, EMAIL_USER, and EMAIL_PASSWORD in server/.env, or set OTP_DEV_MODE=true for local offline testing."
  );
  configErr.code = "SMTP_NOT_CONFIGURED";
  throw configErr;
};
