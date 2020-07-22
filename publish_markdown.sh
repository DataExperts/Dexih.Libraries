pushd projects/markdown
npm version patch
if [ $? -ne 0 ]; then
    >&2 echo Build Failed
    exit 1
fi
popd

ng build Markdown
if [ $? -ne 0 ]; then
    >&2 echo Build Failed
    exit 1
fi

npm publish dist/markdown
if [ $? -ne 0 ]; then
    >&2 echo Publish Failed
    exit 1
fi
