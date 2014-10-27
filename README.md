In order to reproduce the issue, please run the following:

```
$ npm install
$ node server.js
```

Then, in another terminal, or after you put the server in the background, run
the client:

```
$ node client.js -c 1
```

This will make the client try to establish only one connection with the
server using socket.io on top of TLS, then wait for a message to be sent by
the server, and finally close the connection.

The issue is that most of the time, the client will be left hanging for a
while because the connection is not closed properly.

To be able to reproduce the issue easily, instead of re-running the client
until the connection hangs, you can also invoke it in a loop like following:
```
$ for i in `seq 1 30`; do node client.js -c 1; done
```
