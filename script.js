// ASTROQUEST - Lunar Mission Simulator 2.0

let resources = {
    lifeSupport: 100,
    power: 100,
    shielding: 100
};

let currentEvent = 0;
let missionActive = false;
let decisionsMade = [];

const events = [
    {
        title: "☀️ Solar Radiation Alert",
        description: "A simulated solar radiation event is approaching. Your crew must decide how to respond.",
        choices: [
            {
                text: "Activate extra shielding",
                changes: { power: -15, shielding: 10 },
                explanation: "Extra protection is activated, but it consumes power."
            },
            {
                text: "Conserve power",
                changes: { lifeSupport: -5 },
                explanation: "Power is conserved, but the crew's protection plan needs attention."
            }
        ]
    },
    {
        title: "⚡ Power Shortage",
        description: "The lunar base is experiencing a simulated power shortage.",
        choices: [
            {
                text: "Reduce non-essential equipment",
                changes: { power: 15 },
                explanation: "Non-essential equipment is switched off, preserving available power."
            },
            {
                text: "Continue normal operations",
                changes: { power: -25, lifeSupport: 5 },
                explanation: "Normal operations continue, but power reserves decrease."
            }
        ]
    },
    {
        title: "💧 Life Support Warning",
        description: "The life-support system needs attention. Your crew must make a difficult decision.",
        choices: [
            {
                text: "Prioritize life-support systems",
                changes: { power: -15, lifeSupport: 15 },
                explanation: "More power is allocated to life support, improving its reserve."
            },
            {
                text: "Limit resource consumption",
                changes: { lifeSupport: 5, power: 5 },
                explanation: "The crew reduces consumption to preserve available resources."
            }
        ]
    }
    ,
    {
        title: "🌡️ Thermal Control Alert",
        description: "The lunar habitat is facing a simulated temperature-control challenge. Your crew must protect the habitat while managing available resources.",
        choices: [
            {
                text: "Prioritise thermal control",
                changes: {
                    power: -15,
                    lifeSupport: 10
                },
                explanation: "Thermal control receives priority. Power reserves decrease, while the habitat's life-support reserve improves."
            },
            {
                text: "Reduce non-essential equipment",
                changes: {
                    power: 10,
                    lifeSupport: -10
                },
                explanation: "Reducing non-essential equipment conserves power, but places additional pressure on habitat support."
            }
        ]
    }
];

const startButton = document.getElementById("startMission");
const missionMessage = document.getElementById("missionMessage");

function updateResources() {
    document.getElementById("lifeSupport").textContent =
        resources.lifeSupport + "%";

    document.getElementById("power").textContent =
        resources.power + "%";

    document.getElementById("shielding").textContent =
        resources.shielding + "%";
}

function showEvent() {

    const event = events[currentEvent];

    missionMessage.textContent =
        event.title + " — " + event.description;

    const choices = document.getElementById("choices");

    if (choices) {
        choices.remove();
    }

    const choiceContainer = document.createElement("div");
    choiceContainer.id = "choices";

    event.choices.forEach(function(choice) {

        const button = document.createElement("button");

        button.textContent = choice.text;

        button.addEventListener("click", function() {
            makeDecision(choice);
        });

        choiceContainer.appendChild(button);
    });

    document.querySelector(".event").appendChild(choiceContainer);

    const status = document.querySelector(".mission p:last-child");
    status.textContent = "Mission Status: Event " +
        (currentEvent + 1) + " of " + events.length;
}

function makeDecision(choice) {

    decisionsMade.push(choice.text);

    for (const resource in choice.changes) {

        resources[resource] = Math.max(
            0,
            Math.min(100, resources[resource] + choice.changes[resource])
        );
    }

    updateResources();

    document.getElementById("choices").remove();

    missionMessage.textContent = choice.explanation;

    if (
        resources.lifeSupport <= 0 ||
        resources.power <= 0 ||
        resources.shielding <= 0
    ) {
        finishMission(false);
        return;
    }

    currentEvent++;

    if (currentEvent >= events.length) {
        finishMission(true);
    } else {
        const nextButton = document.createElement("button");

        nextButton.textContent = "Continue Mission";

        nextButton.addEventListener("click", function() {
            nextButton.remove();
            showEvent();
        });

        document.querySelector(".event").appendChild(nextButton);
    }
}

function finishMission(completed) {

    missionActive = false;

    document.getElementById("startMission").disabled = true;

    const status = document.querySelector(".mission p:last-child");

    if (completed) {

        status.textContent = "Mission Status: Completed";

        missionMessage.textContent =
            "🌕 Mission completed! Your crew reached the end of all mission events. Review your final resource levels.";

    } else {

        status.textContent = "Mission Status: Unsuccessful";

        missionMessage.textContent =
            "Mission unsuccessful. One or more critical resource reserves reached zero.";
    }

    const results = document.createElement("section");

results.innerHTML = `
    <h2>📊 Mission Results</h2>
    <h3>Final Resource Levels</h3>
    <p>💧 Life Support: ${resources.lifeSupport}%</p>
    <p>⚡ Power: ${resources.power}%</p>
    <p>🛡️ Radiation Shielding: ${resources.shielding}%</p>

    <h3>🧑‍🚀 Crew Decisions</h3>
    <ul>
        ${decisionsMade.map(decision => `<li>${decision}</li>`).join("")}
    </ul>

    <p>Events completed: ${currentEvent + (completed ? 1 : 0)} / ${events.length}</p>
    <p>Educational simulation values, not live NASA measurements.</p>
`;

document.querySelector("main").appendChild(results);

    const restartButton = document.createElement("button");

    restartButton.textContent = "Restart Mission";

    restartButton.addEventListener("click", function() {
        location.reload();
    });

    document.querySelector(".event").appendChild(restartButton);
}

startButton.addEventListener("click", function() {

    if (missionActive) return;

    missionActive = true;

    currentEvent = 0;

    decisionsMade = [];

    startButton.disabled = true;

    startButton.textContent = "Mission In Progress";

    showEvent();
});

updateResources();