create table TVShow
(
    mediaID         int not null
        primary key,
    numberOfSeasons int null,
    constraint tvshow_ibfk_1
        foreign key (mediaID) references streamingservice.Media (mediaID)
);

