export async function fetchFuncionarios(filters){
    var path = "api/funcionarios"
    path = addFiltersToQuery(path, filters)   
    return fetch(path)
}

export async function fetchFuncionario(id) {
    const path = `api/funcionarios/${id}`
    return fetch(path)
}

export async function CreateFuncionario(func){
    const path = "api/funcionarios"
    return fetch(path,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body : JSON.stringify(func)
    })
}

export async function CreateObra(obra){
    const path = "api/obras"
    return fetch(path,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body : JSON.stringify(obra)
    })
}

export async function fetchObras(filters){
    var path = "api/obras"
    path = addFiltersToQuery(path, filters)   
    return fetch(path)
}

export async function fetchObra(codigo) {
    const path = `api/obras/${codigo}`
    return fetch(path)
}

export async function createFolhaDePonto(mes, ano, codigo){
    const path = `api/obras/${codigo}/folha-de-ponto`
    return fetch(path, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body : JSON.stringify(
            {
                mes : mes,
                ano : ano
            })
    })
}

export async function fetchFolhaDePontoByObra(codigo, mes, ano){
    const path = `api/obras/${codigo}/folha-de-ponto/${ano}-${mes}`
    return fetch(path)
}

export async function fetchFolhaDePontoByMercado(mercado, mes, ano){
    const path = `api/folha-de-ponto/${mercado}/${ano}-${mes}`
    return fetch(path)
}

export async function submitFolhaDePontoValues(codigo, mes, ano, values){
    const path = `api/obras/${codigo}/folha-de-ponto/${ano}-${mes}`

    console.log(values)
    return fetch(path, {
        method : "PUT",
        headers: {
            'Content-Type': 'application/json'
        },
        body : JSON.stringify(
            {
                values : values
            })
    })
}

function addFiltersToQuery(path, filters) {

    var size = Object.keys(filters).length
    if(size > 0) {
        var i = 1
        path = path.concat("?")
        Object.keys(filters).forEach(key => {
            var hasPrev = false
            if(filters[key] != null){
                path = path.concat(`${key}=${filters[key]}`)
                hasPrev = true
            }
            if(i < size) path = path.concat("&")
            i++
        })
    }
    return path
}