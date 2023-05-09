### Hexlet tests and linter status:
[![Actions Status](https://github.com/DieWerkself/frontend-project-46/workflows/hexlet-check/badge.svg)](https://github.com/DieWerkself/frontend-project-46/actions)
[![Maintainability](https://api.codeclimate.com/v1/badges/f57ddea7b88719105c23/maintainability)](https://codeclimate.com/github/DieWerkself/frontend-project-46/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/f57ddea7b88719105c23/test_coverage)](https://codeclimate.com/github/DieWerkself/frontend-project-46/test_coverage)

 ## Difference calculator
 
Utility for finding differences in configuration files.

## **_Min specs:_**

> Node.js v13 and above.
> Windows 10 with WSL or macOS 10.15+ or any current linux distributive.

## **_Installing instructions:_**

Just clone this repository to your machine using

```
git clone <ssh/url>
```

Open a 'frontend-project-46' directory, then enter

```
make install
```

and

```
npm link
```

or

```
sudo npm link
```

in your console. Congratulations! Now you are ready to use.

## Find difference between flat JSON files
``` 
gendiff __fixtures__/file1.json __fixtures__/file2.json 
```
[![asciicast](https://asciinema.org/a/HKKHrklu6ZtigdNfEy55yXya8.svg)](https://asciinema.org/a/HKKHrklu6ZtigdNfEy55yXya8)

## Find difference between flat YAML files
```
gendiff __fixtures__/file1.yml __fixtures__/file2.yml 
```
[![asciicast](https://asciinema.org/a/FXM2iLtKkOLktC31G6TTCPjGp.svg)](https://asciinema.org/a/FXM2iLtKkOLktC31G6TTCPjGp)

## Find difference between nested JSON files and show in stylish format
```
gendiff -f stylish __fixtures__/file1.json __fixtures__/file2.json
```
[![asciicast](https://asciinema.org/a/3s6hkovzFLSk3fZmFWtuyZJ7N.svg)](https://asciinema.org/a/3s6hkovzFLSk3fZmFWtuyZJ7N)

## Find difference between nested YAML files and show in plain format
```
gendiff -f plain __fixtures__/file1.yml __fixtures__/file2.yml
```
[![asciicast](https://asciinema.org/a/koYuYkv1b7lClFXpJLHiE6VLz.svg)](https://asciinema.org/a/koYuYkv1b7lClFXpJLHiE6VLz)

## Find difference between nested YAML or JSON files and show in JSON format
```
gendiff -f json __fixtures__/file1.json __fixtures__/file2.yml
```
[![asciicast](https://asciinema.org/a/7FuStLsoi32fCmtHOVvQvxv60.svg)](https://asciinema.org/a/7FuStLsoi32fCmtHOVvQvxv60)
