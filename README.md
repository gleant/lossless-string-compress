# Lossless string compress application

## Getting started

### Prerequisites
```
NodeJS 12.7.x
Yarn 1.17.x
Curl
Application start server to port 8080 and frontend to port 3000. Make sure that these ports are free and open.
```

### Installing
1. Open terminal and go to backend folder in project root folder
2. Run `yarn`
3. Go to frontend folder in project root folder
4. Run `yarn`

### How to run from browser

1. Open terminal and go to backend folder in project root folder
2. Run `yarn start`
3. Open another terminal and go to frontend folder in project root folder
4. Run `yarn start`
5. Open browser and go to url http://localhost:3000

### How to run by curl

1. Open terminal and go to backend folder in project root folder
2. Run `yarn start`
3. Open another terminal and go to backend folder in project root folder
4. Run `curl -XPOST -H 'Content-Type: text/plain' --data-binary @words.txt --output output.txt localhost:8080/compress`
5. Run `curl -XPOST -H 'Content-Type: text/plain' --data-binary @output.txt --output original.txt localhost:8080/decompress`
6. See compress result in backend/output.txt file and decompress result in backend/original.txt file
  
## Server
### Endpoints
#### POST /compress
```
Compress input string using delta encoding algorithm.

Content-Type: text/plain
Response Content-Type: text/plain
Body: String to delta encode.
Response: Delta encoded string of body
```

#### POST /compress
```
Decompress delta encoded string back to original string.

Content-Type: text/plain
Response Content-Type: text/plain
Body: Delta encoded string to decode back original string.
Response: Original string
```