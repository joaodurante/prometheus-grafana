const client = require('prom-client');

class PrometheusClient {
    constructor() {
        client.collectDefaultMetrics();

        // Create a counter metric to track the number of GET requests
        this.requestCounter = new client.Counter({
            name: 'requests_total',
            help: 'Total number of GET requests to /get',
        });

        // Create a gauge metric to simulate the number of active requetts
        this.requestsActive = new client.Gauge({
            name: 'requests_active',
            help: 'Number of active requests being processed by the server',
        });
        this.requestsActive.set(Math.floor(Math.random() * 100));
        
        // Create a histogram metric to track request durations for /get
        this.requestDurationHistogram = new client.Histogram({
            name: 'request_duration_seconds_histogram',
            help: 'Histogram of GET request durations',
        });

        // Create a summary metric to track request durations for /get
        this.requestDurationSummary = new client.Summary({
            name: 'request_duration_seconds_summary',
            help: 'Summary of GET request durations',
        });

        this.register = client.register;
    }
}

module.exports = new PrometheusClient();