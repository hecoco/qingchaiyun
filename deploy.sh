set -e
yarn build
cp CNAME dist/
cd dist
git init
git add -A
git commit -m 'deploy'
git push -f git@github.com:hecoco/qingchaiyun-website.git master:gh-pages
cd -