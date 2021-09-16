'use strict';
class Component{
    constructor(selectorStr){
        this.arrElements = document.querySelectorAll(selectorStr);
    }
    getArrElements(){
        return this.arrElements;
    }
    plugEventListener(eventStr, callBack){
        if(this.arrElements.length > 0){
            for(let elem of this.arrElements){
                elem.addEventListener(eventStr, (e) => {callBack(e, elem)});
            }
        }
    }
    plugWindowEventListener(callBack){
        window.addEventListener('scroll', () => {callBack()})
    }
}

class AnchorLinks extends Component {
    constructor(selectorStr) {
        super(selectorStr);
    }
    scroll(e, anchorLink){
        e.preventDefault();
        const goto = anchorLink.hasAttribute('href') ? anchorLink.getAttribute('href') : 'body'
        document.querySelector(goto).scrollIntoView({
            behavior: "smooth",
            block: "start"
        })
    }
}

class Animation extends Component{
    constructor(selectorStr){
        super(selectorStr);
        this.windowHeight = document.documentElement.clientHeight;
    }
    animOnScroll(){
        for(let animItem of this.getArrElements()){
            const animItemHeight = animItem.offsetHeight;
            const animItemOffset = this.offset(animItem);
            let animPoint = 0;
            if(animItemHeight / 2 <= this.windowHeight){
                animPoint = animItemOffset + (animItemHeight / 2);
            }
            else{
                animPoint = animItemOffset + (this.windowHeight / 2);
            }
            if(animPoint <= this.windowHeight){
                animItem.classList.add('active');
            }
            else{
                animItem.classList.remove('active');
            }
        }
    }
    offset(elem){
        const rect = elem.getBoundingClientRect();
        return rect.top;
    }
}

class ProgressBar extends Component{
    constructor(selectorStr){
        super(selectorStr);
        this.windowHeight = document.documentElement.clientHeight;
        this.siteHeight = document.documentElement.scrollHeight;
    }
    progressAnimation(){
        const siteHeight = document.documentElement.scrollHeight;
        const scrollTop = window.scrollY;
        const persentProgress = Math.floor(scrollTop / (siteHeight - this.windowHeight) * 100);
        this.getArrElements()[0].style.width = `${persentProgress}%`
    }
}

class Form extends Component{
    constructor(selectorStr){
        super(selectorStr);
        this.formRequired = document.querySelectorAll('.required')
    }
    formSend(e, form) {
        const error = this.formValidate(form);
        if(error > 0){
            e.preventDefault();
            alert('Please, fill in the required fields!');
        }
    }
    formValidate(form){
        let error = 0;
        for(let input of this.formRequired){
            this.formAddRemoveError(input, false);
            if(input.classList.contains('email')){
                if(this.emailTest(input)){
                    this.formAddRemoveError(input, true);
                    error++;
                }
            }
            else{
                if(input.value === ''){
                    this.formAddRemoveError(input, true);
                    error++;
                }
            }
        }
        return error;
    }
    formAddRemoveError(input, isEror){
        if(isEror){
            //input.parentElement.classList.add('error');
            input.classList.add('error');
        }
        else{
            //input.parentElement.classList.remove('error');
            input.classList.remove('error');
        }
    }
    emailTest(input){
        const pattern = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return !pattern.test(input.value);
    }
}

class FullScreen extends Component{
    constructor(selectorStr){
        super(selectorStr);
    }
        show(e, elem) {
            if (document.fullscreenElement) {
                document.exitFullscreen();
                elem.classList.add('small');
            } 
            else {
                elem.classList.remove('small');
                elem.requestFullscreen();
            }
        }
}

class NightMode extends Component{
    constructor(selectorStr){
        super(selectorStr);
        this.wrapper = document.querySelector('.wrapper');
    }
    setNightMode(e, checkbox){
        if(checkbox.checked){
            this.wrapper.style.backgroundColor = '#808080';
        }
        else{
            this.wrapper.style.backgroundColor = 'white';
        }
    }
}