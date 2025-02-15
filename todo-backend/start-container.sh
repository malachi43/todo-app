#!/bin/bash

#remove bind mount.
if [[ $1 == "stop" ]];then
docker compose -f docker-compose.dev.yml down --volumes
exit 0
fi

#initialize db and run in a detached mode (run in background)
docker compose -f docker-compose.dev.yml up