// ASTROQUEST - Mission Experience

const missions = [
    {
        title: "🌕 Lunar Landing Mission",
        description: "Your spacecraft is approaching the Moon.",
        instruction: "Your fuel level is limited. Choose a safe landing area.",
        choices: [
            "Choose a flat landing area",
            "Land near a rocky mountain"
        ],
        results: [
            "Excellent! A flat area provides a safer landing.",
            "Danger! Rocky terrain increases landing risks."
        ]
    },
    {
        title: "☀️ Solar Storm Mission",
        description: "A solar radiation warning has been detected.",
        instruction: "Protect your crew from dangerous radiation.",
        choices: [
            "Move into the shielded shelter",
            "Continue working outside"
        ],
        results: [
            "Correct! The shelter offers radiation protection.",
            "Warning! The crew is exposed to radiation."
        ]
    },
    {
        title: "🫁 Oxygen Emergency",
        description: "The spacecraft oxygen level is decreasing.",
        instruction: "Your crew needs oxygen immediately.",
        choices: [
            "Check the oxygen supply system",
            "Ignore the warning"
        ],
        results: [
            "Good decision! Checking the system helps identify the problem.",
            "Danger! Ignoring the warning puts the crew at risk."
        ]
    }
];

const missionArea = document.getElementById("missions");

missions.forEach((mission, index) => {

    const card = document.createElement("div");
    card.className = "mission-card";

    card.innerHTML = `
        <h3>${mission.title}</h3>
        <p>${mission.description}</p>
        <p><strong>Astronaut Instruction:</strong>
        ${mission.instruction}</p>

        <div class="mission-actions">
            <button data-mission="${index}" data-choice="0">
                ${mission.choices[0]}
            </button>

            <button data-mission="${index}" data-choice="1">
                ${mission.choices[1]}
            </button>
        </div>

        <p class="mission-feedback" id="feedback-${index}">
            Waiting for your decision...
        </p>
    `;

    missionArea.appendChild(card);
});

missionArea.addEventListener("click", function(event) {

    const button = event.target.closest("button[data-mission]");

    if (!button) return;

    const missionIndex = Number(button.dataset.mission);
    const choiceIndex = Number(button.dataset.choice);

    const mission = missions[missionIndex];

    const feedback = document.getElementById(
        `feedback-${missionIndex}`
    );

    feedback.textContent = mission.results[choiceIndex];

});
