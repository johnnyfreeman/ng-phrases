# kill all processes using port 3000
fuser -k -n tcp 3000

# start meteor
mrt --production