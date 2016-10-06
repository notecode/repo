#!/bin/sh

db="my_db2"
cons_sql="cities.tmp.sql"
node req_cities.js > $cons_sql

echo .
mysql $db < drop.sql
echo .
mysql $db < $cons_sql 
