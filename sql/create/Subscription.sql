create table Subscription
(
    serviceName varchar(255) not null,
    tier        varchar(255) not null,
    duration    int          null,
    totalCost   double       null,
    primary key (serviceName, tier),
    constraint subscription_ibfk_1
        foreign key (serviceName) references streamingservice.StreamingService (serviceName)
);

