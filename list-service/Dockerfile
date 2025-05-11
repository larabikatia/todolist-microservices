FROM openjdk:21-jdk-slim
WORKDIR /app
COPY target/list-service-0.0.1-SNAPSHOT.jar list-service.jar
EXPOSE 8083
ENTRYPOINT ["java", "-jar", "list-service.jar"]