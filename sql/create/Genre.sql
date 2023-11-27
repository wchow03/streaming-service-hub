create table Genre
(
    genreName varchar(255) not null,
    mediaID   int          not null,
    primary key (genreName, mediaID),
    constraint genre_ibfk_1
        foreign key (mediaID) references streamingservice.Media (mediaID)
);

create index mediaID
    on Genre (mediaID);

