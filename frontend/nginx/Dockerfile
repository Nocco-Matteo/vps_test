# Usa l'immagine di base di Nginx
FROM nginx:latest

# Aggiorna il sistema e installa i pacchetti necessari
RUN apt-get update && \
    apt-get upgrade -y

# Copia il file di configurazione di Nginx
COPY default.conf /etc/nginx/conf.d/default.conf

# Copia i file buildati del frontend
COPY ./build /usr/share/nginx/html

# Espone la porta 80
EXPOSE 80
