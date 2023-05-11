window.onload = function() {
    const request = indexedDB.open("cat-facts-db", 1);

    request.onerror = function(event) {
        console.error("Error opening database:", event.target.errorCode);
    };

    request.onupgradeneeded = function(event) {
        const db = event.target.result;

        const catFactsStore = db.createObjectStore("cat-facts", { keyPath: "id" });

        const catImagesStore = db.createObjectStore("cat-images", { autoIncrement: true });
    };

    request.onsuccess = function(event) {
        const db = event.target.result;

        const getFact = () => {
            fetch("https://cat-fact.herokuapp.com/facts")
            .then(response => response.json())
            .then(facts => {
                const randomIndex = Math.floor(Math.random() * facts.length);
                const fact = facts[randomIndex];

                const transaction = db.transaction("cat-facts", "readwrite");
                const store = transaction.objectStore("cat-facts");
                store.add(fact);

                const nameElement = document.createElement("h2");
                nameElement.textContent = fact.text;
                const factElement = document.getElementById("facts");
                factElement.innerHTML = "";
                factElement.appendChild(nameElement);

                fetch("https://cataas.com/cat")
                .then(response => {
                    const catImage = document.createElement("img");
                    catImage.src = response.url;
                    catImage.alt = "Random cat image";
                    catImage.width = 300; 
                    factElement.appendChild(catImage);

                    const transaction = db.transaction("cat-images", "readwrite");
                    const store = transaction.objectStore("cat-images");
                    store.add(response.blob());
                })
                .catch(err => {
                    console.error(err.message);
                });
            })
            .catch(err => {
                console.error(err.message);
            });
        };

        document.getElementById("getButton").addEventListener("click", getFact);
    };
};
