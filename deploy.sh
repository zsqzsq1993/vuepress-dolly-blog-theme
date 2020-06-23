#!/usr/bin/env sh

# 确保脚本抛出遇到的错误
set -e

# 生成静态文件
npm run build

# 更新theme
git add .
git commit -m 'edit or publish blogs'
git push origin master

# 更新dist
cd ../dist

git init
git add -A
git commit -m 'edit or publish blogs'

git push -f https://github.com/zsqzsq1993/zsqzsq1993.github.io.git master

cd -
