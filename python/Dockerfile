FROM python:alpine
ADD . /src
WORKDIR /src
RUN pip install -r requirements.txt
CMD ["python3", "index.py"]

RUN apk update \
  && apk add build-base