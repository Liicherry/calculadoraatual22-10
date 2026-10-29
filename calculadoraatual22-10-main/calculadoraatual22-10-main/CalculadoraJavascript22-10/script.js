const result = document.querySelector('.result'); //pegar o resultado
const buttons = document.querySelectorAll('.buttons button');

//criar as variaveis dos calculos

let currentNumber = ""; //numero atual
let firstOpe = null; //primeiro numero
let operador = null; //operador
let restart = false; //restart

//funções:
function updateResultado(originClear = false){
    result.innerText = originClear ? 0 : currentNumber.replace(".",",");
}


function addDigit(digit){ //função para add o digito no visor
    if (addDigit === "," && (currentNumber.includes(",") || !currentNumber)) // ver se ja tem virgula ou algo digitado
    return;

    if (restart){
        currentNumber = digit;
        restart = false; //vai se tornar true apenas quando eu calcular   
    }else{
        currentNumber += digit; // se não ele apenas segue concatenando um no outro (12345)
    }    

    updateResultado();
}


function setOperador(newOpe){//recebe o operador por parametro
    if (currentNumber){ //verifica se tem algum numero atual
        calculate();

        firstOpe = parseFloat(currentNumber.replace(",","."));
        currentNumber = "";
    }

    operador = newOpe;
}

function calculate(){ //aqui fazemos os calculos
    if (operador === null || firstOpe === null) result;
    let secondOpe = parseFloat(currentNumber.replace(",","."));
    let ValorFinal ; // onde guardo o resultado

    // faço um switch para verificar os op e escolher o calculo

    switch(operador){
        case "+":
            ValorFinal = firstOpe + secondOpe;
            break;
        case "-":
            ValorFinal = firstOpe - secondOpe;
            break;
        case "x":
            ValorFinal = firstOpe * secondOpe;
            break;
        case "÷":
            ValorFinal = firstOpe / secondOpe;
            break;
        default:
            return;
    }

    // verificar se o resultado tem + de 5 casas decimais

    if(ValorFinal.toString().split(".")[1]?.length >5){
        currentNumber = parseFloat(ValorFinal.toFixed(5)).toString();
    }else{
        currentNumber = ValorFinal.toString();
    }

    // feito o calculo isso acontece:

    operador = null;
    firstOpe = null;
    restart = true;
    updateResultado();

}

function clearCalculator(){
    currentNumber = ""; //num atual fica vazio
    firstOpe = null;
    operador = null;
    updateResultado(true);
}

function setPercentage(){
        let result = parseFloat(currentNumber) / 100;

        if(["+","-"].includes(operador)) {
            result = result * (firstOpe || 1);
        }

        if (result.toString().split(".")[1]?.length > 5){
            result = result.toFixed(5).toString();
        }
        currentNumber = result.toString();
        updateResultado();
}


//para cada botão:

buttons.forEach((button) => {
    button.addEventListener("click", () => {
        const TextoBotao = button.innerText;
        if (/^[0-9]+$/.test(TextoBotao)){
            addDigit(TextoBotao);
        }else if(["+","-","x","÷"].includes(TextoBotao)){ // 1)coloco os op em array 2) verifico se o botao clicado é um operador atraves do include
            setOperador(TextoBotao)
        }else if (TextoBotao === "="){
            calculate();
        }else if (TextoBotao === "C"){
            clearCalculator(); //para limpar o visor
        }else if (TextoBotao === "±"){
            currentNumber = (
             parseFloat(currentNumber || firstOpe ) * -1
            ).toString();
            updateResultado();
        }else if (TextoBotao === "%"){
            setPercentage(); //para calcular a porcentagem
        }
    })
})