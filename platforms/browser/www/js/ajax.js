class Ajax {
    static getURL(url, success, error) {

        return new Promise(function(resolve, reject) { // Feature detection
            if (!window.XMLHttpRequest) return;

            // Create new request
            var request = new XMLHttpRequest();

            // Setup callbacks
            request.onreadystatechange = function() {

                // If the request is complete
                if (request.readyState === 4) {

                    // If the request failed
                    if (request.status !== 200) {
                        if (error && typeof error === 'function') {
                            error(request.responseText, request);
                        }
                        reject(request.responseText, request);
                        return;
                    }

                    // If the request succeeded
                    if (success && typeof success === 'function') {
                        success(request.responseText, request);
                    }
                    resolve(request.responseText, request);
                }

            };

            // Get the HTML
            request.open('GET', url);
            request.send();
        });



    }

}