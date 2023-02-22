FROM oraclelinux:9

# RUN apt-get update
# RUN apt-get install python3.6

# RUN  yum -y install oracle-release-el7 oracle-nodejs-release-el7 && \
#      yum-config-manager --disable ol7_developer_EPEL && \
#      yum -y install oracle-instantclient19.3-basiclite nodejs && \
#      rm -rf /var/cache/yum

WORKDIR /myapp
COPY . /myapp
RUN npm install
RUN npm install typescript -g
RUN tsc
RUN node ./dist/app.js

CMD exec node ./dist/app.js