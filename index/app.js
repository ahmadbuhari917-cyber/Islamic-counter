const cards = document.querySelectorAll(".card");
const clickSound = document.getElementById("clickSound");

cards.forEach(card => {
    const key = card.dataset.key;
    const max = parseInt(card.dataset.max);

    const countSpan = card.querySelector(".count span");
    const maxLabel = card.querySelector(".max");
    const tapBtn = card.querySelector(".tap-btn");
    const resetBtn = card.querySelector(".reset-btn");
    const progressCircle = card.querySelector(".progress");

    const radius = 60;
    const circumference = 2 * Math.PI * radius;

    maxLabel.textContent = max;

    let count = parseInt(localStorage.getItem(key)) || 0;
    updateUI();

    tapBtn.addEventListener("click", () => {
        if (count < max) {
            count++;
            playSound();
            save();
            updateUI();
        }
    });

    resetBtn.addEventListener("click", () => {
        count = 0;
        save();
        updateUI();
    });

    function updateUI() {
        countSpan.textContent = count;

        const progress = count / max;
        const offset = circumference * (1 - progress);
        progressCircle.style.strokeDashoffset = offset;
    }

    function save() {
        localStorage.setItem(key, count);
    }

    function playSound() {
        clickSound.currentTime = 0;
        clickSound.play().catch(() => { });
    }
});
