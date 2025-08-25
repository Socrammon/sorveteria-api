import fs from 'fs';

export default function rotas(req, res, dado) { //Exportação de resposta padrão para rotas

    res.setHeader('Content-type', 'application/json; charset=utf-8'); //Header HTTP

    // Rota de Consulta
    if (req.method === "GET") { //Modelo de requisição de tipo especifico de rota

        const { conteudo } = dado; //Faz a desestruturação do objeto dado

        res.statusCode = 200; //Estado da requisição - OK

        const reposta = {
            mensagem: conteudo
        };

        console.log('\nRota de consulta acessada!');

        res.end(JSON.stringify(reposta));

        return;

    }

    //Rota de Registro
    if (req.method === "POST" && req.url === '/arquivos') { //Modelo de requisição de tipo de rota e url

        res.statusCode = 200; //Estado da requisição - OK

        const reposta = {
            mensagem: 'Registro realizado com sucesso!'
        };

        console.log('\nRota de registro acessada!');

        res.end(JSON.stringify(reposta));

        return;

    }

    //Rota de Atualização
    if (req.method === "PUT" && req.url === '/arquivos') {

        const corpo = []; //Array para os dados das partes do body

        //Quando os pedaços(chunks) de dados da requisição chegarem
        req.on('data', (parte) => {

            corpo.push(parte); //Joga os pedaços no array corpo

        });

        //Quando a requisição de dados terminar
        req.on('end', () => {

            console.log('\nRota de atualização acessada!');

            const arquivo = JSON.parse(Buffer.concat(corpo).toString()); //Junta todos os pedaços e transforma em um objeto JSON

            if (!arquivo?.nome) { // Verifica se o nome do usuario não existe ou se é nulo

                res.statusCode = 400; //Estado da requisição - Solicitação incorreta

                const resposta = {
                    erro: {
                        mensagem: "O atributo nome é obrigatório para a criação do arquivo!"
                    }
                };

                console.log('Erro por ausência de um nome!');

                res.end(JSON.stringify(resposta));

                return;

            }

            fs.writeFile(`${arquivo.nome}.txt`, arquivo?.conteudo || 'Sem conteudo!', 'utf-8', (erro) => {

                if (erro) {

                    res.statusCode = 500; //Estado da requisição - Erro Interno do Servidor

                    const resposta = {
                        erro: {
                            mensagem: `Falha ao tentar criar arquivo ${arquivo.nome}`
                        }
                    };

                    console.log('Falha ao tentar criar arquivo!\nErro -> ', erro);

                    res.end(JSON.stringify(reposta));

                    return erro;

                }

                res.statusCode = 201; //Estado da requisição - Criado com sucesso

                const reposta = {
                    mensagem: `Arquivo ${arquivo.nome} criado com sucesso!`
                };

                console.log(`Sucesso ao tentar criar arquivo ${arquivo.nome}!`);

                res.end(JSON.stringify(reposta));

                return

            });

        });

        req.on('error', (erro) => {

            res.statusCode = 400; //Estado da requisição - Solicitação incorreta

            const reposta = {
                erro: {
                    mensagem: `Falha ao tentar processar requisição!`
                }
            };

            console.log('Falha ao processar a requisição', erro, '\n');

            res.end(JSON.stringify(reposta));

            return;

        });

        return;

    }

    //Rota de Atualização
    if (req.method === "PATCH" && req.url === '/arquivos') {

        const corpo = []; //Array para os dados das partes do body

        //Quando os pedaços(chunks) de dados da requisição chegarem
        req.on('data', (parte) => {

            corpo.push(parte); //Joga os pedaços no array corpo

        });

        //Quando a requisição de dados terminar
        req.on('end', () => {

            console.log('\nRota de atualização acessada!');

            const arquivo = JSON.parse(Buffer.concat(corpo).toString()); //Junta todos os pedaços e transforma em um objeto JSON

            if (!arquivo?.nome) { // Verifica se o nome do usuario não existe ou se é nulo

                res.statusCode = 400; //Estado da requisição - Solicitação incorreta

                const resposta = {
                    erro: {
                        mensagem: "O atributo nome é obrigatório para a atualização do arquivo!"
                    }
                };

                console.log('Erro por ausência de um nome!');

                res.end(JSON.stringify(resposta));

                return;

            }

            if (!arquivo?.conteudo) { // Verifica se o nome do usuario não existe ou se é nulo

                res.statusCode = 400; //Estado da requisição - Solicitação incorreta

                const resposta = {
                    erro: {
                        mensagem: "O atributo conteudo é obrigatório para a atualização do arquivo!"
                    }
                };

                console.log('Erro por ausência de um nome!');

                res.end(JSON.stringify(resposta));

                return;

            }

            fs.access(`${arquivo.nome}.txt`, fs.constants.W_OK, (erro) => {
                if (erro) {

                    console.log('Falha ao tentar acessar arquivo!\nErro -> ', erro, '\n');

                    res.statusCode = erro.code === 'ENOENT' ? 404 : 403;

                    const resposta = {
                        erro: {
                            mensagem: `Falha ao tentar acessar arquivo ${arquivo.nome}`
                        }
                    };

                    res.end(JSON.stringify(resposta));

                    return;

                }

                fs.appendFile(`${arquivo.nome}.txt`, `\n${arquivo?.conteudo}`, 'utf-8', (erro) => {

                    if (erro) {

                        res.statusCode = 500; //Estado da requisição - Erro Interno do Servidor

                        const resposta = {
                            erro: {
                                mensagem: `Falha ao tentar atualizar arquivo ${arquivo.nome}`
                            }
                        };

                        console.log('Falha ao tentar atualizar arquivo!\nErro -> ', erro);

                        res.end(JSON.stringify(reposta));

                        return;

                    }

                    res.statusCode = 201; //Estado da requisição - Criado com sucesso

                    const reposta = {
                        mensagem: `Arquivo ${arquivo.nome} atualizado com sucesso!`
                    };

                    console.log(`Sucesso ao tentar atualizar arquivo ${arquivo.nome}!`);

                    res.end(JSON.stringify(reposta));

                    return

                });

            });

        });

        req.on('error', (erro) => {

            res.statusCode = 400; //Estado da requisição - Solicitação incorreta

            const reposta = {
                erro: {
                    mensagem: `Falha ao tentar processar requisição!`
                }
            };

            console.log('Falha ao processar a requisição', erro, '\n');

            res.end(JSON.stringify(reposta));

            return;

        });

        return;

    }

    //Rota de remoção
    if (req.method === "DELETE" && req.url === '/arquivos') {

        const corpo = []; //Array para os dados das partes do body

        //Quando os pedaços(chunks) de dados da requisição chegarem
        req.on('data', (parte) => {

            corpo.push(parte); //Joga os pedaços no array corpo

        });

        //Quando a requisição de dados terminar
        req.on('end', () => {

            console.log('\nRota de remoção acessada!');

            const arquivo = JSON.parse(Buffer.concat(corpo).toString()); //Junta todos os pedaços e transforma em um objeto JSON

            if (!arquivo?.nome) { // Verifica se o nome do usuario não existe ou se é nulo

                res.statusCode = 400; //Estado da requisição - Solicitação incorreta

                const resposta = {
                    erro: {
                        mensagem: "O atributo nome é obrigatório para a remoção do arquivo!"
                    }
                };

                console.log('Erro por ausência de um nome!');

                res.end(JSON.stringify(resposta));

                return;

            }

            fs.access(`${arquivo.nome}.txt`, fs.constants.W_OK, (erro) => {
                if (erro) {

                    console.log('Falha ao tentar acessar arquivo!\nErro -> ', erro, '\n');

                    res.statusCode = erro.code === 'ENOENT' ? 404 : 403;

                    const resposta = {
                        erro: {
                            mensagem: `Falha ao tentar acessar arquivo ${arquivo.nome}`
                        }
                    };

                    res.end(JSON.stringify(resposta));

                    return;

                }

                fs.rm(`${arquivo.nome}.txt`, (erro) => {

                    if (erro) {

                        res.statusCode = 500; //Estado da requisição - Erro Interno do Servidor

                        const resposta = {
                            erro: {
                                mensagem: `Falha ao tentar remover arquivo ${arquivo.nome}`
                            }
                        };

                        console.log('Falha ao tentar remover arquivo!\nErro -> ', erro);

                        res.end(JSON.stringify(reposta));

                        return;

                    }

                    res.statusCode = 200; //Estado da requisição - OK

                    const reposta = {
                        mensagem: `Arquivo ${arquivo.nome} removido com sucesso!`
                    };

                    console.log(`Sucesso ao tentar remover arquivo ${arquivo.nome}!`);

                    res.end(JSON.stringify(reposta));

                    return

                });

            });

        });

        req.on('error', (erro) => {

            res.statusCode = 400; //Estado da requisição - Solicitação incorreta

            const reposta = {
                erro: {
                    mensagem: `Falha ao tentar processar requisição!`
                }
            };

            console.log('Falha ao processar a requisição', erro, '\n');

            res.end(JSON.stringify(reposta));

            return;

        });

        return;

    }

    // Rota padrão
    res.statusCode = 404; // Estado de requisição - Não encotrado

    const reposta = {
        erro: {
            mensagem: 'Rota não encontrada!',
            url: req.url
        }
    };

    console.log('\nNenhuma rota foi acessada!');

    res.end(JSON.stringify(reposta));

    return;

}