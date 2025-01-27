
run-dev:
	@docker run -v .:/app -w /app -p 3000:3000 -it node npm run dev
