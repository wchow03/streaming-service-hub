create table Age
(
    userID int not null
        primary key,
    age    int null,
    constraint age_ibfk_1
        foreign key (userID) references streamingservice.StreamingUser (userID)
);

