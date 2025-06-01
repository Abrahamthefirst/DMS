export default function (username: string, link: string, expiration: string) {
  const content = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Arravo Account Verification</title>
          <style>
              body {
                  font-family: Arial, sans-serif;
                  background-color: #f5f5f5;
                  margin: 0;
                  padding: 0;
              }
              .container {
                  max-width: 600px;
                  margin: 0 auto;
                  padding: 20px;
                  background-color: #fff;
                  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
                  border-radius: 8px;
                  text-align: center;
              }
              h1 {
                  color: #333;
              }
              p {
                  color: #777;
              }
              .verification-code {
                  font-size: 24px;
                  font-weight: bold;
                  color: #007BFF;
              }
              .expiry-info {
                  font-size: 16px;
                  color: #777;
              }
          </style>
      </head>
      <body>
          <div class="container">
              <h1>Welcome to my DMS, ${username}!</h1>
              <p>To ensure the security of your account, we kindly ask you to verify your email address by using the following verification code:</p>
              <p class="verification-code">Verification link </p>
              <a href=${link} style="color: #1a73e8; text-decoration: none;">${link}</a>
              <p>This code is valid for the next ${expiration} minutes.</p>
              <p>If you did not request this verification, please disregard this email.</p>
              <p>Thank you for using Arravo's Reminder App!</p>
          </div>
      </body>
      </html>
      
      `;

  return content;
}
