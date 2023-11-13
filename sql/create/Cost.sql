CREATE TABLE Cost (
    duration INT,       -- Months
    totalCost DOUBLE,   -- Dollars
    monthlyCost DOUBLE, -- Dollars
    PRIMARY KEY (duration, totalCost),
    FOREIGN KEY (duration, totalCost)
      REFERENCES Subscription(duration, totalCost)
)