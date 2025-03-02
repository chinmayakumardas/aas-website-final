// import nodemailer from 'nodemailer';

// export async function POST(req) {
//   const { firstn, email, subject, phone, message } = await req.json();

//   // Set up transporter with your server's SMTP details
//   const transporter = nodemailer.createTransport({
//     host: "smtp.office365.com", // Replace with your actual SMTP host
//     port: 587, // Use 465 for SSL or 587 for TLS
//     secure: false, // true for 465, false for other ports
//     auth: {
//       user: "no-reply@aasint.com",
//       pass: "C)366248726001aj",
//     },
//     tls: {
//       rejectUnauthorized: false, // Allow self-signed certificates if needed
//     }
//   });

//   // Email options
//   const mailOptions = {
//     from: '"AAS Support" <no-reply@aasint.com>',
//     to: "daschinmaya260@gmail.com", // Replace with recipient's email
//     subject: `New Contact Form Received`,
//     html: `
//       <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
//         <p>Hello,</p>
//         <p>You have received a new message from your website's contact form. Here are the details:</p>
//         <table style="width: 100%; border-collapse: collapse;">
//           <tr>
//             <th style="text-align: left; padding: 8px; background: #f4f4f4;">Name</th>
//             <td style="padding: 8px;">${firstn}</td>
//           </tr>
//           <tr>
//             <th style="text-align: left; padding: 8px; background: #f9f9f9;">Email</th>
//             <td style="padding: 8px;">${email}</td>
//           </tr>
//           <tr>
//             <th style="text-align: left; padding: 8px; background: #f4f4f4;">Subject</th>
//             <td style="padding: 8px;">${subject}</td>
//           </tr>
//           <tr>
//             <th style="text-align: left; padding: 8px; background: #f9f9f9;">Phone</th>
//             <td style="padding: 8px;">${phone}</td>
//           </tr>
//           <tr>
//             <th style="text-align: left; padding: 8px; background: #f4f4f4;">Message</th>
//             <td style="padding: 8px;">${message}</td>
//           </tr>
//         </table>
//         <p style="margin-top: 20px;">With regards,<br>AAS Support Team</p>
//       </div>
//     `,
//   };

//   try {
//     await transporter.sendMail(mailOptions);
//     return new Response(JSON.stringify({ message: "Email sent successfully!" }), { status: 200 });
//   } catch (error) {
//     console.error("Error sending email:", error);
//     return new Response(JSON.stringify({ message: "Error sending email" }), { status: 500 });
//   }
// }






import nodemailer from 'nodemailer';

export async function POST(req) {
  try {
    const { firstName, lastName, email, contactType, message } = await req.json();

    // Set up transporter with your server's SMTP details
    const transporter = nodemailer.createTransport({
      host: "smtp.office365.com",
      port: 587,
      secure: false,
      auth: {
        user: "no-reply@aasint.com",
        pass: "C)366248726001aj",
      },
      tls: {
        ciphers: "TLSv1.2", // Required for Office 365
        rejectUnauthorized: false,
      }
    });

    // Email options
    const mailOptions = {
      from: '"AAS Support" <no-reply@aasint.com>',
      to: "daschinmaya260@gmail.com",
      subject: `New Contact Form Submission from ${firstName} ${lastName}`,
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
          <p>Hello,</p>
          <p>You have received a new message from your website's contact form. Here are the details:</p>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <th style="text-align: left; padding: 8px; background: #f4f4f4;">Name</th>
              <td style="padding: 8px;">${firstName} ${lastName}</td>
            </tr>
            <tr>
              <th style="text-align: left; padding: 8px; background: #f9f9f9;">Email</th>
              <td style="padding: 8px;">${email}</td>
            </tr>
            <tr>
              <th style="text-align: left; padding: 8px; background: #f4f4f4;">Contact Type</th>
              <td style="padding: 8px;">${contactType}</td>
            </tr>
            <tr>
              <th style="text-align: left; padding: 8px; background: #f4f4f4;">Message</th>
              <td style="padding: 8px;">${message}</td>
            </tr>
          </table>
          <p style="margin-top: 20px;">Best regards,<br>AAS Support Team</p>
        </div>
      `,
    };

    // Send email
    await transporter.sendMail(mailOptions);

    return new Response(JSON.stringify({ message: "Email sent successfully!" }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });

  } catch (error) {
    console.error("Error details:", error);
    return new Response(JSON.stringify({ 
      message: "Error sending email",
      error: error.message 
    }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}








// import nodemailer from 'nodemailer';
 
// export async function POST(req) {
//   const { firstn, email, subject, phone, message } = await req.json();
 
//   // Set up transporter with your email provider
//   const transporter = nodemailer.createTransport({
//     service: 'gmail', // Replace with your email provider if different
//     auth: {
//       user: 'arunmadhu.b@gmail.com',
//       pass: 'ayhz rpxe xdvo chln',
//     },
//   });
 
//   // Email options
//   const mailOptions = {
//     from: 'arunmadhu.b@gmail.com',
//     to: 'daschinmaya260@gmail.com', // Replace with the recipient's email
//     subject: `New Contact Form Received`,
//     html: `
//       <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
//         <p>Hello,</p>
//         <p>You have received a new message from your website's contact form. Here are the details:</p>
//         <table style="width: 100%; border-collapse: collapse;">
//           <tr>
//             <th style="text-align: left; padding: 8px; background: #f4f4f4;">Name</th>
//             <td style="padding: 8px;">${firstn}</td>
//           </tr>
//           <tr>
//             <th style="text-align: left; padding: 8px; background: #f9f9f9;">Email</th>
//             <td style="padding: 8px;">${email}</td>
//           </tr>
//           <tr>
//             <th style="text-align: left; padding: 8px; background: #f4f4f4;">Subject</th>
//             <td style="padding: 8px;">${subject}</td>
//           </tr>
//           <tr>
//             <th style="text-align: left; padding: 8px; background: #f9f9f9;">Phone</th>
//             <td style="padding: 8px;">${phone}</td>
//           </tr>
//           <tr>
//             <th style="text-align: left; padding: 8px; background: #f4f4f4;">Message</th>
//             <td style="padding: 8px;">${message}</td>
//           </tr>
//         </table>
//         <p style="margin-top: 20px;">With regards,<br>AAS Support Team</p>
//       </div>
//     `,
//   };
 
 
//   try {
//     await transporter.sendMail(mailOptions);
//     return new Response(JSON.stringify({ message: 'Email sent successfully!' }), { status: 200 });
//   } catch (error) {
//     console.error('Error sending email:', error);
//     return new Response(JSON.stringify({ message: 'Error sending email' }), { status: 500 });
//   }
// }