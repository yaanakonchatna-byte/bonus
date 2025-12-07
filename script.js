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
    messageDisplay.style.color = '#333'; // Повертаємо стандартний колір
    attemptsLeftDisplay.textContent = `Залишилось спроб: ${attempts}`;
    previousGuessesDisplay.textContent = "Попередні спроби: ";
    guessInput.value = '';
    
    // 4. Керуємо видимістю кнопок
    submitGuessButton.style.display = 'inline-block';
    newGameButton.style.display = 'none';
    guessInput.disabled = false;
    submitGuessButton.disabled = false;
    guessInput.focus();
}

// Функція, що виконується при натисканні кнопки "Вгадати"
function checkGuess() {
    if (gameEnded) return;

    const userGuess = parseInt(guessInput.value);

    // Валідація введення
    if (isNaN(userGuess) || userGuess < 1 || userGuess > 100) {
        messageDisplay.textContent = "Будь ласка, введіть дійсне число від 1 до 100.";
        messageDisplay.style.color = 'gray';
        guessInput.value = '';
        return;
    }

    // Зменшення спроб та збереження спроби
    attempts--;
    previousGuesses.push(userGuess);

    // 1. Перевірка на успіх
    if (userGuess === randomNumber) {
        // Успіх
        messageDisplay.textContent = `🎉 Вітаємо! Ви вгадали число ${randomNumber}!`;
        messageDisplay.style.color = '#4CAF50';
        endGame(true);
    } 
    // 2. Перевірка на програш
    else if (attempts === 0) {
        // Програш
        messageDisplay.textContent = `😢 Ви програли! Загадане число було ${randomNumber}.`;
        messageDisplay.style.color = 'red';
        endGame(false);
    } 
    // 3. Продовження гри та надання підказки
    else {
        
        const difference = Math.abs(userGuess - randomNumber); // Обчислюємо абсолютну різницю
        let hint;

        if (difference <= 10) {
            // Якщо різниця 10 або менше
            hint = "🔥 Уже близько! Лишилося зовсім трохи!";
            messageDisplay.style.color = 'red';
        } else {
            // Звичайна підказка
            hint = userGuess < randomNumber ? "Занадто мало!" : "Занадто багато!";
            messageDisplay.style.color = 'orange'; 
        }
        
        messageDisplay.textContent = hint;
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