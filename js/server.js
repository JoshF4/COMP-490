const express = require('express');
const multer = require('multer');
const nodemailer = require('nodemailer');
const path = require('path');

const app = express();

// Multer setup for file upload
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function(req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

// Serve static files
app.use(express.static('public'));

// Route for handling form submission
app.post('/apply', upload.single('resume'), async (req, res) => {
    const { name, email, phone, 'cover-letter': coverLetter } = req.body;
    const resume = req.file;

    // Nodemailer setup
    let transporter = nodemailer.createTransport({
        // SMTP settings
        service: 'gmail',
        auth: {
            user: 'your.email@gmail.com',
            pass: 'yourpassword'
        }
    });

    let mailOptions = {
        from: 'your.email@gmail.com',
        to: 'recipient@example.com',
        subject: 'New Job Application',
        text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\nCover Letter: ${coverLetter}`,
        attachments: [
            {
                path: resume.path
            }
        ]
    };

    try {
        await transporter.sendMail(mailOptions);
        res.send('Application submitted successfully');
    } catch (error) {
        console.error('Error sending email', error);
        res.status(500).send('Error submitting application');
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
