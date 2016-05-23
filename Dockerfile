FROM nodesource/trusty
MAINTAINER carlos@cfpg.me
ENV TERM dumb
ENV CURRENV dev

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# apt-get dependencies
# Install nginx, supervisord
RUN echo "deb http://archive.ubuntu.com/ubuntu precise main universe" > /etc/apt/sources.list
RUN apt-get update && apt-get -y install supervisor nginx

# Conf nginx
RUN mkdir /etc/nginx/ssl
ADD conf/nginx/default /etc/nginx/sites-available/default

# Install app dependencies
COPY package.json /usr/src/app/
RUN npm install && npm install forever -g

# Bundle app source
ADD . /usr/src/app

RUN mkdir -p /var/logs/forever

# supervisord conf
# keeps these daemons alive
COPY conf/supervisor/supervisord.conf /etc/supervisor/conf.d/supervisord.conf

# Start supervisord to take care of aliveness!
CMD ["/usr/bin/supervisord"]

# Expose ports.
EXPOSE 80
EXPOSE 443