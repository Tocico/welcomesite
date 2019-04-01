/*----------------------------localStorage---------------------*/
$(function () {
    let textInput = $("#textInput");
    let greeting = $("#greeting");
    let nameArray = localStorage.getItem('name') ? JSON.parse(localStorage.getItem('name')) : []; // Om det finns redan name i nameArray när man kommer till sidan.

    $('form').on('submit', function (e) {
        e.preventDefault()
        if (textInput.val() === '') {
            $('#warning').text('Please write your name');
        }
        else {
            $('#warning').fadeOut(100);
            saveName(textInput.val());
            textInput.val('');
        }
    }); // submit

    localStorage.setItem('name', JSON.stringify(nameArray));
    JSON.parse(localStorage.getItem('name'));

    function saveName(name) {
        if (($.inArray(name, nameArray)) === -1) {  //Om det finns name i nameArray
            nameArray.push(name);
            localStorage.setItem('name', JSON.stringify(nameArray));
            welcome(name);
            // console.table(nameArray);
        }
        else {
            localStorage.setItem('name', JSON.stringify(nameArray));
            welcomeBack(name);
        }
    } // saveName

    function welcomeBack(name) {
        $('h2,#textInput').hide();
        greeting.append('Welcomeback' + " " + name);
        typeWriter(greeting);
    }; // welcomeBack

    function welcome(name) {
        $('h2,#textInput').hide();
        greeting.append('Welcome' + " " + name);
        typeWriter(greeting);

    }; // welcome


/*-----------------Typing--------------------*/
    let setType = $('.typewriter');
    $('input[type=text]').fadeIn(5000);
    typeWriter(setType);



    function typeWriter(type) {
        let delaySpeed = 300;
        let fadeSpeed = 50;
        let setText = type.html();

        type.css({ visibility: 'visible' }).children().addBack().contents().each(function () {
            if (this.nodeType == 3) { //textnode === 3
                console.log($(this));
                $(this).replaceWith($(this).text().replace(/(\S)/g, '<span class="typewriter-load">$1</span>'));
            }
        });
        let splitLength = $('.typewriter-load').length;
        type.find('.typewriter-load').each(function (e) { //text index e
            let splitThis = $(this); //split <span class="typewriter-load">w</span>, <span class="typewriter-load">r</span> osv
            splitTxt = splitThis.text(); //visa text som delat     w r i t e osv...
            splitThis.delay(e * (delaySpeed)).css({ display: 'inline-block', opacity: '0' }).animate({ opacity: '1' }, fadeSpeed);
        });
        setTimeout(function () {
            type.html(setText);
        }, splitLength * delaySpeed + fadeSpeed);

        greeting.fadeOut(35000);

    }; // typeWriter



}); // ready


