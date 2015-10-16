make:
	make install
	make compile
	make test
install:
	npm install
compile:
	browserify src/index.js > dist/all.js
	node bin/2amd-build.js
	node bin/2amd-dist.js
release:
	uglifyjs dist/all.js > dist/all.min.js
	uglifyjs dist/all.amd.js > dist/all.amd.min.js
test:
	browserify spec/index.spec.js > spec/index.js
publish:
	npm publish
	cnpm sync zero-zgraph
server:
	sh bin/server.sh
all:
	make
	make publish
