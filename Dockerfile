FROM node:15.14.0-alpine3.10 as build

WORKDIR /app

# Copy all files to image
COPY . .

# Install dependencies
RUN npm install

# Build app
RUN npm run build

FROM node:15.14.0-alpine3.10

WORKDIR /app

# COPY distribution folder content
COPY --from=build /app/dist/ .
COPY package*.json .

# Install dependencies
RUN npm install --only=prod

# Expose Port
EXPOSE 3000

# Execute application
CMD [ "node", "main.js" ]
