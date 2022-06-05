git config --global gui.encoding utf-8
git remote -v
git add --all
git commit -m "Initial commit"
git rebase origin/master
git pull
git push -u origin master