#!/bin/bash

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PARENT_DIR="$(dirname "$SCRIPT_DIR")"

cd "$PARENT_DIR" || { echo "Failed to change directory to $PARENT_DIR"; exit 1; }

# Clean up existing node_modules directory if it exists
if [[ -d "node_modules" ]]; then
  echo "Removing existing node_modules directory..."
  rm -rf node_modules
else
  echo "No node_modules directory found. Skipping removal."
fi

YARN_VERSION=""

# Check if 'yarn' command exists
if ! command -v yarn &> /dev/null; then
    echo "Warning: 'yarn' command not found. Skipping Yarn version check."
else
    # Get and display Yarn version
    YARN_VERSION=$(yarn --version)
    echo "Yarn is installed. Version: $YARN_VERSION"
fi

# clean install
# yarn install --production=true --immutable --immutable-cache --check-cache --frozen-lockfile --check-files
# npm ci --omit=dev --production

if [[ -f "yarn.lock" ]]; then
  if [[ "$YARN_VERSION" == 1.* ]]; then
    echo "Yarn v1 detected. Running 'yarn install --production=true'..."
    yarn install --production=true
  else
    echo "Yarn v2 or later detected. Running 'yarn install --immutable --immutable-cache --check-cache'..."
    yarn install --immutable --immutable-cache --check-cache
  fi
else
  echo "No yarn.lock file found. Running 'npm ci --omit=dev --production'..."
  npm ci --omit=dev --production
fi
