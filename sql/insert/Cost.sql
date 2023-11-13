INSERT INTO Cost (Duration, TotalCost, MonthlyCost) (
    SELECT duration, totalCost,
           totalCost / duration AS monthlyCost
    FROM Subscription
    WHERE duration > 0
);