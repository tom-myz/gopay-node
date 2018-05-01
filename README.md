[node]: https://nodejs.org/
[npm]: https://www.npmjs.com/
[yarn]: https://yarnpkg.com/
[webpack]: https://webpack.js.org/

[gopay-url]: https://gopay.jp/
[npm-url]: https://www.npmjs.com/package/gopay-node
[github-url]: https://github.com/gyro-n/gopay-node/
[github-issues-url]: https://github.com/gyro-n/gopay-node/issues
[github-pr-url]: https://github.com/gyro-n/gopay-node/pulls
[coveralls-url]: https://coveralls.io/github/gyro-n/gopay-node?branch=0.6.4
[license-url]: https://github.com/gyro-n/gopay-node/blob/master/LICENSE
[cla-url]: https://cla-assistant.io/gyro-n/gopay-node

[shield-node]: https://img.shields.io/node/v/gopay-node.svg
[shield-npm]: https://img.shields.io/npm/v/gopay-node.svg
[shield-downloads]: https://img.shields.io/npm/dm/gopay-node.svg
[shield-license]: https://img.shields.io/npm/l/gopay-node.svg
[shield-dependencies]: https://img.shields.io/david/gyro-n/gopay-node.svg
[shield-devDependencies]: https://img.shields.io/david/dev/gyro-n/gopay-node.svg
[shield-optionalDependencies]: https://img.shields.io/david/optional/gyro-n/gopay-node.svg
[shield-coverage]: https://img.shields.io/coveralls/github/gyro-n/gopay-node/0.6.4.svg
[shield-issues]: https://img.shields.io/github/issues/gyro-n/gopay-node.svg
[shield-pullRequests]: https://img.shields.io/github/issues-pr/gyro-n/gopay-node.svg
[shield-cla]: https://cla-assistant.io/readme/badge/gyro-n/gopay-node

gopay-node
==========

SDK library for [Node.js][node] to consume [GoPay][gopay-url] API.

[![NPM version][shield-npm]][npm-url]
[![Node.js version support][shield-node]][node]
[![Code coverage][shield-coverage]][coveralls-url]
![Dependencies][shield-dependencies]
![Dev Dependencies][shield-devDependencies]
![Optional Dependencies][shield-optionalDependencies]
[![GitHub Issues][shield-issues]][github-issues-url]
[![GitHub Pull Requests][shield-pullRequests]][github-pr-url]
[![CLA assistant][shield-cla]][cla-url]
[![MIT licensed][shield-license]][license-url]

Table of Contents
-----------------

  * [Requirements](#requirements)
  * [Installation](#installation)
  * [Usage](#usage)
    * [Customize](#customize)
    * [API Documentation](#api-documentation)
    * [TypeScript](#typescript)
    * [Browser Usage](#browser-usage)
  * [Contributing](#contributing)
  * [License](#license)


Requirements
------------

`gopay-node` requires the following to run:

  * [Node.js][node] 6.0+
  * [npm][npm] (normally comes with Node.js) or [yarn][yarn]


Installation
------------

Gopay Node SDK is easiest to use when installed with [npm][npm]:

```bash
npm install gopay-common
```
or with [yarn][yarn]:
```bash
yarn add gopay-common
```

Usage
-----

Just import the module into your code with, create an instance of it and you're set:

```javascript
import SDK from "gopay-node";

const sdk = new SDK();
```

### Customize

You can create your own `SDK` object configuration that only contains selected resources. In the following example show
how to prepare a class that only has `Stores` resources available:

```javascript
import { PaymentsSDK } from "gopay-node/sdk/PaymentsSDK";

import { Stores } from "gopay-node/resources";
// OR directly
import { Stores } from "gopay-node/resources/Stores";

class CustomSDK extends PaymentsSDK {
    constructor (options?: RestAPIOptions) {
        super(options);
        this.stores = new Stores(this.api);
    }
}

const customSdk = new CustomSDK();
```

### API Documentation

WIP

### TypeScript

The library is written in TypeScript and thus type definitions are already included. You can just import compnents of the SDK as usual.

### Browser usage

This module is primarily design for [Node.js][node] and is shipped with only ES6 version of the code. However it is possible
to use it in the browser when it is transpiled to ES5 by your bundle. The example configuration for [Webpack][webpack] requires
additional module which detectes `engines` field in the `package.json` file and transpiles the files of cherry picked modules
from `node_modules` even if this path is ignored (it should be) be default. I recommend one of the following plugins:
[webpack-babel-env-deps](https://www.npmjs.com/package/webpack-babel-env-deps) or [babel-engine-plugin](https://www.npmjs.com/package/babel-engine-plugin).


Contributing
------------

To contribute to `gopay-node`, clone this repo locally and commit your code on a separate branch. Please write unit tests for your code
and run the linter before opening a pull request:

```bash
npm test        # run the tests
```

```bash
npm run linter  # run the linter
```


License
-------

`gopay-node` is licensed under the [MIT][license-url] license.
Copyright &copy; 2018, [GoPay][gopay-url] Team
