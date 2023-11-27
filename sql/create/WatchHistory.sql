create table WatchHistory
(
    userID    int  not null,
    mediaID   int  not null,
    dateAdded date not null,
    primary key (userID, mediaID, dateAdded),
    constraint watchhistory_ibfk_1
        foreign key (userID) references streamingservice.StreamingUser (userID),
    constraint watchhistory_ibfk_2
        foreign key (mediaID) references streamingservice.Media (mediaID)
);

create index mediaID
    on WatchHistory (mediaID);

