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

ps 86489;
while [ $? -eq 0 ];
do
  sleep 1;
  ps 86489 > /dev/null;
done;

for child in $(list_child_processes 86498);
do
  echo killing $child;
  kill -s KILL $child;
done;
rm /Users/lmartins/Documents/Projects/ProjectVishnu/ProjectVishnu/bin/Debug/net6.0/2266c2e11545466095598b6a42723ec0.sh;
