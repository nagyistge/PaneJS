MAKEFLAGS = -j1


DIR_BIN  = node_modules/.bin
DIR_COV  = test/coverage
DIR_SRC  = ./src
DIR_DIST = ./dist


CMD_LINT      = $(DIR_BIN)/eslint
CMD_BABEL     = $(DIR_BIN)/babel-node
CMD_MOCHA     = $(DIR_BIN)/_mocha
CMD_ISPARTA   = $(DIR_BIN)/isparta cover
CMD_COVERALLS = $(DIR_BIN)/coveralls


.PHONY: dev-server clean clean-dist clean-cov lint build release test test-cov test-rpt


default: dev-server


dev-server: build
	node ./scripts/server.js


clean-dist:
	rm -rf $(DIR_DIST)


clean-cov:
	rm -rf $(DIR_COV)


clean: clean-dist clean-cov


lint:
	$(CMD_LINT) $(DIR_SRC) --ext .js


test:
	$(CMD_BABEL) $(CMD_MOCHA) -R spec


test-cov: clean-cov
	$(CMD_BABEL) $(CMD_ISPARTA) $(CMD_MOCHA) --dir $(DIR_COV) -- -R spec


# push test coverage to https://coveralls.io
test-rpt:
	cat $(DIR_COV)/lcov.info | $(CMD_COVERALLS)



build: clean-dist
	webpack
	webpack --config webpack.config.min.js



VERSION = $(shell node -pe 'require("./package.json").version')
release-patch: NEXT_VERSION = $(shell node -pe 'require("semver").inc("$(VERSION)", "patch")')
release-minor: NEXT_VERSION = $(shell node -pe 'require("semver").inc("$(VERSION)", "minor")')
release-major: NEXT_VERSION = $(shell node -pe 'require("semver").inc("$(VERSION)", "major")')


release-patch release-minor release-major: lint test build
	@printf "Current version is $(VERSION). This will publish version $(NEXT_VERSION). Press [enter] to continue." >&2
	@read nothing

	node -e "\
		var pkg = require('./package.json');\
		pkg.version = '$(NEXT_VERSION)';\
		var s = JSON.stringify(pkg, null, 2) + '\n';\
		require('fs').writeFileSync('./package.json', s);"

	git commit package.json -m 'Version $(NEXT_VERSION)'
	git tag -a "v$(NEXT_VERSION)" -m "Version $(NEXT_VERSION)"
	git push --tags origin HEAD:master
    npm publish
