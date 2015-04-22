import psycopg2 as pg

#easy_install pip
#pip install psycopg2
#CREATE TABLE log(id serial primary key, pid varchar(10) not null, time int not null,x real not null,y real not null);

file_path = '../initial_data/geolife/geo.xml'
simDB = "dbname='tyler' user='tyler' host='localhost' password='tyler'"
geolifeDB = "dbname='geolife' user='tyler' host='localhost' password='tyler'"
conn = pg.connect(geolifeDB)





#cur.execute(query, data)
#conn.commit()

import xml.etree.ElementTree as ET

#root = tree.getroot()
# print root.attrib["id"]
# print root.attrib["simstep"]
# print root.attrib["x"]
# print root.attrib["y"]

query =  "INSERT INTO log VALUES (%s, %s, %s, %s, %s);"
cur = conn.cursor()
f = open(file_path,"r")

count = 1
for line in f:
	try:
		root = ET.fromstring(line)
		data = (count,root.attrib["id"],root.attrib["simstep"],root.attrib["x"],root.attrib["y"])
		cur.execute(query, data)
		count += 1
		conn.commit()
	except ET.ParseError:
		print 'err'
	

