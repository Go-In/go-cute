FROM python:3

RUN mkdir /script
WORKDIR /script

ADD db_experiment.py /script
ADD requirements.txt /script

RUN pip install --no-cache-dir -r requirements.txt
