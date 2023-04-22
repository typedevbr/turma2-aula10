const { 
  adicionarFuncionario, 
  editarFuncionario,
  calcularMediaSalarial
} = require("./funcionarios")

const funcionario1 = adicionarFuncionario({
  nome: "João",
  cargo: "Supervisor", 
  departamento: "Manutenção", 
  salario: 5000, 
  dataDeAdmissao: new Date('2020-04-01')
})

const funcionario2 = adicionarFuncionario({
  nome: "Tom",
  cargo: "Funcionário", 
  departamento: "Compras", 
  salario: 3000, 
  dataDeAdmissao: new Date('2022-12-30')
})

const funcionario1Editado = editarFuncionario({
  matricula: funcionario1.matricula,
  salario: 8000,
})

console.log(calcularMediaSalarial())