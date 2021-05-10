FROM openjdk:13-jdk-alpine3.10
LABEL maintainer="pierrejrpt@gmail.com"

ENV LANG C.UTF-8

RUN apk add --update bash

ADD target/*.jar /app/web-api.jar

CMD java -Dspring.profiles.active=oauth2-security,prod -jar /app/web-api.jar