async function translateText() {
    const inputText = document.getElementById("englishText").value;
    const outputBox = document.getElementById("sinhalaText");
    const loader = document.getElementById("loader");
    const btn = document.querySelector(".main-btn");

    if (!inputText.trim()) {
        alert("Please enter some text to translate.");
        return;
    }

    // UI Loading State
    btn.disabled = true;
    loader.style.display = "inline-block";
    outputBox.value = "Translating...";

    try {
        // Calling backend
        const response = await fetch('/.netlify/functions/translate', {
            method: 'POST',
            body: JSON.stringify({ text: inputText }),
            headers: { 'Content-Type': 'application/json' }
        });

        const data = await response.json();
        
        if (response.ok && data.translatedText) {
            outputBox.value = data.translatedText;
        } else {
            outputBox.value = "Error: " + (data.error || "Please try again.");
        }

    } catch (error) {
        console.error("Connection Error:", error);
        outputBox.value = "Connection failed. Please check internet.";
    } finally {
        btn.disabled = false;
        loader.style.display = "none";
    }
}

// Voice Toggle
function toggleSpeech() {
    const text = document.getElementById("sinhalaText").value;
    const btn = document.getElementById("speakBtn");

    if (window.speechSynthesis.speaking) {
        window.speechSynthesis.cancel();
        btn.innerText = "🔊";
        return;
    }

    if (!text) return;

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'si-LK'; 
    
    btn.innerText = "⏹"; 

    utterance.onend = function() {
        btn.innerText = "🔊"; 
    };

    window.speechSynthesis.speak(utterance);
}

// Copy Text
function copyText() {
    const text = document.getElementById("sinhalaText").value;
    if (!text) return;
    navigator.clipboard.writeText(text);
    alert("Copied to clipboard!");
}

// Reset
function resetApp() {
    document.getElementById("englishText").value = "";
    document.getElementById("sinhalaText").value = "";
    window.speechSynthesis.cancel();
    document.getElementById("speakBtn").innerText = "🔊";
}