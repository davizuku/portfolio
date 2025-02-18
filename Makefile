
run: install
	@docker-compose up -d web --build

install:
	@docker-compose run --remove-orphans web npm install

stop:
	@docker-compose down web

build: install
	@docker-compose run --remove-orphans web npm run build

clean: stop
	rm -rf node_modules .next

bash:
	@docker-compose exec -it web bash

postgres:
	@docker-compose exec -it database bash

git-hooks:
	echo "make build" > .git/pre-push
