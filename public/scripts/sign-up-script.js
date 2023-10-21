const password = document.querySelector(".password-input");
const cpassword = document.querySelector(".cpassword");
const submitBtn = document.querySelector(".submit");

cpassword.addEventListener('keydown',()=>{
    setTimeout(()=>{
        cpassVal = cpassword.value;
        passVal = password.value;
        if(cpassVal===passVal){
            submitBtn.removeAttribute('disabled');
        } else {
                submitBtn.setAttribute('disabled', 'disabled');
        }
    },1)
})