## Build a simple web server in Go using the HTTP package!

First create a new file called `webserver.go` and put the following code in it:

```go
package main

import (
	"io"
	"net/http"
)

func handlePage(w http.ResponseWriter, r *http.Request) {
	io.WriteString(w, "My first Go webpage!")
}

func main() {
	http.HandleFunc("/", handlePage)
	http.ListenAndServe(":7000", nil)
}
```
Now in your command line execute `go run webserver.go` and then open `http://localhost:7000` in your browser and you should see "My first Go webpage!"

Congrats! You just built a simple web server in Go!


