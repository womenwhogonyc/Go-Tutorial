_Do not communicate by sharing memory; instead, share memory by communicating._

One of the best aspects of the language Go is the ability to easily create concurrent programs! 

## Goroutines

You can turn any function into a go routine by calling the function with the word go before it. So if you have a function called `printWord()` you can make it a goroutine by writing `go printWord()`. This allows the function to be run in a different thread so that they can be run at the same time as any other function.

*Concurrency is not the same as parallelism. Parallelism is when more than one function are run at the same exact instant whereas concurrency is when functions are being run on different threads and their time periods may overlap. 

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

Let's say you have a couple of zipcodes and you want to gather some weather data from them. In order to receive all the data in a timely fashion we can make our API requests in goroutines. 


Let's set up our code:

```go

package main

import (
	"net/http"
)


//Some NYC zipcodes
var zipcodes = []string{"10001", "10065", "10013", "11201"}

```
First we'll want to create a data structure to hold the API response data. We can make a struct called `WeatherResponse` which will have two fields: `HTTPResponse` and `Error`. 

```go

type WeatherResponse struct {
	HTTPResponse *http.Response
	Error        error
}

```
Now we'll want to create a function that will take in the slice of zipcodes and return a slice of `WeatherResponse` pointers. 

```go

func getWeather(zipcodes []string) []*WeatherResponse {
}

```

The `getWeather` function will be where we will do the main work of our program. In this function we will loop through the slice `zipcodes` and make an API request out to the `Open Weather Map` API for each of the zipcodes. 

There are a couple of things we need in this function. We need a channel of `WeatherResponse` pointers for the responses we get from our API requests in our goroutines as well as a slice of `WeatherResponse` pointers. 

```go

func getWeather(zipcodes []string) []*WeatherResponse {
	ch := make(chan *WeatherResponse)
	weatherResponses := []*WeatherResponse{}
}

```

Now we can loop through the zipcodes slice and spin off a goroutine for each zipcode.

```go

func getWeather(zipcodes []string) []*WeatherResponse {
	ch := make(chan *WeatherResponse)
	weatherResponses := []*WeatherResponse{}

	for _, zipcode := range zipcodes {
		go func(zipcode string) {
				//Here we will make our API request to the `Open Weather Map` API
			}(zipcode)
	}
}

```

Inside the goroutine we will then make an API Get request out to the `Open Weather Map` API and add the response or error to our `WeatherResponse` struct. 


```go

func getWeather(zipcodes []string) []*WeatherResponse {
	ch := make(chan *WeatherResponse)
	weatherResponses := []*WeatherResponse{}

	for _, zipcode := range zipcodes {
		go func(zipcode string) {
				response, err := http.Get(fmt.Sprintf("http://api.openweathermap.org/data/2.5/weather?zip=%v,us&units=imperial", zipCode))
				wr := &WeatherResponse{response, err}
			}(zipcode)
	}
}

```

In order to gather all the data from each of the goroutines we can use the channel that we created and add `wr` to our channel `ch`.

```go

func getWeather(zipcodes []string) []*WeatherResponse {
	ch := make(chan *WeatherResponse)
	weatherResponses := []*WeatherResponse{}

	for _, zipcode := range zipcodes {
		go func(zipcode string) {
				response, err := http.Get(fmt.Sprintf("http://api.openweathermap.org/data/2.5/weather?zip=%v,us&units=imperial", zipCode))
				wr := &WeatherResponse{response, err}
				ch <- wr
			}(zipcode)
	}
}

```

Ch is an unbuffered channel so we will need a receiver to receive each of the values as the values are put on the channel. We can do this by using another for loop with a select statement. 

```go

func getWeather(zipcodes []string) []*WeatherResponse {

	ch := make(chan *WeatherResponse)
	weatherResponses := []*WeatherResponse{}

	for _, zipCode := range zipcodes {
		go func(zipCode string) {
			response, err := http.Get(fmt.Sprintf("http://api.openweathermap.org/data/2.5/weather?zip=%v,us&units=imperial", zipCode))
			wr := &WeatherResponse{response, err}
            ch <- wr
		}(zipCode)
	}

	for {

		select {
		//Once there is a value on the ch channel we assign it to the variable resp and add resp to our weatherResponses slice
		case resp := <-ch:
			weatherResponses = append(weatherResponses, resp)
			// If the slice weatherResponses has the same amount of values as the slice of zipcodes we know we're done and we've gotten all of our responses so we can return the slice.
			if len(weatherResponses) == len(zipcodes) {
				return weatherResponses
			}
		}

	}

	return weatherResponses
}

```

Now let's go back to our `main` function and call our getWeather function in our `main` thread and print out the API responses.

```go

func main() {
	responses := getWeather(zipcodes)

	for _, resp := range responses {
		fmt.Println("resp", resp.HTTPResponse)
	}
}

```

Sweet! Now you've successfully spun off a goroutine for each of the zipcodes and printed out the API responses!

Let's look at our whole program:

```go

package main

import (
	"fmt"
	"net/http"
)

var zipcodes = []string{"10065", "11201", "10021"}

type WeatherResponse struct {
	HTTPResponse *http.Response
	Error        error
}

func main() {
	responses := getWeather(zipcodes)
	for _, resp := range responses {
		defer resp.HTTPResponse.Body.Close()
		body, err := ioutil.ReadAll(resp.HTTPResponse.Body)
		if err != nil {
			fmt.Println("err", err)
		}

		fmt.Println("Weather Data", string(body))
		}
	}
}

func getWeather(zipcodes []string) []*WeatherResponse {

	ch := make(chan *WeatherResponse)
	weatherResponses := []*WeatherResponse{}

	for _, zipCode := range zipcodes {
		go func(zipCode string) {
			response, err := http.Get(fmt.Sprintf("http://api.openweathermap.org/data/2.5/weather?zip=%v,us&units=imperial", zipCode))
			wr := &WeatherResponse{response, err}
            ch <- wr
		}(zipCode)
	}

	for {

		select {
		case w := <-ch:
			weatherResponses = append(weatherResponses, w)
			if len(weatherResponses) == len(zipcodes) {
				return weatherResponses
			}
		}

	}

	return weatherResponses
}

```















