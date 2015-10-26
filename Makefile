install:
	npm install
browserify:
	browserify src/index.js > dist/all.js
amd-build:
	node bin/2amd-build.js
amd-dist:
	node bin/2amd-dist.js
test:
	browserify spec/index.spec.js > spec/index.js
uglifyjs:
	uglifyjs dist/all.js > dist/all.min.js
	uglifyjs dist/all.amd.js > dist/all.amd.min.js
publish:
	npm publish
	cnpm sync zero-zgraph
server:
	sh bin/server.sh

make:
	make install
	make compile
	make test
compile:
	make browserify
	make amd-build
	make amd-dist
release:
	make compile
	make test
	make uglifyjs
all:
	make
	make release
	make publish
