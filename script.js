// ASTROQUEST - Mission Control

let lifeSupport = 100;
let power = 100;
let shielding = 100;

const startButton = document.getElementById("startMission");

const lifeSupportDisplay = document.getElementById("lifeSupport");
const powerDisplay = document.getElementById("power");
const shieldingDisplay = document.getElementById("shielding");
const missionMessage = document.getElementById("missionMessage");

startButton.addEventListener("click", function () {

    document.querySelector(".mission p:last-child").textContent =
        "Mission Status: Active";

    missionMessage.textContent =
        "Mission alert! A simulated solar radiation event has been detected. What should your crew prioritize?";

    startButton.disabled = true;
    startButton.textContent = "Mission Started";

    const eventSection = document.querySelector(".event");

    eventSection.insertAdjacentHTML("beforeend", `
        <div id="choices">
            <button id="shieldChoice">Activate extra shielding</button>
            <button id="powerChoice">Conserve power</button>
        </div>
    `);

    document.getElementById("shieldChoice").addEventListener("click", function () {

        power = Math.max(0, power - 15);
        shielding = Math.min(100, shielding + 10);

        updateResources();

        missionMessage.textContent =
            "You activated extra shielding. Power was used to improve protection in this simulation.";

        document.getElementById("choices").remove();
    });

    document.getElementById("powerChoice").addEventListener("click", function () {

        lifeSupport = Math.max(0, lifeSupport - 5);

        updateResources();

        missionMessage.textContent =
            "You conserved power. However, the crew must review its radiation protection plan.";

        document.getElementById("choices").remove();
    });

});

function updateResources() {
    lifeSupportDisplay.textContent = lifeSupport + "%";
    powerDisplay.textContent = power + "%";
    shieldingDisplay.textContent = shielding + "%";
}