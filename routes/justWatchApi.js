const axios = require('axios');

module.exports = function(app, JustWatch){

    app.get("/getProviders", async function(req, res){
        var justwatch = new JustWatch({locale: "es_ES"});

        var peli = await axios.get('https://api.themoviedb.org/3/movie/'+req.query.idMovie+'?api_key=12bb2b69299bc5534ff3f0ef888cb2c7&language=es-ES').then(response => response.data);

        var searchResult = await justwatch.search({query: req.query.title});

        var peliAObtener="empty";

        for (let i=0; i<searchResult.items.length; i++){
            let item = searchResult.items[i]
            if (item.title == peli.title){
                if (item.original_release_year!=undefined){
                    if (item.original_release_year===new Date(peli.release_date).getFullYear())
                        peliAObtener=item
                } else {
                    peliAObtener=item
                }
            }
        }
        
        res.status((peliAObtener!=="empty" && peliAObtener.offers!==undefined)?200:202)
        res.send((peliAObtener!=="empty")?{data:peliAObtener.offers}:{})
    })

    app.get("/searchProviders", async function(req, res){
        var justwatch = new JustWatch({locale: "es_ES"});

        var searchResult = await justwatch.search({query: req.query.title});

        res.status(200)
        res.send({data:searchResult.items})
    })
}

