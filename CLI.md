## Build a Mad Lib program in Go!


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

Okay now let's save an input from the command line. First we want to create a variable to assign the command line input to. Let's call the variable `word` and make it a string.

```go

func main() {
	var word string	
}

```
Now we can tell the user to enter a word into the command line by printing out "Give me a word!: "

```go

func main() {
	var word string	
	fmt.Println("Give me a word!: ")
}

```

In order to retrieve the command line input we can use the `fmt` package's function `Scanln` which reads from `os.Stdin` and stops at a new line. We can then save that input into `word`.

```go

func main() {
	var word string	
	fmt.Println("Give me a word!: ")
	fmt.Scanln(&word)

	fmt.Println("The word that was inputted was: ", word)
}

```

Now if you run the program you should be able to see what was inputted into the command line.

Great! Now that you know how to save a command line input into a variable as well as print out that variable we can make our mad lib program.

First let's create our variables:

```go

func main() {
	var noun string
	var verb string
	var adjective string
	var noun2 string
}

```

Now let's tell the user what to input and then save each of the inputs into our variables by using the `fmt.Scanln` function :

```go

func main() {
	var noun string
	var verb string
	var adjective string
	var noun2 string


	fmt.Println("Mad lib program!")

	fmt.Println("Give me a noun!: ")
	fmt.Scanln(&noun)

	fmt.Println("Give me a verb!: ")
	fmt.Scanln(&verb)

	fmt.Println("Give me an adjective!: ")
	fmt.Scanln(&adjective)

	fmt.Println("Give me another noun!: ")
	fmt.Scanln(&noun2)
}

```

After this all you have to do is formulate a sentence using the user's input.

```go

func main() {
	var noun string
	var verb string
	var adjective string
	var noun2 string


	fmt.Println("Mad lib program!")

	fmt.Println("Give me a noun!: ")
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

Awesome! Your program should look like this now:

```go

package main

import "fmt"

func main() {
	var noun string
	var verb string
	var adjective string
	var noun2 string


	fmt.Println("Mad lib program!")

	fmt.Println("Give me a noun!: ")
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
