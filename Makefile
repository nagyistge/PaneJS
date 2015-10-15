make:
	make install
	make compile
	make test
install:
	npm install
compile:
	npm run-script compile
release:
	npm run-script release
test:
	#make server
	npm test
publish:
	npm publish
	cnpm sync zero-zgraph
server:
	sh bin/server.sh
all:
	make
	make publish
