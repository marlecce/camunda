# Camunda PoC

## Run workflow engine

```bash
docker pull camunda/camunda-bpm-platform:latest
docker run -d --name camunda -p 8080:8080 camunda/camunda-bpm-platform:latest
```

then open the [browser](http://localhost:8080/camunda-welcome/index.html)

## Rest API

Camunda REST API are available [here](https://docs.camunda.org/rest/camunda-bpm-platform/7.21-SNAPSHOT/)
