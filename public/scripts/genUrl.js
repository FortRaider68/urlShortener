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

function AccessAPI(url) {
    fetch(`http://localhost:3000/GenUrl/${url}`, {
        method: "POST"
    })
        .then(res => res.json())
        .then(res => UrlResponse(res.UrlEncoded, res.views))
        
}

Button.addEventListener("click", () => {
    AccessAPI(UrlInput.value);

})




