# cms
Site builder and site delivery architecture, for Content Publishing

## Setup
- git clone
- docker run -p 80:80 --name cms -v $(pwd):/usr/src/app -d cfpg/cms
- Go to http://192.168.99.100/

## SSH
- docker exec -ti cms bash
- If trouble, run docker ps and verify the container name on the rightmost column