"user strict"

// Проверка формы на заполнение перед отправкой
var form = document.getElementById("myForm");

form.addEventListener("submit", function (event) {
  if (!devCheck() | !urlCheck() | !emailCheck() | !checkCheck() | !descCheck()) {
    focusMove();
    event.preventDefault();
  }
}, false);

// Метод перемещение курсора на первое поле с ошибкой
function focusMove() {
  if (!devCheck()) {
    developer.focus();
  } else if (!urlCheck()) {
    webUrl.focus();
  } else if (!emailCheck()) {
    email.focus();
  } else if (!descCheck()) {
    desc.focus();
  }
}

// Валидация поля Название организации
var developer = document.getElementById("dev");
var developerErr = document.getElementById("devError");

developer.onblur = devCheck;
developer.onfocus = devReset;

function devCheck() {
  if (developer.value == "") { // Проверка на пустое поле
    developer.classList.add("invalid");
    developerErr.innerHTML = "Поле не может быть пустое";
    return false;
  }
  return true;
}

function devReset() {
  if (this.classList.contains("invalid")) {
    this.classList.remove("invalid");
    developerErr.innerHTML = "";
  }
}


// Валидация поля URL сайта
var webUrl = document.getElementById("siteUrl");
var urlErr = document.getElementById("siteUrlError");

webUrl.onblur = urlCheck;
webUrl.onfocus = urlReset;

function urlCheck() {
  if (!webUrl.value.includes(".")) { // Проверка на наличие точки
    webUrl.classList.add("invalid");
    urlErr.innerHTML = "URL сайта должен содержать доменное имя 'пример: .com'";
    return false;
  }
  return true;
}

function urlReset() {
  if (this.classList.contains("invalid")) {
    this.classList.remove("invalid");
    urlErr.innerHTML = "";
  }
}

// Валидация поля Email
var email = document.getElementById("mail");
var emailErr = document.getElementById("mailError");

email.onblur = emailCheck;
email.onfocus = emailReset;

function emailCheck() {
  if (!email.value.includes("@")) { // Проверка на наличие символа '@'
    email.classList.add("invalid");
    emailErr.innerHTML = "Email должен быть в формате 'some@some.com'";
    return false;
  }
  return true;
}

function emailReset() {
  if (this.classList.contains("invalid")) {
    this.classList.remove("invalid");
    emailErr.innerHTML = "";
  }
}

//Валидация поля Обработка персональных данных
var check = document.getElementById("check");
var checkErr = document.getElementById("checkError");

check.onchange = checkReset;

function checkCheck() {
  if(check.checked == false) { // Проверка на установленную галочку
    checkErr.innerHTML = "Поставьте галочку разрешить отзывы";
    return false;
  }
  return true;
}

function checkReset() {
  if (check.checked == true) {
    checkErr.innerHTML = "";
  }
}

// Валидация поля Описание сайта
var desc = document.getElementById("description");
var descErr = document.getElementById("descriptionError");

desc.onblur = descCheck;
desc.onfocus = descReset;

function descCheck() {
  if (desc.value == "") { // Проверка на пустое поле
    desc.classList.add("invalid");
    descErr.innerHTML = "Поле не может быть пустым";
    return false;
  }
  return true;
}

function descReset() {
  if (this.classList.contains("invalid")) {
    this.classList.remove("invalid");
    descErr.innerHTML = "";
  }
}
