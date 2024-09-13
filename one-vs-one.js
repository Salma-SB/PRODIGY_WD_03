// Sélectionner tous les éléments de la table
const cells = document.querySelectorAll('td');
let currentPlayer = 'X'; // Le joueur commence avec 'X'
let playerXScore = 0;
let playerOScore = 0;

// Sélectionner les éléments de la carte de message
const messageCard = document.getElementById('message-card');
const messageText = document.getElementById('message-text');
const messageButton = document.getElementById('message-button');

// Fonction pour vérifier les conditions de victoire
function checkWin(player) {
    const winPatterns = [
        [0, 1, 2], // Ligne 1
        [3, 4, 5], // Ligne 2
        [6, 7, 8], // Ligne 3
        [0, 3, 6], // Colonne 1
        [1, 4, 7], // Colonne 2
        [2, 5, 8], // Colonne 3
        [0, 4, 8], // Diagonale
        [2, 4, 6]  // Diagonale
    ];

    return winPatterns.some(pattern => {
        return pattern.every(index => cells[index].textContent === player);
    });
}

// Fonction pour afficher la carte de message
function showMessage(message) {
    messageText.textContent = message;
    messageCard.classList.remove('hidden');
}

// Fonction pour gérer le clic sur une cellule
function handleClick(event) {
    const cell = event.target;

    if (cell.textContent === '') { // Assurez-vous que la cellule est vide
        cell.textContent = currentPlayer; // Place le symbole du joueur actuel
        cell.classList.add(currentPlayer.toLowerCase()); // Ajoute la classe x ou o

        if (checkWin(currentPlayer)) {
            if (currentPlayer === 'X') {
                playerXScore++;
                document.getElementById('score-x').textContent = playerXScore;
                showMessage('Player X wins!');
            } else {
                playerOScore++;
                document.getElementById('score-o').textContent = playerOScore;
                showMessage('Player O wins!');
            }
            setTimeout(resetBoard, 2000); // Réinitialiser le tableau après 2 secondes
            return;
        }

        if (getEmptyCells().length === 0) {
            showMessage('It\'s a draw!');
            setTimeout(resetBoard, 2000);
            return;
        }

        // Change de joueur
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    }
}

// Fonction pour obtenir les indices des cases vides
function getEmptyCells() {
    return Array.from(cells).filter(cell => cell.textContent === '');
}

// Fonction pour réinitialiser le tableau
function resetBoard() {
    cells.forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('x', 'o'); // Enlève les classes x et o lors de la réinitialisation
    });
    currentPlayer = 'X'; // Reviens au joueur initial
    messageCard.classList.add('hidden');
}

// Ajouter un écouteur d'événement à chaque cellule
cells.forEach(cell => cell.addEventListener('click', handleClick));

// Ajouter un écouteur d'événement au bouton de la carte de message
messageButton.addEventListener('click', () => {
    messageCard.classList.add('hidden');
});
