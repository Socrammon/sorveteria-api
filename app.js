import http from 'http'; //importação do módulo HTTP
import fs from 'fs'; //Importação do módulo FS


//Função para simplicar Inicialização do servidor
function iniciaServidorHttp() {

    //Parâmetros do servidor
    const porta = 3000;
    const host = 'localhost';

    const notificacao = (`Servidor iniciado com sucesso!\nExecutando em -> http://${host}:${porta}\n`);

    //Cria o servidor web
    const servidor = http.createServer((req, res) => {

        res.statusCode = 200; //Estado da requisição - OK
        res.setHeader('Content-type', 'text/plain; charset=utf-8'); //Header HTTP
        res.end(notificacao);

    });

    //Inicia o servidor
    servidor.listen(porta, host, () => {

        console.log(notificacao);

    });

}

//Cria arquivo txt
fs.writeFile('./mensagem.txt', 'Meus agradecimentos a Venturus e ao TIC em trilhas pelo curso!\n', 'utf-8', (erro) => {

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

        console.log(`\nSucesso ao tentar ler arquivo!\nConteudo -> ${conteudo}`);

    });

    iniciaServidorHttp();

});

