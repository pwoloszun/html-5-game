// Tworzy i aktywuje kolejną pozycję w history, zmienia URL, bez przeładowania strony:
history.pushState(object, "New page title", "/new/url");

// Modyfikuje aktualną pozycję w history, zmienia URL, bez przeładowania strony:
history.replaceState(object, "New page title", "/new/url");

// Nawigowanie po stosie historii:
history.forward();
history.back();
history.go(2);
history.go(-3);

// Obsługa zdarzenia zmiany stanu historii (przy wywolaniu back(), next(), go()):
window.onpopstate = function(event) {
  // event.state === history.state
};
