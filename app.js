const fs = require('fs');
const gemini = require('gemini-server');
const proc = require('process');

const Weather = require('./weather');

const options = {
	cert: fs.readFileSync('cert.pem'),
	key: fs.readFileSync('key.pem')
};

const app = gemini(options);

app.on('/weather/:location', async (req, res) => {
    const location = req.params.location;
    console.log('Received request for', location);
    
    const weather = await new Weather(location).forecast();
    res.data(weather, mimeType='text/gemini');
});

app.listen(() => {
	console.log("Listening...");
});

proc.on('SIGINT', () => {
	console.info("Interrupted");
	process.exit(0);
});
