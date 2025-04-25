var params = new URLSearchParams(window.location.search);

let isIOS = /iPad|iPhone|iPod/.test(navigator.platform) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);

window.addEventListener('load', () => {
    if (isIOS && !navigator.standalone) {
        document.getElementById('add-to-home').style.display = 'block';
    }
});

const savedImage = localStorage.getItem('userImage');
if (savedImage) {
    params.set('image', savedImage);
}

document.querySelector(".login").addEventListener('click', () => {
    toHome();
});

var welcome = "Dzień dobry!";

var date = new Date();
if (date.getHours() >= 18){
    welcome = "Dobry wieczór!"
}
document.querySelector(".welcome").innerHTML = welcome;

function toHome(){
    location.href = 'home.html?' + params.toString();
}

var input = document.querySelector(".password_input");
input.addEventListener("keypress", (event) => {
    if (event.key === 'Enter') {
        document.activeElement.blur();
    }
})

var dot = "•";
var original = "";
var eye = document.querySelector(".eye");

input.addEventListener("input", () => {
    var value = input.value.toString();
    var char = value.substring(value.length - 1);
    if (value.length < original.length){
        original = original.substring(0, original.length - 1);
    }else{
        original = original + char;
    }

    if (!eye.classList.contains("eye_close")){
        var dots = "";
        for (var i = 0; i < value.length - 1; i++){
            dots = dots + dot
        }
        input.value = dots + char;
        delay(3000).then(() => {
            value = input.value;
            if (value.length != 0){
                input.value = value.substring(0, value.length - 1) + dot
            }
        });
        console.log(original)
    }
})

function delay(time, length) {
    return new Promise(resolve => setTimeout(resolve, time));
}

eye.addEventListener('click', () => {
    var classlist = eye.classList;
    if (classlist.contains("eye_close")){
        classlist.remove("eye_close");
        var dots = "";
        for (var i = 0; i < input.value.length - 1; i++){
            dots = dots + dot
        }
        input.value = dots;
    }else{
        classlist.add("eye_close");
        input.value = original;
    }
})

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/service-worker.js')
    .then(registration => {
      console.log('Service Worker zarejestrowany:', registration);
    })
    .catch(error => {
      console.log('Rejestracja Service Workera nie powiodła się:', error);
    });
}

let deferredPrompt;

window.addEventListener('beforeinstallprompt', (e) => {
  // Zatrzymaj domyślne wywołanie prompta
  e.preventDefault();
  deferredPrompt = e;

  // Pokaż przycisk "Dodaj do ekranu głównego"
  const addToHomeButton = document.getElementById('add-to-home');
  if (addToHomeButton) {
    addToHomeButton.style.display = 'block';

    addToHomeButton.addEventListener('click', () => {
      // Ukryj przycisk po kliknięciu
      addToHomeButton.style.display = 'none';
      deferredPrompt.prompt();

      // Obsługa wyboru użytkownika
      deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === 'accepted') {
          console.log('Użytkownik dodał aplikację do ekranu głównego.');
        } else {
          console.log('Użytkownik anulował dodanie aplikacji.');
        }
        deferredPrompt = null;
      });
    });
  }
});
