#!/bin/bash
echo "开始安装环境"
npm install
echo "开始执行打包"

count=`pwd | grep BETA | wc -l`
if [ $count -gt 0 ]; then
echo "测试环境 npm run build-test"
npm run build-test
else
echo "正式环境 npm run build-prod"
npm run build-prod
fi
