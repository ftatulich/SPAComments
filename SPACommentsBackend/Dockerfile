# Використовуємо офіційний образ Python
FROM python:3.9-slim-buster

# Встановлюємо системні залежності
RUN apt-get update \
    && apt-get install -y nginx \
    && rm -rf /var/lib/apt/lists/*

# Копіюємо файли конфігурації
COPY nginx.conf /etc/nginx/nginx.conf

# Встановлюємо залежності Python
COPY requirements.txt /app/
WORKDIR /app
RUN pip install -r requirements.txt




# Копіюємо додаток Django
COPY . /app/
RUN python manage.py makemigrations
RUN python manage.py migrate

# Запускаємо Gunicorn та Nginx
CMD ["sh", "-c", "gunicorn SPAComments.wsgi:application -w 4 -b 0.0.0.0:8000 & nginx -g 'daemon off;'"]
