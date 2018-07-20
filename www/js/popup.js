class Popup {
    static open(data) {

        document.querySelector(".popup").innerHTML = '<i onclick="Popup.close();" class="ion-ios-close-empty"></i>' + data;
        document.querySelector(".popup").classList.remove("dnone");
        setTimeout(function() {
            document.querySelector(".popup").classList.add("open");
        }, 10);


    }

    static close() {

        document.querySelector(".popup").classList.add("down");
        setTimeout(function() {
            document.querySelector(".popup").classList.add("dnone");
            document.querySelector(".popup").classList.remove("down");
            document.querySelector(".popup").classList.remove("open");
        }, 200);


    }
}