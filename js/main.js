window.onload = function() {
    const getFact = () => {
        fetch("https://cat-fact.herokuapp.com/facts")
        .then(response => response.json())
        .then(facts => {
            const randomIndex = Math.floor(Math.random() * facts.length);
            const fact = facts[randomIndex];
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
                sessionStorage.setItem("catFact", fact.text);
            })
            .catch(err => {
                console.error(err.message);
            });
        })
        .catch(err => {
            console.error(err.message);
        });
    };
    
    function clickCounter(event) {
        if (typeof Storage !== "undefined") {
            let count = localStorage.getItem("clickcount");
            if (count) {
                localStorage.setItem("clickcount", Number(count) + 1);
            } else {
                localStorage.setItem("clickcount", 1);
            }
            document.getElementById("clicked").innerHTML = `You have received ${localStorage.getItem("clickcount")} cat facts!`;
        } else {
            document.getElementById("result").innerHTML = "Sorry, your browser does not support web storage...";
        }
    }
    
    document.getElementById("getButton").addEventListener("click", function(event) {
        getFact();
        clickCounter(event);
    });
}    
