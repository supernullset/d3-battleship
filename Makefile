DIR=/Users/supernullset/LocalCode/Programming-Languages/Javascript/d3-battleship
EXEC_BABEL=$(DIR)/bin/babel
EXEC_BROWSERIFY=$(DIR)/node_modules/browserify/bin/cmd.js

TEMPFILE=/tmp/babel-step.js
SRC_DIR=$(DIR)/src/
OUTPUT=$(DIR)/public/main.js

CMD=$(EXEC_BABEL) $(SRC_DIR) -o $(TEMPFILE) && $(EXEC_BROWSERIFY) $(TEMPFILE) -o $(OUTPUT) && rm $(TEMPFILE)

watch:
	find src/*.js | entr sh -c '$(CMD)'

