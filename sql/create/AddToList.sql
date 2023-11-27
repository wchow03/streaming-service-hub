create table AddToList
(
    listID  int not null,
    mediaID int not null,
    primary key (mediaID, listID),
    constraint addtolist_ibfk_1
        foreign key (mediaID) references streamingservice.Media (mediaID)
);

