CREATE TABLE log(id serial primary key, pid varchar(10) not null, time int not null,x real not null,y real not null);


select * from log l where l.x < 2274 and l.x > 2250 and l.y > 2100 and l.y < 2200 and l.time = 30 ;