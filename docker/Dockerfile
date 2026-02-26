FROM mcr.microsoft.com/playwright:v1.50.0-jammy

WORKDIR /app

# Node deps
COPY package*.json ./
RUN npm ci

# Python deps (if you have requirements.txt)
COPY requirements.txt ./requirements.txt
RUN python3 -m pip install --no-cache-dir -r requirements.txt || true

# Project
COPY . .

# Default: run smoke against your site
CMD ["bash", "-lc", "npm run smoke"]