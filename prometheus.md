# Phometeus

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