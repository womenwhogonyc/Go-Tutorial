_Do not communicate by sharing memory; instead, share memory by communicating._

One of the best aspects of the language Go is the ability to easily create concurrent programs! 

## Goroutines

You can turn any function into a go routine by calling the function with the word go before it. So if you have a function called `printWord()` you can make it a goroutine by writing `go printWord()`. This allows the function to be run concurrently (at the same time) as your other functions.

Example:

```go

func main() {
	go printWord("hi")
	time.Sleep(3 * time.Second)
}

func printWord(s string) {
	fmt.Println(s)
}
```

## Channels

Channels are used alongside goroutines to send or receive data.



