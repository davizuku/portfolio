.PHONY: help

help:
	@echo "Available commands:"
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}; {printf "  make %-12s - %s\n", $$1, $$2}' | sort

run: install ## Start the application in a Docker container
	@docker-compose up -d web --build

install: ## Install dependencies inside the Docker container
	@docker-compose run --remove-orphans web npm install

stop: ## Stop the Docker container
	@docker-compose down web

log: ## Show application logs and follow output
	@docker-compose logs -f web

build: install ## Build the application
	@docker-compose run --remove-orphans web npm run build

init-db: ## Initialize the database
	@docker-compose run --remove-orphans web npm run initDb

clean: stop ## Clean up generated files and stop the container
	rm -rf node_modules .next

bash: ## Open a bash shell in the web container
	@docker-compose exec -it web bash

postgres: ## Open a bash shell in the database container
	@docker-compose exec -it database bash

git-hooks: ## Set up Git hooks
	echo "make build" > .git/pre-push
