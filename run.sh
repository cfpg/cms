#!/bin/sh
echo "Starting docker"
docker run -p 80:80 --name cms -v $(pwd):/usr/src/app -d cfpg/cms
docker ps