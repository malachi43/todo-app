#!/bin/bash

if [[ $1 == "stop" ]];then
   docker compose -f docker-compose.dev.yml down --volumes
   exit 0
fi

   docker compose -f docker-compose.dev.yml down --volumes
   docker compose -f docker-compose.dev.yml up

   exit 0
   