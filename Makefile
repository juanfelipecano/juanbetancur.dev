REMOVE = rm -rf

init:
	npm install

clean:
	$(REMOVE) dist
	$(REMOVE) tmp
	$(REMOVE) .angular

deep-clean:
	$(REMOVE) dist
	$(REMOVE) tmp
	$(REMOVE) .angular
	$(REMOVE) node_modules

format:
	npx prettier --write .

check-format:
	npx prettier --check .
