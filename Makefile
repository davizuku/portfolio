
run-web-ui:
	@docker-compose up -d web-ui

enter-web-ui:
	@docker-compose exec -it web-ui bash

enter-llm-agent:
	@docker-compose exec -it llm-agent bash
