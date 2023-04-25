/*
rebase recursive ours or theirs

git rebase --strategy-option theirs ${branch} # Long option
git rebase -X theirs ${branch} # Short option
git rebase --strategy recursive --strategy-option theirs ${branch} # Long Option

source: https://stackoverflow.com/a/4273436
*/
