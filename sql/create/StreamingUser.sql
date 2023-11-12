create table StreamingUser
(
    userID   int          not null
        primary key,
    userName varchar(255) null,
    email    varchar(255) null,
    birthday date         null,
    constraint email
        unique (email)
);

