echo "The following node processes were stopped:"
ps aux | grep " node " | grep -v grep
nodepids=$(ps aux | grep " node " | grep -v grep | cut -c10-15)

for nodepid in ${nodepids[@]}
do
  echo "PID :"$nodepid
  kill -9 $nodepid
done

# start meteor
mrt --production