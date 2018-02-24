(function () {

    let aBtnModifier = document.querySelectorAll('.modifier');


    for (elm of aBtnModifier) {
        elm.addEventListener('click', function () {


            let tr = this.parentNode.parentNode;
            let id = tr.children[0].innerHTML;
            let prenom = tr.children[1].innerHTML;
            let nom = tr.children[2].innerHTML;
            let telephone = tr.children[3].innerHTML;
            let courriel = tr.children[4].innerHTML;

            let elmForm = document.getElementById('frmModif');

            let elmInput = elmForm.querySelectorAll('input');
            elmInput[0].value = id;
            elmInput[1].value = prenom;
            elmInput[2].value = nom;
            elmInput[3].value = telephone;
            elmInput[4].value = courriel;

            elmForm.submit();

        })
    }

})();
