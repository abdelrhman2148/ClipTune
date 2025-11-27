/**
 * Email Automation Utilities
 * Centralized functions for triggering automated emails
 */

interface SendWelcomeEmailParams {
    userId?: string;
    email: string;
    name?: string;
}

interface SendUpgradeEmailParams {
    userId?: string;
    email?: string;
    creditsUsed?: number;
    creditsTotal?: number;
    discountCode?: string;
}

interface SendReEngagementEmailParams {
    userId?: string;
    email?: string;
    daysInactive: number;
    discountCode?: string;
}

/**
 * Send welcome email to new user
 * Can be called from server-side code directly
 */
export async function sendWelcomeEmail({ userId, email, name }: SendWelcomeEmailParams) {
    try {
        // Import email functions directly (server-side)
        const { sendEmail, emailTemplates } = await import('./email');
        
        const template = emailTemplates.welcome(name || email.split('@')[0] || 'there');
        const result = await sendEmail({
            to: email,
            subject: template.subject,
            html: template.html,
        });

        return result;
    } catch (error) {
        console.error('Error sending welcome email:', error);
        return { success: false, error };
    }
}

/**
 * Send upgrade prompt email
 * Can be called from server-side code directly
 */
export async function sendUpgradeEmail({ userId, email, creditsUsed, creditsTotal, discountCode }: SendUpgradeEmailParams) {
    try {
        // Import email functions directly (server-side)
        const { sendEmail, emailTemplates } = await import('./email');
        
        let userEmail = email;
        if (!userEmail && userId) {
            // Try to get email from userId
            const { supabase } = await import('./supabase');
            const { data: user } = await supabase
                .from('users')
                .select('email')
                .eq('id', userId)
                .single();
            
            if (!user?.email) {
                return { success: false, error: 'Email not found' };
            }
            userEmail = user.email;
        }

        if (!userEmail) {
            return { success: false, error: 'Email is required' };
        }

        const template = emailTemplates.upgradePrompt(
            userEmail.split('@')[0] || 'there',
            creditsUsed || 2,
            creditsTotal || 3,
            discountCode
        );

        const result = await sendEmail({
            to: userEmail,
            subject: template.subject,
            html: template.html,
        });

        return result;
    } catch (error) {
        console.error('Error sending upgrade email:', error);
        return { success: false, error };
    }
}

/**
 * Send re-engagement email to inactive user
 * Can be called from server-side code directly
 */
export async function sendReEngagementEmail({ userId, email, daysInactive, discountCode }: SendReEngagementEmailParams) {
    try {
        // Import email functions directly (server-side)
        const { sendEmail, emailTemplates } = await import('./email');
        
        let userEmail = email;
        if (!userEmail && userId) {
            // Try to get email from userId
            const { supabase } = await import('./supabase');
            const { data: user } = await supabase
                .from('users')
                .select('email')
                .eq('id', userId)
                .single();
            
            if (!user?.email) {
                return { success: false, error: 'Email not found' };
            }
            userEmail = user.email;
        }

        if (!userEmail) {
            return { success: false, error: 'Email is required' };
        }

        const template = emailTemplates.reEngagement(
            userEmail.split('@')[0] || 'there',
            daysInactive || 7,
            discountCode
        );

        const result = await sendEmail({
            to: userEmail,
            subject: template.subject,
            html: template.html,
        });

        return result;
    } catch (error) {
        console.error('Error sending re-engagement email:', error);
        return { success: false, error };
    }
}

