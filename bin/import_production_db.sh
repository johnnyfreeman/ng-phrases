echo "tunneling into ng-phrases server and backing up production db..."
ssh 205.149.129.67 'cd ~; rm -rfv ~/dump/meteor; mongodump -v --db meteor --port 82'

echo "deleting previous (local) backup..."
rm -rfv ~/dump/meteor

echo "moving production dump to local machine..."
scp -r 205.149.129.67:~/dump/ ~/

echo "changing directory to ~/dump/meteor/ ..."
cd ~/dump/meteor/

# echo "renaming all .json files to .bson to prepare for mongorestore"
# rename 's/.json$/.bson/' *.json -v

# temp fix
# rm -v ./*.metadata.bson

echo "restoring production dump..."
mongorestore --drop -v --host localhost --port 3002 --db meteor .