document.addEventListener("DOMContentLoaded", function() {
    const puzzlePieces = document.querySelectorAll(".puzzle-piece");
    puzzlePieces.forEach(piece => {
        piece.addEventListener("dragstart", dragStart);
    });

    const puzzleContainer = document.getElementById("puzzle-container");
    puzzleContainer.addEventListener("dragover", dragOver);
    puzzleContainer.addEventListener("drop", drop);

    function dragStart(event) {
        event.dataTransfer.setData("text/plain", event.target.dataset.command);
    }

    function dragOver(event) {
        event.preventDefault();
    }

    function drop(event) {
        event.preventDefault();
        const command = event.dataTransfer.getData("text/plain");
        const scriptOutput = document.getElementById("script-output");
        scriptOutput.textContent += ` ${command}`;
    }
});

function generateScript() {
    const scriptOutput = document.getElementById("script-output").textContent;
    fetch('/generate_script', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ script: scriptOutput }),
    })
    .then(response => response.json())
    .then(data => {
        console.log('Script generated:', data);
        alert(`Generated Script: ${data.script}`);
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}
