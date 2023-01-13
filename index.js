const main = document.querySelector('main')
const root = document.querySelector(':root') // esse root sao as variaves de cores do css.
const input = document.getElementById('input')
const resultInput = document.getElementById('result')

const allowedKeys = ["(", ")", "/", "*", "-", "+", "9", "8", "7", "6", "5", "4", "3", "2", "1", "0", ".", "%", " "]

//Codigo para conseguir clicar nos numeros dentro da calculadora.
document.querySelectorAll('.charKey').forEach(function (charKeyBtn){  //pegando a classe, e pra cada item atravez do foreach, ele vai fazer a função.
  charKeyBtn.addEventListener('click', function (){ //aqui add o evento click + função anonima de lei.
    const value = charKeyBtn.dataset.value //aqiu foi criado uma variavel recebendo as informações de cada tecla da calculadora, acessando o data que é a tecla e o valor dela.
    input.value += value  //e aqui adicionando detro do input o q foi digitado.
  })
})
//criando o limpar 
document.getElementById('clear').addEventListener('click', function () {
  input.value = '' 
  resultInput.value = ''
  input.focus() // esse focus ira ja deixar selecionado pro usuário o input
})

input.addEventListener('keydown', function (ev) {
  ev.preventDefault()
  if (allowedKeys.includes(ev.key)) {
    input.value += ev.key
    return
  }
  if (ev.key === 'Backspace') {
    input.value = input.value.slice(0, -1) // slice extrai uma parte de uma string e retorna uma nova...nesse caso esta pegando do caracter inicial 0 até a posição -1 que é o pnultimo caracter.
  }
  if (ev.key === 'Enter') {
    calculate()
  }
})
// codigo para calculo da calculadora.
document.getElementById('equal').addEventListener('click', calculate)

//adicionando tb um tratamento para quando o q for digitado for valido ou nao.
function calculate(){
  resultInput.value = 'ERROR'
  resultInput.classList.add('error') //
  const result = eval(input.value) // essa função eval do js avalia o q é digitado e retorna o resultado de forma altomatica.
  resultInput.value = result
  if (resultInput.value === 'undefined'){
    resultInput.value = ''
  }
  resultInput.classList.remove('error')
}
//codigo para copiar o resultado da calculadora.
document.getElementById('copyToClipboard').addEventListener('click', function (ev){
  const button = ev.currentTarget // esse aqui esta selecionando o evento sendo usado no momento.
  if (button.innerText === 'Copy'){
    button.innerText = 'Copied!'
    button.classList.add('success') // aqui estou add dentro do botao a cor verde atraves da classa criada no css ( success).
    navigator.clipboard.writeText(resultInput.value) //e aqui existe esse navigator, que por ele eu acesso a area de transferencia (clipboard) e escrever atraves do (writeText) e seleciono onde quero q seja escrito.
  }else {
    button.innerText = 'Copy'
    button.classList.remove('success')
  }
})

// codigo para mudar de theme ao clicar no botao.
document.getElementById('themeSwitcher').addEventListener('click' , function () {
  if (main.dataset.theme === 'dark'){
    root.style.setProperty('--bg-color', '#f1f5f9')
    root.style.setProperty('--border-color', '#aaa')
    root.style.setProperty('--font-color', '#212529')
    root.style.setProperty('--primary-color', '#26834a')
    main.dataset.theme = 'light'
  } else {
    root.style.setProperty('--bg-color', '#212529')
    root.style.setProperty('--border-color', '#666')
    root.style.setProperty('--font-color', '#f1f5f9')
    root.style.setProperty('--primary-color', '#4dff91')
    main.dataset.theme = 'dark'
  }
})