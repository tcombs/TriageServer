CREATE TABLE log(id serial primary key, 
	pid varchar(10) not null, 
	time int not null,x real not null,y real not null);


select * from log l where l.pid = 'c0' and time > 0 and time < 1000;