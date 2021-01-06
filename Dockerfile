FROM ubuntu:latest

RUN apt-get update
RUN apt-get install npm
RUN apt-get install nodejs