FROM node:18-alpine as base

#Creating app directory
WORKDIR /usr/src/app

#Insalling app dependencies
COPY package*.json ./
COPY prisma ./prisma/

#Installing dependencies
RUN npm ci

#Generate prisma client
RUN npx prisma generate

#Bundle app source
COPY . .

#Set NODE_ENV
ENV NODE_ENV production

#Expose port
EXPOSE 3000

#Wait for database to start
CMD ["sh", "-c", "npx prisma migrate deploy && node src/app/js"]
