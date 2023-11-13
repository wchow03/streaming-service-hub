ALTER TABLE StreamingUser
    MODIFY COLUMN birthday date not null;

create table StreamingUser
(
    userID   int     not null       auto_increment        primary key,
    userName varchar(255) null,
    email    varchar(255) null,
    birthday date         not null,
        INDEX idx_Birthday (Birthday),
    constraint email
        unique (email)
);

