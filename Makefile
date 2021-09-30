.PHONY: default build clean

default: clean build

clean:
	rm -r templates/*

build:
	go run main.go -y yaml -g -o templates -s -f README.md
