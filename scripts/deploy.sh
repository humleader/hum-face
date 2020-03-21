#!/bin/sh

npm run build

rsync -av -e ssh --exclude='node_modules' /Users/anthonyli/code/hum/heyouman root@106.15.239.147:/code

ssh  root@106.15.239.147 "cd /code/heyouman;pwd;npm run deploy"
