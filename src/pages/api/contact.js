import { Resend } from 'resend';

export const prerender = false;

// Create API endpoint
export async function POST({ request }) {
  try {
    const resend = new Resend(import.meta.env.RESEND_API_KEY);

    if (!import.meta.env.RESEND_API_KEY) {
      throw new Error('Missing Resend API key');
    }

    const formData = await request.formData();
    const name = formData.get('name');
    const email = formData.get('email');
    const message = formData.get('message');
    const file = formData.get('file');
    const phone = formData.get('phone');

    const fileArrayBuffer = await file.arrayBuffer();
    const fileContent = Buffer.from(fileArrayBuffer).toString('base64');

    const data = await resend.emails.send({
      from: 'hey@tustinjobalert.com',
      to: ['will@tustinrecruiting.com', 'john@tustinrecruiting.com'],
      subject: `New Contact Form Submission from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}\nPhone: ${phone}`,
      attachments: [
        {
          filename: file.name,
          content: fileContent,
          contentType: file.type,
        },
      ],
    });

    return new Response(
      JSON.stringify({
        success: true,
        id: data.id
      }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({
        success: false,
        error: error.message,
      }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  }
}




