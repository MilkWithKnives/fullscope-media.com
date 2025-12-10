import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { supabase } from '$lib/supabase';
import { sendEmail } from '$lib/utils/email';
import { BUSINESS_EMAIL } from '$env/static/private';

export const POST: RequestHandler = async ({ request }) => {
	try {
		const contactData = await request.json();
		
		// Validate required fields
		const requiredFields = ['name', 'email', 'service', 'message'];
		for (const field of requiredFields) {
			if (!contactData[field]) {
				return json({ error: `Missing required field: ${field}` }, { status: 400 });
			}
		}

		// Validate email format
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (!emailRegex.test(contactData.email)) {
			return json({ error: 'Invalid email format' }, { status: 400 });
		}

		// Insert contact submission into database
		const { data: submission, error: dbError } = await supabase
			.from('contact_submissions')
			.insert({
				name: contactData.name,
				email: contactData.email,
				company: contactData.company,
				service: contactData.service,
				budget: contactData.budget,
				message: contactData.message,
				timeline: contactData.timeline,
				status: 'new'
			})
			.select()
			.single();

		if (dbError) {
			console.error('Database error:', dbError);
			return json({ error: 'Failed to submit contact form' }, { status: 500 });
		}

		// Send notification email to business owner
		const ownerEmailHtml = `
			<!DOCTYPE html>
			<html>
			<head>
				<meta charset="utf-8">
				<title>New Contact Form Submission</title>
			</head>
			<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
				<div style="max-width: 600px; margin: 0 auto; padding: 20px;">
					<h1 style="color: #2563eb;">New Contact Form Submission</h1>
					
					<div style="background: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
						<h3 style="margin-top: 0; color: #2563eb;">Contact Details</h3>
						<p><strong>Name:</strong> ${submission.name}</p>
						<p><strong>Email:</strong> ${submission.email}</p>
						${submission.company ? `<p><strong>Company:</strong> ${submission.company}</p>` : ''}
						<p><strong>Service Interest:</strong> ${submission.service}</p>
						${submission.budget ? `<p><strong>Budget:</strong> ${submission.budget}</p>` : ''}
						${submission.timeline ? `<p><strong>Timeline:</strong> ${submission.timeline}</p>` : ''}
					</div>
					
					<div style="background: #fef3c7; padding: 20px; border-radius: 8px; margin: 20px 0;">
						<h3 style="margin-top: 0; color: #92400e;">Message</h3>
						<p style="white-space: pre-wrap;">${submission.message}</p>
					</div>
					
					<p style="color: #6b7280; font-size: 14px;">
						Submitted on: ${new Date(submission.created_at).toLocaleString()}
					</p>
				</div>
			</body>
			</html>
		`;

		// Send auto-reply to client
		const clientEmailHtml = `
			<!DOCTYPE html>
			<html>
			<head>
				<meta charset="utf-8">
				<title>Thank You - Full Scope Media</title>
			</head>
			<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
				<div style="max-width: 600px; margin: 0 auto; padding: 20px;">
					<div style="text-align: center; margin-bottom: 30px;">
						<h1 style="color: #2563eb;">Full Scope Media</h1>
						<h2 style="color: #4b5563;">Thank You for Your Inquiry</h2>
					</div>
					
					<p>Dear ${submission.name},</p>
					
					<p>Thank you for contacting Full Scope Media! We've received your inquiry about <strong>${submission.service}</strong> and will get back to you within 24 hours.</p>
					
					<div style="background: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
						<h3 style="margin-top: 0; color: #2563eb;">What's Next?</h3>
						<ul>
							<li>We'll review your project requirements</li>
							<li>Prepare a customized quote for your needs</li>
							<li>Schedule a consultation call if needed</li>
							<li>Send you a detailed proposal</li>
						</ul>
					</div>
					
					<p>In the meantime, feel free to check out our portfolio and recent work on our website.</p>
					
					<p>If you have any urgent questions, please don't hesitate to call us directly.</p>
					
					<div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
						<p style="color: #6b7280; font-size: 14px;">
							Full Scope Media - Professional Real Estate Media Services
						</p>
					</div>
				</div>
			</body>
			</html>
		`;

		// Send emails
		const ownerEmailSent = await sendEmail({
			to: BUSINESS_EMAIL || 'contact@fullscopemedia.com',
			subject: `New Contact: ${submission.service} - ${submission.name}`,
			html: ownerEmailHtml
		});

		const clientEmailSent = await sendEmail({
			to: submission.email,
			subject: 'Thank you for contacting Full Scope Media',
			html: clientEmailHtml
		});

		return json({
			success: true,
			message: 'Contact form submitted successfully',
			emails_sent: {
				owner: ownerEmailSent,
				client: clientEmailSent
			}
		});

	} catch (error) {
		console.error('Contact API error:', error);
		return json({ error: 'Internal server error' }, { status: 500 });
	}
};
