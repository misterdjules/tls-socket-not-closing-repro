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

This means that the client will try to establish only one connection with the
server using socket.io on top of TLS, then wait for a message to be sent by
the server, and finally close the connection.

The issue is that most of the time, the client will be left hanging for a
while because the connection is not closed properly.
