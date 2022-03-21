#!/usr/bin/env bash
container_id=$(docker container ls | grep mongo | awk '{ print $1 }')

[[ -z $container_id ]] && echo "[-] Container ID not found" || docker exec -it $container_id mongo admin -u root -p rootpassword
