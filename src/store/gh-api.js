import axios from 'axios'
import Parse from 'url-parse'
import Pattern from 'patterns'

const hostname = 'github.com'
const ghURL = 'https://api.github.com/'

let pattern = Pattern()
pattern.add('/{username}')
pattern.add('/{username}/{repo}')

function CustomError (resource, error) {
  this.name = 'CustomError'
  this.resource = resource
  this.status = error.response.status
  this.stack = (new Error()).stack
}

CustomError.prototype = Object.create(Error.prototype)
CustomError.prototype.constructor = CustomError

const getUser = (username) => {
  return axios.get(ghURL + 'users/' + username).catch((e) => { throw new CustomError('user', e) })
}

const getRepo = (username) => {
  return axios.get(ghURL + 'users/' + username + '/repos').catch((e) => { throw new CustomError('repo', e) })
}

const getIssues = (repo, username) => {
  return axios.get(ghURL + 'repos/' + username + '/' + repo + '/issues').catch((e) => { throw new CustomError('issue', e) })
}

const getURL = (rawURL) => {
  let url = Parse(rawURL)
  let match = pattern.match(url.pathname)
  let returnPromise, returnType
  let repoPromise, issuePromise, userPromise

  if (url.hostname === hostname && match) {
    let username = match.params.username
    let repo = match.params.repo
    // IF repo match -> get repo and issues
    if (repo) {
      repoPromise = getRepo(username)
      issuePromise = getIssues(repo, username)
      returnPromise = [repoPromise, issuePromise]
      returnType = 'repo'
    // ELSE if there is only user -> get user and list of repos
    } else if (username) {
      repoPromise = getRepo(username)
      userPromise = getUser(username)
      returnPromise = [repoPromise, userPromise]
      returnType = 'user'
    }
  } else {
    let p = new Promise((resolve, reject) => reject('no match'))
    return { promises: [p] }
  }

  return { promises: returnPromise, type: returnType }
}

export { getURL as apiURL }
