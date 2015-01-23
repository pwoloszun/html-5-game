this.onmessage = function(event) {
  // event.data
  setTimeout(function() {
    this.postMessage({fromWorker: "haaaj!"});
  }, 3000);
};

this.postMessage({fromWorker: "haaaj!"});

//this.close();

//this.importScripts("path/to/script1.js", "path/to/other/script.js");
