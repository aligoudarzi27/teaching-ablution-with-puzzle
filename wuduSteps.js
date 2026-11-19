const wuduStepImages = [
    "./intention.jpg",
    "./face.jpg",
    "./right hand.jpg",
    "./left hand.jpg",
    "./head.jpg",
    "./right leg.jpg",
    "./left leg.jpg"
];

function getWuduStepImageHTML(index) {
    return `<img src="${wuduStepImages[index]}" 
    alt="${translations[currentLanguage].wuduSteps[index].name}" 
    class="step-image">`;
}

const wuduStepSounds = [
    null,
    null,
    null,
    null,
    null,
    null,
    null
];
