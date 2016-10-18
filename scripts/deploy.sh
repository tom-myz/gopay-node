#!/bin/bash

VERSION=`node -e "console.log(require('./package.json').version);"`

npm run build
git tag "v${VERSION}"
git push origin --tags
npm publish
