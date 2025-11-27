import { Resend } from 'resend';

let resendClient: Resend | null = null;

function getResendClient(): Resend {
    if (!resendClient) {
        const apiKey = process.env.RESEND_API_KEY;
        if (!apiKey) {
            throw new Error('RESEND_API_KEY environment variable is required');
        }
        resendClient = new Resend(apiKey);
    }
    return resendClient;
}

export interface EmailOptions {
    to: string;
    subject: string;
    html: string;
    from?: string;
}

export async function sendEmail({ to, subject, html, from = 'ClipTune <hello@cliptune.com>' }: EmailOptions) {
    if (!process.env.RESEND_API_KEY) {
        console.warn('RESEND_API_KEY not set, email not sent:', { to, subject });
        return { success: false, error: 'Email service not configured' };
    }

    try {
        const resend = getResendClient();
        const { data, error } = await resend.emails.send({
            from,
            to,
            subject,
            html,
        });

        if (error) {
            console.error('Resend error:', error);
            return { success: false, error };
        }

        return { success: true, data };
    } catch (error: any) {
        console.error('Email send error:', error);
        return { success: false, error: error.message };
    }
}

// Email Templates
export const emailTemplates = {
    welcome: (name: string) => ({
        subject: 'Welcome to ClipTune! 🎬',
        html: `
            <!DOCTYPE html>
            <html>
            <head>
                <meta charset="utf-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
            </head>
            <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
                <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
                    <h1 style="color: white; margin: 0; font-size: 28px;">Welcome to ClipTune! 🎬</h1>
                </div>
                <div style="background: #f9fafb; padding: 30px; border-radius: 0 0 10px 10px;">
                    <p style="font-size: 16px; margin-bottom: 20px;">Hi ${name || 'there'},</p>
                    <p style="font-size: 16px; margin-bottom: 20px;">Welcome to ClipTune! We're excited to have you join thousands of creators who are saving hours every week with AI-powered video editing.</p>
                    <p style="font-size: 16px; margin-bottom: 20px;">Here's what you can do right now:</p>
                    <ul style="font-size: 16px; margin-bottom: 20px; padding-left: 20px;">
                        <li>✅ Upload your first video (up to 10 minutes)</li>
                        <li>✅ Get AI-powered clip suggestions</li>
                        <li>✅ Export in multiple formats (TikTok, Instagram, YouTube)</li>
                    </ul>
                    <div style="text-align: center; margin: 30px 0;">
                        <a href="${process.env.NEXT_PUBLIC_URL || 'https://cliptune.com'}/editor" style="display: inline-block; background: #667eea; color: white; padding: 14px 28px; text-decoration: none; border-radius: 6px; font-weight: bold; font-size: 16px;">Get Started →</a>
                    </div>
                    <p style="font-size: 14px; color: #6b7280; margin-top: 30px;">Need help? Just reply to this email - we're here for you!</p>
                    <p style="font-size: 14px; color: #6b7280; margin-top: 10px;">Best,<br>The ClipTune Team</p>
                </div>
            </body>
            </html>
        `,
    }),

    upgradePrompt: (name: string, creditsUsed: number, creditsTotal: number, discountCode?: string) => ({
        subject: creditsUsed >= creditsTotal 
            ? '🎬 Unlock unlimited creativity' 
            : '⚠️ You\'re running low on free credits',
        html: `
            <!DOCTYPE html>
            <html>
            <head>
                <meta charset="utf-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
            </head>
            <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
                <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
                    <h1 style="color: white; margin: 0; font-size: 28px;">${creditsUsed >= creditsTotal ? 'Unlock Unlimited Creativity' : 'Running Low on Credits'}</h1>
                </div>
                <div style="background: #f9fafb; padding: 30px; border-radius: 0 0 10px 10px;">
                    <p style="font-size: 16px; margin-bottom: 20px;">Hi ${name || 'there'},</p>
                    ${creditsUsed >= creditsTotal 
                        ? `<p style="font-size: 16px; margin-bottom: 20px;">You've used all ${creditsTotal} free clips this month. Great work!</p>`
                        : `<p style="font-size: 16px; margin-bottom: 20px;">You've used ${creditsUsed} of your ${creditsTotal} free clips this month.</p>`
                    }
                    <p style="font-size: 16px; margin-bottom: 20px;"><strong>Ready for more?</strong> Upgrade to Pro and never worry about limits again:</p>
                    <div style="background: white; border: 2px solid #667eea; border-radius: 8px; padding: 20px; margin: 20px 0;">
                        <h2 style="margin-top: 0; color: #667eea;">🎯 Pro Plan - $29/month</h2>
                        <ul style="margin: 15px 0; padding-left: 20px;">
                            <li>50 clips/month (vs. ${creditsTotal} free)</li>
                            <li>No watermarks</li>
                            <li>Priority processing</li>
                            <li>Advanced AI features</li>
                        </ul>
                        ${discountCode ? `<p style="background: #fef3c7; padding: 10px; border-radius: 6px; margin: 15px 0;"><strong>Special Offer:</strong> Get 20% off your first month with code <strong>${discountCode}</strong></p>` : ''}
                    </div>
                    <div style="text-align: center; margin: 30px 0;">
                        <a href="${process.env.NEXT_PUBLIC_URL || 'https://cliptune.com'}/pricing?plan=pro${discountCode ? `&code=${discountCode}` : ''}" style="display: inline-block; background: #667eea; color: white; padding: 14px 28px; text-decoration: none; border-radius: 6px; font-weight: bold; font-size: 16px;">Upgrade Now →</a>
                    </div>
                    <p style="font-size: 14px; color: #6b7280; margin-top: 30px;">This offer expires in 48 hours.</p>
                    <p style="font-size: 14px; color: #6b7280; margin-top: 10px;">Questions? Just reply!</p>
                    <p style="font-size: 14px; color: #6b7280; margin-top: 10px;">Best,<br>The ClipTune Team</p>
                </div>
            </body>
            </html>
        `,
    }),

    reEngagement: (name: string, daysInactive: number, discountCode?: string) => ({
        subject: 'We haven\'t seen you in a while 👋',
        html: `
            <!DOCTYPE html>
            <html>
            <head>
                <meta charset="utf-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
            </head>
            <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
                <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
                    <h1 style="color: white; margin: 0; font-size: 28px;">We Miss You! 👋</h1>
                </div>
                <div style="background: #f9fafb; padding: 30px; border-radius: 0 0 10px 10px;">
                    <p style="font-size: 16px; margin-bottom: 20px;">Hi ${name || 'there'},</p>
                    <p style="font-size: 16px; margin-bottom: 20px;">We noticed you haven't created a clip in ${daysInactive} days. Everything okay?</p>
                    <p style="font-size: 16px; margin-bottom: 20px;"><strong>New features you might have missed:</strong></p>
                    <ul style="font-size: 16px; margin-bottom: 20px; padding-left: 20px;">
                        <li>✨ Batch export (create multiple clips at once)</li>
                        <li>✨ Custom caption styles</li>
                        <li>✨ Improved AI suggestions</li>
                        <li>✨ Faster processing</li>
                    </ul>
                    ${discountCode ? `<p style="background: #fef3c7; padding: 15px; border-radius: 6px; margin: 20px 0;"><strong>Special Offer:</strong> Get 30% off Pro Plan for 3 months with code <strong>${discountCode}</strong></p>` : ''}
                    <div style="text-align: center; margin: 30px 0;">
                        <a href="${process.env.NEXT_PUBLIC_URL || 'https://cliptune.com'}/editor" style="display: inline-block; background: #667eea; color: white; padding: 14px 28px; text-decoration: none; border-radius: 6px; font-weight: bold; font-size: 16px;">Try It Now →</a>
                    </div>
                    <p style="font-size: 14px; color: #6b7280; margin-top: 30px;">If you're having any issues, just reply - we're here to help!</p>
                    <p style="font-size: 14px; color: #6b7280; margin-top: 10px;">Hope to see you back soon,<br>The ClipTune Team</p>
                </div>
            </body>
            </html>
        `,
    }),
};

