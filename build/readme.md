## Build Notes

## VERY EASY

Run from root of project
```sh
npm run build
```

## EASY

Run from root of project

```sh
docker build . -f ./build/Dockerfile -t hcl2-parser-build
mkdir -p $(pwd)/dist
docker run --rm -it -v $(pwd)/dist:/tmp/out hcl2-parser-build
```
