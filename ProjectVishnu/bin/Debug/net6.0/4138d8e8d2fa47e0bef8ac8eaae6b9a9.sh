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

ps 92277;
while [ $? -eq 0 ];
do
  sleep 1;
  ps 92277 > /dev/null;
done;

for child in $(list_child_processes 92288);
do
  echo killing $child;
  kill -s KILL $child;
done;
rm /Users/lmartins/Documents/Projects/ProjectVishnu/ProjectVishnu/bin/Debug/net6.0/4138d8e8d2fa47e0bef8ac8eaae6b9a9.sh;
