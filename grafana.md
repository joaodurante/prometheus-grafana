# Grafana

## Panels
* **Graph** for time-series data
* **Stat** for single-value displays
* **Table** for tabular data
* **Gauge** for progress indicators
* **Alert** List for monitoring alerts

## Variables
Variables in Grafana are a powerful feature that allows you to create dynamic and reusable dashboards. They make it easy to change the data being visualized without modifying the layout of the dashboard itself.  
Once you define a variable, you can reference it in any query within the dashboard by using _"$VARIABLE_NAME"_ syntax. 

### Query Variables 
These are dynamically populated by executing a query against a data source  
**Example:** A query that fetches a list of servers:  
```sql
SELECT distinct server FROM metrics
```

### Custom Variables 
These are static variables where the values are manually defined by the user.  
**Example:** A drop-down of pre-defined options such as "Production", "Staging", and "Development". 

### Constant Variables 
These hold a fixed value and do not change. They are useful when you want to pass a single value to other parts of your queries.


### Text Box Variables
Allow users to input a value, which can be used in queries, URLs, or annotations.

### Creating Variables
1. Go to the Dashboard settings.
2. Click on Variables in the left menu.
3. Click Add variable and choose the type (Query, Custom, etc.).
4. Define the variable's name, options, and query or values.
5. After saving, the variable will appear as a drop-down list at the top of the dashboard.

## Rows
Rows are essentially horizontal containers that hold panels. They allow you to organize panels in a clean and structured way, especially when you want to group related panels together or separate different sections of a dashboard  