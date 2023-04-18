function list_child_processes () {
    local ppid=$1;
    local current_children=$(pgrep -P $ppid);
    local local_child;
    if [ $? -eq 0 ];
    then
        for current_child in $current_children
        do
          local_child=$current_child;
          list_child_processes $local_child;
          echo $local_child;
        done;
    else
      return 0;
    fi;
}

ps 87223;
while [ $? -eq 0 ];
do
  sleep 1;
  ps 87223 > /dev/null;
done;

for child in $(list_child_processes 87229);
do
  echo killing $child;
  kill -s KILL $child;
done;
rm /Users/lmartins/Documents/Projects/ProjectVishnu/ProjectVishnu/bin/Debug/net6.0/22c1c0190ad74bb6862dd14080960ad2.sh;
