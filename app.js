import http from 'http'; //importação do módulo HTTP
import fs from 'fs'; //Importação do módulo FS
import rotas from './routes.js'; //Importação da função rotas


//Função para simplicar Inicialização do servidor
function iniciaServidorHttp(conteudo) {

    //Cria o servidor web
    const servidor = http.createServer((req, res) => {

        rotas(req, res, { conteudo }); //Execução da função importada

    });

    //Parâmetros do servidor
    const porta = 3000;
    const host = 'localhost';

    //Inicia o servidor
    servidor.listen(porta, host, () => {

        console.log(`Servidor iniciado com sucesso!\nExecutando em -> http://${host}:${porta}\n\n`);

        console.log('\x1b[1;31mREGISTRO DE ROTAS ↓\x1b[0m\n');

    });

}

//Cria arquivo txt
fs.writeFile('./mensagem.txt', 'Meus agradecimentos a Venturus e ao TIC em trilhas pelo curso!', 'utf-8', (erro) => {

    //Modelo de verificação de erro
    if (erro) {
        console.log('Erro ao tentar criar arquivo!\nErro -> ', erro);
        return;
    }

    console.log('\nSucesso ao tentar criar arquivo!');

    //Lê arquivo txt
    fs.readFile('./mensagem.txt', 'utf-8', (erro, conteudo) => {

        if (erro) {
            console.log('Erro ao tentar ler arquivo!\nErro -> ', erro);
            return;
        }

        console.log(`\nSucesso ao tentar ler arquivo!\nConteudo -> ${conteudo}\n`);

        iniciaServidorHttp(conteudo);

    });

});

