const bmiRanges = [
    { min: 0, max: 18.4, label: 'Underweight', color: 'blue' },
    { min: 18.5, max: 24.9, label: 'Healthy Weight', color: 'green' },
    { min: 25, max: 29.9, label: 'Overweight', color: 'orange' },
    { min: 30, max: Infinity, label: 'Overweight', color: 'red' }
];

function calculateBMI() {
    // Get height and weight from user input
    const height = parseFloat(document.getElementById('height').value);
    const weight = parseFloat(document.getElementById('weight').value);

    if (isNaN(height) || isNaN(weight) || height <= 0 || weight <= 0) {
        alert("Please enter valid height and weight values.");
        return;
    }

    // Calculate BMI
    const m2 = (height / 100) ** 2;
    const BMI = parseFloat((weight / m2).toFixed(1));

    // Display BMI value and category
    const resultDisplay = document.getElementById('bmi-result-display');
    let group = '';
    let color = '';

    for (let i = 0; i < bmiRanges.length; i++) {
        if (BMI >= bmiRanges[i].min && BMI <= bmiRanges[i].max) {
            group = bmiRanges[i].label;
            color = bmiRanges[i].color;
            break;
        }
    }

    resultDisplay.innerHTML = `
        <p>BMI = ${BMI}</p>
        <p style="color: ${color};">Category: ${group}</p>
    `;

    // Draw chart and pointer
    drawBMITable();
    drawPointer(BMI);
}

function drawBMITable() {
    const canvas = document.getElementById('bmi-canvas');
    const ctx = canvas.getContext('2d');

    // Clear previous drawings
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw BMI ranges as colored rectangles
    const sectionWidth = 250; // Width of each BMI range section
    const height = 150; // Height of each rectangle
    const startY = 0;

    // Draw Underweight Section
    ctx.fillStyle = 'blue';
    ctx.fillRect(0, startY, sectionWidth, height);
    ctx.fillStyle = 'black';
    ctx.font = '12pt Arial';
    
    ctx.fillText('Underweight', sectionWidth / 2 - 45 , startY + height / 2);

    // Draw Healthy Weight Section
    ctx.fillStyle = 'green';
    ctx.fillRect(sectionWidth, startY, sectionWidth, height);
    ctx.fillStyle = 'black';
    ctx.fillText('Healthy Weight', sectionWidth + 70, startY + height / 2);

    // Draw Overweight Section
    ctx.fillStyle = 'orange';
    ctx.fillRect(2 * sectionWidth, startY, sectionWidth, height);
    ctx.fillStyle = 'black';
    ctx.fillText('Overweight', 2 * sectionWidth + 80, startY + height / 2);

    // Draw Obesity Section
    ctx.fillStyle = 'red';
    ctx.fillRect(3 * sectionWidth, startY, sectionWidth, height);
    ctx.fillStyle = 'black';
    ctx.fillText('Overweight', 3 * sectionWidth + 80, startY + height / 2);
}

function drawPointer(BMI) {
    const canvas = document.getElementById('bmi-canvas');
    const ctx = canvas.getContext('2d');
    
    const startY = 180; // Vertical position of the arrow pointer
    const sectionWidth = 1000 / 4; // Width of each section (250 pixels)
    let x;

    // Calculate the x-position of the pointer based on BMI
    if (BMI < 18.5) {
        // Underweight (0 - 18.4)
        x = (BMI / 18.4) * sectionWidth;
    } else if (BMI >= 18.5 && BMI <= 24.9) {
        // Healthy Weight (18.5 - 24.9)
        x = sectionWidth + ((BMI - 18.5) / (24.9 - 18.5)) * sectionWidth;
    } else if (BMI >= 25 && BMI <= 29.9) {
        // Overweight (25 - 29.9)
        x = 2 * sectionWidth + ((BMI - 25) / (29.9 - 25)) * sectionWidth;
    } else {
        // Overweight (30 and above)
        x = 3 * sectionWidth + ((BMI - 30) / 10) * sectionWidth; // Mapping beyond the overweight threshold
    }

    // Ensure x doesn't exceed canvas boundaries
    x = Math.min(x, canvas.width - 10); // Ensure the pointer stays within canvas limits

    // Draw the pointer as an arrow
    ctx.fillStyle = 'black';
    ctx.beginPath();
    ctx.moveTo(x - 10, startY - 10);
    ctx.lineTo(x, startY - 30);
    ctx.lineTo(x + 10, startY - 10);
    ctx.closePath();
    ctx.fill();
}