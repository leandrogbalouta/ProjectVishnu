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

ps 89893;
while [ $? -eq 0 ];
do
  sleep 1;
  ps 89893 > /dev/null;
done;

for child in $(list_child_processes 89904);
do
  echo killing $child;
  kill -s KILL $child;
done;
rm /Users/lmartins/Documents/Projects/ProjectVishnu/ProjectVishnu/bin/Debug/net6.0/ff1f4c99f88b4a9b84d27e303e380888.sh;
