pushd projects/table
npm version patch
if [ $? -ne 0 ]; then
    >&2 echo Build Failed
    exit 1
fi
popd

ng build Table
if [ $? -ne 0 ]; then
    >&2 echo Build Failed
    exit 1
fi

npm publish dist/table
if [ $? -ne 0 ]; then
    >&2 echo Publish Failed
    exit 1
fi
