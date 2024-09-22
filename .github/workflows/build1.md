name: Build on PR

on:
pull_request:
branches: - main

jobs:
build:
runs-on: ubuntu-latest
steps: - uses: actions/checkout@v3

      - name: Cache Node.js modules
        uses: actions/cache@v3
        with:
          path: node_modules
          key: ${{ runner.os }}-node-${{ hashFiles('package-lock.json') }}
          restore-keys: |
            ${{ runner.os }}-node-

      - name: Use Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '20'

      - name: Install Dependencies
        run: npm ci # Use `npm ci` for clean installs when using package-lock.json

      - name: Generate Prisma
        run: npx prisma generate

      - name: Check linting
        run: npm run lint

      - name: Check formatting
        run: npm run format

      - name: Run Build
        run: npm run build
