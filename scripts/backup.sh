#!/bin/sh

backupPath="./backup"

projectName="heyouman"

cd $backupPath

if [ -f "${projectName}.tar.gz" ]; then
    rm "${projectName}.tar.gz"
    echo $projectName
fi

rsync -av -e ssh --exclude='node_modules' /Users/anthonyli/code/hum/heyouman /Users/anthonyli/code/hum/heyouman/backup

tar -zcvf "${projectName}.tar.gz" heyouman

rm -rf heyouman
