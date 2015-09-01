## Prerequisites

In terms of installation-pain, Go is sort of middle-of-the-road when compared to other programming languages.
It's not the hardest to install, but it's not the easiest either. And if you're an experienced programmer, you'll
definitely find it a bit strange.

The biggest characteristic of developing with Go is it's use of the [`GOPATH`](https://golang.org/doc/code.html#GOPATH) environment variable. It specifies the location of your workspace and is likely to be the only environment variable you need to configure before developing Go code. All Go programs you create will be located in a child directory of of `GOPATH`. 

Here is an example of how all Go code is organized under `GOPATH`:

```
$GOPATH
├── bin
├── pkg
└── src
    ├── github.com
    │   └── tools
    │       └── godep    
    ├── google.golang.org
    │   └── cloud
    │       └── bigtable
    ├── gopkg.in
    │   └── tomb.v2
    └── launchpad.net
        └── gozk
            └── zookeeper
```

So, you will need to set `GOPATH` to a directory of your choosing:

```
$ mkdir $HOME/gopath
$ export GOPATH=$HOME/gopath
```

When working with Go tools, sometimes executables will be installed to your workspace's `bin` directory. To make it easier to work with these installed tools, add the workspace's bin subdirectory to your PATH:

```
$ export PATH=$PATH:$GOPATH/bin
```

Now you can install Go and get moving right away!

## Installing Go on any Platform

For the most current and up-to-date installation instructions, visit [https://golang.org/doc/install#install](https://golang.org/doc/install#install). There you will find instructions and downloads for Windows, OSX, and Linux.

## Installing Go with Homebrew on OSX

[Homebrew](http://brew.sh/) is a popular package manager for OSX that lets you install things via the command line. If you use OSX and Homebrew you can simply run:

```
$ brew install go
```

## Create your First Go Program

1. Create the directory `$GOPATH/src/github.com/<your github username>/hello`
1. Change directory into `hello`

1. Create a file called `hello.go` that looks like this:

  ```go
  package main

  import "fmt"

  func main() {
      fmt.Println("Hello, Gopher!")
  }
  ```

1. Now run the app in development mode with `$ go run hello.go`
  * Or, install the app as an executable and run it:

    ```
    $ go install hello.go
    $ $GOPATH/bin/hello
    ```
  * Or, build the app in the current directory and run it:

    ```
    $ go build hello.go
    $ ./hello
    ```















