MAKEFLAGS = -j1


PKG_NAME     = $(shell node -pe 'require("./package.json").name')
PKG_VERSION  = $(shell node -pe 'require("./package.json").version')


DIR_BIN  = node_modules/.bin
DIR_COV  = test/coverage
DIR_DIST = ./dist


LINT_CMD      = $(DIR_BIN)/eslint
BABEL_CMD     = $(DIR_BIN)/babel-node
MOCHA_CMD     = $(DIR_BIN)/_mocha
ISPARTA_CMD   = $(DIR_BIN)/isparta cover
COVERALLS_CMD = $(DIR_BIN)/coveralls


# There is a dir named 'test', we need to set the `test` target as phony.
.PHONY: test


default: dev-server

dev-server: build
	node ./scripts/server.js


clean-dist:
	rm -rf $(DIR_DIST)


clean-cov:
	rm -rf $(DIR_COV)


clean: clean-dist clean-cov


lint:
	$(LINT_CMD) ./src --ext .js


build: clean-dist
	webpack
	webpack --config webpack.config.min.js


release: clean-dist
	webpack --config webpack.config.production.js
	webpack --config webpack.config.min.js
	zip $(DIR_DIST)/$(PKG_NAME)-$(PKG_VERSION).zip -j dist $(DIR_DIST)/*


test:
	$(BABEL_CMD) $(MOCHA_CMD) -R spec


test-cov: clean-cov
	$(BABEL_CMD) $(ISPARTA_CMD) $(MOCHA_CMD) --dir $(DIR_COV) -- -R spec


# push test coverage to https://coveralls.io
test-rpt:
	cat $(DIR_COV)/lcov.info | $(COVERALLS_CMD)
