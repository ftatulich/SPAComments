## Use an official Python runtime as a parent image
#FROM python:3.9-alpine
#
## Set the working directory to /app
#WORKDIR /app
#
## Copy the requirements file to the working directory
#COPY requirements.txt .
#
## Install any needed packages specified in requirements.txt
#RUN pip install --no-cache-dir -r requirements.txt
#
## Copy the rest of the application code to the working directory
#COPY . .
#
## Set the environment variables for the application
#ENV PYTHONUNBUFFERED=1
#ENV DJANGO_SETTINGS_MODULE=SPAComments.settings
#
## Expose port 8000 for the application to run on
#EXPOSE 8000
#
## Set the command to start the application
#CMD ["gunicorn", "SPAComments.wsgi:application", "--bind", "0.0.0.0:8000"]
#
## Налаштовуємо Nginx
#FROM nginx:latest
#
## Копіюємо конфігураційний файл
#COPY nginx.conf /etc/nginx/nginx.conf
#
## Відкриваємо порти
#EXPOSE 80 443

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

# Запускаємо Gunicorn та Nginx
CMD ["sh", "-c", "gunicorn SPAComments.wsgi:application -w 4 -b 0.0.0.0:8000 & nginx -g 'daemon off;'"]
