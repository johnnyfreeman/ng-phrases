echo "tunneling into ng-phrases server and backing up production db..."
ssh 192.237.249.38 'cd ~; rm -rfv ~/dump/meteor; mongodump -v --db meteor --port 3002'

echo "deleting previous (local) backup..."
rm -rfv ~/dump/meteor

echo "moving production dump to local machine..."
scp -r 192.237.249.38:~/dump/ ~/

echo "changing directory to ~/dump/meteor/ ..."
cd ~/dump/meteor/

# echo "renaming all .json files to .bson to prepare for mongorestore"
# rename 's/.json$/.bson/' *.json -v

# temp fix
# rm -v ./*.metadata.bson

echo "restoring production dump..."
mongorestore --drop -v --host localhost --port 3002 --db meteor .