document.querySelector(".noturno").addEventListener("click", function () {
    if (document.querySelector("body").style.backgroundColor == 'black') {
        document.querySelector("body").style.backgroundColor = 'white';
        document.querySelector("body").style.color = 'black';
      
    } else {
        document.querySelector("body").style.backgroundColor = 'black';
        document.querySelector("body").style.color = 'white';        
    }
});