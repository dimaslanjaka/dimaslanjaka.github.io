cd ..
find . -name "node_modules" -exec rm -rf '{}' +; 
find . -name "package-lock.json" -exec rm -rf '{}' +;
find . -name "yarn.lock" -exec rm -rf '{}' +; 
