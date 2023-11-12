create table SubscribesTo
(
    userID      int          not null,
    serviceName varchar(255) not null,
    tier        varchar(255) null,
    primary key (userID, serviceName),
    constraint subscribesto_ibfk_1
        foreign key (userID) references streamingservice.StreamingUser (userID),
    constraint subscribesto_ibfk_2
        foreign key (serviceName, tier) references streamingservice.Subscription (serviceName, tier)
);

create index serviceName
    on SubscribesTo (serviceName, tier);

