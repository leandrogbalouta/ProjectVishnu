export async function fetchFuncionarios(filters){
    var path = "api/funcionarios"
   
    console.log(filters)

    // Adds filters to query string
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
    console.log(path)
    return fetch(path)
}