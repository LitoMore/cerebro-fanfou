# cerebro-fanfou

A Cerebro plugin for Fanfou

## Installation

Type `plugins fanfou` in Cerebro

Then click `install`

![](images/cerebro-fanfou-install.png)

**Manual Install**

1. Go to the plugin path

  - Windows

```bash
$ cd %APPDATA%/Cerebro/plugins
```

  - Linux

```bash
$ cd $XDG_CONFIG_HOME/Cerebro/plugins
# or
$ cd ~/.config/Cerebro/plugins
```

  - macOS

```bash
$ cd ~/Library/Application Support/Cerebro/plugins
```

2. Install `cerebro-fanfou` plugin

```bash
$ npm install cerebro-fanfou --save
```

## Usage

1. Config

```
ff config CONSUMER_KEY CONSUMER_SECRET
```

2. Login

```
ff login USERNAME PASSWORD
```

3. Post

```
ff Hello Fanfou
```

Enjoy it! :]

## Related

* [fanfou-sdk](https://github.com/LitoMore/fanfou-sdk-node) - Fanfou SDK for Node.js
* [Cerebro](https://github.com/KELiON/cerebro) – main repo for Cerebro app;
* [cerebro-plugin](https://github.com/KELiON/cerebro-plugin) – boilerplate to create plugins for Cerebro app.

## License

MIT @ [LitoMore](https://github.com/LitoMore)
