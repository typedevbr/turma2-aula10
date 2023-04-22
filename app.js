const formDOM = document.querySelector('form')
const nomeInputDOM = document.querySelector('input[name=nome]')
const cargoInputDOM = document.querySelector('input[name=cargo]')
const departamentoInputDOM = document.querySelector('input[name=departamento]')
const salarioInputDOM = document.querySelector('input[name=salario]')
const dataInputDOM = document.querySelector('input[name=data]')
const cadastrarBtnDOM = document.querySelector('button.cadastrar')

const tableBodyDOM = document.querySelector('table tbody')
const mediaSalarialDOM = document.querySelector('.media-salarial')

cadastrarBtnDOM.addEventListener('click', (e) => {
  e.preventDefault()

  adicionarFuncionario(buscarCampos())

  reloadTable()

  limparCampos()
})

function buscarCampos() {
  return {
    nome: nomeInputDOM.value,
    cargo: cargoInputDOM.value, 
    departamento: departamentoInputDOM.value, 
    salario: salarioInputDOM.value, 
    dataDeAdmissao: dataInputDOM.value
  }
}

function limparCampos() {
  nomeInputDOM.value = ""
  cargoInputDOM.value = ""
  departamentoInputDOM.value = "" 
  salarioInputDOM.value = ""
  dataInputDOM.value = ""
}

function addRow(funcionario) {
  const tr = document.createElement('tr')
  
  Object.values(funcionario).forEach(value => {
    const td = document.createElement('td')
    td.innerText = value
    tr.appendChild(td)
  })

  tr.appendChild(createActionsCell(funcionario))
  tr.setAttribute('data-matricula', funcionario.matricula)

  tableBodyDOM.appendChild(tr)
}

function createActionsCell(funcionario) {
  const editarBtn = document.createElement('button')
  editarBtn.innerText = 'Editar'
  editarBtn.classList.add('btn', 'btn-warning', 'btn-sm')
  editarBtn.addEventListener('click', () => iniciarEdicao(funcionario))

  const excluirBtn = document.createElement('button')
  excluirBtn.innerText = 'Excluir'
  excluirBtn.classList.add('btn', 'btn-danger', 'btn-sm')
  excluirBtn.addEventListener(
    'click', 
    () => excluir(funcionario.matricula)
  )

  const td = document.createElement('td')
  td.appendChild(editarBtn)
  td.appendChild(excluirBtn)

  return td
}

function iniciarEdicao(funcionario){
  nomeInputDOM.value = funcionario.nome
  cargoInputDOM.value = funcionario.cargo
  departamentoInputDOM.value = funcionario.departamento 
  salarioInputDOM.value = funcionario.salario
  dataInputDOM.value = funcionario.data

  cadastrarBtnDOM.classList.add('hide')

  const editarBtnDOM = document.createElement('button')
  editarBtnDOM.classList.add('btn', 'btn-warning', 'editar-btn')
  editarBtnDOM.innerText = 'Editar'
  editarBtnDOM.addEventListener('click', (e) => {
    e.preventDefault()
    editar(funcionario.matricula)
  })

  formDOM.appendChild(editarBtnDOM)
}

function editar(matricula) {
  editarFuncionario({
    matricula, 
    ...buscarCampos()
  })
  reloadTable()
  limparCampos()
  document.querySelector('.editar-btn').remove()
  cadastrarBtnDOM.classList.remove('hide')
}

function excluir(matricula){
  removerFuncionario(matricula)
  reloadTable()
}

function reloadTable() {
  tableBodyDOM.innerHTML = ''

  funcionarios.forEach(funcionario => {
    addRow(funcionario)
  })

  atualizarMediaSalarial()
}

function atualizarMediaSalarial() {
  mediaSalarialDOM.innerText = calcularMediaSalarial()
}