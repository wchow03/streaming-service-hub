create table Movie
(
    mediaID int          not null,
    version varchar(255) not null,
    length  int          null,
    primary key (mediaID, version),
    constraint movie_ibfk_1
        foreign key (mediaID) references streamingservice.Media (mediaID)
);

