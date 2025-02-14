FROM node:18-alpine AS dev

WORKDIR /app

COPY package.json package-lock.json ./
COPY vite.config.ts ./
COPY tailwind.config.js postcss.config.js ./

RUN npm install

COPY . .

EXPOSE 5173

CMD ["npm", "run", "dev", "--", "--host"]
