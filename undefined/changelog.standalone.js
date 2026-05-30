const fs = require('fs')
const path = require('path')
const cp = require('cross-spawn')

const changelogPath = path.join(__dirname, 'changelog.txt')
const targetPath = path.join(__dirname, 'quiz.txt')

function runGit(args) {
  const result = cp.sync('git', args, {
    encoding: 'utf8',
    stdio: ['ignore', 'pipe', 'pipe']
  })

  if (result.status !== 0) {
    throw new Error(result.stderr || 'Git command failed')
  }

  return result.stdout.trim()
}

function generateChangelog(filePath) {
  const relativePath = path.relative(process.cwd(), filePath)

  const output = runGit([
    'log',
    '--follow',
    '--date=short',
    '--pretty=format:%H%x09%ad%x09%an%x09%s',
    '--',
    relativePath
  ])

  const commits = output
    .split('\n')
    .filter(Boolean)
    .map((line) => {
      const [hash, date, author, subject] = line.split('\t')

      return {
        hash,
        shortHash: hash.slice(0, 7),
        date,
        author,
        subject
      }
    })
    .filter((c) => !c.subject.includes('https://github.com/'))

  const markdown = [
  ]

  for (const commit of commits) {
    markdown.push(`- \`${commit.shortHash}\` ${commit.date}`)
    markdown.push('')
    markdown.push(`  ${commit.subject}`)
    markdown.push('')
  }

  fs.writeFileSync(changelogPath, markdown.join('\n'))
  console.log(`Changelog saved to ${changelogPath}`)
}

generateChangelog(targetPath)
