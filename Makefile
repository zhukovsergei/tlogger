reball: rebuild-all
rebuild-all: downv build up

up: docker-up
down: docker-down
rest: down up

restb: docker-restart-back
restf: docker-restart-front
restbv: downv docker-restart-back
restfv: downv docker-restart-front

downv: docker-down-clear

bashf: frontend-bash
bashb: backend-bash
bf: build-front
bb: build-back
logsf: logs-front
logsb: logs-back
frinstall: frontend-deps-install
stop: docker-stop


# ==============================================================================
#                      CORE
# ==============================================================================
docker-up:
	docker compose --env-file .env up -d

docker-down:
	docker compose --env-file .env down --remove-orphans

docker-down-clear:
	docker compose --env-file .env down -v --remove-orphans

docker-restart-front:
	docker compose --env-file .env up -d --build frontend

docker-restart-back:
	docker compose --env-file .env up -d --build backend

docker-stop:
	docker compose --env-file .env stop

frontend-bash:
	docker compose --env-file .env exec -it frontend bash

backend-bash:
	docker compose --env-file .env exec -it backend bash

build-front:
	docker compose --env-file .env build frontend

build-back:
	docker compose --env-file .env build backend

logs-front:
	docker compose --env-file .env logs frontend

logs-back:
	docker compose --env-file .env logs backend