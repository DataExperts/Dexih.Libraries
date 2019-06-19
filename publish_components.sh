pushd projects/components
npm version patch
if [ $? -ne 0 ]; then
    >&2 echo Build Failed
    exit 1
fi
popd

ng build Components
if [ $? -ne 0 ]; then
    >&2 echo Build Failed
    exit 1
fi

npm publish dist/components
if [ $? -ne 0 ]; then
    >&2 echo Publish Failed
    exit 1
fi
