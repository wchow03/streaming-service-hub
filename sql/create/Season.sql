create table Season
(
    mediaID      int not null,
    seasonNumber int not null,
    episodeCount int null,
    primary key (mediaID, seasonNumber),
    constraint season_ibfk_1
        foreign key (mediaID) references streamingservice.TVShow (mediaID)
);

