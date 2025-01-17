const express = require('express');
const promClient = require('./promClient');
const router = express.Router();

router.get('/', (req, res) => {
    // Start measuring the duration for this request
    const histogramEnd = promClient.requestDurationHistogram.startTimer();
    const summaryEnd = promClient.requestDurationSummary.startTimer();

    // Increment the GET request counter
    promClient.requestCounter.inc();

    // Increment active requests gauge
    promClient.requestsActive.inc();

    // Simulate some processing and random response times
    setTimeout(() => {
        res.send('Hello, World!');
        histogramEnd();
        summaryEnd();
        promClient.requestsActive.dec();
    }, Math.random() * 1000);
});

// Define the /metrics route where Prometheus will scrape the metrics
router.get('/metrics', async (req, res) => {
    res.set('Content-Type', promClient.register.contentType);
    res.end(await promClient.register.metrics());
});

module.exports = router;