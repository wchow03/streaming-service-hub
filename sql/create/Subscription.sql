ALTER TABLE Subscription
    DROP INDEX duration_idx,
    DROP INDEX totalCost_idx,
    ADD INDEX monthlyCost_idx (duration, totalCost);

create table Subscription
(
    serviceName varchar(255) not null,
    tier        varchar(255) not null,
    duration    int          null,
        INDEX duration_idx (duration),
    totalCost   double       null,
        INDEX totalCost_idx (totalCost),
    primary key (serviceName, tier),
    constraint subscription_ibfk_1
        foreign key (serviceName) references streamingservice.StreamingService (serviceName)
);

