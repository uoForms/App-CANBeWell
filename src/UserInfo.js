
var userInfo = {
  gender: null,
  patient_provider: null,
  age: null,
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

var getUserInfo = function() {
  return(userInfo);
}

export {getUserInfo};
export {setGender};
export {setPatientProvider};
export {setAge};
export {setLanguage};
