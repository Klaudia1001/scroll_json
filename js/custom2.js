"use strict" ;

function ajax (options) {
    options = {//obiekt options jest właściwością obiektu ajax
        type: options.type || "POST",
        url: options.url || "",
        onComplete: options.onComplete || function () {},
        onError: options.onError || function () {},
        onSuccess: options.onSuccess || function () {},
        dataType: options.dataType || "text"//type to definicja pola, options.type to jego wartość
    };
    
    function httpSuccess (httpRequest) {//przekuzje obiekt
        try {//jeśli było ok to funkcja zwraca true
        return (httpReq.status>=200 && httpReq.status <300 || 
        httpReq.status == 304 ||
        navigator.userAgent.indexOf("Safari")>= 0 && typeof
        httpReq.status == "undefined");
            
        } catch (e) {//jeśli cokolwiek jest nie tak zwróć false nie wyrzucaj do logów
            return false;
            
        }
    }
    
    var httpReq = new XMLHttpRequest ();
    
    httpReq.open(options.type, options.url, true);
    
     httpReq.onreadystatechange = function (){
         
        if ( httpReq.readyState == 4 ) {
            if (httpSuccess(httpReq)) {
                options.onSuccess(httpReq.responseText) ;
                
            } else {
                options.onError(httpReq.statusText);
            }
        }
        
     }
     
     httpReq.send();
}
        
          

function pobierzDane () {
    event.preventDefault();
    
    ajax({
        type: "GET",
        url:
        "http://jsonplaceholder.typicode.com/users",
        onError: function (msg) {
            //console.log (msg);
        },
        onSuccess: function (response) {
            //console.log(response);
            var jsonObj = JSON.parse(response);
            
        for (var i in jsonObj) { //zaczynam pętele, przechodze przez wszystkie elementy jObj dopóki nie dojdzie do ostatniego; jsonObj to jest moja tablica
            /* to jest to samo co for (var i = 0; i<jsonObj.lenght;++i)*/
            
            var id = document.createElement('p');//tworze paragraf
            id.innerHTML = "id:" + jsonObj[i].id;//mówię funkcji że ma przejść po wszystkich id z tablicy jsonObj
            document.body.appendChild(id);//wyświetlam wyniki "filtru(po id)", body jest rodzicem child i append czyli dodaje na końcu moją zmienna id
            
            var name= document.createElement("p");
            name.innerHTML = "name:" + jsonObj[i].name;
            document.body.appendChild(name);
            
            var nazwaUzytkownika= document.createElement("p");
            nazwaUzytkownika.innerHTML= "email:" + jsonObj[i].email;
            document.body.appendChild(nazwaUzytkownika);
            
        }   
                    
        }
    
    });
}

window.onscroll = function(ev) {
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight){ 
    ev=pobierzDane();
        
    }
}



    