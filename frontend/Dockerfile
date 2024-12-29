# Stage 1: Build the frontend
FROM node:18-alpine AS frontend-build

WORKDIR /app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy the source code
COPY . .

# Build the frontend application
RUN npm run build

# Stage 2: Serve with Nginx
FROM nginx:alpine

# Copy the build output from the first stage
COPY --from=frontend-build /app/dist /usr/share/nginx/html

# Expose the port that Nginx will use
EXPOSE 80
