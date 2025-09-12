#! Right now i'm not using it because this web is deploying on Vercel, I don't have my own server

# Official image of node
ARG NODE_VERSION=22.15.1
FROM node:${NODE_VERSION}-alpine

# Create or use directory inside de container (I choose the name /app)
WORKDIR /app

# Copy dependences files (to take advantage Docker's cache)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the project
COPY . .

# Generate Prisma client
RUN npx prisma generate

# Construct the application (this create /.next)
RUN npm run build

# Expose the port where is my app (coincide with compose.yaml)
EXPOSE 3000

# Command to start the server (["npm", "start"] is better than npm start)
CMD ["npm", "start"]
