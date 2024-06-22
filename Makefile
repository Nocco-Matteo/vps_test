# Nome del progetto
PROJECT_NAME = myapp

# Docker Compose
DC =wsl docker compose

# Target di default
.PHONY: all
all: build up

# Costruisce tutti i container
.PHONY: build
build:
	$(DC) up --build -d

# Avvia tutti i container in background
.PHONY: up
up:
	$(DC) up -d

# Ferma tutti i container
.PHONY: down
down:
	$(DC) down

# Esegue un comando in un container specifico
.PHONY: exec
exec:
	$(DC) exec $(SERVICE) $(CMD)

# Visualizza i log di tutti i container
.PHONY: logs
logs:
	$(DC) logs -f

# Ricostruisce e riavvia i container
.PHONY: restart
restart: down build up

# Pulisce le immagini non utilizzate
.PHONY: clean
clean:
	docker system prune -f

# Visualizza lo stato dei container
.PHONY: ps
ps:
	$(DC) ps

# Esempio di target per migrazioni del database
.PHONY: migrate
migrate:
	$(DC) exec backend npm run migrate

# Esempio di target per lanciare i test
.PHONY: test
test:
	$(DC) exec backend npm test

# Variabili per eseguire comandi nei container
SERVICE = backend
CMD = /bin/bash
