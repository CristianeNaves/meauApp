FROM ubuntu:18.04

RUN apt-get update && \
  apt-get install -y  curl && \
  curl -fsSL https://deb.nodesource.com/setup_14.x | bash - && \
  apt-get install -y nodejs


COPY . /home/
WORKDIR /home/app

CMD [ "npm", "start" ]