name: "linting-tool-scan"

on:
  push:
    branches: [githubcicd]

jobs:
  test:
    runs-on: ubuntu-latest

    strategy:
      matrix:
        node-version: [16.x]

    steps:
      - uses: actions/checkout@v2

      - name: Install Dependencies
        if: steps.cache-nodemodules.outputs.cache-hit != 'true'
        run: |
          npm ci --force

      - name: Installing JSHint
        run: |
          sudo npm install -g jshint

      - name: Change script permission
        run: |
          chmod +x scripts/jshint-script.sh

      - name: Run scan with JSHint
        run: scripts/jshint-script.sh

      - name: Archive production artifacts
        uses: actions/upload-artifact@v2
        with:
          name: linting tool report
          path: |
            ./JSHint-report
