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

There are two types of channels. Buffered and unbuffered channels.

Unbuffered channel of integers:

```go

ch := make(chan int)

```

Buffered channel of integers:

```go

ch := make(chan int, 100)

```

A buffered channel does not block the sender as long as there is still space in the channel. 
An unbuffered channel blocks the sender until there is a receiver that has received the value. 

To send a value into a channel:

```go

ch <- val

```

To receive the value from the channel:

```go

val := <-ch

```

## A real life example of using goroutines and channels

Let's say you wanted to get 10 facebook users' profile information. In order to do this you'd have to make an API call out for each user ID. You can take advantage of Go's concurrency by sending each API request out in a goroutine and then putting each response on a channel. 

Let's set up our code:

```go

package main

import (
	"net/http"
)

var facebookUserIDs = []string{"1","2","3","4","5","6","7","8","9","10"}

```

Now we want to create a function that will loop through the userIDs and spin off a goroutine for each userID and put the response on a channel of `*http.Response`s.


```go

func facebookGetRequest(userIDs []string) []*http.Response {
	ch := make(chan *http.Response)
	resps := []*http.Response{}

	for _, userID := range userIDs {
		go func(userID string) {
			requestURL := fmt.Sprintf("http://graph.facebook.com/%v", userID)
			resp, _ := http.get(requestURL)
			ch <- resp
		}(userID)
	}

	
}









