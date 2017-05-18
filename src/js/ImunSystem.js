import Antibody from "./Antibody";

export default class ImunSystem {
    constructor(ag) {
        this.antigen = ag;
        this.antibodies = this.generateAb();
        this.cycles = 10;
    }

    start() {
        let counter = 0;
        while (counter++ <= this.cycles) {
            // Вычисление афинности антител к антигену
            this.checkAffinity(this.antibodies, this.antigen);
            // Клонирование
            let clonePopulation = this.clone(this.antibodies, 5);
            // Мутация клонов
            this.mutateClones(clonePopulation);
            // Вычисление аффинности клонов к антигену
            this.checkAffinity(clonePopulation, this.antigen);
            //Отбор одного клона и замена им соответствующего антигена
            this.cloneSelection(clonePopulation);
            this.antibodies.sort((a,b) => b.affinity - a.affinity);
            if(counter !== this.cycles) {
                // Редактирование популяции
                let newAntibodies = this.generateAb(200);
                this.antibodies.splice(800, Number.MAX_VALUE);
                this.antibodies = this.antibodies.concat(newAntibodies);
            }
        }
        //console.log(this.antibodies);

    }

    generateAb(amount = 1000) {
        let ab = [];
        for (let i = 0; i < amount; i++) {
            ab[i] = new Antibody();
        }
        return ab;
    }

    checkAffinity(antibodies, antigen) {
        for(let ab of antibodies)
            ab.countAffinity(antigen);
    }

    clone(antibodies, number) {
        let clones = [];
        for(let i = 0; i < antibodies.length; i++) {
            let antibody = antibodies[i];
            antibody.parentAntibody = antibodies[i];
            for(let j = 0; j < number; j++) {
                clones.push(new Antibody(antibody));
            }
        }
        return clones;
    }
    mutateClones(clonePopulation) {
        for(let clone of clonePopulation) {
            clone = clone.mutate();
        }
    }
    cloneSelection(clonePopulation) {
        for(let clone of clonePopulation) {
            if(clone.affinity > clone.parentAntibody.affinity) {
                let index = this.antibodies.indexOf(clone.parentAntibody);
                this.antibodies[index] = clone;
            }
        }
    }
}
