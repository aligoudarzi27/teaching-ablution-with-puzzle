let currentLanguage = 'fa'; 
let currentLevel = 1;
let score = 0;
let maxLevel = 5; 
let fontSizeFactor = 1;
let imageSizeFactor = 1;
let gameSizeFactor = 1; 
let backgroundMusic;
let successSound;
let errorSound;

// DOM Elements
const sourceContainer = document.getElementById('source-container');
const targetContainer = document.getElementById('target-container');
const checkButton = document.getElementById('check-btn');
const resetButton = document.getElementById('reset-btn');
const nextLevelButton = document.getElementById('next-level-btn');
const completionModal = document.getElementById('completion-modal');
const closeModalButton = document.getElementById('close-modal-btn');
const feedbackMessage = document.getElementById('feedback-message');
const englishButton = document.getElementById('en-btn');
const persianButton = document.getElementById('fa-btn');
const gameTitle = document.getElementById('game-title');
const levelTitle = document.getElementById('level-title');
const scoreLabel = document.getElementById('score-label');
const scoreDisplay = document.getElementById('score');
const instruction = document.getElementById('instruction');
const completionTitle = document.getElementById('completion-title');
const completionMessage = document.getElementById('completion-message');
const arrangedStepsContainer = document.getElementById('arranged-steps-container');
const imageInfo = document.getElementById('image-info');
const decreaseFontBtn = document.getElementById('decrease-font');
const increaseFontBtn = document.getElementById('increase-font');
const decreaseImgBtn = document.getElementById('decrease-img');
const increaseImgBtn = document.getElementById('increase-img');
const decreaseGameBtn = document.getElementById('decrease-game'); 
const increaseGameBtn = document.getElementById('increase-game'); 
const backgroundMusicElement = document.getElementById('background-music');
const successSoundElement = document.getElementById('success-sound');
const errorSoundElement = document.getElementById('error-sound');
const soundToggleButton = document.getElementById('sound-toggle-btn');
const soundIcon = document.getElementById('sound-icon');
let isSoundMuted = false;

// Initialize the game
document.addEventListener('DOMContentLoaded', () => {
    updateUI();
    setupEventListeners();
    setupAudio();

    englishButton.classList.remove('active');
    persianButton.classList.add('active');
    document.dir = 'rtl';

    updateSizeFactors();

    createParticles();
});

// Setup audio elements
function setupAudio() {
    backgroundMusic = backgroundMusicElement;
    successSound = successSoundElement;
    errorSound = errorSoundElement;

    backgroundMusic.volume = 0.3;

    document.addEventListener('click', function() {
        if (backgroundMusic.paused) {
            backgroundMusic.play()
                .catch(e => console.log("Background music play failed:", e));
        }
    }, { once: true });
}

// Create animated particles
function createParticles() {
    const particlesContainer = document.createElement('div');
    particlesContainer.className = 'particles-container';
    document.body.appendChild(particlesContainer);

    for (let i = 0; i < 20; i++) {
        createParticle(particlesContainer);
    }
}

function createParticle(container) {
    const particle = document.createElement('div');
    particle.className = 'particle';

    const posX = Math.random() * 100;
    const posY = Math.random() * 100;

    const size = Math.random() * 10 + 5;

    const colors = ['#0077b6', '#ffa62b', '#e6f4f1', '#74c9e3'];
    const color = colors[Math.floor(Math.random() * colors.length)];

    const duration = Math.random() * 20 + 10;

    particle.style.cssText = `
        position: absolute;
        top: ${posY}vh;
        left: ${posX}vw;
        width: ${size}px;
        height: ${size}px;
        background-color: ${color};
        border-radius: 50%;
        opacity: 0.3;
        pointer-events: none;
        animation: floatParticle ${duration}s linear infinite;
    `;

    container.appendChild(particle);
}

// Setup event listeners
function setupEventListeners() {
    document.getElementById('start-game-btn').addEventListener('click', startGame);
    document.getElementById('help-btn').addEventListener('click', showHelpModal);
    document.getElementById('info-btn').addEventListener('click', showInfoModal);
    document.getElementById('close-help-btn').addEventListener('click', closeHelpModal);
    document.getElementById('close-info-btn').addEventListener('click', closeInfoModal);
    document.getElementById('home-btn').addEventListener('click', returnToHome);

    checkButton.addEventListener('click', checkOrder);
    resetButton.addEventListener('click', resetLevel);
    closeModalButton.addEventListener('click', closeModal);
    nextLevelButton.addEventListener('click', nextLevel);
    englishButton.addEventListener('click', () => changeLanguage('en'));
    persianButton.addEventListener('click', () => changeLanguage('fa'));

    decreaseFontBtn.addEventListener('click', () => {
        if (fontSizeFactor > 0.7) {
            fontSizeFactor -= 0.1;
            updateSizeFactors();
        }
    });

    increaseFontBtn.addEventListener('click', () => {
        if (fontSizeFactor < 1.5) {
            fontSizeFactor += 0.1;
            updateSizeFactors();
        }
    });

    decreaseImgBtn.addEventListener('click', () => {
        if (imageSizeFactor > 0.7) {
            imageSizeFactor -= 0.1;
            updateSizeFactors();
        }
    });

    increaseImgBtn.addEventListener('click', () => {
        if (imageSizeFactor < 1.5) {
            imageSizeFactor += 0.1;
            updateSizeFactors();
        }
    });

    decreaseGameBtn.addEventListener('click', () => {
        if (gameSizeFactor > 0.7) {
            gameSizeFactor -= 0.1;
            updateSizeFactors();
        }
    });

    increaseGameBtn.addEventListener('click', () => {
        if (gameSizeFactor < 1.5) {
            gameSizeFactor += 0.1;
            updateSizeFactors();
        }
    });

    soundToggleButton.addEventListener('click', toggleSound);
}

function toggleSound() {
    isSoundMuted = !isSoundMuted;
    backgroundMusic.muted = isSoundMuted;
    successSound.muted = isSoundMuted;
    errorSound.muted = isSoundMuted;

    if (isSoundMuted) {
        soundIcon.classList.remove('fa-volume-up');
        soundIcon.classList.add('fa-volume-mute');
    } else {
        soundIcon.classList.remove('fa-volume-mute');
        soundIcon.classList.add('fa-volume-up');
    }
}

// Update font and image size factors as CSS variables
function updateSizeFactors() {
    document.documentElement.style.setProperty('--font-size-factor', fontSizeFactor);
    document.documentElement.style.setProperty('--image-size-factor', imageSizeFactor);
    document.documentElement.style.setProperty('--game-size-factor', gameSizeFactor); 
}

function startGame() {
    document.getElementById('main-menu').style.display = 'none';
    document.getElementById('game-container').style.display = 'block';
    setupLevel(currentLevel);
}

function showHelpModal() {
    document.getElementById('help-modal').style.display = 'flex';
    document.getElementById('guide-image').style.display = 'block';
}

function closeHelpModal() {
    document.getElementById('help-modal').style.display = 'none';
}

function showInfoModal() {
    document.getElementById('info-modal').style.display = 'flex';
}

function closeInfoModal() {
    document.getElementById('info-modal').style.display = 'none';
}

// Change language
function changeLanguage(lang) {
    currentLanguage = lang;

    if (lang === 'en') {
        englishButton.classList.add('active');
        persianButton.classList.remove('active');
        imageInfo.style.display = 'block';
        document.dir = 'ltr';

        document.querySelector('.font-size-controls span').textContent = 'Font Size:';
        document.querySelector('.image-size-controls span').textContent = 'Image Size:';
        document.querySelector('.game-size-controls span').textContent = 'Game Size:';

        document.getElementById('start-game-btn').innerHTML = '<i class="fas fa-play"></i> Start Game';
        document.getElementById('help-btn').innerHTML = '<i class="fas fa-question-circle"></i> Help';
        document.getElementById('home-btn').innerHTML = '<i class="fas fa-home"></i>';
    } else {
        englishButton.classList.remove('active');
        persianButton.classList.add('active');
        imageInfo.style.display = 'none';
        document.dir = 'rtl';

        document.querySelector('.font-size-controls span').textContent = 'اندازه فونت:';
        document.querySelector('.image-size-controls span').textContent = 'اندازه عکس:';
        document.querySelector('.game-size-controls span').textContent = 'اندازه بازی:';

        document.getElementById('start-game-btn').innerHTML = '<i class="fas fa-play"></i> شروع بازی';
        document.getElementById('help-btn').innerHTML = '<i class="fas fa-question-circle"></i> راهنما';
        document.getElementById('home-btn').innerHTML = '<i class="fas fa-home"></i>';
    }

    updateUI();
    setupLevel(currentLevel);
}

// Update UI elements with translated text
function updateUI() {
    gameTitle.textContent = translations[currentLanguage].gameTitle;
    levelTitle.textContent = `${translations[currentLanguage].levelTitle} ${currentLevel}`;
    scoreLabel.textContent = translations[currentLanguage].scoreLabel;
    scoreDisplay.textContent = score;
    instruction.textContent = translations[currentLanguage].instruction;
    checkButton.textContent = translations[currentLanguage].checkBtn;
    resetButton.textContent = translations[currentLanguage].resetBtn;
    nextLevelButton.textContent = translations[currentLanguage].nextLevelBtn;
    completionTitle.textContent = translations[currentLanguage].completionTitle;
    completionMessage.textContent = translations[currentLanguage].completionMessage;
    closeModalButton.textContent = translations[currentLanguage].continueBtn;
}

// Set up the current level
function setupLevel(level) {
    sourceContainer.innerHTML = '';
    targetContainer.innerHTML = '';

    let stepCount;
    let stepsToInclude;

    switch(level) {
        case 1:
            stepCount = 2; 
            stepsToInclude = [0, 1];
            break;
        case 2:
            stepCount = 3; 
            stepsToInclude = [0, 1, 2];
            break;
        case 3:
            stepCount = 4; 
            stepsToInclude = [0, 1, 2, 3];
            break;
        case 4:
            stepCount = 5; 
            stepsToInclude = [0, 1, 2, 3, 4];
            break;
        case 5:
            stepCount = 7; 
            stepsToInclude = [0, 1, 2, 3, 4, 5, 6];
            break;
        default:
            stepCount = 7; 
            stepsToInclude = [0, 1, 2, 3, 4, 5, 6];
            break;
    }

    const shuffledIndices = [...stepsToInclude].sort(() => Math.random() - 0.5);

    shuffledIndices.forEach((index) => {
        const pieceId = index + 1;
        const piece = createPuzzlePiece(pieceId, index);
        sourceContainer.appendChild(piece);

        gsap.from(piece, {
            opacity: 0,
            y: 30,
            rotation: Math.random() * 10 - 5,
            duration: 0.5,
            delay: index * 0.1,
            ease: 'back.out(1.7)'
        });
    });

    enableDragAndDrop();
}

// Create a puzzle piece element
function createPuzzlePiece(id, index) {
    const piece = document.createElement('div');
    piece.className = 'puzzle-piece';
    piece.dataset.id = id;
    piece.dataset.index = index;
    piece.draggable = true;

    if (wuduStepImages[index]) {
        const img = document.createElement('img');
        img.src = wuduStepImages[index];
        img.alt = translations[currentLanguage].wuduSteps[index].name;
        piece.appendChild(img);
    } else {
        piece.innerHTML += wuduStepIcons[index];
    }

    const stepName = document.createElement('div');
    stepName.className = 'step-name';
    stepName.textContent = translations[currentLanguage].wuduSteps[index].name;
    piece.appendChild(stepName);

    return piece;
}

// Enable drag and drop functionality
function enableDragAndDrop() {
    const puzzlePieces = document.querySelectorAll('.puzzle-piece');

    puzzlePieces.forEach(piece => {
        piece.addEventListener('dragstart', dragStart);
        piece.addEventListener('dragend', dragEnd);
    });

    [sourceContainer, targetContainer].forEach(container => {
        container.addEventListener('dragover', dragOver);
        container.addEventListener('dragenter', dragEnter);
        container.addEventListener('dragleave', dragLeave);
        container.addEventListener('drop', drop);
    });
}

// Drag and drop event handlers
function dragStart() {
    this.classList.add('dragging');
    gsap.to(this, {scale: 1.05, rotation: Math.random() * 5 - 2.5, duration: 0.2});
}

function dragEnd() {
    this.classList.remove('dragging');
    gsap.to(this, {scale: 1, rotation: 0, duration: 0.3, ease: 'elastic.out(1, 0.3)'});
}

function dragOver(e) {
    e.preventDefault();
}

function dragEnter(e) {
    e.preventDefault();
    this.classList.add('hovered');
    gsap.to(this, {backgroundColor: this === targetContainer ? 'rgba(230, 244, 241, 0.8)' : 'rgba(240, 249, 255, 0.8)', duration: 0.3});
}

function dragLeave() {
    this.classList.remove('hovered');
    gsap.to(this, {backgroundColor: this === targetContainer ? '#e6f4f1' : '#f0f9ff', duration: 0.3});
}

function drop(e) {
    e.preventDefault();
    this.classList.remove('hovered');
    gsap.to(this, {backgroundColor: this === targetContainer ? '#e6f4f1' : '#f0f9ff', duration: 0.3});

    const draggedPiece = document.querySelector('.dragging');
    this.appendChild(draggedPiece);

    gsap.from(draggedPiece, {
        scale: 1.2,
        rotation: Math.random() * 10 - 5,
        duration: 0.5,
        ease: 'elastic.out(1, 0.3)'
    });
}

// Check if the pieces are in the correct order
function checkOrder() {
    const placedPieces = targetContainer.querySelectorAll('.puzzle-piece');

    if (placedPieces.length === 0) {
        showFeedback(translations[currentLanguage].incorrectOrder, false);
        playErrorSound();
        return;
    }

    placedPieces.forEach(piece => {
        piece.classList.add('checked-piece');
    });

    setTimeout(() => {
        let isCorrect = true;
        let lastId = 0;

        placedPieces.forEach(piece => {
            const currentId = parseInt(piece.dataset.id);
            if (currentId !== lastId + 1) {
                isCorrect = false;
            }
            lastId = currentId;
        });

        let requiredPieces;
        switch(currentLevel) {
            case 1: requiredPieces = 2; break;
            case 2: requiredPieces = 3; break;
            case 3: requiredPieces = 4; break;
            case 4: requiredPieces = 5; break;
            case 5: requiredPieces = 7; break;
            default: requiredPieces = 7;
        }

        if (placedPieces.length !== requiredPieces) {
            isCorrect = false;
        }

        if (isCorrect) {
            playSuccessSound();

            const oldScore = score;
            score += (currentLevel * 10);
            animateScoreChange(oldScore, score);

            showFeedback(translations[currentLanguage].correctOrder, true);

            showCompletionModal(placedPieces);

            createCelebrationEffect();
        } else {
            playErrorSound();

            showFeedback(translations[currentLanguage].incorrectOrder, false);

            gsap.to(targetContainer, {
                x: 10, 
                duration: 0.1, 
                repeat: 5, 
                yoyo: true,
                ease: 'power2.inOut',
                onComplete: () => gsap.set(targetContainer, {x: 0})
            });

            showCompletionModal(placedPieces, false);
        }

        setTimeout(() => {
            placedPieces.forEach(piece => {
                piece.classList.remove('checked-piece');
            });
        }, 1000);
    }, 500); 
}

// Create celebratory effect when correct
function createCelebrationEffect() {
    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.className = 'confetti';

        const size = Math.random() * 10 + 5;
        const colors = ['#0077b6', '#ffa62b', '#e6f4f1', '#4caf50', '#ff5722'];
        const color = colors[Math.floor(Math.random() * colors.length)];

        particle.style.cssText = `
            position: fixed;
            width: ${size}px;
            height: ${size}px;
            background-color: ${color};
            border-radius: ${Math.random() > 0.5 ? '50%' : '0'};
            pointer-events: none;
            z-index: 1000;
        `;

        document.body.appendChild(particle);

        gsap.fromTo(particle, 
            {
                x: window.innerWidth / 2,
                y: window.innerHeight / 2,
                opacity: 1
            },
            {
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight,
                opacity: 0,
                duration: Math.random() * 2 + 1,
                rotation: Math.random() * 360,
                ease: 'power1.out',
                onComplete: () => particle.remove()
            }
        );
    }
}

// Animate score change
function animateScoreChange(oldScore, newScore) {
    const duration = 1; 
    const steps = 20; 
    const increment = (newScore - oldScore) / steps;
    let current = oldScore;
    let step = 0;

    const updateScore = () => {
        step++;
        current += increment;
        scoreDisplay.textContent = Math.round(current);

        gsap.to(scoreDisplay, {
            scale: 1.2,
            color: '#ffa62b',
            duration: 0.1,
            onComplete: () => {
                gsap.to(scoreDisplay, {
                    scale: 1,
                    color: '#333',
                    duration: 0.1
                });
            }
        });

        if (step < steps) {
            setTimeout(updateScore, duration * 1000 / steps);
        } else {
            scoreDisplay.textContent = newScore;
        }
    };

    updateScore();
}

// Play success sound
function playSuccessSound() {
    try {
        successSound.currentTime = 0;
        successSound.play().catch(e => console.log("Success sound play failed:", e));
    } catch (error) {
        console.error("Error playing success sound:", error);
    }
}

// Play error sound
function playErrorSound() {
    try {
        errorSound.currentTime = 0;
        errorSound.play().catch(e => console.log("Error sound play failed:", e));
    } catch (error) {
        console.error("Error playing error sound:", error);
    }
}

// Show feedback message
function showFeedback(message, isSuccess) {
    feedbackMessage.textContent = message;
    feedbackMessage.className = 'feedback-message';

    if (isSuccess) {
        feedbackMessage.classList.add('success');
    } else {
        feedbackMessage.classList.add('error');
    }

    feedbackMessage.classList.add('show');

    gsap.fromTo(feedbackMessage, 
        { y: -50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, ease: 'back.out(1.7)' }
    );

    setTimeout(() => {
        gsap.to(feedbackMessage, {
            opacity: 0, 
            y: -20,
            duration: 0.5,
            onComplete: () => feedbackMessage.classList.remove('show')
        });
    }, 3000);
}

// Show the completion modal with arranged steps
function showCompletionModal(placedPieces, isCorrect = true) {
    arrangedStepsContainer.innerHTML = '';

    displayArrangedSteps(placedPieces);

    if (isCorrect) {
        completionTitle.textContent = translations[currentLanguage].completionTitle;
        completionMessage.textContent = translations[currentLanguage].completionMessage;
    } else {
        completionTitle.textContent = translations[currentLanguage].incorrectOrder;
        completionMessage.textContent = '';
    }

    completionModal.style.display = 'flex';
    gsap.fromTo('.modal-content', 
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 0.5, ease: 'back.out(1.7)' }
    );

    if (isCorrect && currentLevel < maxLevel) {
        nextLevelButton.disabled = false;
    } else {
        nextLevelButton.disabled = true;
    }
}

// Display the arranged steps in the completion modal
function displayArrangedSteps(placedPieces) {
    arrangedStepsContainer.innerHTML = '';

    placedPieces.forEach((piece, index) => {
        const pieceIndex = parseInt(piece.dataset.index);
        const stepElement = document.createElement('div');
        stepElement.className = 'arranged-step';

        if (wuduStepImages[pieceIndex]) {
            const img = document.createElement('img');
            img.src = wuduStepImages[pieceIndex];
            img.alt = translations[currentLanguage].wuduSteps[pieceIndex].name;
            stepElement.appendChild(img);
        }

        const stepName = document.createElement('div');
        stepName.className = 'step-name';
        stepName.textContent = translations[currentLanguage].wuduSteps[pieceIndex].name;
        stepElement.appendChild(stepName);

        arrangedStepsContainer.appendChild(stepElement);

        gsap.fromTo(stepElement, 
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.5, delay: index * 0.1, ease: 'back.out(1.7)' }
        );
    });
}

// Close the completion modal
function closeModal() {
    gsap.to('.modal-content', {
        opacity: 0, 
        scale: 0.8, 
        duration: 0.3,
        onComplete: () => completionModal.style.display = 'none'
    });
}

// Reset the current level
function resetLevel() {
    gsap.to(resetButton, {scale: 1.1, duration: 0.1, yoyo: true, repeat: 1});

    const pieces = targetContainer.querySelectorAll('.puzzle-piece');
    if (pieces.length > 0) {
        pieces.forEach((piece, index) => {
            gsap.to(piece, {
                scale: 0.8,
                opacity: 0,
                rotation: Math.random() * 10 - 5,
                duration: 0.3,
                delay: index * 0.05,
                onComplete: () => setupLevel(currentLevel)
            });
        });
    } else {
        setupLevel(currentLevel);
    }
}

// Move to the next level
function nextLevel() {
    if (currentLevel < maxLevel) {
        gsap.to(nextLevelButton, {scale: 1.1, duration: 0.1, yoyo: true, repeat: 1});

        currentLevel++;
        levelTitle.textContent = `${translations[currentLanguage].levelTitle} ${currentLevel}`;

        closeModal();

        setTimeout(() => {
            setupLevel(currentLevel);
            nextLevelButton.disabled = true;
        }, 300);
    }
}

// Return to home
function returnToHome() {
    document.getElementById('main-menu').style.display = 'block';
    document.getElementById('game-container').style.display = 'none';
}