#! /bin/bash

./stop.sh
sudo docker rmi weather
sudo docker build -t weather .
sudo docker run -it --name weather -p 1965:1965 weather
