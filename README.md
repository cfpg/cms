# cms
Site builder and site delivery architecture, for Content Publishing

## QuickStart
El inicio rapido instala el environment en tu computadora local, necesitas node, npm, git funcionando en tu computadora. Este proceso te va a permitir desarrollar localmente en tu misma computadora e incluye un live reload de node para actualizar los cambios en el servidor
- git clone
- npm install
- grunt
- Visita http://localhost:3344/

## Setup
- git clone
- Instala docker 
- Inicia el docker daemon: `docker-machine start default`
- Ejecuta eval `eval "$(docker-machine env default)"`
- Haz `docker ps` para verificar, debe aparecer una lista/tabla vacia
- Inicia la imagen: `docker run -p 80:80 --name cms -v $(pwd):/usr/src/app -d cfpg/cms`
- Go to http://192.168.99.100/

## SSH
- Para hacer ssh login a la imagen corriendo `docker exec -ti cms bash`
- If trouble, run docker ps and verify the container name on the rightmost column

*** 

## ./run.sh
El script anterior te permite realizar varias tareas en tu entorno de desarrollo. Utilizalo para iniciar tu docker si no lo tienes activo.

## Deployment
- ssh into co.sutil.mx
- Change directory to `/usr/src/app`
- git pull or checkout any branch (currently working of master)
- node automatically updates the code

## Development
- To add a new route/view, add it to src/routes.json passing SiteCtrl for site views, add the same route to your component routes object

***

## Detalles
- El framework `_underscore` esta disponible bajo el nombre `obj`
- Utilizamos templates de underscore, escritos en disco

## Known Issues
- App crashes every other request as it doesn't find the site and tries to fetch the page without an id

## Troubleshooting Docker
- If you see a message that the Container Name already exists and it returns an ID, you need to remove that Container ID before launching a new one
- - docker: Error response from daemon: Conflict. The name "/cms" is already in use by container 89f55652c1860b0b2d57b8d40e706918f3defa8a7d858119ba5ed9dd2544fc27. You have to remove (or rename) that container to be able to reuse that name..
- - `docker rm 89f55652c1860b0b2d57b8d40e706918f3defa8a7d858119ba5ed9dd2544fc27`
- When making changes to Dockerfile/image remember to Build the Container with `docker build -t cfpg/cms .`