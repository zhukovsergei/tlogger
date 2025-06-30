up: docker-up
down: docker-down
downv: docker-down-clear
stop: docker-stop
build: docker-build
rest: down up
restv: downv up
restb: down build up
bashf: frontend-bash
bashb: backend-bash
bf: build-front
bb: build-back
logsf: logs-front
logsb: logs-back
frinstall: frontend-deps-install

frontend-bash:
	docker compose exec -it frontend bash

backend-bash:
	docker compose exec -it backend bash

docker-up:
	docker compose up -d

docker-down:
	docker compose down --remove-orphans

docker-down-clear:
	docker compose down -v --remove-orphans

docker-stop:
	docker compose stop

docker-build:
	docker compose build --pull

frontend-deps-install:
	docker compose run --rm frontend-node-cli yarn install

build-front:
	docker compose build frontend

build-back:
	docker compose build backend

logs-front:
	docker compose logs frontend

logs-back:
	docker compose logs backend