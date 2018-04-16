FROM node:9
COPY . /script/
WORKDIR /script/
RUN npm install
COPY entry.sh /entry.sh
RUN chmod +x /entry.sh
# RUN chmod +x /script/entry.sh
