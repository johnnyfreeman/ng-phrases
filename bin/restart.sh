# kill all processes using port 3000
fuser -k -n tcp 80

# start meteor
sudo mrt --production --port 80 &