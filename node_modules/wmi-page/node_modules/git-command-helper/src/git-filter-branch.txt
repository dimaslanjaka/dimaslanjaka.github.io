/*
bfg: https://rtyley.github.io/bfg-repo-cleaner/

# clone mirror
git clone --mirror git://example.com/some-big-repo.git

# bfg clean files bigger than 100M
java -jar bfg.jar --strip-blobs-bigger-than 100M some-big-repo.git

# Replace all passwords listed in a file (prefix lines 'regex:' or 'glob:' if required) with ***REMOVED*** wherever they occur in your repository :
bfg --replace-text passwords.txt  my-repo.git

# remove path from commit history
## using bfg
java -jar bfg.jar --delete-files <relative_path_to_file>
## using git-filter-branch
git filter-branch --force --index-filter "git rm -rf --cached --ignore-unmatch <relative_path_to_file>" --prune-empty --tag-name-filter cat -- --all

# reduce size
git reflog expire --expire=now --all && git gc --prune=now --aggressive

# push
git push origin --force --all
*/
