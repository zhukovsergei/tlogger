up: docker-up
down: docker-down
downv: docker-down-clear
stop: docker-stop
build: docker-build
rest: down up
restv: downv up
restb: downv build-back up
restf: downv build-front up
bashf: frontend-bash
bashb: backend-bash
bf: build-front
bb: build-back
logsf: logs-front
logsb: logs-back
frinstall: frontend-deps-install

frontend-bash:
	docker compose --env-file .env exec -it frontend bash

backend-bash:
	docker compose --env-file .env exec -it backend bash

docker-up:
	docker compose --env-file .env up -d

docker-down:
	docker compose --env-file .env down --remove-orphans

docker-down-clear:
	docker compose --env-file .env down -v --remove-orphans

docker-stop:
	docker compose --env-file .env stop

docker-build:
	docker compose --env-file .env build --pull

frontend-deps-install:
	docker compose --env-file .env run --rm frontend-node-cli yarn install

build-front:
	docker compose --env-file .env build frontend

build-back:
	docker compose --env-file .env build backend

logs-front:
	docker compose --env-file .env logs frontend

logs-back:
	docker compose --env-file .env logs backend