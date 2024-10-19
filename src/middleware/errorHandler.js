// src/middleware/errorHandler.js
module.exports = (err, req, res, next) => {
    // Logar informações detalhadas do erro no console para facilitar a depuração
    console.error('--- Início do Log de Erro ---');
    console.error('Mensagem de erro:', err.message);
    console.error('Método HTTP:', req.method);
    console.error('Endpoint acessado:', req.originalUrl);
    console.error('Parâmetros do corpo (body):', req.body);
    console.error('Parâmetros da query (query):', req.query);
    console.error('Parâmetros da rota (params):', req.params);
    console.error('Stack trace do erro:', err.stack);
    console.error('--- Fim do Log de Erro ---');
  
    // Definir o status HTTP do erro (500 para erros gerais)
    const statusCode = err.status || 500;
  
    // Enviar uma resposta JSON detalhada para o cliente
    res.status(statusCode).json({
      success: false,
      message: err.message || 'Erro interno no servidor',
      // Sugestão opcional de resolução de erros
      suggestion: statusCode === 500 
        ? 'Verifique a integridade dos dados enviados ou tente novamente mais tarde.' 
        : 'Verifique o endpoint ou os parâmetros enviados.',
      // Detalhes adicionais sobre o erro (podem ser omitidos em produção)
      method: req.method,   // Método HTTP utilizado
      endpoint: req.originalUrl, // Endpoint acessado
      body: req.body,       // Dados enviados no corpo da requisição
      query: req.query,     // Parâmetros enviados na query string
      params: req.params,   // Parâmetros da rota
      stack: process.env.NODE_ENV === 'production' ? null : err.stack, // Stack trace do erro, omitido em produção
    });
  };
  