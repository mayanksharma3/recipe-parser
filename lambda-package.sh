npm run build
rm lambda.zip
rm -rf tmp
mkdir tmp
cp -a dist/. tmp
cp -r node_modules tmp
cp -r views tmp
cd tmp || exit 1
zip -r -D ../lambda.zip .
cd ..
#rm -rf tmp
