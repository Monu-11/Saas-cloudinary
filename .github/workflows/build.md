name: Build on PR

on:
pull_request:
branches: - main

jobs:
build:
runs-on: ubuntu-latest
steps: - uses: actions/checkout@v3 - name: Use Node.js
uses: action/setup-node@v3
with:
node-version: '20'

      - name: Install Dependencies
        run: npm install

      - name: Generate Prisma
        run: npx prisma generate

      - name: Check linting
        run: npm run lint

      - name: Check formatting
        run: npm run format

      - name: Run Build
        run: npm run build