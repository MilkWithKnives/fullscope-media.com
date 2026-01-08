# Full Scope Media Backend Setup Guide

## 🚀 Quick Setup (5 minutes)

### 1. Create Supabase Project
1. Go to [supabase.com](https://supabase.com) and create a free account
2. Create a new project
3. Go to Settings → API to get your keys
4. Copy the SQL schema from `supabase-schema.sql` and run it in the SQL Editor

### 2. Set Up Environment Variables
1. Copy `.env.example` to `.env`
2. Fill in your Supabase credentials:
```bash
PUBLIC_SUPABASE_URL=https://your-project.supabase.co
PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

### 3. Configure Email Service (Choose One)

#### Option A: Resend (Recommended - Easy Setup)
1. Sign up at [resend.com](https://resend.com) (free tier: 3,000 emails/month)
2. Get your API key
3. Add to `.env`:
```bash
RESEND_API_KEY=re_your_api_key
BUSINESS_EMAIL=your_email@fullscopemedia.com
```

#### Option B: Gmail SMTP (Free)
1. Enable 2-factor authentication on your Gmail
2. Generate an App Password
3. Add to `.env`:
```bash
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_password
BUSINESS_EMAIL=your_email@gmail.com
```

### 4. Configure iCal Settings
Add to `.env`:
```bash
ICAL_DOMAIN=fullscopemedia.com
ICAL_ORGANIZER_EMAIL=your_email@fullscopemedia.com
ICAL_ORGANIZER_NAME="Full Scope Media"
BUSINESS_PHONE="+1-517-220-2934"
BUSINESS_ADDRESS="Your Business Address"
```

### 5. Test the Setup
```bash
pnpm dev
```

Visit your booking page and submit a test booking. You should:
- ✅ See the booking in your Supabase database
- ✅ Receive confirmation email with iCal attachment
- ✅ iCal file imports to your calendar app
- ✅ Fantastical syncs automatically
- ✅ Apple Watch shows notification

## 📱 iCal → Fantastical → Apple Watch Flow

### How It Works:
1. **Client books** → Website creates booking in database
2. **Email sent** → Client and you receive emails with `.ics` attachment
3. **iCal import** → Double-click `.ics` file to add to your calendar
4. **Fantastical sync** → Automatically syncs with your calendar
5. **Apple Watch** → Shows notifications and reminders

### Pro Tips:
- Set up Fantastical to sync with your main calendar app
- Enable notifications on your Apple Watch
- The iCal files include all booking details
- Each booking has a unique ID to prevent duplicates

## 🛠️ Your Services Configuration

The system is pre-configured with your services:
- Real Estate Photography (2 hours, $250)
- Drone/Aerial Photography (1.5 hours, $200)
- Matterport 3D Tour (3 hours, $350)
- Zillow 3D Tour (2.5 hours, $300)
- Cubicasa Floor Plans (1 hour, $150)
- Virtual Staging (30 min, $100)
- AI Video Tour (1.5 hours, $400)
- Cinematic Video (4 hours, $800)
- Full Package (6 hours, $1200)

## 🚀 Deployment Options

### Option 1: Vercel (Recommended - 5 minutes)
1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com) and import your repo
3. Add all environment variables from your `.env` file
4. Deploy automatically
5. Your site will be live at `https://your-project.vercel.app`

### Option 2: Netlify (Alternative)
1. Push code to GitHub
2. Connect repo to Netlify
3. Add environment variables in Netlify dashboard
4. Deploy

### Option 3: Railway/Fly.io (Advanced)
1. More control but requires Docker knowledge
2. Good for custom domains and advanced features

## 🎯 Complete Setup Checklist

- [ ] Create Supabase project and run SQL schema
- [ ] Set up environment variables in `.env`
- [ ] Configure email service (Resend or Gmail)
- [ ] Test booking flow locally
- [ ] Deploy to Vercel/Netlify
- [ ] Test production booking flow
- [ ] Set up custom domain (optional)
- [ ] Configure DNS for email (if using custom domain)

## 📱 Admin Dashboard

Visit `/admin` on your deployed site to:
- View all bookings and their status
- See contact form submissions
- Monitor your business activity
- Export data if needed

**Example:** `https://your-site.vercel.app/admin`

## 📊 Admin Dashboard (Optional)

Want to manage bookings? I can create an admin dashboard where you can:
- View all bookings
- Update booking status
- Send custom emails
- Export calendar data
- Manage services and pricing

## 🔧 Troubleshooting

### Email Not Sending?
- Check your API keys in `.env`
- Verify email service credentials
- Check server logs for errors

### iCal Not Working?
- Ensure timezone is correct in `ical.ts`
- Check that email attachments are enabled
- Verify iCal file format

### Database Issues?
- Check Supabase connection
- Verify SQL schema was run correctly
- Check Row Level Security policies

## 🎯 Next Steps

1. **Set up Supabase** (5 minutes)
2. **Configure email service** (5 minutes)
3. **Test booking flow** (2 minutes)
4. **Deploy to production** (10 minutes)

**Total setup time: ~20 minutes for a fully functional booking system!**

Need help? The system is designed to be foolproof, but I'm here if you need assistance!
