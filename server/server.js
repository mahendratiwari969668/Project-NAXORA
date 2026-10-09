import "dotenv/config";
import app from "./app.js";
import connectDB from "./config/db.js";
import { seedMasterDataIfNeeded } from "./seeds/masterDataSeed.js";
import { verifySmtpConnection } from "./services/emailService.js";

const PORT = process.env.PORT || 5000;

process.on("unhandledRejection", (reason, promise) => {
  console.error("[SERVER] Unhandled Rejection at:", promise, "reason:", reason);
});

process.on("uncaughtException", (error) => {
  console.error("[SERVER] Uncaught Exception thrown:", error);
});

const startServer = async () => {
  try {
    await connectDB();
    await seedMasterDataIfNeeded();

    // Safe SMTP pre-flight verification
    try {
      const smtpStatus = await verifySmtpConnection();
      if (smtpStatus.verified) {
        console.log(
          `[EMAIL] SMTP connection verified successfully (host: ${
            process.env.EMAIL_HOST || "smtp.gmail.com"
          }:${process.env.EMAIL_PORT || 587})`
        );
      } else if (process.env.OTP_DEV_MODE === "true") {
        console.log(
          `[EMAIL] OTP development mode active (OTP_DEV_MODE=true). SMTP status: ${smtpStatus.message}`
        );
      } else {
        console.warn(
          `[EMAIL WARNING] SMTP verification failed: ${smtpStatus.message}`
        );
      }
    } catch (smtpErr) {
      console.warn(
        `[EMAIL WARNING] SMTP preflight check error: ${smtpErr.message}`
      );
    }

    app.listen(PORT, "0.0.0.0", () => {
      console.log(`NEXORA API running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Server startup failed:", error.message);
    process.exit(1);
  }
};

startServer();