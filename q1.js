const readline = require('readline');

let listaAlunos = [];

// Função para adicionar um novo aluno à lista
function adicionarAluno(id, nome, nota) {
    let aluno = {
        id: id,
        nome: nome,
        nota: nota
    };
    listaAlunos.push(aluno);
}

// Função para buscar um aluno por id
function buscarAlunoPorId(id) {
    for (let i = 0; i < listaAlunos.length; i++) {
        if (listaAlunos[i].id === id) {
            return listaAlunos[i];
        }
    }
    return null; // Se o aluno não for encontrado
}

// Função para calcular a média das notas dos alunos
function calcularMediaNotas() {
    let totalNotas = 0;
    for (let i = 0; i < listaAlunos.length; i++) {
        totalNotas += listaAlunos[i].nota;
    }
    return totalNotas / listaAlunos.length;
}

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Função para receber entrada do usuário e adicionar novos alunos
function receberEntradaAluno() {
    rl.question("Digite o ID do aluno: ", function(id) {
        rl.question("Digite o nome do aluno: ", function(nome) {
            rl.question("Digite a nota do aluno: ", function(nota) {
                adicionarAluno(parseInt(id), nome, parseFloat(nota));

                rl.question("Deseja adicionar outro aluno? (S/N): ", function(resposta) {
                    if (resposta.toUpperCase() === 'S') {
                        receberEntradaAluno(); // Chama a função novamente para adicionar outro aluno
                    } else {
                        realizarOperacoes(); // Após todas as operações, chama a função para buscar aluno e calcular média
                    }
                });
            });
        });
    });
}

// Função para realizar operações após adicionar todos os alunos
function realizarOperacoes() {
    rl.question("Digite o ID do aluno que deseja buscar: ", function(alunoEncontradoId) {
        let alunoEncontrado = buscarAlunoPorId(parseInt(alunoEncontradoId));
        console.log(alunoEncontrado);

        // Calculando a média das notas dos alunos
        let mediaNotas = calcularMediaNotas();
        console.log("A média das notas dos alunos é:", mediaNotas);

        rl.close(); // Fecha o readline após todas as operações serem concluídas
    });
}

receberEntradaAluno(); // Inicia o processo de receber entrada do usuário
