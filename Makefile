DOCKER_EXEC = docker exec -it meauapp_app_1 bash
up:
	docker-compose up
down:
	docker-compose down
bash:
	$(DOCKER_EXEC)
install:
	$(DOCKER_EXEC) -c "npm install --legacy-peer-deps"
build:
	docker-compose build