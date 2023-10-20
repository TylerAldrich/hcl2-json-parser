FROM golang:1.18

# Setup
WORKDIR /build
COPY go.* ./
COPY *.go ./

# Install GopherJS
RUN go install github.com/gopherjs/gopherjs@v1.18.0-beta3

# Set up proper GOPATH
RUN go mod vendor
RUN mkdir -p /go/src/hcl2-parser
RUN cp -r * /go/src/hcl2-parser
WORKDIR /go/src/hcl2-parser

#GOPHERJS_GOROOT="$(go1.21.3 env GOROOT)"
# Finally we can build
RUN gopherjs build parser.go -o index.js -m

COPY build/copy-out.sh .
ENTRYPOINT ["/go/src/hcl2-parser/copy-out.sh"]