DROP TABLE Age;

CREATE TABLE Age (
    birthday DATE PRIMARY KEY,
    age INT,
    FOREIGN KEY (Birthday) REFERENCES StreamingUser(Birthday)
);

