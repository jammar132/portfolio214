const projectDescriptions = {
    calculator: `
        - Process & Intention: My primary goal was to design a user-friendly and visually appealing interface for performing basic calculations. I wanted users to have an intuitive experience, allowing them to input numbers and operators with ease. I utilized functions to handle different aspects of the calculator, such as designing the graphical interface, checking whether a clicked object is a number or an operation button, updating and clearing the displayed numbers, and performing the actual calculations. What I learned from writing the code is the importance of modularity in coding. Breaking down the functionality into smaller, manageable code, making it more readable, maintainable, and easier to debug. I envision this work as a foundation for more advanced features and improvements.
    `,
    bmiCalculator: `
        - Process & Intention: The purpose of the BMI Calculator program is to give a quick and simple way to check whether weight is within a healthy range for height. Research has shown that there is a strong correlation between BMI and risk of developing health conditions. Developing the program gave me the ability to design a dynamic and responsive graphical interface and strengthened my programming skills, like iteration, error handling, code optimization, an understanding of algorithmic efficiency, handling data structures, management of user input, and implementation of calculations.
    `,
    quantumC: `
        - Process & Intention: My inspiration was to deliver a comprehensive and accessible resource explaining fundamental aspects of Quantum Computing. Fueled by a curiosity and fascination with Quantum Computing, I wanted to create a user-friendly platform and contribute to sharing knowledge in a field that holds immense promise for the future. My aim was to provide a clear narrative on what quantum computers are, delve into their historical development, and explore both potential risks and benefits associated with this powerful technology. I envision this work as a stepping stone, sparking curiosity and encouraging further exploration of the fascinating realm of quantum technology.
    `,
    ancientEgy: `
        - Process & Intention: My inspiration for this piece is my culture and ethnicity.<br><br>
        The scarab is a symbol of birth, life, death, and resurrection. The figure stands with outspread wings supported by Cleopatra’s arms, a prevalent symbol in Egyptian art. The Sun represented life, warmth, and growth. The Eye of Ra is a source of heat and light, associated with fire and flames. The core of the split sun is held by the scarab to project onto the pyramid. I added stars since the Egyptians aligned the pyramids and temples toward the north since it was believed the pharaohs became stars in the northern sky after passing. All design elements combined are in the shape of the ‘Ankh’ known as “the key of life” representing union and life itself.<br><br>
        My desired experience for anyone who views it is an appreciation for the cultural inspiration, and to be awed by the beauty and symbolism embedded in the artwork. I hope the viewer gets a glimpse into the world of ancient Egypt through my interpretation.
    `,
    frog: `
        - This is a fun interactive game called "Kill 'EM ALL" where you try to defeat all the enemies!
    `,
    HBxFC: `
        - Process & Intention: This project serves as a bridge between traditional and digital art for me. By taking an old drawing and incorporating it into Procreate, I learned the transformative powers of digital tools in artistic expression. This piece extended a traditional artwork and brought new life into it. The process of completely changing the image to create a more creative and colourful piece allowed me to experiment with digital techniques, layering, and blending to achieve a unique visual outcome. In this piece, I pushed the boundaries by combining two completely random things (Hubba Bubba x Fight Club); I see this leading me towards further experimentation with unconventional creativity. In crafting this piece, my intention was to challenge a thought-provoking response from the viewer.
    `,
    cactusNFT: `
        - Process & Intention: In creating this project, I chose a pixelated style for the cactus images, giving it a unique digital aesthetic. The video features the cactus against different backgrounds – clear day, serene sunset, starry night, etc... The intention is to blend elements of nature and digital art. The project, was inspired by the uprise of NFTs, it explores the concept of uniqueness in each iteration, creating a dynamic and visually engaging experience.
    `,
};

/* Assigning descriptions to the elements */
document.getElementById('frog-description').innerHTML = projectDescriptions.frog;
document.getElementById('quantumC-description').innerHTML = projectDescriptions.quantumC;
document.getElementById('ancientEgy-description').innerHTML = projectDescriptions.ancientEgy;
document.getElementById('bmi-description').innerHTML = projectDescriptions.bmiCalculator;
document.getElementById('calculator-description').innerHTML = projectDescriptions.calculator;
document.getElementById('HBxFC-description').innerHTML = projectDescriptions.HBxFC;
document.getElementById('cactusNFT-description').innerHTML = projectDescriptions.cactusNFT;