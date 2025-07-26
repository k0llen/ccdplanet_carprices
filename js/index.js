const selectMark = document.querySelector('.selects_select-mark');
const selectModel = document.querySelector('.selects_select-model');
const inputMark = document.getElementById('input-mark');
const inputModel = document.getElementById('input-model');
const btnShowResults = document.getElementById('btn-show-results');
const resultBlock = document.getElementById('result-block');
const resultClose = document.getElementById('result-close');
const resultCarInfo = document.getElementById('car-info-wrapper');
const resultContentPic = document.getElementById('result-pic-block');
const screenWidth = window.innerWidth;



function clear(item) {
    item.querySelector('p').textContent = 'Выберите Модель'
    item.querySelector('ul').remove();
    item.insertAdjacentHTML("beforeend", "<ul></ul>")
};



function createModelList() {
    clear(selectModel);
        const inputMarkValue = inputMark.value;

        for(let model in CarsDB[inputMarkValue]){
            const car = CarsDB[inputMarkValue][model];
            const li = document.createElement('li');
            li.dataset.value = model;
            li.tabIndex='0';
            li.textContent = car.FullName;
            li.classList.add('model-btn');
            selectModel.querySelector('ul').appendChild(li);
        }
};


window.addEventListener('click', (e) =>{
    //Select Mark opening
    if(e.target.closest('.selects_select-mark p')){
        selectModel.classList.remove('active');
        selectMark.classList.add('active');
    }

    //Select model opening
    if(e.target.closest('.selects_select-model p')){
        selectMark.classList.remove('active');
        selectModel.classList.add('active');
    }


    //Select value seting
    if(e.target.classList.contains('mark-btn')){
        inputMark.value = e.target.id;
        inputMark.dataset.text=e.target.textContent;
        selectMark.querySelector('p').textContent=inputMark.dataset.text;
        selectMark.classList.remove('active');
        selectModel.classList.remove('active');
        createModelList();
    }
    
    if(e.target.classList.contains('model-btn')){
        inputModel.value=e.target.dataset.value;
        inputModel.dataset.text=e.target.textContent;
        selectModel.querySelector('p').textContent=inputModel.dataset.text;

        selectMark.classList.remove('active');
        selectModel.classList.remove('active');

    } else if (!selectMark.contains(e.target) && !selectModel.contains(e.target)){
        if(selectMark.classList.contains('active')){
            selectMark.classList.remove('active');
        } else if(selectModel.classList.contains('active')){
            selectModel.classList.remove('active');
        }
    }

    //show car info

    function showCarInfo(brand, model) {
        const car = CarsDB[brand]?.[model];
        if (!car) return;
        
        const resultBlock = document.getElementById('result-block');
        // Устанавливаем фон
        if(screenWidth >= 1024){
            resultBlock.style.background = `url('${car.carPicDesctop}') no-repeat center 35%, #2f3f58`;
            resultBlock.style.backgroundSize = 'cover';
        } else {
            resultBlock.style.background = `url('${car.carPicTablet}') no-repeat center 35%, #2f3f58`;
            resultBlock.style.backgroundSize = 'cover';
        }

        
        // Заполняем инфо-блок
        const infoWrapper = document.getElementById('car-info-wrapper');
        infoWrapper.innerHTML = ''; // очистка
        
        // Название
        const nameP = document.createElement('p');
        nameP.textContent = car.FullName;
        infoWrapper.appendChild(nameP);
        
        // Цена покупки
        const costP = document.createElement('p');
        costP.textContent = `Цена покупки с салона - ${car.cost.toLocaleString('ru-RU')} ${car.currency}`;
        infoWrapper.appendChild(costP);
        
        // Цена утилизации
        const sellP = document.createElement('p');
        sellP.textContent = `Цена утилизации - ${car.sellprice.toLocaleString('ru-RU')} ${car.currency}`;
        infoWrapper.appendChild(sellP);

        // Какой автосалон
        const storeP = document.createElement('p');
        storeP.textContent = `${car.store}`;
        infoWrapper.appendChild(storeP);
    }

    //Наполнение и показ результата селектов
    if(btnShowResults.contains(e.target)){
        if(inputMark.value!='' || inputModel.value!=''){
            showCarInfo(inputMark.value, inputModel.value);
            resultBlock.classList.add('active');
        }
    }

    if(!e.target.closest('#result-block') && resultBlock.classList.contains('active') && !e.target.closest('#btn-show-results') || e.target.closest('#result-close')){
        resultBlock.classList.remove('active');
    }

})


