
read here : https://www.linux.com/training-tutorials/using-tesseract-ubuntu/

change wget section with below code
```bash
cd ~
wget http://www.leptonica.org/source/leptonica-1.81.1.tar.gz
tar -zxvf leptonica-1.81.1.tar.gz
cd leptonica-1.81.1
./configure
make
sudo checkinstall
sudo ldconfig
```