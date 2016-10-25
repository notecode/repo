#!/bin/sh

foo() {
	echo 'foo' $1
}

function bar() {
	echo 'bar' $1
}

foo
bar

foo 'abc'
bar '123'
