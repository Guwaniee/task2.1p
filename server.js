const express = require('express');
const bodyParser = require('body-parser');
const https = require('https');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get('/', (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

app.post('/', (req, res) => {
    const email = req.body.email;

    const data = {
        from: `DevLink <guwanisenadeera123@gmail.com>`,
        to: email,
        subject: 'Welcome to DevLink!',
        text: 'Thank you for subscribing to DevLink.'
    };
    const apiKey = '3a25f0465089122fa2688228b1f99a19';
    const domain = 'sandboxab8052893d534f2588a10bde65d03eaa.mailgun.org';
    const mailgunUrl = `https://api.mailgun.net/v3/${domain}/messages`;

    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': `Basic ${Buffer.from(`api:${apiKey}`).toString('base64')}`
        }
    };
    const request = https.request(mailgunUrl, options, (response) => {
        let responseData = '';

        response.on('data', (chunk) => {
            responseData += chunk;
        });
        response.on('end', () => {
            console.log(responseData);
            res.sendFile(__dirname + "/index.html");
        });

    });
    const formData = new URLSearchParams(data);
    request.write(formData.toString());
    request.end();
});

app.listen(8080, () => {
    console.log("Server is running at port 8080");
});