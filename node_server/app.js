const express = require("express");
const client = require('prom-client');

const app = express();
app.use(express.json());

/** METRICS **/
// Create a counter metric to track the number of GET requests
const getRequestsCounter = new client.Counter({
    name: 'requests_total',
    help: 'Total number of GET requests to /get',
});

// Create a gauge metric to simulate the number of active requetts
const activeRequests = new client.Gauge({
    name: 'requests_active',
    help: 'Number of active requests being processed by the server',
});
activeRequests.set(Math.floor(Math.random() * 100));
  
// Create a histogram metric to track request durations for /get
const getRequestDurationHistogram = new client.Histogram({
    name: 'request_duration_seconds_histogram',
    help: 'Histogram of GET request durations',
});

// Create a summary metric to track request durations for /get
const getRequestDurationSummary = new client.Summary({
    name: 'request_duration_seconds_summary',
    help: 'Summary of GET request durations',
});

/** ROUTES **/
app.get('/', (req, res) => {
    // Start measuring the duration for this request
    const histogramEnd = getRequestDurationHistogram.startTimer();
    const summaryEnd = getRequestDurationSummary.startTimer();

    // Increment the GET request counter
    getRequestsCounter.inc();

    activeRequests.inc();

    // Simulate some processing and random response times
    setTimeout(() => {
        res.send('Hello, World!');
        histogramEnd();
        summaryEnd();
        activeRequests.dec();
    }, Math.random() * 1000);
});

// Define the /metrics route where Prometheus will scrape the metrics
app.get('/metrics', async (req, res) => {
    // Set a random number to simulate active requests
    res.set('Content-Type', client.register.contentType);
    res.end(await client.register.metrics());
});


/** SETUP **/
const PORT = 8000;
app.listen(PORT, (err) => {
    if(err) {
        console.error(err);
        return process.exit(1);
    }

    console.log(`Server is listening in port ${PORT}`);
});