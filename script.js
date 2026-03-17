const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+{}[]:;<>,.?/";

// Initialize inputs to 0 and normalize values on page load
window.onload = () => {
    const inputs = document.querySelectorAll('.num-input');

    inputs.forEach(input => {
        input.value = "0";
        input.defaultValue = "0";

        // Remove leading zeros (e.g., 06 → 6)
        input.addEventListener('input', () => {
            let val = input.value.replace(/^0+(\d)/, '$1');
            if (val === "") val = "0";
            input.value = val;
        });
    });
};

// Helper to generate password based on exact counts
function createPasswordString(upper, lower, special, digits) {
    let chars = [];
    const getRandomChar = (str) => str[Math.floor(Math.random() * str.length)];

    for (let i = 0; i < upper; i++) chars.push(getRandomChar("ABCDEFGHIJKLMNOPQRSTUVWXYZ"));
    for (let i = 0; i < lower; i++) chars.push(getRandomChar("abcdefghijklmnopqrstuvwxyz"));
    for (let i = 0; i < special; i++) chars.push(getRandomChar("!@#$%^&*()_+{}[]:;<>,.?/"));
    for (let i = 0; i < digits; i++) chars.push(getRandomChar("0123456789"));

    // Shuffle characters for better randomness
    for (let i = chars.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [chars[i], chars[j]] = [chars[j], chars[i]];
    }

    return chars.join('');
}

function generate() {
    const length = parseInt(document.getElementById('length').value);
    const upperCount = parseInt(document.getElementById('upper').value);
    const lowerCount = parseInt(document.getElementById('lower').value);
    const specialCount = parseInt(document.getElementById('special').value);
    const digitCount = parseInt(document.getElementById('digits').value);
    const resultDiv = document.getElementById('result');
    const suggestionBox = document.getElementById('suggestions-container');

    // Prevent generation if all values are zero
    if (length === 0 && upperCount === 0 && lowerCount === 0 && specialCount === 0 && digitCount === 0) {
        showToast("Must put some values!");
        suggestionBox.innerHTML = '';
        return;
    }

    // Ensure total matches the desired length
    if (upperCount + lowerCount + specialCount + digitCount !== length) {
        showToast("Counts must exactly add up to total length!");
        suggestionBox.innerHTML = '';
        return;
    }
    
    const finalPassword = createPasswordString(upperCount, lowerCount, specialCount, digitCount);
    
    updateStrength(length);
    triggerEmojiExplosion();
    
    let iteration = 0;
    clearInterval(resultDiv.interval);
    
    // Animated password reveal effect
    resultDiv.interval = setInterval(() => {
        resultDiv.innerText = finalPassword
            .split("")
            .map((letter, index) => {
                if (index < iteration) return finalPassword[index];
                return letters[Math.floor(Math.random() * 26)];
            })
            .join("");
        
        if (iteration >= finalPassword.length) {
            clearInterval(resultDiv.interval);
            generateSuggestions(upperCount, lowerCount, specialCount, digitCount);
        }
        
        iteration += 1 / 3;
    }, 30);
}

// Generate 4 alternative passwords
function generateSuggestions(upper, lower, special, digits) {
    const container = document.getElementById('suggestions-container');
    container.innerHTML = '';

    for (let i = 0; i < 4; i++) {
        let suggestedPwd = createPasswordString(upper, lower, special, digits);
        
        const chip = document.createElement('div');
        chip.className = 'history-item';
        chip.innerText = suggestedPwd;
        chip.title = "Click to copy";
        chip.onclick = () => {
            navigator.clipboard.writeText(suggestedPwd);
            showToast("Copied to clipboard!");
        };
        
        container.appendChild(chip);
    }
}

// Update strength indicator based on length
function updateStrength(length) {
    const bar = document.getElementById('strength-bar');
    const text = document.getElementById('strength-text');

    if (length < 8) {
        bar.style.width = '30%';
        bar.style.backgroundColor = '#ef4444';
        bar.style.boxShadow = '0 0 10px rgba(239, 68, 68, 0.5)';
        text.innerText = 'Weak';
        text.style.color = '#ef4444';
    } else if (length < 12) {
        bar.style.width = '65%';
        bar.style.backgroundColor = '#3b82f6';
        bar.style.boxShadow = '0 0 10px rgba(59, 130, 246, 0.5)';
        text.innerText = 'Good';
        text.style.color = '#3b82f6';
    } else {
        bar.style.width = '100%';
        bar.style.backgroundColor = '#10b981';
        bar.style.boxShadow = '0 0 10px rgba(16, 185, 129, 0.5)';
        text.innerText = 'Strong';
        text.style.color = '#10b981';
    }
}

// Copy generated password to clipboard
function copyToClipboard() {
    const passwordText = document.getElementById('result').innerText;
    if (passwordText === "Your_Password" || passwordText === "") return;

    navigator.clipboard.writeText(passwordText).then(() => {
        showToast("Copied to clipboard!");
    });
}

// Show toast notification
function showToast(message) {
    const toast = document.getElementById('toast');
    toast.innerText = message;
    toast.classList.add('show');
    setTimeout(() => { toast.classList.remove('show'); }, 2000);
}

// Reset all inputs and UI state
function resetApp() {
    const ids = ['length', 'upper', 'lower', 'special', 'digits'];

    ids.forEach(id => {
        const el = document.getElementById(id);
        el.value = "0";
        el.defaultValue = "0";
    });

    document.getElementById('result').innerText = "Your_Password";

    const bar = document.getElementById('strength-bar');
    const text = document.getElementById('strength-text');
    bar.style.width = '0%';
    bar.style.backgroundColor = '#27272a';
    bar.style.boxShadow = 'none';
    text.innerText = 'None';
    text.style.color = '#a1a1aa';

    document.getElementById('suggestions-container').innerHTML = '';

    showToast("Inputs & Settings Reset!");
}

// Trigger emoji burst animation
function triggerEmojiExplosion() {
    const emojis = ['✨', '⚡', '🚀', '🔑', '🛡️', '🔒'];
    const particlesCount = 20;

    const container = document.getElementById('app-container');
    container.classList.remove('shake-active');
    void container.offsetWidth;
    container.classList.add('shake-active');

    for (let i = 0; i < particlesCount; i++) {
        const el = document.createElement('div');
        el.className = 'emoji-particle';
        el.innerText = emojis[Math.floor(Math.random() * emojis.length)];
        
        const angle = Math.random() * Math.PI * 2;
        const distance = 100 + Math.random() * 250;
        
        const tx = (Math.cos(angle) * distance) + 'px';
        const ty = (Math.sin(angle) * distance) + 'px';
        const rot = (Math.random() - 0.5) * 720 + 'deg';

        el.style.setProperty('--tx', `calc(-50% + ${tx})`);
        el.style.setProperty('--ty', `calc(-50% + ${ty})`);
        el.style.setProperty('--rot', rot);
        
        document.body.appendChild(el);
        setTimeout(() => { el.remove(); }, 1000);
    }
}

// Theme toggle handling
window.addEventListener("load", function () {
    const toggleBtn = document.getElementById("theme-toggle");

    if (!toggleBtn) return;

    toggleBtn.addEventListener("click", function () {
        document.body.classList.toggle("light");

        // Switch icon based on theme
        if (document.body.classList.contains("light")) {
            toggleBtn.innerText = "☀️";
        } else {
            toggleBtn.innerText = "🌙";
        }
    });
});