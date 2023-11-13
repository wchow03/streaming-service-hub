INSERT INTO Age (birthday, age) (
    SELECT Birthday,
        YEAR(CURDATE()) - YEAR(Birthday) -
        (RIGHT(CURDATE(), 5) < RIGHT(Birthday, 5)) AS age
    FROM StreamingUser
);
