create table Media
(
    mediaID     int          not null
        primary key,
    mediaName   varchar(255) null,
    rating      int          null,
    studioName  varchar(255) not null,
    serviceName varchar(255) not null,
    constraint media_ibfk_1
        foreign key (studioName) references streamingservice.Studio (studioName),
    constraint media_ibfk_2
        foreign key (serviceName) references streamingservice.StreamingService (serviceName)
);

create index serviceName
    on Media (serviceName);

create index studioName
    on Media (studioName);

