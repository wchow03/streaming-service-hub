SET FOREIGN_KEY_CHECKS = 0;
DROP TABLE IF EXISTS StreamingUser,
    Age,
    StreamingService,
    Studio,
    Subscription,
    SubscribesTo,
    Cost,
    Media,
    WatchHistory,
    WatchList,
    AddToList,
    Genre,
    TVShow,
    Season,
    Movie;
SET FOREIGN_KEY_CHECKS = 1;

CREATE TABLE StreamingUser
(
    userID   INT          NOT NULL AUTO_INCREMENT PRIMARY KEY,
    userName VARCHAR(255) NULL,
    password VARCHAR(255) NULL,
    email    VARCHAR(255) NULL,
    birthday DATE         NOT NULL,
    INDEX idx_Birthday (Birthday),
    CONSTRAINT email
        UNIQUE (email)
);

CREATE TABLE Age
(
    birthday DATE PRIMARY KEY,
    age      INT,
    FOREIGN KEY (Birthday) REFERENCES StreamingUser (Birthday)
);

CREATE TABLE StreamingService
(
    serviceName VARCHAR(255) NOT NULL PRIMARY KEY,
    company     VARCHAR(255) NULL
);

CREATE TABLE Studio
(
    studioName   VARCHAR(255) NOT NULL PRIMARY KEY,
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
        FOREIGN KEY (serviceName) REFERENCES StreamingService (serviceName)
);

CREATE INDEX monthlyCost_idx ON Subscription (duration, totalCost);

CREATE TABLE Cost
(
    duration    INT,    -- Months
    totalCost   DOUBLE, -- Dollars
    monthlyCost DOUBLE, -- Dollars
    PRIMARY KEY (duration, totalCost),
    FOREIGN KEY (duration, totalCost)
        REFERENCES Subscription (duration, totalCost)
);

CREATE TABLE SubscribesTo
(
    userID      INT          NOT NULL,
    serviceName VARCHAR(255) NOT NULL,
    tier        VARCHAR(255) NULL,
    PRIMARY KEY (userID, serviceName),
    CONSTRAINT subscribesto_ibfk_1
        FOREIGN KEY (userID) REFERENCES StreamingUser (userID),
    CONSTRAINT subscribesto_ibfk_2
        FOREIGN KEY (serviceName, tier) REFERENCES Subscription (serviceName, tier)
);

CREATE INDEX serviceName
    ON SubscribesTo (serviceName, tier);

CREATE TABLE Media
(
    mediaID     INT          NOT NULL
        PRIMARY KEY,
    mediaName   VARCHAR(255) NULL,
    rating      double       NULL,
    studioName  VARCHAR(255) NOT NULL,
    serviceName VARCHAR(255) NOT NULL,
    CONSTRAINT media_ibfk_1
        FOREIGN KEY (studioName) REFERENCES Studio (studioName),
    CONSTRAINT media_ibfk_2
        FOREIGN KEY (serviceName) REFERENCES StreamingService (serviceName)
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
        FOREIGN KEY (userID) REFERENCES StreamingUser (userID),
    CONSTRAINT watchhistory_ibfk_2
        FOREIGN KEY (mediaID) REFERENCES Media (mediaID)
);

CREATE INDEX mediaID
    ON WatchHistory (mediaID);

CREATE TABLE WatchList
(
    listID   INT          NOT NULL
        PRIMARY KEY,
    listName VARCHAR(255) NULL,
    userID   INT          NOT NULL,
    CONSTRAINT watchlist_ibfk_1
        FOREIGN KEY (userID) REFERENCES StreamingUser (userID)
);

CREATE INDEX userID
    ON WatchList (userID);

CREATE TABLE AddToList
(
    listID  INT NOT NULL,
    mediaID INT NOT NULL,
    PRIMARY KEY (mediaID, listID),
    CONSTRAINT addtolist_ibfk_1
        FOREIGN KEY (mediaID) REFERENCES Media (mediaID)
);

CREATE TABLE Genre
(
    genreName VARCHAR(255) NOT NULL,
    mediaID   INT          NOT NULL,
    PRIMARY KEY (genreName, mediaID),
    CONSTRAINT genre_ibfk_1
        FOREIGN KEY (mediaID) REFERENCES Media (mediaID)
);

CREATE INDEX mediaID
    ON Genre (mediaID);

CREATE TABLE TVShow
(
    mediaID         INT NOT NULL
        PRIMARY KEY,
    numberOfSeasons INT NULL,
    CONSTRAINT tvshow_ibfk_1
        FOREIGN KEY (mediaID) REFERENCES Media (mediaID)
);

CREATE TABLE Season
(
    mediaID      INT NOT NULL,
    seasonNumber INT NOT NULL,
    episodeCount INT NULL,
    PRIMARY KEY (mediaID, seasonNumber),
    CONSTRAINT season_ibfk_1
        FOREIGN KEY (mediaID) REFERENCES TVShow (mediaID)
);

CREATE TABLE Movie
(
    mediaID INT          NOT NULL,
    version VARCHAR(255) NOT NULL,
    length  INT          NULL,
    PRIMARY KEY (mediaID, version),
    CONSTRAINT movie_ibfk_1
        FOREIGN KEY (mediaID) REFERENCES Media (mediaID)
);

# INSERT SCRIPTS


INSERT INTO StreamingService (ServiceName, Company)
VALUES ('Disney Plus', 'Disney'),
       ('Netflix', 'Netflix'),
       ('Prime Video', 'Amazon'),
       ('Max', 'HBO'),
       ('Crunchyroll', 'Sony');

INSERT INTO Subscription (ServiceName, Tier, Duration, TotalCost)
VALUES ('Disney Plus', 'Standard', 3, 33.00),
       ('Disney Plus', 'Premium', 6, 90.00),
       ('Netflix', 'Standard', 1, 12.99),
       ('Netflix', 'Premium', 1, 20.99),
       ('Max', 'Standard', 2, 40.00),
       ('Max', 'Premium', 2, 60.00),
       ('Crunchyroll', 'Standard', 12, 120.00),
       ('Crunchyroll', 'Premium', 12, 180.00),
       ('Prime Video', 'Standard', 1, 9.99),
       ('Prime Video', 'Premium', 1, 15.99);

INSERT INTO Studio (StudioName, Headquarter, CreationDate)
VALUES ('Sony Pictures', 'California, USA', '1987-09-21'),
       ('Columbia Pictures', 'California, USA', '1924-01-10'),
       ('Warner Bros', 'California, USA', '1923-04-04'),
       ('20th Century Studios', 'Los Angeles, USA', '1935-05-31'),
       ('MGM Television', 'California, USA', '1956-06-30'),
       ('Tomorrow Studios', 'California, USA', '2014-01-01'),
       ('MAPPA', 'Tokyo, Japan', '1972-02-12'),
       ('Cartoon Network', 'California, USA', '2010-01-30'),
       ('HBO', 'Maryland, USA', '1980-05-11'),
       ('Universal Pictures', 'California, USA', '1912-03-15'),
       ('Toei Animation', 'Tokyo, Japan', '1960-05-20'),
       ('CoMix Wave Films', 'Tokyo, Japan', '1970-01-01');

INSERT INTO Media (MediaID, MediaName, Rating, StudioName, ServiceName)
VALUES (1, 'Spider-Man: Across the Spider-Verse', 8.7, 'Sony Pictures', 'Netflix'),
       (2, 'The Social Network', 7.8, 'Columbia Pictures', 'Netflix'),
       (3, 'Hotel Transylvania 2', 6.6, 'Sony Pictures', 'Netflix'),
       (4, 'Kingsman: The Secret Service', 7.7, '20th Century Studios', 'Netflix'),
       (5, 'Cloudy with a Chance of Meatballs 2', 6.3, 'Sony Pictures', 'Netflix'),
       (6, 'Breaking Bad', 9.5, 'Sony Pictures', 'Netflix'),
       (7, 'Wednesday', 8.1, 'MGM Television', 'Netflix'),
       (8, 'ONE PIECE', 8.4, 'Tomorrow Studios', 'Netflix'),
       (9, 'The Queen\'s Gambit', 8.5, 'Sony Pictures', 'Netflix'),
       (10, 'Arcane', 9.0, 'Universal Pictures', 'Netflix'),

       (11, 'Justice League', 7.9, 'Warner Bros', 'Max'),
       (12, 'Elf', 7.1, 'Sony Pictures', 'Max'),
       (13, 'The Nun II', 5.6, 'HBO', 'Max'),
       (14, 'The Polar Express', 6.8, 'Warner Bros', 'Max'),
       (15, 'Coraline', 8.0, 'MGM Television', 'Max'),
       (16, 'Rick and Morty', 8.5, 'Sony Pictures', 'Max'),
       (17, 'Friends', 6.9, 'Universal Pictures', 'Max'),
       (18, 'Game of Thrones', 8.9, '20th Century Studios', 'Max'),
       (19, 'Adventure Time', 9.5, 'Cartoon Network', 'Max'),
       (20, 'Watchmen', 5.8, 'Columbia Pictures', 'Max'),

       (21, 'Fullmetal Alchemist the Movie: Conqueror of Shamballa', 7.3, 'Toei Animation', 'Crunchyroll'),
       (22, 'Jujutsu Kaisen 0', 10, 'MAPPA', 'Crunchyroll'),
       (23, 'Demon Slayer The movie: Mugen Train', 8.2, 'MAPPA', 'Crunchyroll'),
       (24, 'One Piece Film Red', 6.7, 'Toei Animation', 'Crunchyroll'),
       (25, 'Your Name', 8.4, 'CoMix Wave Films', 'Crunchyroll'),
       (26, 'Attack on Titan', 9.0, 'MAPPA', 'Crunchyroll'),
       (27, 'Jujutsu Kaisen', 8.6, 'MAPPA', 'Crunchyroll'),
       (28, 'Hunter x Hunter', 9.0, 'CoMix Wave Films', 'Crunchyroll'),
       (29, 'Chainsaw Man', 8.4, 'MAPPA', 'Crunchyroll'),
       (30, 'Death Note', 8.9, 'Toei Animation', 'Crunchyroll'),

       (31, 'Home Alone', 7.7, 'Columbia Pictures', 'Disney Plus'),
       (32, 'Guardians of the Galaxy Vol. 3', 7.9, 'Sony Pictures', 'Disney Plus'),
       (33, 'Avatar: The Way of Water', 7.6, '20th Century Studios', 'Disney Plus'),
       (34, 'Venom', 6.6, 'Sony Pictures', 'Disney Plus'),
       (35, 'Ant-Man and the Wasp: Quantumania', 6.1, 'Sony Pictures', 'Disney Plus'),
       (36, 'Loki', 8.2, 'Warner Bros', 'Disney Plus'),
       (37, 'Marvel\'s Daredevil', 8.6, 'Sony Pictures', 'Disney Plus'),
       (38, 'Marvel\'s Agents of S.H.I.E.L.D', 7.5, 'Columbia Pictures', 'Disney Plus'),
       (39, 'Marvel\'s Iron Fist', 6.4, 'Sony Pictures', 'Disney Plus'),
       (40, 'Hawkeye', 7.5, 'Sony Pictures', 'Disney Plus'),

       (41, 'Interstellar', 8.7, 'Universal Pictures', 'Prime Video'),
       (42, 'Terrifier 2', 6.1, 'Tomorrow Studios', 'Prime Video'),
       (43, 'Top Gun: Maverick', 8.3, '20th Century Studios', 'Prime Video'),
       (44, 'Twilight', 5.3, 'Universal Pictures', 'Prime Video'),
       (45, 'Jurassic Park', 8.2, 'Sony Pictures', 'Prime Video'),
       (46, 'Invincible', 8.7, 'Sony Pictures', 'Prime Video'),
       (47, 'The Boys', 8.7, 'Sony Pictures', 'Prime Video'),
       (48, 'Fellow Travelers', 7.5, 'MGM Television', 'Prime Video'),
       (49, 'Hell\'s Kitchen', 7.2, 'MGM Television', 'Prime Video'),
       (50, 'SpongeBob SquarePants', 8.2, 'Cartoon Network', 'Prime Video');

INSERT INTO Genre (GenreName, MediaID)
VALUES ('Action', 1),
       ('Animation', 1),
       ('Adventure', 1),

       ('Biography', 2),
       ('Drama', 2),

       ('Animation', 3),
       ('Adventure', 3),
       ('Comedy', 3),

       ('Action', 4),
       ('Adventure', 4),
       ('Comedy', 4),

       ('Animation', 5),
       ('Adventure', 5),
       ('Comedy', 5),

       ('Crime', 6),
       ('Drama', 6),
       ('Thriller', 6),

       ('Comedy', 7),
       ('Crime', 7),
       ('Fantasy', 7),

       ('Action', 8),
       ('Adventure', 8),
       ('Comedy', 8),

       ('Drama', 9),
       ('Animation', 10),
       ('Action', 10),
       ('Adventure', 10),

       ('Action', 11),
       ('Adventure', 11),
       ('Fantasy', 11),

       ('Comedy', 12),
       ('Action', 12),

       ('Horror', 13),
       ('Mystery', 13),
       ('Thriller', 13),

       ('Adventure', 14),
       ('Comedy', 14),

       ('Fantasy', 15),
       ('Animation', 15),
       ('Drama', 15),

       ('Comedy', 16),
       ('Science-Fiction', 16),
       ('Animation', 16),
       ('Adventure', 16),

       ('Comedy', 17),
       ('Romance', 17),

       ('Science-Fiction', 18),
       ('Drama', 18),
       ('Fantasy', 18),

       ('Comedy', 19),
       ('Animation', 19),
       ('Adventure', 19),

       ('Science-Fiction', 20),
       ('Crime', 20),
       ('Drama', 20),

       ('Drama', 21),
       ('Animation', 21),
       ('Fantasy', 21),

       ('Animation', 22),
       ('Action', 22),
       ('Adventure', 22),
       ('Fantasy', 22),

       ('Animation', 23),
       ('Action', 23),
       ('Adventure', 23),
       ('Fantasy', 23),
       ('Thriller', 23),

       ('Animation', 24),
       ('Action', 24),
       ('Adventure', 24),
       ('Fantasy', 24),

       ('Drama', 25),
       ('Animation', 25),
       ('Fantasy', 25),
       ('Romance', 25),

       ('Horror', 26),
       ('Animation', 26),
       ('Action', 26),
       ('Adventure', 26),
       ('Science-Fiction', 26),

       ('Animation', 27),
       ('Action', 27),
       ('Adventure', 27),
       ('Thriller', 27),

       ('Comedy', 28),
       ('Animation', 28),
       ('Action', 28),
       ('Adventure', 28),
       ('Science-Fiction', 28),

       ('Thriller', 29),
       ('Animation', 29),
       ('Action', 29),
       ('Adventure', 29),
       ('Science-Fiction', 29),
       ('Mystery', 29),

       ('Thriller', 30),
       ('Animation', 30),
       ('Crime', 30),
       ('Drama', 30),
       ('Science-Fiction', 30),
       ('Mystery', 30),

       ('Comedy', 31),
       ('Kids', 31),
       ('Family', 31),

       ('Action', 32),
       ('Adventure', 32),
       ('Comedy', 32),
       ('Science-Fiction', 32),

       ('Action', 33),
       ('Adventure', 33),
       ('Fantasy', 33),
       ('Science-Fiction', 33),

       ('Action', 34),
       ('Adventure', 34),
       ('Science-Fiction', 34),

       ('Action', 35),
       ('Adventure', 35),
       ('Comedy', 35),
       ('Science-Fiction', 35),

       ('Action', 36),
       ('Adventure', 36),
       ('Drama', 36),
       ('Fantasy', 36),
       ('Science-Fiction', 36),

       ('Action', 37),
       ('Adventure', 37),
       ('Drama', 37),
       ('Fantasy', 37),
       ('Science-Fiction', 37),
       ('Crime', 37),

       ('Action', 38),
       ('Adventure', 38),
       ('Drama', 38),
       ('Thriller', 38),
       ('Science-Fiction', 38),
       ('Mystery', 38),

       ('Action', 39),
       ('Adventure', 39),
       ('Drama', 39),
       ('Crime', 39),
       ('Science-Fiction', 39),
       ('Fantasy', 39),

       ('Action', 40),
       ('Adventure', 40),
       ('Drama', 40),
       ('Comedy', 40),
       ('Science-Fiction', 40),
       ('Crime', 40),

       ('Action', 41),
       ('Adventure', 41),
       ('Science-Fiction', 41),
       ('Drama', 41),

       ('Mystery', 42),
       ('Thriller', 42),
       ('Horror', 42),

       ('Drama', 43),
       ('Action', 43),
       ('Adventure', 43),

       ('Drama', 44),
       ('Fantasy', 44),
       ('Romance', 44),

       ('Action', 45),
       ('Adventure', 45),
       ('Science-Fiction', 45),
       ('Mystery', 45),
       ('Thriller', 45),

       ('Action', 46),
       ('Adventure', 46),
       ('Animation', 46),
       ('Mystery', 46),
       ('Science-Fiction', 46),
       ('Thriller', 46),

       ('Action', 47),
       ('Adventure', 47),
       ('Comedy', 47),
       ('Crime', 47),
       ('Science-Fiction', 47),
       ('Drama', 47),

       ('Drama', 48),
       ('Romance', 48),

       ('Reality TV', 49),

       ('Animation', 50),
       ('Comedy', 50),
       ('Kids', 50),
       ('Family', 50),
       ('Science-Fiction', 50),
       ('Fantasy', 50);

INSERT INTO Movie (MediaID, Version, Length) -- IsA for Media
VALUES (1, 'Theatrical Release', 140),
       (2, 'Theatrical Release', 120),
       (3, 'Theatrical Release', 149),
       (4, 'Theatrical Release', 129),
       (5, 'Theatrical Release', 95),
       (11, 'Zack Snyder\'s Cut', 242),
       (12, 'Theatrical Release', 97),
       (13, 'Theatrical Release', 110),
       (14, 'Directors Cut', 98),
       (15, 'Home Video', 100),
       (21, 'Directors Cut', 105),
       (22, 'Theatrical Release', 105),
       (23, 'Theatrical Release', 117),
       (24, 'Home Video', 115),
       (25, 'Theatrical Release', 106),
       (31, 'Special edition', 103),
       (32, 'Anniversary edition', 150),
       (33, 'Theatrical Release', 192),
       (34, 'Theatrical Release', 112),
       (35, 'Theatrical Release', 125),
       (41, 'Directors Cut', 189),
       (42, 'Theatrical Release', 138),
       (43, 'Theatrical Release', 131),
       (44, 'Anniversary edition', 122),
       (45, 'Theatrical Release', 127);

INSERT INTO TVShow (MediaID, NumberOfSeasons) -- IsA for Media
VALUES (6, 5),
       (7, 1),
       (8, 1),
       (9, 1),
       (10, 1),
       (16, 6),
       (17, 3),
       (18, 4),
       (19, 10),
       (20, 1),
       (26, 4),
       (27, 2),
       (28, 1),
       (29, 1),
       (30, 1),
       (36, 2),
       (37, 3),
       (38, 7),
       (39, 2),
       (40, 1),
       (46, 2),
       (47, 3),
       (48, 1),
       (49, 5),
       (50, 6);

INSERT INTO Season (MediaID, SeasonNumber, EpisodeCount) -- Weak entity for TVShow
VALUES (6, 1, 7),
       (6, 2, 13),
       (6, 3, 13),
       (6, 4, 13),
       (6, 5, 16),

       (7, 1, 8),

       (8, 1, 8),

       (9, 1, 7),
       (10, 1, 9),

       (16, 1, 11),
       (16, 2, 10),
       (16, 3, 10),
       (16, 4, 10),
       (16, 5, 10),
       (16, 6, 5),

       (17, 1, 10),
       (17, 2, 9),
       (17, 3, 10),

       (18, 1, 15),
       (18, 2, 15),
       (18, 3, 14),
       (18, 4, 20),

       (19, 1, 13),
       (19, 2, 13),
       (19, 3, 13),
       (19, 4, 13),
       (19, 5, 13),
       (19, 6, 13),
       (19, 7, 13),
       (19, 8, 13),
       (19, 9, 13),
       (19, 10, 13),

       (20, 1, 9),

       (26, 1, 25),
       (26, 2, 12),
       (26, 3, 22),
       (26, 4, 30),

       (27, 1, 24),
       (27, 2, 12),

       (28, 1, 46),

       (29, 1, 12),

       (30, 1, 37),

       (36, 1, 6),
       (36, 2, 6),

       (37, 1, 13),
       (37, 2, 13),
       (37, 3, 13),

       (38, 1, 22),
       (38, 2, 22),
       (38, 3, 22),
       (38, 4, 22),
       (38, 5, 22),
       (38, 6, 13),
       (38, 7, 13),

       (39, 1, 13),
       (39, 2, 10),

       (40, 1, 6),

       (46, 1, 8),
       (46, 2, 4),

       (47, 1, 8),
       (47, 2, 8),
       (47, 3, 8),

       (48, 1, 5),

       (49, 1, 8),
       (49, 2, 8),
       (49, 3, 8),
       (49, 4, 8),
       (49, 5, 8),

       (50, 1, 20),
       (50, 2, 20),
       (50, 3, 20),
       (50, 4, 20),
       (50, 5, 20),
       (50, 6, 20);


INSERT INTO StreamingUser (userID, userName, password, email, birthday) -- Weak entity for TVShow
VALUES (0, 'sim', 'sim', 'sim@gmail.com', '2000-01-01')