// Sélectionner tous les éléments de la table
const cells = document.querySelectorAll('td');
let currentPlayer = 'X'; // Le joueur commence avec 'X'
let playerScore = 0;
let computerScore = 0;

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

// Fonction pour obtenir les indices des cases vides
function getEmptyCells() {
    return Array.from(cells).filter(cell => cell.textContent === '');
}

// Fonction pour afficher la carte de message
function showMessage(message) {
    messageText.textContent = message;
    messageCard.classList.remove('hidden');
}

// Fonction pour gérer le clic sur une cellule
function handleClick(event) {
    const cell = event.target;

    if (cell.textContent === '' && currentPlayer === 'X') { // Assurez-vous que la cellule est vide et c'est le tour du joueur
        cell.textContent = currentPlayer; // Place le symbole du joueur actuel
        cell.classList.add('x'); // Ajoute la classe CSS pour X

        if (checkWin(currentPlayer)) {
            playerScore++;
            document.getElementById('win-u').textContent = playerScore;
            showMessage('You win!');
            setTimeout(resetBoard, 2000); // Réinitialiser le tableau après 2 secondes
            return;
        }

        if (getEmptyCells().length === 0) {
            showMessage('It\'s a draw!');
            setTimeout(resetBoard, 2000);
            return;
        }

        currentPlayer = 'O'; // Change de joueur
        setTimeout(computerMove, 500); // Délais pour le mouvement du "Computer"
    }
}

// Fonction pour que l'ordinateur fasse un mouvement intelligent
function computerMove() {
    const emptyCells = getEmptyCells();
    
    // 1. Essayer de gagner
    for (const cell of emptyCells) {
        cell.textContent = 'O';
        cell.classList.add('o'); // Ajoute la classe CSS pour O
        if (checkWin('O')) {
            computerScore++;
            document.getElementById('win-c').textContent = computerScore;
            showMessage('Computer wins!');
            setTimeout(resetBoard, 2000);
            return;
        }
        cell.textContent = ''; // Annuler le mouvement
        cell.classList.remove('o');
    }

    // 2. Bloquer le joueur
    for (const cell of emptyCells) {
        cell.textContent = 'X';
        if (checkWin('X')) {
            cell.textContent = 'O';
            cell.classList.add('o');
            currentPlayer = 'X'; // Reviens au joueur après le mouvement de l'ordinateur
            return;
        }
        cell.textContent = ''; // Annuler le mouvement
    }

    // 3. Prendre le centre si disponible
    const centerCell = cells[4];
    if (centerCell.textContent === '') {
        centerCell.textContent = 'O';
        centerCell.classList.add('o');
        currentPlayer = 'X'; // Reviens au joueur après le mouvement de l'ordinateur
        return;
    }

    // 4. Prendre un coin si disponible
    const corners = [0, 2, 6, 8];
    for (const index of corners) {
        if (cells[index].textContent === '') {
            cells[index].textContent = 'O';
            cells[index].classList.add('o');
            currentPlayer = 'X'; // Reviens au joueur après le mouvement de l'ordinateur
            return;
        }
    }

    // 5. Prendre n'importe quelle case vide restante
    const randomCell = emptyCells[Math.floor(Math.random() * emptyCells.length)];
    randomCell.textContent = 'O';
    randomCell.classList.add('o');
    currentPlayer = 'X'; // Reviens au joueur après le mouvement de l'ordinateur

    if (checkWin('O')) {
        computerScore++;
        document.getElementById('win-c').textContent = computerScore;
        showMessage('Computer wins!');
        setTimeout(resetBoard, 2000);
    }
}

// Fonction pour réinitialiser le tableau
function resetBoard() {
    cells.forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('x', 'o'); // Enlève les classes CSS pour X et O
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
