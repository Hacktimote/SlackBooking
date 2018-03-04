#!/bin/bash
if [[ -z "$@" ]]; then
    cmd=bash
else
    cmd=$@
fi

docker-compose run client $cmd
