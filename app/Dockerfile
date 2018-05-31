FROM node:10

EXPOSE 3030

WORKDIR /home/dev/lazy-jar
COPY ./ /home/dev/lazy-jar
RUN npm install
CMD ["npm", "start"]