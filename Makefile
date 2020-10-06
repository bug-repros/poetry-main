SHELL:=/usr/bin/env bash -O globstar

.PHONY: default
default: lint

.PHONY: lint
lint:
	poetry run mypy **/*.py