# Stage 1: Build Stage
FROM node:22-alpine AS build

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# Stage 2: Production Stage
FROM node:22-alpine

WORKDIR /app

COPY --from=build /app /app

EXPOSE 5000

CMD ["npm", "start"]
