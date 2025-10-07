# Freelance Portfolio Website with Contact Form

A modern, responsive portfolio website with a contact form that sends emails using NodeMailer.

## Features

- **Modern Portfolio Design**: Clean, professional layout with smooth animations
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- **Contact Form**: Validates input and sends emails to your inbox
- **Email Integration**: Uses NodeMailer with Gmail SMTP
- **Form Validation**: Client-side and server-side validation
- **Success/Error Messages**: User feedback for form submissions
- **Smooth Scrolling**: Enhanced navigation experience
- **Mobile Navigation**: Hamburger menu for mobile devices

## Setup Instructions

### 1. Install Dependencies
```bash
npm install
```

### 2. Email Configuration

#### For Gmail:
1. Enable 2-factor authentication on your Gmail account
2. Generate an App Password:
   - Go to Google Account settings
   - Security → 2-Step Verification → App passwords
   - Generate a password for "Mail"
3. Create a `.env` file in the project root:
```env
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-16-character-app-password
PORT=3000
```

#### For Other Email Providers:
Update the transporter configuration in `server.js`:
```javascript
const transporter = nodemailer.createTransporter({
  service: 'outlook', // or 'yahoo', 'hotmail', etc.
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});
```

### 3. Run the Application
```bash
npm start
```

The server will start on `http://localhost:3000`

## Project Structure

```
practical16/
├── server.js              # Express server with NodeMailer
├── public/
│   ├── index.html         # Main portfolio page
│   ├── style.css          # Modern CSS styling
│   └── script.js          # Frontend JavaScript
├── package.json           # Dependencies and scripts
├── env.example           # Environment variables template
└── README.md             # This file
```

## Customization

### Personal Information
Update the following in `public/index.html`:
- Name: Replace "John Doe" with your name
- Contact details: Update email, phone, and location
- Skills: Modify the skill tags in the About section
- Portfolio: Update projects with your work
- Services: Customize the services you offer

### Styling
- Colors: Update CSS custom properties in `style.css`
- Fonts: Change font families in the CSS
- Layout: Modify grid layouts and spacing

### Email Template
Customize the email template in `server.js`:
```javascript
const mailOptions = {
  // ... existing code
  html: `
    <h2>New Contact Form Submission</h2>
    <p><strong>Name:</strong> ${name}</p>
    <p><strong>Email:</strong> ${email}</p>
    <p><strong>Subject:</strong> ${subject}</p>
    <p><strong>Message:</strong></p>
    <p>${message.replace(/\n/g, '<br>')}</p>
  `
};
```

## Form Validation

The contact form includes:
- **Required field validation**: All fields must be filled
- **Email format validation**: Proper email format required
- **Client-side validation**: Real-time feedback
- **Server-side validation**: Security and reliability
- **Success/Error messages**: Clear user feedback

## Security Features

- Input sanitization
- Email format validation
- CORS protection
- Error handling for failed email sends

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers

## Deployment

### Heroku
1. Create a Heroku app
2. Set environment variables in Heroku dashboard
3. Deploy using Git

### Vercel/Netlify
1. Deploy the frontend to Vercel/Netlify
2. Deploy the backend to Railway/Render
3. Update API endpoints in the frontend

## Troubleshooting

### Email Not Sending
1. Check your email credentials in `.env`
2. Ensure 2FA is enabled and app password is correct
3. Check server logs for error messages
4. Verify SMTP settings for your email provider

### Form Validation Issues
1. Check browser console for JavaScript errors
2. Ensure all required fields are filled
3. Verify email format is correct

## License

This project is open source and available under the [MIT License](LICENSE).
