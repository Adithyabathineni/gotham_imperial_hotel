const cachedPages = [
    "/index-offline.html",
    "https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css",
    "/css/gih-offline.css",
    "/img/jumbo-background-sm.jpg",
    "/img/logo-header.png"
  ];
  
  self.addEventListener("install", (event)=>{
    event.waitUntil(caches.open("gih-cache")
    .then((cache)=>{
        return cache.addAll(cachedPages);
    }));
  
  });
  self.addEventListener("fetch", (event)=>{
    event.respondWith(
        fetch(event.request)
        .catch(()=>{
            return caches.match(event.request)
            .then((response)=>{
                if(response){
                    return response;
                }else{
                    return caches.match("/index-offline.html");
                }
            });
        })
    );
  });