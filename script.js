document.addEventListener('DOMContentLoaded', function() {
    // Terminal animation
    animateTerminal();
    
    // Random glitch effects
    setupGlitchEffects();
    
    // Rust particles animation
    createRustParticles();
    
    // Project card hover effects
    setupProjectCards();

    // Navigation steup
    setupSectionNavigation();
    
    // Smooth scrolling for navigation
    setupSmoothScrolling();
    
    // Skill bar animation on scroll
    animateSkillBarsOnScroll();
    
    // Form validation and submission effect
    setupContactForm();
});

// Main Terminals animation functions
function animateTerminal() {
    const terminalContainer = document.getElementById('terminal-container');
    const mainContent = document.getElementById('main-content');

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

    // Type the initial command
    typeText(initCommand, '     cat introduction.txt', 100, () => {
        // After typing initial command, show output lines with delay
        setTimeout(() => {
            initCommand.classList.remove('typing');
            fadeIn(outputLine1, outputDateTime1, dateTimeString);
            
            setTimeout(() => {
                fadeIn(outputLine2, outputDateTime2, dateTimeString);
                
                setTimeout(() => {
                    fadeIn(outputLine3, outputDateTime3, dateTimeString);
                    
                    setTimeout(() => {
                        commandLine2.classList.remove('hidden');
                        // Start cycling through commands
                        cycleCommands();
                        
                        // Start cycling through status messages
                        cycleStatusMessages();
                        
                        // When animation completes:
                        setTimeout(() => {
                            // Show main content
                            mainContent.classList.remove('hidden');
                            setTimeout(() => {
                                mainContent.classList.add('visible');
                            }, 50);
                            
                            // Remove the terminal container completely
                            terminalContainer.remove();
                            
                            // Initialize the second terminal animation
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

    // Initial delay
    setTimeout(() => {
        // Type first command
        typeText(command1, 'cd cv/', 100, () => {
            command1.classList.remove('typing');
            
            // Show first output line
            setTimeout(() => {
                output1.classList.remove('hidden');
                
                // Type second command
                setTimeout(() => {
                    typeText(command2, 'ls -l', 100, () => {
                        command2.classList.remove('typing');
                        
                        // Show file listings
                        setTimeout(() => {
                            output2.classList.remove('hidden');
                            
                            setTimeout(() => {
                                output3.classList.remove('hidden');
                                
                                // Show final prompt
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
        if (index > 0) { // Keep first line visible
            line.classList.add('hidden');
        }
    });
    
    // Reset commands
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
    
    // Show all the content immediately since we're continuing the animation
    initCommand.textContent = '     cat introduction.txt';
    initCommand.classList.remove('typing');
    
    outputLine1.classList.remove('hidden');
    outputLine2.classList.remove('hidden');
    outputLine3.classList.remove('hidden');
    commandLine2.classList.remove('hidden');
    
    // Continue the command cycling
    cycleCommands();
    cycleStatusMessages();
}

function setupSectionNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.section');

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all links and sections
            navLinks.forEach(l => l.classList.remove('active'));
            sections.forEach(s => s.classList.remove('active'));
            
            // Add active class to clicked link
            this.classList.add('active');
            
            // Show corresponding section
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
        '       welcome_visitor',
        'check_status',
        'optimize_resources',
        'verify_connections',
        'scan_memory',
        'validate_protocols',
        'secure_channels',
        'process_requests'
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
        'CONNECTION_ESTABLISHED',
        'SERVER_RUNNING',
        'MEMORY_OPTIMIZED',
        'ZERO_COST_ABSTRACTIONS',
        'THREAD_SAFETY_GUARANTEED',
        'OWNERSHIP_VALIDATED',
        'RESOURCES_ALLOCATED',
        'NO_GARBAGE_COLLECTION_NEEDED',
        'STATIC_DISPATCH_COMPLETE',
        'PORTFOLIO_LOADED'
    ];
    
    let currentIndex = 0;
    
    setInterval(() => {
        currentIndex = (currentIndex + 1) % statusMessages.length;
        addGlitchEffect(statusElement, statusMessages[currentIndex]);
    }, 4000);
}

// Glitch effect functions
function setupGlitchEffects() {
    // Random glitch on elements
    const glitchableElements = [
        document.querySelector('h1'),
        ...document.querySelectorAll('.section-title'),
        ...document.querySelectorAll('.terminal-title'),
        ...document.querySelectorAll('.project-title')
    ];
    
    // Initial glitch after page load
    randomGlitch(glitchableElements);

    
    // Occasional glitches
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
    
    // Duration variables 
    const stageDuration = 200; // How long each scramble stage lasts)
    const totalStages = 3;     // Total number of scramble stages
    
    if (newText) {
        // If new text is provided, we'll switch to it with multiple scramble stages
        let currentStage = 0;
        
        const glitchInterval = setInterval(() => {
            currentStage++;
            
            if (currentStage < totalStages) {
                // Mix between original and new text as we progress
                const mixRate = currentStage / totalStages;
                element.textContent = scrambleText(
                    mixRate > 0.5 ? newText : originalText,
                    0.8 - (currentStage * 0.1)
                );
            } else {
                // Final stage
                element.textContent = newText;
                element.classList.remove('glitch');
                clearInterval(glitchInterval);
            }
        }, stageDuration);
        
    } else {
        // Just glitch the current text with multiple scramble stages
        let currentStage = 0;
        
        const glitchInterval = setInterval(() => {
            currentStage++;
            
            if (currentStage < totalStages) {
                // Gradually reduce scramble intensity
                element.textContent = scrambleText(
                    originalText,
                    0.8 - (currentStage * 0.15)
                );
            } else {
                // Final stage - revert to original
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

// Rust particles effect
function createRustParticles() {
    const rustParticles = document.createElement('div');
    rustParticles.className = 'rust-particles';
    document.body.appendChild(rustParticles);
    
    // Create initial particles
    for (let i = 0; i < 30; i++) {
        createSingleParticle(rustParticles);
    }
    
    // Continuously create new particles
    setInterval(() => {
        createSingleParticle(rustParticles);
    }, 200);
}

function createSingleParticle(container) {
    const particle = document.createElement('div');
    particle.className = 'rust-particle';
    
    // Random position, size and opacity
    const x = Math.random() * window.innerWidth;
    const y = Math.random() * window.innerHeight;
    
    // More pixelated appearance - use integer values and slightly larger sizes
    const size = Math.floor(Math.random() * 5) + 2; // 2-6px squares for more visibility
    const opacity = Math.random() * 0.6 + 0.2; // Higher opacity range (0.2-0.8)
    
    // Rust-like colors - array of rust shades
    const rustColors = [
        '#8B4513', // brown
        '#A52A2A', // brown/red
        '#CD5C5C', // indianred
        '#B22222', // firebrick
        '#E25822', // rust orange
        '#6B3E2E', // dark rust
        '#884535', // rust brown
        '#CC5500'  // burnt orange
    ];
    
    // Randomly pick a rust color
    const rustColor = rustColors[Math.floor(Math.random() * rustColors.length)];
    
    // Set styles
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    particle.style.left = `${Math.floor(x)}px`; // Integer values for pixelated look
    particle.style.top = `${Math.floor(y)}px`;
    particle.style.opacity = opacity.toString();
    particle.style.backgroundColor = rustColor;
    particle.style.boxShadow = '0 0 2px rgba(255, 100, 0, 0.5)'; // Subtle glow
    
    // Add to container
    container.appendChild(particle);
    
    // Add glitching behavior - occasionally move/flicker the particle
    const glitchInterval = setInterval(() => {
        if (Math.random() > 0.7) {
            // Random position jump (glitch)
            const jumpX = Math.floor(Math.random() * 5) - 2; // -2 to +2 pixels
            const jumpY = Math.floor(Math.random() * 5) - 2;
            
            particle.style.transform = `translate(${jumpX}px, ${jumpY}px)`;
            
            // Occasionally change color too
            if (Math.random() > 0.8) {
                const newColor = rustColors[Math.floor(Math.random() * rustColors.length)];
                particle.style.backgroundColor = newColor;
            }
            
            // Flicker opacity
            particle.style.opacity = (Math.random() * 0.6 + 0.2).toString();
        } else {
            // Reset transform
            particle.style.transform = 'translate(0, 0)';
        }
    }, 200); // Glitch check every 200ms
    
    // Remove after animation completes
    setTimeout(() => {
        clearInterval(glitchInterval);
        particle.remove();
    }, Math.random() * 6000 + 3000); // Slightly shorter lifespan (3-9s)
}

// Project cards interaction
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

// Smooth scrolling
function setupSmoothScrolling() {
    const navLinks = document.querySelectorAll('nav a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            const headerHeight = document.querySelector('header').clientHeight;
            console.log(headerHeight);

            if (targetElement) {
                // Add glitch effect before scrolling
                addGlitchEffect(this);
                
                // Scroll to target with a slight delay for the glitch effect
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

// Skill bars animation
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

// Contact form
function setupContactForm() {
    const form = document.querySelector('#contact form');
    
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Simple validation
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            if (name && email && subject && message) {
                // Create a success message in terminal style
                const submitBtn = form.querySelector('.submit-btn');
                submitBtn.textContent = 'TRANSMITTING...';
                
                setTimeout(() => {
                    submitBtn.classList.add('success');
                    submitBtn.textContent = 'MESSAGE RECEIVED';
                    
                    // Reset the form after a delay
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

// Add the noise effect to the background
function createNoiseEffect() {
    const noise = document.querySelector('.noise');
    
    if (noise) {
        setInterval(() => {
            noise.style.backgroundPosition = `${Math.random() * 100}% ${Math.random() * 100}%`;
        }, 100);
    }
}

// Call the noise effect function
createNoiseEffect();

// Blinking cursor animation for elements with .blink class
function animateBlinkingCursors() {
    const blinkElements = document.querySelectorAll('.blink');
    
    setInterval(() => {
        blinkElements.forEach(el => {
            el.style.opacity = el.style.opacity === '0' ? '1' : '0';
        });
    }, 500);
}

// Start the blinking cursor animation
animateBlinkingCursors();

// Timeline animation //
function animateTimelineItems(type) {
    const timelineItems = document.querySelectorAll(`${type} .timeline-item`);

    timelineItems.forEach((item, index) => {
        setTimeout(() => {
            item.classList.add('glitch-in');
            setTimeout(() => {
                item.classList.remove('glitch-in');
                item.classList.add('visible');
            }, 400);
        }, index * 500); // 300ms delay between each item
    });
}

