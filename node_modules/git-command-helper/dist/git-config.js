/*
Pulling without specifying how to reconcile divergent branches is discouraged. You can squelch this message by running one of the following commands sometime before your next pull:

git config pull.rebase false     # merge (the default strategy)
git config pull.rebase true      # rebase
git config pull.ff only               # fast-forward only

You can replace "git config" with "git config --global" to set a default preference for all repositories. You can also pass --rebase, --no-rebase, or --ff-only on the command line to override the configured default per invocation.
*/
/*
Get global config
- https://stackoverflow.com/a/12254105

git config --list --show-origin --show-scope

*/
/*
Disable EOL Conversion
- https://stackoverflow.com/a/21822812

make sure core.autocrlf is set to false for all repos:

git config --global core.autocrlf false

fix EOL (git 2.6)

git add --renormalize .

check eol transformation (git 2.8)

git ls-files --eol
*/
//# sourceMappingURL=git-config.js.map