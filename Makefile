SRC = $(shell find src  -name "*.js" -type f | sort)
SRC_IDX = src/index.js
BUNDLE_STD ?= node "node_modules/webpack/bin/webpack.js" --progress
BUNDLE_DEV ?= node "node_modules/webpack-dev-server/bin/webpack-dev-server.js" --port 9999 --progress

dist/simple-360-player.js: $(SRC_IDX) $(SRC)
	@$(BUNDLE_STD) $< $@

dist/simple-360-player.min.js: $(SRC_IDX) $(SRC)
	@CP_PROD=true $(BUNDLE_STD) $< dist/simple-360-player.tmp.js
	@closure-compiler --language_in=ECMASCRIPT5 --compilation_level SIMPLE_OPTIMIZATIONS --js dist/simple-360-player.tmp.js > $@
	@rm dist/simple-360-player.tmp.js

all: dist/simple-360-player.js dist/simple-360-player.min.js

build: dist/simple-360-player.js

min: dist/simple-360-player.min.js

clean:
	@rm -f dist/simple-360-player.js
	@rm -f dist/simple-360-player.min.js

lint:
	@./node_modules/.bin/eslint $(SRC)

dev: $(SRC_IDX) $(SRC)
	@$(BUNDLE_STD) -w $< dist/simple-360-player.js

demo:
	@$(BUNDLE_STD) --config webpack-demo.config.js -w

.PHONY: all build min clean lint demo
