const express = require("express");
const client = require('prom-client');

const app = express();
app.use(express.json());

// Create a counter metric to track the number of GET requests
const getRequestsCounter = new client.Counter({
    name: 'nodejs_get_requests_total',
    help: 'Total number of GET requests to /get',
});
  
// Create a histogram metric to track request durations for /get
const getRequestDurationHistogram = new client.Histogram({
    name: 'nodejs_get_request_duration_seconds_histogram',
    help: 'Histogram of GET request durations for /get',
    buckets: [0.1, 0.3, 0.5, 1, 2, 5],
});

// Create a summary metric to track request durations for /get
const getRequestDurationSummary = new client.Summary({
    name: 'nodejs_get_request_duration_seconds_summary',
    help: 'Summary of GET request durations for /get',
    percentiles: [0.2, 0.4, 0.6, 0.8, 1, 2],
});


app.get('/', (req, res) => {
    // Start measuring the duration for this request
    const histogramEnd = getRequestDurationHistogram.startTimer();
    const summaryEnd = getRequestDurationSummary.startTimer();

    // Increment the GET request counter
    getRequestsCounter.inc();

    // Simulate some processing and random response times
    setTimeout(() => {
        res.send('Hello, World!');
        histogramEnd();
        summaryEnd();
    }, Math.random() * 1000);
});

// Define the /metrics route where Prometheus will scrape the metrics
app.get('/metrics', async (req, res) => {
    res.set('Content-Type', client.register.contentType);
    res.end(await client.register.metrics());
});

const PORT = 3000;
app.listen(PORT, (err) => {
    if(err) {
        console.error(err);
        return process.exit(1);
    }

    console.log(`Server is listening in port ${PORT}`);
});