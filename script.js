// Function to toggle the sidebar and main content shift
function toggleSidebar() {
    const sidebar = document.getElementById("sidebar");
    const mainContent = document.getElementById("main-content");
    sidebar.classList.toggle("show");
    mainContent.classList.toggle("shift-right"); // Apply the class to shift main content
}

// Close sidebar when any link in the sidebar is clicked
function closeSidebar() {
    const sidebar = document.getElementById("sidebar");
    const mainContent = document.getElementById("main-content");
    sidebar.classList.remove("show");
    mainContent.classList.remove("shift-right");
}

// Typing Effect for Hero Section
document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS (Animate On Scroll) for animations
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 1200,  // Specifies the animation duration
            easing: 'ease-in-out-quart',  // Specifies the easing type
            once: true  // Animation should only happen once
        });
    }

    // Typing effect for text phrases
    const phrases = ["DevOps Engineer", "Full-Stack Developer", "Cloud Enthusiast"];
    let currentPhraseIndex = 0;
    let currentLetterIndex = 0;
    let isDeleting = false;
    const typedTextSpan = document.getElementById('typed-text');
    
    if (!typedTextSpan) {
        console.error('Typed text element not found!');
        return;
    }

    const typingSpeed = 150;  // Speed of typing in ms
    const deletingSpeed = 100; // Speed of deleting in ms
    const delayBetweenPhrases = 2000; // Delay before typing the next phrase in ms

    function type() {
        const currentPhrase = phrases[currentPhraseIndex];

        if (!isDeleting && currentLetterIndex <= currentPhrase.length) {
            typedTextSpan.textContent = currentPhrase.slice(0, currentLetterIndex);
            currentLetterIndex++;
            setTimeout(type, typingSpeed);
        } else if (isDeleting && currentLetterIndex > 0) {
            typedTextSpan.textContent = currentPhrase.slice(0, currentLetterIndex - 1);
            currentLetterIndex--;
            setTimeout(type, deletingSpeed);
        } else if (!isDeleting && currentLetterIndex === currentPhrase.length) {
            setTimeout(() => {
                isDeleting = true;
                type();
            }, delayBetweenPhrases);
        } else if (isDeleting && currentLetterIndex === 0) {
            isDeleting = false;
            currentPhraseIndex = (currentPhraseIndex + 1) % phrases.length; // Move to next phrase
            setTimeout(type, typingSpeed);
        }
    }

    // Start the typing effect
    type();
});

function startTypingEffect(elementId) {
    const element = document.getElementById(elementId);
    const listItems = element.querySelectorAll("li");
    let currentIndex = 0;
    const typingSpeed = 50; // Speed of typing in ms

    function typeListItem(item) {
        let charIndex = 0;
        const text = item.getAttribute('data-text');
        item.textContent = ''; // Clear the text initially
        
        function typeChar() {
            if (charIndex < text.length) {
                item.textContent += text.charAt(charIndex);
                charIndex++;
                setTimeout(typeChar, typingSpeed);
            } else {
                currentIndex++; // Move to the next list item
                if (currentIndex < listItems.length) {
                    setTimeout(() => typeListItem(listItems[currentIndex]), 6); // Short delay before typing the next item
                }
            }
        }
        typeChar();
    }

    // Start typing effect only if no other typing effect is running
    if (element.dataset.isTyping !== 'true') {
        element.dataset.isTyping = 'true'; // Set a flag to indicate typing is in progress

        // Prepare list items by storing original text in data attributes
        listItems.forEach(item => {
            if (!item.getAttribute('data-text')) {
                item.setAttribute('data-text', item.textContent);
            }
        });

        // Start typing the first list item
        typeListItem(listItems[currentIndex]);
    }
}
