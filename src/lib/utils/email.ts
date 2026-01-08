import { Resend } from 'resend';
import nodemailer from 'nodemailer';
import { 
	RESEND_API_KEY, 
	SMTP_HOST, 
	SMTP_PORT, 
	SMTP_USER, 
	SMTP_PASS,
	BUSINESS_EMAIL,
	BUSINESS_PHONE 
} from '$env/static/private';

// Initialize email service
let emailService: 'resend' | 'smtp' | null = null;
let resend: Resend | null = null;
let transporter: nodemailer.Transporter | null = null;

if (RESEND_API_KEY) {
	emailService = 'resend';
	resend = new Resend(RESEND_API_KEY);
} else if (SMTP_HOST && SMTP_USER && SMTP_PASS) {
	emailService = 'smtp';
	transporter = nodemailer.createTransport({
		host: SMTP_HOST,
		port: parseInt(SMTP_PORT || '587'),
		secure: false,
		auth: {
			user: SMTP_USER,
			pass: SMTP_PASS
		}
	});
}

export interface EmailData {
	to: string;
	subject: string;
	html: string;
	attachments?: Array<{
		filename: string;
		content: Buffer;
		contentType: string;
	}>;
}

export async function sendEmail(emailData: EmailData): Promise<boolean> {
	try {
		if (emailService === 'resend' && resend) {
			await resend.emails.send({
				from: BUSINESS_EMAIL || 'contact@fullscopemedia.com',
				to: emailData.to,
				subject: emailData.subject,
				html: emailData.html,
				attachments: emailData.attachments
			});
			return true;
		} else if (emailService === 'smtp' && transporter) {
			await transporter.sendMail({
				from: BUSINESS_EMAIL || 'contact@fullscopemedia.com',
				to: emailData.to,
				subject: emailData.subject,
				html: emailData.html,
				attachments: emailData.attachments
			});
			return true;
		} else {
			console.error('No email service configured');
			return false;
		}
	} catch (error) {
		console.error('Email sending failed:', error);
		return false;
	}
}

export function generateBookingConfirmationEmail(booking: {
	client_name: string;
	service_type: string;
	appointment_date: string;
	appointment_time: string;
	property_address?: string;
}): string {
	const formattedDate = new Date(`${booking.appointment_date}T${booking.appointment_time}`).toLocaleDateString('en-US', {
		weekday: 'long',
		year: 'numeric',
		month: 'long',
		day: 'numeric'
	});
	
	const formattedTime = new Date(`${booking.appointment_date}T${booking.appointment_time}`).toLocaleTimeString('en-US', {
		hour: 'numeric',
		minute: '2-digit',
		hour12: true
	});

	return `
		<!DOCTYPE html>
		<html>
		<head>
			<meta charset="utf-8">
			<title>Booking Confirmation - Full Scope Media</title>
		</head>
		<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
			<div style="max-width: 600px; margin: 0 auto; padding: 20px;">
				<div style="text-align: center; margin-bottom: 30px;">
					<h1 style="color: #2563eb;">Full Scope Media</h1>
					<h2 style="color: #4b5563;">Booking Confirmation</h2>
				</div>
				
				<p>Dear ${booking.client_name},</p>
				
				<p>Thank you for booking with Full Scope Media! Your appointment has been confirmed.</p>
				
				<div style="background: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
					<h3 style="margin-top: 0; color: #2563eb;">Appointment Details</h3>
					<p><strong>Service:</strong> ${booking.service_type}</p>
					<p><strong>Date:</strong> ${formattedDate}</p>
					<p><strong>Time:</strong> ${formattedTime}</p>
					${booking.property_address ? `<p><strong>Location:</strong> ${booking.property_address}</p>` : ''}
				</div>
				
				<div style="background: #fef3c7; padding: 15px; border-radius: 8px; margin: 20px 0;">
					<h4 style="margin-top: 0; color: #92400e;">Important Notes:</h4>
					<ul style="margin: 0;">
						<li>Please ensure the property is clean and well-lit</li>
						<li>Remove personal items and clutter</li>
						<li>Turn on all lights before our arrival</li>
						<li>Ensure we have access to all areas to be photographed</li>
					</ul>
				</div>
				
				<p>If you need to reschedule or have any questions, please contact us:</p>
				<p>
					📧 Email: ${BUSINESS_EMAIL || 'contact@fullscopemedia.com'}<br>
					📞 Phone: ${BUSINESS_PHONE || '(555) 123-4567'}
				</p>
				
				<p>We look forward to working with you!</p>
				
				<div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
					<p style="color: #6b7280; font-size: 14px;">
						Full Scope Media - Professional Real Estate Media Services
					</p>
				</div>
			</div>
		</body>
		</html>
	`;
}
