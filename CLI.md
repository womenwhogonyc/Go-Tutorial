To get a little more comfortable writing and running programs in Go here's an example on how to build a small madlib program using the command line

First create a file and name it `madlib.go` 

Then in the main package create the function `main`. Now print out the line "Mad lib program!". Your code should now look like:

```go
package main

import "fmt"

func main() {
	fmt.Println("Mad lib program!")
	}
```

```go
package main

import "fmt"

func main() {
	fmt.Println("Mad lib program!")
	fmt.Println("Give me a noun!: ")
	var noun string
	var verb string
	var adjective string
	var noun2 string
	fmt.Scanln(&noun)
	fmt.Println("Give me a verb!: ")
	fmt.Scanln(&verb)
	fmt.Println("Give me an adjective!: ")
	fmt.Scanln(&adjective)
	fmt.Println("Give me another noun!: ")
	fmt.Scanln(&noun2)

	fmt.Println(fmt.Sprintf("The %v %v to the %v %v", noun, verb, adjective, noun2))
}
```
