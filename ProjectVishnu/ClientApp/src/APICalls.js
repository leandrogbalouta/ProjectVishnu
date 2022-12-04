export async function fetchFuncionarios(filters){
    var path = "api/funcionarios"
    path = addFiltersToQuery(path, filters)   
    return fetch(path)
}

export async function fetchFuncionario(id) {
    const path = `api/funcionarios/${id}`
    return fetch(path)
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