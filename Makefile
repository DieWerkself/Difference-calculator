install: 
		npm ci
gendiff:
		node bin/gendiff.js
publishh:
		npm publish --dry-run
lint:
		npx eslint .