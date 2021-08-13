const numeros = document.querySelectorAll('.num')
const operandos = document.querySelectorAll('.operando')
const operadorAtual = document.querySelector('.operador-atual')
const operadorAnterior = document.querySelector('.operador-anterior')
const operacaoIgual = document.getElementById('equal')
const operacaoDelete = document.getElementById('backspace')
const operacaoClear = document.querySelector('.clear-operation')
const operacaoEClear = document.querySelector('.clearE-operation')
const displayAtual = document.querySelector('.operador-atual')
const displayAnterior = document.querySelector('.operador-anterior')
const operacaoEspecial = document.querySelector('.operando-especial')

const cientificaMenu = document.querySelector('.cientifica-menu')
const padrao = document.getElementById('padrao')
const cientific = document.getElementById('cientifica')

class Calculadora {
    constructor(operadorAnterior,operadorAtual,displayAtual,displayAnterior) {
        this.operadorAnterior = operadorAnterior
        this.operadorAtual = operadorAtual
        this.displayAtual = displayAtual
        this.displayAnterior = displayAnterior
        this.clear()
    }

    
    clear() {
        this.operadorAtual = ''
        this.operadorAnterior = ''
        this.operacao = undefined

    }

    clearE() {
        this.operadorAtual = ''
    }

    delete() {
        this.operadorAtual = this.operadorAtual.toString().slice(0,-1)

    }

    escolhaOperacao(operacao) {

        this.operacao = operacao
        this.operadorAnterior = this.operadorAtual
        this.operadorAtual = ''
        
    }

    incluiNum(numero) {
        
        if(numero ==='.' && this.operadorAtual.includes('.')) return
        this.operadorAtual = this.operadorAtual.toString() + numero.toString()
       
    }

    mudaSinal() {
        let resultado
        const atual = parseFloat(this.operadorAtual)
        
        resultado = -atual
        this.operadorAtual = resultado
    }

    calculo() {
        let resultado
        const atual = parseFloat(this.operadorAtual)
        const anterior = parseFloat(this.operadorAnterior)
        
        switch(this.operacao){
            case '+':
                resultado = anterior + atual
                break
            case '-':
                resultado = anterior - atual
                break
            case '*':
                resultado = anterior * atual
                break
            case '÷':
                resultado = anterior / atual
                break
            case '√x':
                resultado = Math.sqrt(anterior)
                break
            case 'X^2':
                resultado = Math.pow(anterior,2)
                break
            case '1/X':
                resultado = 1 / anterior
                break
            case '10^x':
                resultado = Math.pow(10,anterior)
                break
            case 'log':
                resultado = Math.log(anterior)
                break
            case '|x|':
                if(anterior <0){
                    resultado = -anterior
                } else {
                    resultado = anterior
                }
                break
            default:
                return
        }
        this.operadorAtual = resultado
        this.operadorAnterior = ''
        this.operacao = undefined
    }

    updateDisplay() {
        let op = this.operacao
        if(op==undefined){
            op = ''
        } else if (op == '√x'){
            op = '√'
            
        } else if (op == '1/X'){
            op = '1/'
        } else if (op == 'X^2'){
            op = '^2'
        } else if (op == '10^x'){
            op = '10^'
        }
        this.displayAtual.innerText = this.operadorAtual
        if(op=='√' || op == '1/' || op == '10^' || op == 'log' ){
            this.displayAtual.innerText = op + this.operadorAnterior
        } else if (op == '^2'){
            this.displayAtual.innerText = this.operadorAnterior + op
        } else if (op == '|x|'){
            this.displayAtual.innerText = '|' + this.operadorAnterior + '|'
        }
        else {
            this.displayAnterior.innerText = this.operadorAnterior + op
        }
        
    }

}


 calculadora = new Calculadora(operadorAnterior,operadorAtual,displayAtual,displayAnterior)






numeros.forEach(button =>{
    button.addEventListener('click', ()=>{
        calculadora.incluiNum(button.innerText)
        calculadora.updateDisplay()
    })
})



operandos.forEach(button =>{
    button.addEventListener('click',()=>{
        calculadora.escolhaOperacao(button.innerText)
        calculadora.updateDisplay()
    })
})


operacaoIgual.addEventListener('click',()=>{
    calculadora.calculo()
    calculadora.updateDisplay()
})


operacaoClear.addEventListener('click',()=>{
    calculadora.clear()
    calculadora.updateDisplay()
})

operacaoDelete.addEventListener('click',()=>{
    calculadora.delete()
    calculadora.updateDisplay()
})


operacaoEClear.addEventListener('click',()=>{
    calculadora.clearE()
    calculadora.updateDisplay()
})



if(cientific) {
    cientific.addEventListener('click',()=>{
        cientificaMenu.classList.add('show-menu')
    })
}

if(padrao) {
    padrao.addEventListener('click',()=>{
        cientificaMenu.classList.remove('show-menu')
    })
}


operacaoEspecial.addEventListener('click',()=>{
    calculadora.mudaSinal()
    calculadora.updateDisplay()
})