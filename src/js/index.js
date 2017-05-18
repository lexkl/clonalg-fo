import css from '../css/main.scss';
import antigen from './Antigen';
import ImunSystem from './ImunSystem';

let system = new ImunSystem(antigen);
system.start();
showResults();


function showResults() {
    let antigenDiv = document.getElementById("antigen");
    let antibodyDiv = document.getElementById("antibody");

    antigenDiv.innerHTML += 'Antigen : f(x1,x2) = x1*x2*sin(x1^2 + x2^2)';
    antibodyDiv.innerHTML += 'Antibody : <br>';

    for(let i = 0; i < system.antibodies.length; i++) {
        antibodyDiv.innerHTML += `x1 = ${system.antibodies[i].a}<br>`;
        antibodyDiv.innerHTML += `x2 = ${system.antibodies[i].b}<br>`;
        antibodyDiv.innerHTML += `f(x1,x2) = ${system.antibodies[i].affinity}<br><br>`;
    }
}

