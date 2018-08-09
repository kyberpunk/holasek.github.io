(function(ext) {
	var url = 'http://localhost:12345/';
	
	function sendCommand(command, callback) {
		var xhr = new XMLHttpRequest();
		xhr.onload = function () {
			var status = xhr.status;
			var data = xhr.responseText;
			callback(xhr.status == 201);
		}
		xhr.open("POST", url + command);
		xhr.send();
	}
	
    // Cleanup function when the extension is unloaded
    ext._shutdown = function() {};

    // Status reporting code
    // Use this to report missing hardware, plugin or unsupported browser
    ext._getStatus = function() {
        return {status: 2, msg: 'Ready'};
    };

    ext.start = function(callback) {
		sendCommand("start", (result) => callback());
    };

    // Block and block menu descriptions
    var descriptor = {
        blocks: [
            // Block type, block name, function name
            ['w', 'probuď se', 'start'],
			['w', 'srovnej se', 'dock'],
        ]
    };

    // Register the extension
    ScratchExtensions.register('Otto', descriptor, ext);
})({});