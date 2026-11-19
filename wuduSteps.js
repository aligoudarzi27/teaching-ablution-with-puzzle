const wuduStepImages = [
    "/intention.jpg", // 1. Intention (Niyyah) - intention.jpg added
    "/face.jpg", // 2. Washing the face
    "/right hand.jpg", // 3. Washing right arm
    "/left hand.jpg", // 4. Washing left arm
    "/head.jpg", // 5. Wiping the head (Masah)
    "/right leg.jpg", // 6. Wiping right foot
    "/left leg.jpg" // 7. Wiping left foot
];

// To use real images instead of SVG, you would uncomment and update this section:
function getWuduStepImageHTML(index) {
    return `<img src="${wuduStepImages[index]}" alt="${translations[currentLanguage].wuduSteps[index].name}" class="step-image">`;
}

// Audio paths for each step (when puzzle piece is placed correctly)
// Note: In a real implementation, these would be actual audio files
const wuduStepSounds = [
    "intention_sound.mp3", // Placeholder - will use console message instead
    "face_washing_sound.mp3",
    "right_arm_sound.mp3",
    "left_arm_sound.mp3",
    "head_wiping_sound.mp3",
    "right_foot_sound.mp3",
    "left_foot_sound.mp3"
];