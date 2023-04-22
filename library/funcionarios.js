// Desafio: Crie um programa JavaScript que permita que os usuários 
// realizem o controle de funcionários de uma empresa com as seguintes ações:

// 1. Adicionar um novo funcionário, informando seu nome, cargo, 
//    departamento, salário e data de admissão.

// 2. Editar as informações de um funcionário existente, informando 
//    as novas informações a serem atualizadas.

// 3. Remover um funcionário existente, informando seu nome.

// 4. Listar todos os funcionários existentes de um determinado 
//    departamento.

// 5. Listar todos os funcionários existentes com salário acima de 
//    um determinado valor.

// 6. Calcular a média salarial de todos os funcionários da empresa.

const funcionarios = []

function gerarMatricula() {
  return (Math.random() * 10000000000).toFixed(0)
}

function removeUndefined(dadosParaRemoverUndefined) {
  return Object.keys(dadosParaRemoverUndefined).reduce((ac, key) => {
    if(dadosParaRemoverUndefined[key]) {
      ac[key] = dadosParaRemoverUndefined[key]
    }
    return ac;
  }, {})
}

function adicionarFuncionario(dadosDoFuncionario) {
  if(!dadosDoFuncionario) {
    throw new Error('Os dados do funcionário são obrigatórios.')
  }

  const { 
    nome, 
    cargo, 
    departamento, 
    salario, 
    dataDeAdmissao 
  } = dadosDoFuncionario

  if(!nome) {
    throw new Error('Nome é obrigatório.')
  }

  const funcionario = { 
    matricula: gerarMatricula(),
    nome, 
    cargo, 
    departamento, 
    salario, 
    dataDeAdmissao 
  }

  funcionarios.push(funcionario)

  return funcionario;
}

function editarFuncionario(funcionario) {
  if(!funcionario) {
    throw new Error('Os dados do funcionário são obrigatórios.')
  }

  const { 
    matricula,
    nome, 
    cargo, 
    departamento, 
    salario, 
    dataDeAdmissao 
  } = funcionario

  const funcionarioIndex = funcionarios.findIndex(
    fucionarioEncontrado => fucionarioEncontrado.matricula === matricula
  )

  if(funcionarioIndex === -1) {
    throw new Error(`Funcionário com matricula ${matricula} não foi encontrado no sistema.`)
  }

  const dadosAtuais = funcionarios[funcionarioIndex]

  const dadosParaAtualizarSemUndefined = removeUndefined({ 
    matricula,
    nome, 
    cargo, 
    departamento, 
    salario, 
    dataDeAdmissao 
  })

  const funcionarioAtualizado = Object.assign(
    {},
    dadosAtuais,
    dadosParaAtualizarSemUndefined
  )

  funcionarios[funcionarioIndex] = funcionarioAtualizado

  return funcionarioAtualizado;
}

function removerFuncionario(matricula) {
  const funcionarioIndex = funcionarios.findIndex(
    funcionarioEncontrado => funcionarioEncontrado.matricula === matricula
  )

  if(funcionarioIndex === -1) {
    throw new Error(`Funcionário com matricula ${matricula} não encontrado para remoção`)
  }

  funcionarios.splice(funcionarioIndex, 1)
}

function listarFuncionariosDoDepartamento(departamento) {
  if(!departamento) {
    throw new Error("É obrigatório informar qual departamento.")
  }

  return funcionarios.filter(
    funcionario => funcionario.departamento === departamento
  )
}

function listarFuncionariosComSalarioAcimaDe(salario = 0) {
  return funcionarios.filter(
    funcionario => funcionario.salario > salario
  )
}

function calcularMediaSalarial() {
  const somaDosSalario = funcionarios.reduce(
    (ac, funcionario) => ac + +funcionario.salario,
    0
  )

  if(somaDosSalario === 0) return 0

  return somaDosSalario/funcionarios.length
}