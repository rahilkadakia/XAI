FROM python:3.8

EXPOSE 5000

# Set display port as an environment variable
ENV DISPLAY=:99

COPY . /app
WORKDIR /app

RUN pip install --upgrade pip

RUN pip install -r requirements.txt

CMD ["python", "app.py"]