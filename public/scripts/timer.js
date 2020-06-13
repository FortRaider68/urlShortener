const ButtonRedirect = document.querySelector(".TimerInput.lockHover")

var timeInitial = 5;

setInterval(Timer,1000)


function Timer(){
    if (timeInitial > 1){
        timeInitial -= 1
        ButtonRedirect.textContent = `Aguarde ${timeInitial} Segundos`
    }else{
        ButtonRedirect.textContent = "Clique Para Redirecionar"
        ButtonRedirect.className = "TimerInput unlockHover"

    }
}
