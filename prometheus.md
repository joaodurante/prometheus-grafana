# Phometeus

## Metric Types
### Counter
**Description:**  
A counter is a cumulative metric that only increases over time. It represents a quantity that can only go up, like the number of requests or errors.  
**Example:**  
`http_requests_total (Total number of HTTP requests received by a server).`  
**Use case:**  
Tracking events that can only increase, such as the number of requests or processed jobs.  
**Characteristics:**  
Can only increase (resetting is allowed, e.g., when the service restarts).  
Useful for calculating rates (e.g., requests per second).  

### Gauge
**Description:**  
A gauge is a metric that can go up or down, representing values that vary over time. It is used for things like current temperature, memory usage, or queue lengths.  
**Example:**  
`memory_usage_bytes (Amount of memory in use).`  
**Use case:**  
Measuring values that can go up or down, such as system resource utilization (CPU, memory) or number of items in a queue.  
**Characteristics:**  
Can both increase and decrease.
Represents current values (e.g., current temperature, current memory usage).  

### Histogram
**Description:**  
A histogram measures the distribution of values, tracking the frequency of occurrences in configurable buckets. It is often used for measuring response times or request durations.  
**Example:**  
`http_request_duration_seconds (Histogram of HTTP request durations).`  
**Use case:**  
Measuring distributions, such as request latency, processing time, or size of events.  
**Characteristics:**  
Defines configurable "buckets" to categorize values (e.g., request durations).  
Includes a count of total observations, sum of all observed values, and bucket counts.  
Useful for calculating percentiles and summary statistics.  

## Summary
**Description:**  
Similar to histograms, but with a focus on quantiles (percentiles). A summary provides quantiles over time, and it is designed for scenarios where high-precision quantiles are required.  
**Example:**  
`http_request_duration_seconds (Summary of HTTP request durations).`  
**Use case:**  
Measuring precise quantiles (e.g., 99th percentile of request latency).  
**Characteristics:**  
Tracks individual observations and calculates quantiles (e.g., 50th, 95th, and 99th percentiles).  
Summaries are generally better suited for low cardinality metrics (fewer label combinations).  

| Metric Type  | Description                                 | Use Case                                        | Example                          |
|--------------|---------------------------------------------|-------------------------------------------------|----------------------------------|
| **Counter**  | Cumulative value that only increases        | Tracking total counts of events                 | `http_requests_total`            |
| **Gauge**    | Can go up or down                           | Measuring values like temperature, memory, etc. | `memory_usage_bytes`             |
| **Histogram**| Distribution of values in buckets           | Measuring distributions like response times     | `http_request_duration_seconds`  |
| **Summary**  | Focuses on quantiles and precise percentiles| High-precision percentile calculations          | `http_request_duration_seconds`  |


## PromQL 
PromQL is a powerful query language that helps you extract, aggregate, and manipulate time series data from Prometheus. The most commonly used commands involve selecting metrics with label filters, applying aggregation functions, performing mathematical operations, and handling time-based operations and alerts.

### Instant Vector Selector
An instant vector selector returns the time series that match a specific metric and label filter.
**Syntax:**
`metric_name{label_name="label_value"}`
**Example:**
```promql
http_requests_total{job="api", status="200"}
```
This returns the total number of HTTP requests with a status of 200 for the api job.

### Range Vector Selector
A range vector selector allows you to query a time range for a specific metric.
**Syntax:**
`metric_name{label_name="label_value"}[duration]`
**Example:**
```promql
http_requests_total{job="api"}[5m]
```
This returns the http_requests_total metric for the api job over the last 5 minutes.

### Aggregation Operators
These operators are used to aggregate data across multiple time series.
* sum() - Adds up values.
* avg() - Computes the average.
* min() - Finds the minimum value.
* max() - Finds the maximum value.
* count() - Counts the number of elements.
* rate() - Calculates the per-second rate of increase.
**Syntax:**
`aggregation_operator(metric_name)`
**Examples:**
```promql
sum(http_requests_total)
```
This sums all values of http_requests_total.
```promql
avg(http_requests_total{job="api"})
```
This calculates the average of http_requests_total for the api job.
```promql
rate(http_requests_total[5m])
```
This calculates the rate of http_requests_total over the last 5 minutes.

### Mathematical Operations
You can perform arithmetic on time series.
* \+ (addition)
* \- (subtraction)
* \* (multiplication)
* \/ (division)
**Syntax:**
`metric1 operator metric2`
**Example:**
```promql
http_requests_total{job="api"} / http_requests_total{job="frontend"}
```
This divides the http_requests_total for the api job by the frontend job.

### Label Filtering
You can filter based on labels and label values.
**Syntax:**
`metric_name{label_name="value", label2="value2"}`
**Example:**
```promql
http_requests_total{status="200", method="GET"}
```
This selects the http_requests_total metric where the status is 200 and the method is GET.
```promql
http_requests_total{job=~"api|frontend"}
```
This selects the http_requests_total metric for either the api or frontend jobs using regular expression matching.

### Time Functions
Prometheus provides functions to manipulate time.
* time() - Returns the current time (in seconds since the epoch).
* rate() - Computes the per-second rate of a counter.
**Example:**
```promql
time() - http_requests_total{job="api"}
```
This calculates the time difference between the current time and the http_requests_total metric for the api job.

### Offset Modifier
The offset modifier allows you to query past data at a specific time in the past.
**Syntax:**
`metric_name offset time_duration`
**Example:**
```promql
http_requests_total{job="api"} offset 1h
```
This returns the http_requests_total metric for the api job, but data from 1 hour ago.

### Subqueries
Subqueries allow querying of range vectors in inner queries.

**Syntax:**
`metric_name[duration] [aggregation_operator]`
**Example:**
```promql
avg(rate(http_requests_total[5m])) by (job)
```
This calculates the average rate of HTTP requests over the last 5 minutes, grouped by job.

### Absent() Function
The absent() function is used to detect the absence of a metric.

**Syntax:**
`absent(metric_name)`
**Example:**
```promql
absent(http_requests_total{job="api"})
```
This returns a result if there are no time series for http_requests_total for the api job.

### Alerting Conditions
You can use PromQL queries to create alerting rules.
**Example:**
```promql
http_requests_total{status="500"} > 100
```
This triggers an alert if there are more than 100 HTTP requests with a 500 status.