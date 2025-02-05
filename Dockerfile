# Step 1: Use the official Node.js image
FROM node:18

# Step 2: Set the working directory inside the container
WORKDIR /src

# Step 3: Copy the package.json and package-lock.json (or yarn.lock) to install dependencies first
COPY package*.json ./

# Step 4: Install dependencies
RUN npm install

# Step 5: Copy the rest of your project files to the container
COPY . .

# Step 6: Expose the port for the development server
EXPOSE 3000

# Step 7: Start the Vite development server
CMD ["npm", "run", "dev"]
