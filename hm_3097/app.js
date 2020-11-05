const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const expressHbs = require('express-handlebars');
const hbs = require('hbs');

const webserver = express();

webserver.engine('hbs', expressHbs({
    layoutsDir: "hm_3097/views/layouts",
    defaultLayout: 'index',
    extname: 'hbs'
}))

webserver.set('view engine', 'hbs');
webserver.set('views', './hm_3097/views/layouts');

webserver.use(express.urlencoded({extended:true}));
webserver.use(bodyParser.urlencoded({extended: true}));
webserver.use('/hm_3097', express.static(path.join(__dirname + '/public')));

const port = 3097;

let validForm = true;
let siteName;
let siteUrl;
let email;
let check;
let description;

webserver.get("/", function(req, res) {
    res.sendFile(__dirname + "/views/index.html");
});

webserver.post('/service1', (req, res) => {
    console.log('service1 called, req.body=', req.body);
    validForm = true;
    siteName = textFieldCheck(req.body.name);
    siteUrl = siteUrlCheck(req.body.url);
    email = emailCheck(req.body.email);
    check = checkCheck(req.body.votes);
    description = textFieldCheck(req.body.description);
    if (validForm) {
        res.send('Валидация прошла успешно, <br>siteName = ' + req.body.name + 
        '<br>siteUrl = ' + req.body.url + 
        '<br>e-mail = ' + req.body.email + 
        '<br>checkbox = ' + req.body.votes + 
        '<br>description = ' + req.body.description);
    } else {
        res.render("index", {
            name: req.body.name,
            url: req.body.url,
            email: req.body.email,
            votes: check,
            description: req.body.description,
            message: " Введите корректные данные"
        });
    }
});

webserver.listen(port, () => {
    console.log('web server running on port ' + port);
});

function textFieldCheck(text) {
    if (text == "") {
        validForm = false;
        return "Поле не может быть пустое";
    }
    return text;
}

function siteUrlCheck(siteUrl) {
    if (!siteUrl.includes(".")) {
        validForm = false;
        return 'URL сайта должен содержать доменное имя "пример: .com"';
    }
    return siteUrl;
}

function emailCheck(email) {
    if(!email.includes("@")) {
        validForm = false;
        return 'Email должен быть в формате "some@some.com"';
    }
    return email;
}

function checkCheck(check) {
    if(check == undefined) {
        validForm = false;
        return undefined;
    }
    return "checked";
}
