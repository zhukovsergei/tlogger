up: docker-up
down: docker-down
downv: docker-down-clear
stop: docker-stop
build: docker-build
rest: down up
restv: downv up
restb: down build up
bash: docker-bash

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
