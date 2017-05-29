'use strict'

const icon = require('../cerebro-fanfou.png')
const Fanfou = require('fanfou-sdk')
const homedir = require('homedir')
const fs = require('fs')

const filePath = `${homedir()}/.cerebro-fanfou/config.json`

const plugin = (scope) => {
  const input = scope.term.trim()
  const args = input.split(' ')
  const query = args.slice(1).join(' ')
  const home = {
    title: '饭否',
    subtitle: '你在做什么？',
    icon
  }

  if (args[0] === 'ff') {
    if (input.length === 0) scope.display(home)
    if (args.length === 4) {
      switch (args[1]) {
        case 'config':
          const key = args[2]
          const secret = args[3]
          scope.display({
            title: '饭否',
            subtitle: '配置 Consumer Key 与 Consumer Secret',
            icon,
            onSelect: () => {
              createConfig({
                consumer_key: key,
                consumer_secret: secret
              })
            }
          })
          break
        case 'login':
          const username = args[2]
          const password = args[3]
          const config = readConfig()
          scope.display({
            title: '饭否',
            subtitle: '登录饭否账号',
            icon,
            onSelect: () => {
              const ff = new Fanfou({
                auth_type: 'xauth',
                consumer_key: config.consumer_key,
                consumer_secret: config.consumer_secret,
                username: username,
                password: password
              })
              ff.xauth((e, res) => {
                if (!e) {
                  const oauthToken = res.oauth_token
                  const oauthTokenSecret = res.oauth_token_secret
                  config.oauth_token = oauthToken
                  config.oauth_token_secret = oauthTokenSecret
                  createConfig(config)
                }
              })
            }
          })
          break
        default:
          scope.display({
            title: '饭否',
            subtitle: `${query.length} 字`,
            icon,
            onSelect: () => post(query)
          })
          break
      }
    } else {
      scope.display({
        title: '饭否',
        subtitle: `${query.length} 字`,
        icon,
        onSelect: () => post(query)
      })
    }
  }
}

function createConfig (content) {
  fs.mkdir(`${homedir()}/.cerebro-fanfou/`, () => {
    fs.writeFileSync(filePath, JSON.stringify(content))
  })
}

function readConfig () {
  return JSON.parse(fs.readFileSync(filePath, 'utf8', 'r'))
}

function post (text) {
  const config = readConfig()
  const ff = new Fanfou({
    auth_type: 'oauth',
    consumer_key: config.consumer_key,
    consumer_secret: config.consumer_secret,
    oauth_token: config.oauth_token,
    oauth_token_secret: config.oauth_token_secret
  })
  ff.post('/statuses/update', {status: text}, () => {})
}

module.exports = {
  fn: plugin
}
