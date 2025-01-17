const express = require('express');
const promClient = require('./promClient');
const router = express.Router();

const sendMetrics = async () => {
    // Start measuring the duration for this request
    const histogramEnd = promClient.requestDurationHistogram.startTimer();
    const summaryEnd = promClient.requestDurationSummary.startTimer();

    // Increment the GET request counter
    const randomStatusCode = Math.random() > 0.7 ? 200 : 500;
    promClient.requestCounter.labels(randomStatusCode.toString()).inc();

    // Increment active requests gauge
    promClient.requestsActive.inc();

    // Simulate some processing and random response times
    setTimeout(() => {
        histogramEnd();
        summaryEnd();
        promClient.requestsActive.dec();
    }, Math.random() * 1000);
}

// Timer to simulate user requests
setInterval(async () => {
    await sendMetrics();
}, 1000);

// GET request
router.get('/', async (req, res) => {
    await sendMetrics();
    res.send('Hello, World!');
});

// Define the /metrics route where Prometheus will scrape the metrics
router.get('/metrics', async (req, res) => {
    res.set('Content-Type', promClient.register.contentType);
    res.end(await promClient.register.metrics());
});

module.exports = router;