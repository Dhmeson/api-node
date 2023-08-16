# Use a imagem base do Node.js
FROM node:16

# Diretório de trabalho dentro do container
WORKDIR /app

# Copie o package.json e o package-lock.json para o diretório de trabalho
COPY package*.json ./

# Instale as dependências do projeto
RUN npm install

# Copie o restante do código-fonte para o diretório de trabalho
COPY . .
RUN npm run prisma

# Build do TypeScript
RUN npm run build

# Porta em que o aplicativo Node.js estará escutando
EXPOSE 3000

# Comando para iniciar o aplicativo
CMD ["node", "dist/src/main.js"]
