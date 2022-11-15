'use strike'

document.addEventListener('DOMContentLoaded', () => {
 const form = document.querySelector('form');
 
 document.addEventListener('submit', formSend);

 async function formSend(e){
     e.preventDefault();

     let error = formValidate(form),
         load = document.querySelector('.load');

     let formdata = new FormData(form);
     formdata.append('image', formImage.files[0])


     if(error === 0){
         load.classList.add('_sending');
        
         
         let response = await fetch('sendmail.php', {
             method: 'POST',
             body: formdata
         });
         if(response.ok){
           let result = await response.json();
           alert(result.messeg)
           formPreview.innerHTML ='';
           form.reset();
           load.classList.remove('_sending');
         } else{
           alert('error')
           document.querySelector('.load');
         }

     } else{
         alert('Заполните поля еще раз')
     }


 }

 function formValidate(form){
    let error = 0;
    let formReq = document.querySelectorAll('._req')

    for(let item of formReq){
        formRemoveError(item);

        if(emailTestValid(item) && document.querySelector('#formEmail') === item){
            formAddError(item);
            error++;

        } else if(item.getAttribute('type') === 'checkbox' && item.checked === false){
            formAddError(item);
            error++;
        } else {
            if(item.value === ''){
                formAddError(item);
                error++;
            }
        }
        
    }  
    return error;
 }

 function formAddError(input){
    input.parentElement.classList.add('_error');
    input.classList.add('_error');
}
function formRemoveError(input){
    input.parentElement.classList.remove('_error');
    input.classList.remove('_error');
}
function emailTestValid(input){
    return !/^\w+([\.-?\w+])*@\w+([\.-?\w+])*(\.\w{2,8})/.test(input.value);
}

const formImage = document.querySelector('#formImage');
const formPreview = document.querySelector('#formPreview');
const fileButton = document.querySelector('#fileButton');

fileButton.addEventListener('click', () =>{
    formImage.click();
})

formImage.addEventListener('change', ()=>{
   uploadFile(formImage.files[0]);
 //  console.log(formImage.files[0])
})

function uploadFile(file){
    if(!['image/jpg', 'image/png', 'image/jpag', 'image/gif'].includes(file.type)){
        alert('разрешены только изображения')
        return ;
    }
    if(file.size > 2 * 1024 * 1024){
       alert('файл должеен быть не менее 14мб')
       return;
    }


let fileReader = new FileReader();

fileReader.onload = (e) =>{
  formPreview.innerHTML = `<img src = '${e.target.result}' alt='фото'>`;
  console.log(e.target.result)
};

fileReader.onerror = () =>{
    alert('ошибка!');
}

fileReader.readAsDataURL(file);

}




} )