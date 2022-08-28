import ancients from './assets/Ancients/index.js'
import difficulties from './data/difficulties.js'
import ancientsData from './data/ancients.js'
import cardsDataBlue from './data/mythicCards/blue/index.js'
import cardsDataGreen from './data/mythicCards/green/index.js'
import cardsDataBrown from './data/mythicCards/brown/index.js'

const cards = document.querySelectorAll('.card__ancients');
const lvl = document.querySelector('.level')
const start = document.querySelector('.start__game');
const counterContainer = document.querySelector('.desc__container');
let counter;



let flag = true;
let flag2= true;

function createCards(){
    cards.forEach((element,index) => {
        element.style.backgroundImage = `url(${Object.values(ancients)[index]})`
        element.addEventListener('click',()=>{
            cards.forEach(el=>{
                el.classList.remove('active')
            })
            element.classList.add('active')  
            createDifficult() 
            counterContainer.innerHTML = '';
            counter = index;             
        })
    });
}

createCards()


function createDifficult(){
    if(flag == true){
        difficulties.forEach(element =>{
            const div = document.createElement('div');
            div.classList.add(`dificulty`)
            div.textContent = `${element.name}`;
            lvl.append(div);
            dificultyActive()
        })
        flag = false;
    }else {
        return
    }  
}


function dificultyActive() {
    const dificulty = document.querySelectorAll('.dificulty')
    dificulty.forEach(elem=>{
        elem.addEventListener('click',()=>{
            dificulty.forEach(el=>{
                el.classList.remove('active')
            })
            elem.classList.add('active')
            createStartGame()
            counterContainer.innerHTML = '';   
        })
    })
}


function createStartGame(){
    if(flag2 == true){
        const div = document.createElement('div');
        div.className = 'start-item active';
        div.textContent = 'замешать колоду';
        start.append(div);
        flag2 = false;
    }else {
        return
    }  
}

function changeCard(){
    start.addEventListener('click',()=>{
        counterContainer.innerHTML = 
        `<div class="counter">
            <div class="counter__container">
                <span class="counter__text">Первая стадия</span>
                <div class="dots__container">
                    <div class="dot green">${ancientsData[counter].firstStage.greenCards}</div>
                    <div class="dot red">${ancientsData[counter].firstStage.brownCards}</div>
                    <div class="dot blue">${ancientsData[counter].firstStage.blueCards}</div>
                </div>
            </div>
            <div class="counter__container">
                <span class="counter__text">Вторая стадия</span>
                <div class="dots__container">
                    <div class="dot green">${ancientsData[counter].secondStage.greenCards}</div>
                    <div class="dot red">${ancientsData[counter].secondStage.brownCards}</div>
                    <div class="dot blue">${ancientsData[counter].secondStage.blueCards}</div>
                </div>
            </div>
            <div class="counter__container">
                <span class="counter__text">Третья стадия</span>
                <div class="dots__container">
                    <div class="dot green">${ancientsData[counter].thirdStage.greenCards}</div>
                    <div class="dot red">${ancientsData[counter].thirdStage.brownCards}</div>
                    <div class="dot blue">${ancientsData[counter].thirdStage.blueCards}</div>
                </div>
            </div>
        </div>
        <div class="change__card">
            <div class="card"></div>
            <div class="last-card"></div>
        </div>`   
        
        const dificulty = document.querySelectorAll('.dificulty')
        dificulty.forEach(el=>{
            if(el.classList.contains('active') && el.textContent == 'Очень легкий'){
                veryEasy()
            }
            if(el.classList.contains('active') && el.textContent == 'Легкий'){
                easyLvl()
            }
            if(el.classList.contains('active') && el.textContent == 'Средний'){
                normal()
            }
            if(el.classList.contains('active') && el.textContent == 'Высокий'){
                hardLvl()
            }
            if(el.classList.contains('active') && el.textContent == 'Очень высокий'){
                veryHard()
            }
        })
    })
}

changeCard();


let easyGreen = []
let normGreen = []
let hardGreen = []

let easyRed = []
let normRed = []
let hardRed = []

let easyBlue = []
let normBlue = []
let hardBlue = []



function mixCardImage(){
    for(let i = 0; i<cardsDataBlue.length;i++){
        if(cardsDataBlue[i].difficulty == 'normal'){
            normBlue.push(cardsDataBlue[i])
        }
        if(cardsDataBlue[i].difficulty == 'easy'){
            easyBlue.push(cardsDataBlue[i])
        }
        if(cardsDataBlue[i].difficulty == 'hard'){
            hardBlue.push(cardsDataBlue[i])
        }
    }

    for(let i = 0; i < cardsDataBrown.length; i++){
        if(cardsDataBrown[i].difficulty == 'normal'){
            normRed.push(cardsDataBrown[i])
        }
        if(cardsDataBrown[i].difficulty == 'easy'){
            easyRed.push(cardsDataBrown[i])
        }
        if(cardsDataBrown[i].difficulty == 'hard'){
            hardRed.push(cardsDataBrown[i])
        }
    }

    for(let i = 0; i < cardsDataGreen.length; i++){
        if(cardsDataGreen[i].difficulty == 'normal'){
            normGreen.push(cardsDataGreen[i])
        }
        if(cardsDataGreen[i].difficulty == 'easy'){
            easyGreen.push(cardsDataGreen[i])
        }
        if(cardsDataGreen[i].difficulty == 'hard'){
            hardGreen.push(cardsDataGreen[i])
        }
    }
}

mixCardImage()

let easy = easyGreen.concat(easyBlue,easyRed)
let norm = normGreen.concat(normBlue,normRed)
let hard = hardGreen.concat(hardBlue,hardRed)

function randomEasy(){
    return Math.floor(Math.random() * easy.length);
}

function randomNorm(){
    return Math.floor(Math.random() * norm.length);
}

function randomHard(){
    return Math.floor(Math.random() * hard.length);
}


function veryEasy(){
    const card = document.querySelector('.card');
    const lastCard = document.querySelector('.last-card');
    const dot = document.querySelectorAll('.dot')
    card.addEventListener('click',()=>{
        let randNorm = randomNorm()
        let randHard = randomHard()
        let randEasy = randomEasy()
        dot.forEach((elem,index)=>{
            function x(){
                if(elem.classList.contains('green') && elem.textContent > 0 && easy[randEasy].color == 'green'){
                    lastCard.style.backgroundImage = `url(${easy[randEasy].cardFace})`
                    elem.textContent -=1
                }  
                if(elem.classList.contains('red') && elem.textContent > 0 && easy[randEasy].color == 'brown'){
                    lastCard.style.backgroundImage = `url(${easy[randEasy].cardFace})`
                    elem.textContent -=1
                }
                if(elem.classList.contains('blue') && elem.textContent > 0 && easy[randEasy].color == 'blue'){
                    lastCard.style.backgroundImage = `url(${easy[randEasy].cardFace})`
                    elem.textContent -=1
                }
            }
            if(index < 3){
               x()
            }
            if(index >= 3 && index < 6 && dot[0].textContent == 0 && dot[1].textContent == 0 && dot[2].textContent == 0){
                x()
            }
            if(index >= 6 && index < 9  && dot[3].textContent == 0 && dot[4].textContent == 0 && dot[5].textContent == 0){
                x()
            }
        })        
    })
}

function easyLvl(){
    const card = document.querySelector('.card');
    const lastCard = document.querySelector('.last-card');
    const dot = document.querySelectorAll('.dot')
    card.addEventListener('click',()=>{
        let randNorm = randomNorm()
        let randHard = randomHard()
        let randEasy = randomEasy()
        dot.forEach((elem,index)=>{
            function x(){
                if(elem.classList.contains('green') && elem.textContent > 0 && norm[randNorm].color == 'green'){
                    lastCard.style.backgroundImage = `url(${norm[randNorm].cardFace})`
                    elem.textContent -=1
                }  
                if(elem.classList.contains('red') && elem.textContent > 0 && norm[randNorm].color == 'brown'){
                    lastCard.style.backgroundImage = `url(${norm[randNorm].cardFace})`
                    elem.textContent -=1
                }
                if(elem.classList.contains('blue') && elem.textContent > 0 && norm[randNorm].color == 'blue'){
                    lastCard.style.backgroundImage = `url(${norm[randNorm].cardFace})`
                    elem.textContent -=1
                }
            }
            if(index < 3){
               x()
            }
            if(index >= 3 && index < 6 && dot[0].textContent == 0 && dot[1].textContent == 0 && dot[2].textContent == 0){
                x()
            }
            if(index >= 6 && index < 9  && dot[3].textContent == 0 && dot[4].textContent == 0 && dot[5].textContent == 0){
                x()
            }
        })        
    })
}

function normal(){
    const card = document.querySelector('.card');
    const lastCard = document.querySelector('.last-card');
    const dot = document.querySelectorAll('.dot')
    card.addEventListener('click',()=>{
        let randNorm = randomNorm()
        let randHard = randomHard()
        let randEasy = randomEasy()
        dot.forEach((elem,index)=>{
            function x(){
                if(elem.classList.contains('green') && elem.textContent > 0 && norm[randNorm].color == 'green'){
                    lastCard.style.backgroundImage = `url(${norm[randNorm].cardFace})`
                    elem.textContent -=1
                }  
                if(elem.classList.contains('red') && elem.textContent > 0 && hard[randHard].color == 'brown'){
                    lastCard.style.backgroundImage = `url(${hard[randHard].cardFace})`
                    elem.textContent -=1
                }
                if(elem.classList.contains('blue') && elem.textContent > 0 && easy[randEasy].color == 'blue'){
                    lastCard.style.backgroundImage = `url(${easy[randEasy].cardFace})`
                    elem.textContent -=1
                }
            }
            if(index < 3){
               x()
            }
            if(index >= 3 && index < 6 && dot[0].textContent == 0 && dot[1].textContent == 0 && dot[2].textContent == 0){
                x()
            }
            if(index >= 6 && index < 9  && dot[3].textContent == 0 && dot[4].textContent == 0 && dot[5].textContent == 0){
                x()
            }
        })        
    })
}

function hardLvl(){
    const card = document.querySelector('.card');
    const lastCard = document.querySelector('.last-card');
    const dot = document.querySelectorAll('.dot')
    card.addEventListener('click',()=>{
        let randNorm = randomNorm()
        let randHard = randomHard()
        let randEasy = randomEasy()
        dot.forEach((elem,index)=>{
            function x(){
                if(elem.classList.contains('green') && elem.textContent > 0 && norm[randNorm].color == 'green'){
                    lastCard.style.backgroundImage = `url(${norm[randNorm].cardFace})`
                    elem.textContent -=1
                }  
                if(elem.classList.contains('red') && elem.textContent > 0 && hard[randHard].color == 'brown'){
                    lastCard.style.backgroundImage = `url(${hard[randHard].cardFace})`
                    elem.textContent -=1
                }
                if(elem.classList.contains('blue') && elem.textContent > 0 && norm[randNorm].color == 'blue'){
                    lastCard.style.backgroundImage = `url(${norm[randNorm].cardFace})`
                    elem.textContent -=1
                }
            }
            if(index < 3){
               x()
            }
            if(index >= 3 && index < 6 && dot[0].textContent == 0 && dot[1].textContent == 0 && dot[2].textContent == 0){
                x()
            }
            if(index >= 6 && index < 9  && dot[3].textContent == 0 && dot[4].textContent == 0 && dot[5].textContent == 0){
                x()
            }
        })        
    })
}

function veryHard(){
    const card = document.querySelector('.card');
    const lastCard = document.querySelector('.last-card');
    const dot = document.querySelectorAll('.dot')
    card.addEventListener('click',()=>{
        let randNorm = randomNorm()
        let randHard = randomHard()
        let randEasy = randomEasy()
        dot.forEach((elem,index)=>{
            function x(){
                if(elem.classList.contains('green') && elem.textContent > 0 && hard[randHard].color == 'green'){
                    lastCard.style.backgroundImage = `url(${hard[randHard].cardFace})`
                    elem.textContent -=1
                }  
                if(elem.classList.contains('red') && elem.textContent > 0 && hard[randHard].color == 'brown'){
                    lastCard.style.backgroundImage = `url(${hard[randHard].cardFace})`
                    elem.textContent -=1
                }
                if(elem.classList.contains('blue') && elem.textContent > 0 && hard[randHard].color == 'blue'){
                    lastCard.style.backgroundImage = `url(${hard[randHard].cardFace})`
                    elem.textContent -=1
                }
            }
            if(index < 3){
               x()
            }
            if(index >= 3 && index < 6 && dot[0].textContent == 0 && dot[1].textContent == 0 && dot[2].textContent == 0){
                x()
            }
            if(index >= 6 && index < 9  && dot[3].textContent == 0 && dot[4].textContent == 0 && dot[5].textContent == 0){
                x()
            }
        })        
    })
}