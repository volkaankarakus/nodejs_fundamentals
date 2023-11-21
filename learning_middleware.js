/*
INCOMING REQUEST ------------------------------------------> RESPONSE
                 Middleware -> Middleware -> Middleware ->
                    next()  ->    next()  ->    next()  -> 
request object
response object
Middleware manipulates request or response object. 
    but it mostly about the request. 
*/