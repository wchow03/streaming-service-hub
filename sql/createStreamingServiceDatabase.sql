SET FOREIGN_KEY_CHECKS = 0;
DROP TABLE StreamingUser;
DROP TABLE Age;
DROP TABLE StreamingService;
DROP TABLE Studio;
DROP TABLE Subscription;
DROP TABLE Cost;
DROP TABLE SubscribesTo;
DROP TABLE Media;
DROP TABLE WatchHistory;
DROP TABLE WatchList;
DROP TABLE AddToList;
DROP TABLE Genre;
DROP TABLE TVShow;
DROP TABLE Season;
DROP TABLE Movie;
SET FOREIGN_KEY_CHECKS = 1;

CREATE TABLE StreamingUser
(
    userID   INT     NOT NULL       AUTO_INCREMENT        PRIMARY KEY ,
    userName VARCHAR(255) NULL,
    password VARCHAR(255) NULL,
    email    VARCHAR(255) NULL,
    birthday DATE         NOT NULL,
    INDEX idx_Birthday (Birthday),
    CONSTRAINT email
        UNIQUE (email)
);

CREATE TABLE Age (
     birthday DATE PRIMARY KEY ,
     age INT,
     FOREIGN KEY (Birthday) REFERENCES StreamingUser(Birthday)
);

CREATE TABLE StreamingService
(
    serviceName VARCHAR(255) NOT NULL PRIMARY KEY,
    company     VARCHAR(255) NULL
);

CREATE TABLE Studio
(
    studioName   VARCHAR(255) NOT NULL PRIMARY KEY ,
    headquarter  VARCHAR(255) NULL,
    creationDate date         NULL
);

CREATE TABLE Subscription
(
    serviceName VARCHAR(255) NOT NULL,
    tier        VARCHAR(255) NOT NULL,
    duration    INT          NULL,
    INDEX duration_idx (duration),
    totalCost   double       NULL,
    INDEX totalCost_idx (totalCost),
    PRIMARY KEY (serviceName, tier),
    CONSTRAINT subscription_ibfk_1
        FOREIGN KEY (serviceName) REFERENCES streamingservice.StreamingService (serviceName)
);

CREATE INDEX monthlyCost_idx ON Subscription(duration, totalCost);

CREATE TABLE Cost (
    duration INT,       -- Months
    totalCost DOUBLE,   -- Dollars
    monthlyCost DOUBLE, -- Dollars
    PRIMARY KEY (duration, totalCost),
    FOREIGN KEY (duration, totalCost)
      REFERENCES Subscription(duration, totalCost)
);

CREATE TABLE SubscribesTo
(
    userID      INT          NOT NULL,
    serviceName VARCHAR(255) NOT NULL,
    tier        VARCHAR(255) NULL,
    PRIMARY KEY (userID, serviceName),
    CONSTRAINT subscribesto_ibfk_1
        FOREIGN KEY (userID) REFERENCES streamingservice.StreamingUser (userID),
    CONSTRAINT subscribesto_ibfk_2
        FOREIGN KEY (serviceName, tier) REFERENCES streamingservice.Subscription (serviceName, tier)
);

CREATE INDEX serviceName
    ON SubscribesTo (serviceName, tier);

CREATE TABLE Media
(
    mediaID     INT          NOT NULL
        PRIMARY KEY ,
    mediaName   VARCHAR(255) NULL,
    rating      double           NULL,
    studioName  VARCHAR(255) NOT NULL,
    serviceName VARCHAR(255) NOT NULL,
    CONSTRAINT media_ibfk_1
        FOREIGN KEY (studioName) REFERENCES streamingservice.Studio (studioName),
    CONSTRAINT media_ibfk_2
        FOREIGN KEY (serviceName) REFERENCES streamingservice.StreamingService (serviceName)
);

CREATE INDEX serviceName
    on Media (serviceName);

CREATE INDEX studioName
    on Media (studioName);

CREATE TABLE WatchHistory
(
    userID    INT  NOT NULL,
    mediaID   INT  NOT NULL,
    dateAdded date NOT NULL,
    PRIMARY KEY (userID, mediaID, dateAdded),
    CONSTRAINT watchhistory_ibfk_1
        FOREIGN KEY (userID) REFERENCES streamingservice.StreamingUser (userID),
    CONSTRAINT watchhistory_ibfk_2
        FOREIGN KEY (mediaID) REFERENCES streamingservice.Media (mediaID)
);

CREATE INDEX mediaID
    ON WatchHistory (mediaID);

CREATE TABLE WatchList
(
    listID   INT          NOT NULL
        PRIMARY KEY ,
    listName VARCHAR(255) NULL,
    userID   INT          NOT NULL,
    CONSTRAINT watchlist_ibfk_1
        FOREIGN KEY (userID) REFERENCES streamingservice.StreamingUser (userID)
);

CREATE INDEX userID
    ON WatchList (userID);

CREATE TABLE AddToList
(
    listID  INT NOT NULL,
    mediaID INT NOT NULL,
    PRIMARY KEY (mediaID, listID),
    CONSTRAINT addtolist_ibfk_1
        FOREIGN KEY (mediaID) REFERENCES streamingservice.Media (mediaID)
);

CREATE TABLE Genre
(
    genreName VARCHAR(255) NOT NULL,
    mediaID   INT          NOT NULL,
    PRIMARY KEY (genreName, mediaID),
    CONSTRAINT genre_ibfk_1
        FOREIGN KEY (mediaID) REFERENCES streamingservice.Media (mediaID)
);

CREATE INDEX mediaID
    ON Genre (mediaID);

CREATE TABLE TVShow
(
    mediaID         INT NOT NULL
        PRIMARY KEY ,
    numberOfSeasons INT NULL,
    CONSTRAINT tvshow_ibfk_1
        FOREIGN KEY (mediaID) REFERENCES streamingservice.Media (mediaID)
);

CREATE TABLE Season
(
    mediaID      INT NOT NULL,
    seasonNumber INT NOT NULL,
    episodeCount INT NULL,
    PRIMARY KEY (mediaID, seasonNumber),
    CONSTRAINT season_ibfk_1
        FOREIGN KEY (mediaID) REFERENCES streamingservice.TVShow (mediaID)
);

CREATE TABLE Movie
(
    mediaID INT          NOT NULL,
    version VARCHAR(255) NOT NULL,
    length  INT          NULL,
    PRIMARY KEY (mediaID, version),
    CONSTRAINT movie_ibfk_1
        FOREIGN KEY (mediaID) REFERENCES streamingservice.Media (mediaID)
);

# INSERT SCRIPTS

# INSERT INTO StreamingService (ServiceName, Company)
# VALUES  ('Disney Plus', 'Disney'),
#         ('Netflix', 'Netflix'),
#         ('Prime Video', 'Amazon'),
#         ('Max', 'HBO'),
#         ('Crave TV', 'Bell Media');


