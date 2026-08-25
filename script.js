document.addEventListener('DOMContentLoaded', function() {
    setupGlitchEffects();
    animateCvTerminal();
});

function animateCvTerminal() {
    const command1 = document.getElementById('cv-command-1');
    const output1 = document.getElementById('cv-output-1');
    const command2 = document.getElementById('cv-command-2');
    const output2 = document.getElementById('cv-output-2');
    const output3 = document.getElementById('cv-output-3');
    const prompt = document.getElementById('cv-prompt');

    setTimeout(() => {
        typeText(command1, 'cd cv/', 100, () => {
            command1.classList.remove('typing');

            setTimeout(() => {
                output1.classList.remove('hidden');

                setTimeout(() => {
                    typeText(command2, 'ls -l', 100, () => {
                        command2.classList.remove('typing');

                        setTimeout(() => {
                            output2.classList.remove('hidden');

                            setTimeout(() => {
                                output3.classList.remove('hidden');

                                setTimeout(() => {
                                    prompt.classList.remove('hidden');
                                    animateTitle();
                                    revealFooter();
                                }, 300);
                            }, 300);
                        }, 500);
                    });
                }, 300);
            }, 300);
        });
    }, 200);
}

function animateTitle() {
    const word1 = document.getElementById('title-word-1');
    const underscore = document.getElementById('title-underscore');
    const word2 = document.getElementById('title-word-2');

    word1.classList.add('typing');
    typeText(word1, 'DOWNLOAD', 100, () => {
        word1.classList.remove('typing');
        underscore.classList.remove('hidden');

        setTimeout(() => {
            word2.classList.remove('hidden');
            word2.classList.add('typing');
            typeText(word2, 'CV', 100, () => {
                word2.classList.remove('typing');
            });
        }, 200);
    });
}

function revealFooter() {
    const footerCommand = document.getElementById('footer-command');
    footerCommand.classList.add('typing');
    typeText(footerCommand, 'Haitam © 2026 | Absolutely NO Rights Reserved', 40, () => {
        footerCommand.classList.remove('typing');
    });
}

function typeText(element, text, speed, callback) {
    element.textContent = '';
    let charIndex = 0;

    const typeInterval = setInterval(() => {
        if (charIndex < text.length) {
            element.textContent += text.charAt(charIndex);
            charIndex++;
        } else {
            clearInterval(typeInterval);
            if (callback) callback();
        }
    }, speed);
}

function setupGlitchEffects() {
    const glitchableElements = [
        ...document.querySelectorAll('h1'),
        ...document.querySelectorAll('.terminal-title'),
        document.getElementById('footer-command')
    ].filter(Boolean);

    randomGlitch(glitchableElements);

    setInterval(() => {
        randomGlitch(glitchableElements);
    }, 3000);
}

function randomGlitch(elements) {
    const numElementsToGlitch = elements.length;

    for (let i = 0; i < numElementsToGlitch; i++) {
        const randomElement = elements[Math.floor(Math.random() * elements.length)];
        if (randomElement.classList.contains('typing')) continue;
        addGlitchEffect(randomElement);
    }
}

function addGlitchEffect(element, newText = null) {
    if (element.classList.contains('typing')) return;

    const originalText = element.textContent;
    element.classList.add('glitch');

    const stageDuration = 350;
    const totalStages = 3;
    let currentStage = 0;

    const glitchInterval = setInterval(() => {
        if (element.classList.contains('typing')) {
            clearInterval(glitchInterval);
            element.classList.remove('glitch');
            return;
        }

        currentStage++;

        if (currentStage < totalStages) {
            const mixRate = currentStage / totalStages;
            const sourceText = newText && mixRate > 0.5 ? newText : originalText;
            element.textContent = scrambleText(sourceText);
        } else {
            element.textContent = newText || originalText;
            element.classList.remove('glitch');
            clearInterval(glitchInterval);
        }
    }, stageDuration);
}

function scrambleText(text) {
    const chars = '!@#$%^&*()_+-=[]\\;\',./<>?:"{}|₽¥£€';
    let result = '';

    for (let i = 0; i < text.length; i++) {
        if (Math.random() > 0.2) {
            result += chars.charAt(Math.floor(Math.random() * chars.length));
        } else {
            result += text.charAt(i);
        }
    }

    return result;
}

function createNoiseEffect() {
    const noise = document.querySelector('.noise');

    if (noise) {
        setInterval(() => {
            noise.style.backgroundPosition = `${Math.random() * 100}% ${Math.random() * 100}%`;
        }, 100);
    }
}

function animateBlinkingCursors() {
    const blinkElements = document.querySelectorAll('.blink');

    setInterval(() => {
        blinkElements.forEach(el => {
            el.style.opacity = el.style.opacity === '0' ? '1' : '0';
        });
    }, 500);
}

createNoiseEffect();
animateBlinkingCursors();
