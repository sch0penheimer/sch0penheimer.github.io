document.addEventListener('DOMContentLoaded', function() {
    animateTerminal();
    setupGlitchEffects();
    createRustParticles();
    setupProjectCards();
    setupSectionNavigation();
    setupSmoothScrolling();
    animateSkillBarsOnScroll();
    setupContactForm();
    setupMobileMenu();
});

function animateTerminal() {
    const terminalContainer = document.getElementById('terminal-container');
    const mainContent = document.getElementById('main-content');
    const menuToggle = document.getElementById('menuToggle');

    const initCommand = document.getElementById('init-command');
    const outputLine1 = document.getElementById('output-line-1');
    const outputLine2 = document.getElementById('output-line-2');
    const outputLine3 = document.getElementById('output-line-3');
    const commandLine2 = document.getElementById('command-line-2');
    
    const outputDateTime1 = document.getElementById('dateTimeLog1');
    const outputDateTime2 = document.getElementById('dateTimeLog2');
    const outputDateTime3 = document.getElementById('dateTimeLog3');
    const dateTimeObj = new Date();
    const dateTimeString = dateTimeObj.toLocaleString('en-US', { timeZone: 'Africa/Casablanca' });

    menuToggle.style.display = 'none';

    typeText(initCommand, '     ./portfolio --init', 100, () => {
        setTimeout(() => {
            initCommand.classList.remove('typing');
            fadeIn(outputLine1, outputDateTime1, dateTimeString);
            
            setTimeout(() => {
                fadeIn(outputLine2, outputDateTime2, dateTimeString);
                
                setTimeout(() => {
                    fadeIn(outputLine3, outputDateTime3, dateTimeString);
                    
                    setTimeout(() => {
                        commandLine2.classList.remove('hidden');
                        cycleCommands();
                        cycleStatusMessages();
                        
                        setTimeout(() => {
                            mainContent.classList.remove('hidden');
                            setTimeout(() => {
                                mainContent.classList.add('visible');
                            }, 50);
                            
                            terminalContainer.remove();
                            menuToggle.style.display = 'block';
                            
                            initSecondTerminal();
                        }, 2000);
                    }, 400);
                }, 400);
            }, 400);
        }, 500);
    });

}

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
                                }, 300);
                            }, 300);
                        }, 500);
                    });
                }, 300);
            }, 300);
        });
    }, 200);
}

function resetCvTerminal() {
    const lines = document.querySelectorAll('#cv-terminal .line');
    lines.forEach((line, index) => {
        if (index > 0) {
            line.classList.add('hidden');
        }
    });

    document.getElementById('cv-command-1').textContent = '';
    document.getElementById('cv-command-1').classList.add('typing');
    document.getElementById('cv-command-2').textContent = '';
    document.getElementById('cv-command-2').classList.add('typing');
}

function initSecondTerminal() {
    const secondTerminal = document.querySelector('.left-column .terminal');
    const initCommand = secondTerminal.querySelector('#init-command');
    const outputLine1 = secondTerminal.querySelector('#output-line-1');
    const outputLine2 = secondTerminal.querySelector('#output-line-2');
    const outputLine3 = secondTerminal.querySelector('#output-line-3');
    const commandLine2 = secondTerminal.querySelector('#command-line-2');

    const dateTimeLogs = document.querySelectorAll(".dateTimeLogCurrent");
    const currentTime = new Date().toLocaleString('en-US', { timeZone: 'Africa/Casablanca' });
    dateTimeLogs.forEach(log => {
        log.textContent = `[${currentTime}]: `;
    });
    
    initCommand.textContent = '     cat introduction.txt';
    initCommand.classList.remove('typing');
    
    outputLine1.classList.remove('hidden');
    outputLine2.classList.remove('hidden');
    outputLine3.classList.remove('hidden');
    commandLine2.classList.remove('hidden');
    
    cycleStatusMessages();
}

function setupSectionNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.section');

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            navLinks.forEach(l => l.classList.remove('active'));
            sections.forEach(s => s.classList.remove('active'));
            
            this.classList.add('active');
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                targetSection.classList.add('active');
                const elements = document.querySelectorAll(".timeline-item");
                elements.forEach(item => item.classList.remove('visible'));

                if (targetId === '#cv') {
                    resetCvTerminal();
                    animateCvTerminal();
                } else if (targetId === '#experience' || targetId === '#education') {
                    setTimeout(() => {
                        animateTimelineItems(targetId);
                    }, 800);
                }
            }
        });
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

function fadeIn(element, dateTimeElement, date) {
    element.classList.remove('hidden');
    element.style.opacity = '0';
    element.style.display = 'block';
    
    dateTimeElement.textContent = "[" + date + "]: ";
    
    let opacity = 0;
    const fadeInterval = setInterval(() => {
        if (opacity < 1) {
            opacity += 0.7;
            element.style.opacity = opacity.toString();
        } else {
            clearInterval(fadeInterval);
        }
    }, 50);
}

function cycleCommands() {
    const commands = [
        '       initialize_system',
        'load_configuration',
        'analyze_data',
        'compile_resources',
        'synchronize_modules',
        'deploy_services',
        'monitor_performance',
        'finalize_setup'
    ];
    let commandIndex = 0;
    
    function typeNextCommand() {
        const commandElement = document.getElementById('welcome-command');
        const command = commands[commandIndex];
        
        typeText(commandElement, command, 80, () => {
            setTimeout(() => {
                commandIndex = (commandIndex + 1) % commands.length;
                typeNextCommand();
            }, 2000);
        });
    }
    
    typeNextCommand();
}

function cycleStatusMessages() {
    const statusElement = document.getElementById('status');
    const statusMessages = [
        'POINTERS_INITIALIZED',
        'MEMORY_ALLOCATED',
        'STACK_OVERFLOW_AVOIDED',
        'GARBAGE_COLLECTION_ACTIVE',
        'THREADS_SYNCHRONIZED',
        'JAVA_BYTECODE_GENERATED',
        'CLASSES_COMPILED',
        'OBJECTS_INSTANTIATED',
        'EXCEPTIONS_HANDLED',
        'PROGRAM_EXECUTION_COMPLETE'
    ];
    
    let currentIndex = 0;
    
    setInterval(() => {
        currentIndex = (currentIndex + 1) % statusMessages.length;
        addGlitchEffect(statusElement, statusMessages[currentIndex]);
    }, 4000);
}

function setupGlitchEffects() {
    const glitchableElements = [
        document.querySelector('h1'),
        ...document.querySelectorAll('.section-title'),
        ...document.querySelectorAll('.terminal-title'),
        ...document.querySelectorAll('.project-title')
    ];
    
    randomGlitch(glitchableElements);

    setInterval(() => {
        randomGlitch(glitchableElements);
    }, 3000);
}

function randomGlitch(elements) {
    const numElementsToGlitch = elements.length;
    
    for (let i = 0; i < numElementsToGlitch; i++) {
        const randomElement = elements[Math.floor(Math.random() * elements.length)];
        addGlitchEffect(randomElement);
    }
}

function addGlitchEffect(element, newText = null) {
    const originalText = element.textContent;
    element.classList.add('glitch');
    
    const stageDuration = 200;
    const totalStages = 3;
    
    if (newText) {
        let currentStage = 0;
        
        const glitchInterval = setInterval(() => {
            currentStage++;
            
            if (currentStage < totalStages) {
                const mixRate = currentStage / totalStages;
                element.textContent = scrambleText(
                    mixRate > 0.5 ? newText : originalText,
                    0.8 - (currentStage * 0.1)
                );
            } else {
                element.textContent = newText;
                element.classList.remove('glitch');
                clearInterval(glitchInterval);
            }
        }, stageDuration);
        
    } else {
        let currentStage = 0;
        
        const glitchInterval = setInterval(() => {
            currentStage++;
            
            if (currentStage < totalStages) {
                element.textContent = scrambleText(
                    originalText,
                    0.8 - (currentStage * 0.15)
                );
            } else {
                element.textContent = originalText;
                element.classList.remove('glitch');
                clearInterval(glitchInterval);
            }
        }, stageDuration);
    }
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

function createRustParticles() {
    const rustParticles = document.createElement('div');
    rustParticles.className = 'rust-particles';
    document.body.appendChild(rustParticles);
    
    for (let i = 0; i < 30; i++) {
        createSingleParticle(rustParticles);
    }
    
    setInterval(() => {
        createSingleParticle(rustParticles);
    }, 200);
}

function createSingleParticle(container) {
    const particle = document.createElement('div');
    particle.className = 'rust-particle';
    
    const x = Math.random() * window.innerWidth;
    const y = Math.random() * window.innerHeight;
    
    const size = Math.floor(Math.random() * 5) + 2;
    const opacity = Math.random() * 0.6 + 0.2;
    
    const rustColors = [
        '#8B4513',
        '#A52A2A',
        '#CD5C5C',
        '#B22222',
        '#E25822',
        '#6B3E2E',
        '#884535',
        '#CC5500'
    ];
    
    const rustColor = rustColors[Math.floor(Math.random() * rustColors.length)];
    
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    particle.style.left = `${Math.floor(x)}px`; 
    particle.style.top = `${Math.floor(y)}px`;
    particle.style.opacity = opacity.toString();
    particle.style.backgroundColor = rustColor;
    particle.style.boxShadow = '0 0 2px rgba(255, 100, 0, 0.5)';
    
    container.appendChild(particle);
    
    const glitchInterval = setInterval(() => {
        if (Math.random() > 0.7) {
            const jumpX = Math.floor(Math.random() * 5) - 2;
            const jumpY = Math.floor(Math.random() * 5) - 2;
            
            particle.style.transform = `translate(${jumpX}px, ${jumpY}px)`;
            
            if (Math.random() > 0.8) {
                const newColor = rustColors[Math.floor(Math.random() * rustColors.length)];
                particle.style.backgroundColor = newColor;
            }
            
            particle.style.opacity = (Math.random() * 0.6 + 0.2).toString();
        } else {
            particle.style.transform = 'translate(0, 0)';
        }
    }, 200);
    
    setTimeout(() => {
        clearInterval(glitchInterval);
        particle.remove();
    }, Math.random() * 6000 + 3000);
}

function setupProjectCards() {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            const glitchImg = card.querySelector('.glitch-img');
            glitchImg.classList.add('active');
        });
        
        card.addEventListener('mouseleave', () => {
            const glitchImg = card.querySelector('.glitch-img');
            glitchImg.classList.remove('active');
        });
    });
}

function setupSmoothScrolling() {
    const navLinks = document.querySelectorAll('nav a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            const headerHeight = document.querySelector('header').clientHeight;

            if (targetElement) {
                addGlitchEffect(this);
                
                setTimeout(() => {
                    const elementPosition = targetElement.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerHeight;
                    
                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }, 300);
            }
        });
    });
}

function animateSkillBarsOnScroll() {
    const skillSection = document.getElementById('skills');
    const skillBars = document.querySelectorAll('.skill-level');
    
    let animated = false;
    
    window.addEventListener('scroll', () => {
        if (!animated && isElementInViewport(skillSection)) {
            animated = true;
            
            skillBars.forEach((bar, index) => {
                setTimeout(() => {
                    bar.style.width = bar.style.width || '0%';
                    bar.classList.add('animate');
                }, index * 100);
            });
        }
    });
}

function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
        rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.bottom >= 0
    );
}

function setupContactForm() {
    const form = document.querySelector('#contact form');
    
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            if (name && email && subject && message) {
                const submitBtn = form.querySelector('.submit-btn');
                submitBtn.textContent = 'TRANSMITTING...';
                
                setTimeout(() => {
                    submitBtn.classList.add('success');
                    submitBtn.textContent = 'MESSAGE RECEIVED';
                    
                    setTimeout(() => {
                        form.reset();
                        submitBtn.textContent = 'TRANSMIT MESSAGE';
                        submitBtn.classList.remove('success');
                    }, 3000);
                }, 1500);
            }
        });
    }
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

function animateTimelineItems(type) {
    const timelineItems = document.querySelectorAll(`${type} .timeline-item`);

    timelineItems.forEach((item, index) => {
        setTimeout(() => {
            item.classList.add('glitch-in');
            setTimeout(() => {
                item.classList.remove('glitch-in');
                item.classList.add('visible');
            }, 400);
        }, index * 500);
    });
}

function setupMobileMenu() {
    const menuToggle = document.getElementById('menuToggle');
    const nav = document.querySelector('nav');
    const navLinks = document.querySelectorAll('.nav-link');

    menuToggle.addEventListener('click', function() {
        this.classList.toggle('open');
        nav.classList.toggle('open');
    });

    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            menuToggle.classList.remove('open');
            nav.classList.remove('open');
        });
    });
}

createNoiseEffect();
animateBlinkingCursors();