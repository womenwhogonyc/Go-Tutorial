You can download the Go tools package installer or the archive from: https://golang.org/dl/

If you download the archive:

Extract into /usr/local

Add Go PATH to your system profile:

export PATH=$PATH:/usr/local/go/bin

If you want to install the Go tools into a different location you can set a GOROOT env variable to point to that directory

Add GOROOT to your .bash_profile or .profile:

export GOROOT=$HOME/go
export PATH=$PATH:$GOROOT/bin

If you download the package installer:

Open the installer and install the tools. 

Mac OS X:

The installer will install go to /usr/local/go and will put the directory (/usr/local/go/bin) into your PATH env variable.

Test that you've installed Go correctly and run your first "Hello, Word." program:

Create a new directory and set up a workspace:

Set a GOPATH env variable in your .bash_profile or .profile: 

$ export GOPATH=$HOME/workspace

Create your first Go program:

Make the directories src/github.com/(your github username)/hello inside your workspace directory.
While inside the hello directory create a file named hello.go and add:

package main

import "fmt"

func main() {
    fmt.Printf("hello, world\n")
}

Compile your first Go program:

$ go install github.com/(your github username)/hello

Run your first Go program:

After compiling the program an executable will be inside the bin directory of the workspace:
$HOME/workspace/github.com/(your github username)/bin or $GOPATH/bin

To run the program run:

$ $GOPATH/bin/hello















