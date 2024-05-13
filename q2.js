const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let dicionarioAlunos = {};

// Função para adicionar um novo aluno ao dicionário
function adicionarAluno(id, nome, nota) {
    dicionarioAlunos[id] = { nome: nome, nota: nota };
}

// Função para buscar um aluno por id
function buscarAlunoPorId(id) {
    if (id in dicionarioAlunos) {
        return dicionarioAlunos[id];
    } else {
        return null; // Se o aluno não for encontrado
    }
}

// Função para calcular a média das notas dos alunos
function calcularMediaNotas() {
    let totalNotas = 0;
    let quantidadeAlunos = 0;
    for (let id in dicionarioAlunos) {
        totalNotas += dicionarioAlunos[id].nota;
        quantidadeAlunos++;
    }
    return totalNotas / quantidadeAlunos;
}

// Função para receber entrada do usuário e adicionar novo aluno
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
        if (alunoEncontrado) {
            console.log("Aluno encontrado:", alunoEncontrado);
        } else {
            console.log("Aluno não encontrado.");
        }

        // Calculando a média das notas dos alunos
        let mediaNotas = calcularMediaNotas();
        console.log("A média das notas dos alunos é:", mediaNotas);

        rl.close(); // Fecha o readline após todas as operações serem concluídas
    });
}

receberEntradaAluno(); // Inicia o processo de receber entrada do usuário
