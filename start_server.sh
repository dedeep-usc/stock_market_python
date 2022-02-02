cmd="gunicorn --reload -b :9080 main:app --env NAKED_URL=http://127.0.0.1:9080/"
echo $cmd
echo
echo "Starting Dev Server..."
$cmd