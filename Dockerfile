FROM node:19-alpine

# the last slash tell docker to create the folder if it doesn't exist
COPY dist /app/

# SETS THE WORKING DIRECTORY TO THIS DIRECTORY
WORKDIR /app

# use run to run os commands
RUN npm install

# The last command that starts teh process, CMD is used to start the application

CMD ["node", "server.js"]

# the last dot is docker is located
# docker build -t node-app:1.0 .