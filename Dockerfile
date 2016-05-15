FROM nodesource/trusty

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install npm forever
RUN npm install forever -g

# Install app dependencies
COPY package.json /usr/src/app/
RUN npm install

# Bundle app source
COPY . /usr/src/app

# Start npm
RUN forever start server.js

# Install nginx
RUN echo "deb http://archive.ubuntu.com/ubuntu precise main universe" > /etc/apt/sources.list
RUN apt-get update
RUN apt-get -y install nginx

RUN echo "daemon off;" >> /etc/nginx/nginx.conf
RUN mkdir /etc/nginx/ssl
#ADD default /etc/nginx/sites-available/default

# Define working directory.
WORKDIR /etc/nginx

# Define default command.
CMD ["nginx"]

# Expose ports.
EXPOSE 80
EXPOSE 443