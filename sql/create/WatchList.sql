create table WatchList
(
    listID   int          not null
        primary key,
    listName varchar(255) null,
    userID   int          not null,
    constraint watchlist_ibfk_1
        foreign key (userID) references streamingservice.StreamingUser (userID)
);

create index userID
    on WatchList (userID);

