SRC = $(shell find src  -name "*.js" -type f | sort)
SRC_IDX = src/index.js
BUNDLE_STD ?= node "node_modules/webpack/bin/webpack.js" --progress
BUNDLE_DEV ?= node "node_modules/webpack-dev-server/bin/webpack-dev-server.js" --port 9999 --progress

dist/simple360player.js: $(SRC_IDX) $(SRC)
	@$(BUNDLE_STD) $< $@

dist/simple360player.min.js: $(SRC_IDX) $(SRC)
	@CP_PROD=true $(BUNDLE_STD) $< dist/simple360player.tmp.js
	@closure-compiler --language_in=ECMASCRIPT5 --compilation_level SIMPLE_OPTIMIZATIONS --js dist/simple360player.tmp.js > $@
	@rm dist/simple360player.tmp.js

all: dist/simple360player.js dist/simple360player.min.js

build: dist/simple360player.js

min: dist/simple360player.min.js

clean:
	@rm -f dist/simple360player.js
	@rm -f dist/simple360player.min.js

lint:
	@./node_modules/.bin/eslint $(SRC)

dev: $(SRC_IDX) $(SRC)
	@$(BUNDLE_STD) -w $< dist/simple360player.js

demo:
	@$(BUNDLE_STD) --config webpack-demo.config.js -w

.PHONY: all build min clean lint demo
