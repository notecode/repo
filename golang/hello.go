package main

import "fmt"

type People struct {
	Name string
}

func (p *People) foo() {
	fmt.Printf("Hello, %s\n", p.Name)
}

type Man struct {
	*People
	Sex string
}

func (p *Man) bar() {
	fmt.Printf("%s is a %s\n", p.Name, p.Sex)
}

func main() {
	ptr := &People{
		Name: "NoteCode",
	}

	ptr.foo()

	ptr2 := &Man{
		People: &People{"Eric"},
		Sex:    "Man",
	}

	ptr2.bar()
}
