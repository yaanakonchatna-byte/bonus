// Отримання посилань на HTML-елементи
const guessInput = document.getElementById('guessInput');
const submitGuessButton = document.getElementById('submitGuess');
const newGameButton = document.getElementById('newGame');
const messageDisplay = document.getElementById('message');
const attemptsLeftDisplay = document.getElementById('attemptsLeft');
const previousGuessesDisplay = document.getElementById('previousGuesses');

// Глобальні змінні стану гри
let randomNumber;
let attempts = 10;
let previousGuesses = [];
let gameEnded = false;

// Функція для ініціалізації/початку нової гри
function initializeGame() {
    // 1. Генеруємо випадкове число від 1 до 100
    randomNumber = Math.floor(Math.random() * 100) + 1;
    
    // 2. Скидаємо лічильники та стан
    attempts = 10;
    previousGuesses = [];
    gameEnded = false;

    // 3. Оновлюємо інтерфейс
    messageDisplay.textContent = "Спробуйте вгадати число!";
    attemptsLeftDisplay.textContent = `Залишилось спроб: ${attempts}`;
    previousGuessesDisplay.textContent = "Попередні спроби: ";
    guessInput.value = '';
    
    // 4. Керуємо видимістю кнопок
    submitGuessButton.style.display = 'inline-block';
    newGameButton.style.display = 'none';
    guessInput.disabled = false;
    submitGuessButton.disabled = false;
}

// Функція, що виконується при натисканні кнопки "Вгадати"
function checkGuess() {
    if (gameEnded) return; // Ігноруємо клік, якщо гра завершена

    const userGuess = parseInt(guessInput.value);

    // Валідація введення
    if (isNaN(userGuess) || userGuess < 1 || userGuess > 100) {
        messageDisplay.textContent = "Будь ласка, введіть дійсне число від 1 до 100.";
        guessInput.value = '';
        return;
    }

    // Зменшення спроб
    attempts--;
    
    // Збереження спроби
    previousGuesses.push(userGuess);

    // Перевірка числа
    if (userGuess === randomNumber) {
        // Успіх
        messageDisplay.textContent = `🎉 Вітаємо! Ви вгадали число ${randomNumber}!`;
        messageDisplay.style.color = '#4CAF50';
        endGame(true);
    } else if (attempts === 0) {
        // Програш
        messageDisplay.textContent = `😢 Ви програли! Загадане число було ${randomNumber}.`;
        messageDisplay.style.color = 'red';
        endGame(false);
    } else {
        // Продовження гри
        const hint = userGuess < randomNumber ? "Занадто мало!" : "Занадто багато!";
        messageDisplay.textContent = hint;
        messageDisplay.style.color = 'orange';
    }

    // Оновлення інтерфейсу після перевірки
    attemptsLeftDisplay.textContent = `Залишилось спроб: ${attempts}`;
    previousGuessesDisplay.textContent = `Попередні спроби: ${previousGuesses.join(', ')}`;
    guessInput.value = ''; // Очищаємо поле введення для наступної спроби
    guessInput.focus(); // Фокусуємо на полі введення
}

// Функція завершення гри
function endGame(win) {
    gameEnded = true;
    submitGuessButton.style.display = 'none';
    newGameButton.style.display = 'inline-block';
    guessInput.disabled = true;
    submitGuessButton.disabled = true;
}

// Додавання обробників подій
submitGuessButton.addEventListener('click', checkGuess);
newGameButton.addEventListener('click', initializeGame);

// Дозволяємо надсилати введення натисканням Enter
guessInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        checkGuess();
    }
});

// Запускаємо гру при першому завантаженні сторінки
initializeGame();