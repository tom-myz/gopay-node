[node]: https://nodejs.org/
[npm]: https://www.npmjs.com/
[yarn]: https://yarnpkg.com/
[webpack]: https://webpack.js.org/
[rollup]: https://rollupjs.org/

[gopay-url]: https://gopay.jp/
[npm-url]: https://www.npmjs.com/package/gopay-node
[github-url]: https://github.com/gyro-n/gopay-node/
[github-issues-url]: https://github.com/gyro-n/gopay-node/issues
[github-pr-url]: https://github.com/gyro-n/gopay-node/pulls
[coveralls-url]: https://coveralls.io/github/gyro-n/gopay-node?branch=0.6.18
[license-url]: https://github.com/gyro-n/gopay-node/blob/master/LICENSE
[cla-url]: https://cla-assistant.io/gyro-n/gopay-node
[es-module-url]: https://npmjs.com/package/gopay-node-es
[es-url]: http://www.ecma-international.org/ecma-262/6.0/
[tree-url]: https://developer.mozilla.org/en-US/docs/Glossary/Tree_shaking

[shield-node]: https://img.shields.io/node/v/gopay-node.svg
[shield-npm]: https://img.shields.io/npm/v/gopay-node.svg
[shield-downloads]: https://img.shields.io/npm/dm/gopay-node.svg
[shield-license]: https://img.shields.io/npm/l/gopay-node.svg
[shield-dependencies]: https://img.shields.io/david/gyro-n/gopay-node.svg
[shield-devDependencies]: https://img.shields.io/david/dev/gyro-n/gopay-node.svg
[shield-optionalDependencies]: https://img.shields.io/david/optional/gyro-n/gopay-node.svg
[shield-coverage]: https://img.shields.io/coveralls/github/gyro-n/gopay-node/0.6.18.svg
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
npm install gopay-node
```
or with [yarn][yarn]:
```bash
yarn add gopay-node
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

This module is primarily design for [Node.js][node], However it is possible
to use it in the browser when it is transpiled by a bundler such as [Webpack][webpack] or [Rollup][rollup].

For optimizing your build and making it smaller you can also use a module [`gopay-node-es`][es-module-url] which is exported
as [ES][es-url] module and thus supports [Tree shaking][tree-url].


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
