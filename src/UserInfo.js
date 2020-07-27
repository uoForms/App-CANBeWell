
var userInfo = {
  gender: null,
  patient_provider: null,
  age: null,
  gcheck: null ,// added by rishang,cbw2.0
  language: null
};

function setGender(gender) {
    userInfo.gender = gender;
}

function setPatientProvider(patient_provider){
    userInfo.patient_provider = patient_provider;
}

function setAge(age){
    userInfo.age = age;
}

function setLanguage(language){
    userInfo.language = language;
}

function oncheckchange(gcheck) {
  userInfo.gcheck = gcheck;
}

var getUserInfo = function() {
  return(userInfo);
}



export {getUserInfo};
export {setGender};
export {setPatientProvider};
export {setAge};
export {setLanguage};
export {oncheckchange};
