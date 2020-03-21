#!/bin/sh

ssh  root@106.15.239.147 "cd databak; mysqldump -u root -p hum > hum.sql;"
scp -r root@106.15.239.147:/root/databak/hum.sql  /Users/anthonyli/code/hum