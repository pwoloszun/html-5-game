//var str = JSON.stringify(json); // serialization
//var json = JSON.parse(str); // deserialization

var socket = new WebSocket("ws://myapp:8080");

socket.onopen = function() {};
// or
socket.addEventListener("open", function() {
});

socket.onclose = function() {};

socket.onerror = function(error) {};

socket.onmessage = function(event) {
  // event.data
};

socket.send(stringData);

socket.close();

/*
Wartości webSocket.readyState:
0 - CONNECTING – połączenie jeszcze nie zostało otwarte
1 - OPEN – połączenie otwarte, gotowe do komunikacji
2 - CLOSING – połączenie jest zamykane
3 - CLOSED – połączenie zamknięte lub nie można otworzyć połączenia
*/
