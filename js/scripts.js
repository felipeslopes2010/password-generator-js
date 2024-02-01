const generatePasswordButton = document.querySelector('#generate-password');
const generatePasswordElement = document.querySelector('#generated-password');
const openCloseGeneratorButton = document.querySelector('#open-generate-password')
const generatePasswordContainer = document.querySelector('#generate-options');
const lengthInput = document.querySelector('#length'); 
const lettersInput = document.querySelector('#letters'); 
const numbersInput = document.querySelector('#numbers'); 
const symbolsInput = document.querySelector('#symbols');
const copyPasswordButton = document.querySelector('#copy-password');

const getRandomLowerCaseLetter = () => {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
}

const getRandomUpperCaseLetter = () => {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
}

const getRandomNumber = () => {
    return Math.floor(Math.random() * 10).toString();
}

const getRandomSymbol = () => {
    const symbols = "(){}[]=<>/,.!@#$%&*+-";
    return symbols[Math.floor(Math.random() * symbols.length)];
}

const generatePassword = (getRandomLowerCaseLetter, getRandomUpperCaseLetter, getRandomNumber, getRandomSymbol) => {

    let password = "";
    
    const passwordLength = lengthInput.value;

    let generators = [];

    if(lettersInput.checked) {
        generators.push(getRandomLowerCaseLetter, getRandomUpperCaseLetter)
    }

    if(numbersInput.checked) {
        generators.push(getRandomNumber)
    }

    if(symbolsInput.checked) {
        generators.push(getRandomSymbol)
    }

    if(generators.length === 0) {
        return;
    }

    for(i = 0; i < passwordLength; i += generators.length) {
        generators.forEach(() => {

            const randomValue = generators[Math.floor(Math.random() * generators.length)]();

            password += randomValue;
        });
    }

    password = password.slice(0, passwordLength);

    if(passwordLength > 20) {
        generatePasswordContainer.querySelector('#length-message').innerText = 'Sua senha deve ter menos de 20 caracteres';
        generatePasswordElement.querySelector('h4').innerText = ''
        copyPasswordButton.setAttribute("disabled", '');
        generatePasswordElement.style.display = 'none';
        return;
    } else {
        generatePasswordContainer.querySelector('#length-message').innerText = '';
        copyPasswordButton.removeAttribute("disabled");
        generatePasswordElement.classList.remove('hide');
    }

    generatePasswordElement.style.display = 'block';
    generatePasswordElement.querySelector('h4').innerText = password;
}

if(generatePasswordContainer.classList.contains('hide')) {
    document.body.style.overflowY = 'hidden';
}

generatePasswordButton.addEventListener('click', () => {
    generatePassword(getRandomLowerCaseLetter, getRandomUpperCaseLetter, getRandomNumber, getRandomSymbol);
});

openCloseGeneratorButton.addEventListener('click', () => {
    generatePasswordContainer.classList.toggle('hide');
    generatePasswordElement.style.display = 'none';
    if(!generatePasswordContainer.classList.contains('hide')) {
        document.body.style.overflowY = 'scroll';
    } else {
        document.body.style.overflowY = 'hidden';
    }
});

copyPasswordButton.addEventListener('click', e => {
    e.preventDefault();

    const password = generatePasswordElement.querySelector('h4').innerText;

    navigator.clipboard.writeText(password).then(() => {
        copyPasswordButton.innerText = 'Senha copiada com sucesso!';

        setTimeout(() => {
            copyPasswordButton.innerText = 'Copiar';
        }, 1500);
    });
});