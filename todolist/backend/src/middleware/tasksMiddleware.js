const validateFieldTitle = (request, response, next) => {
    const {body} = request;

    if(body.title === undefined){
        return response.status(400).json({message: 'o campo de título precisa ser preenchido'})
    }
    if(body.title === ''){
        return response.status(400).json({message: 'O título não pode ser vazio'})
    }

    next();
}

const validateFieldStatus = (request, response, next) => {
    const {body} = request;

    if(body.status === undefined){
        return response.status(400).json({message: 'o campo de Status precisa ser preenchido'})
    }
    if(body.status === ''){
        return response.status(400).json({message: 'O Status não pode ser vazio'})
    }

    next();
}

const validateId = (request, response, next) => {
    const {body} = request;

    if(body.id === undefined){
        return response.status(400).json({message: 'o campo de ID precisa ser preenchido'})
    }
    if(body.id === ''){
        return response.status(400).json({message: 'O ID não pode ser vazio'})
    }

    next();
}

module.exports = {
    validateFieldTitle,
    validateFieldStatus,
    validateId
}