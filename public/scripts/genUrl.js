const UrlReturnField = document.querySelector(".result-url.hide")

const Button = document.querySelector(".ButtonGenerated")
const textFieldOfUrlReturn = document.querySelector("#textFieldOfUrlReturn")
const ViewsUrl = document.querySelector("#ViewsUrl")
const UrlInput = document.querySelector("#UrlInput")

function UrlResponse(url, views) {
    textFieldOfUrlReturn.textContent = `localhost:3000/${url}`
    textFieldOfUrlReturn.setAttribute('href', `http://localhost:3000/${url}`)
    ViewsUrl.textContent = views
    UrlReturnField.classList.remove("hide");
    UrlReturnField.classList.add("show");
}

function ErrorResponse(url) {
    if (!url) {
        textFieldOfUrlReturn.textContent = "Houve Um Erro! Tente Novamente"
        textFieldOfUrlReturn.setAttribute('href', "#")
        ViewsUrl.textContent = 0
        UrlReturnField.classList.remove("hide");
        UrlReturnField.classList.add("show");
    }
}

async function AccessAPI(url) {
    const response = await fetch(`http://localhost:3000/GenUrl/${url}`,{method: "POST"})
    if(response.ok){
        const {UrlEncoded,views} = await response.json()
        UrlResponse(UrlEncoded,views)
    }else{
        ErrorResponse()
    }

        
}

Button.addEventListener("click", () => {
    AccessAPI(UrlInput.value);

})




