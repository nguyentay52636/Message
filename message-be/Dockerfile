# Base image
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy package.json và package-lock.json trước (tối ưu cache)
COPY package*.json ./

# Cài dependencies
RUN npm install

# Copy toàn bộ source
COPY . .

# Expose cổng (sẽ lấy từ ENV trong compose)
EXPOSE 8000

# Lệnh chạy backend (dev)
CMD ["npm", "run", "dev"]
