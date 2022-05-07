# shortcut commands

## Installation
### Linux
```bash
sudo gedit ~/.bashrc
```
add following codes to end of file
```bash
if [ -d "./bin" ] ; then
    export PATH="$PATH:./bin"
fi
if [ -d "./node_modules/.bin" ] ; then
    export PATH="$PATH:./node_modules/.bin"
fi
```
