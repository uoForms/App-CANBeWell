
var userInfo = {
  gender: null,
  patient_provider: null,
  age: null,
  //gcheck: null ,// added by rishang,cbw2.0
  isTopSurgery:null,  //these 3 lines by Melika,cbw2.0
  isBottomSurgery:null,
  isHormoneTherapy:null,    
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

function setTopSurgery(isTopSurgery){
    userInfo.isTopSurgery = isTopSurgery;
}

function setBottomSurgery(isBottomSurgery){
  userInfo.isBottomSurgery = isBottomSurgery;
}

function setHormoneTherapy(isHormoneTherapy ){
  userInfo.isHormoneTherapy  = isHormoneTherapy ;
}

function setLanguage(language){
  userInfo.language = language;
}


//function oncheckchange(gcheck) { Rishang
 // userInfo.gcheck = gcheck;
//}



var getUserInfo = function() {
  return(userInfo);
}



export {getUserInfo};
export {setGender};
export {setPatientProvider};
export {setAge};
export {setLanguage};
export {isTopSurgery};
export {isBottomSurgery};
export {isHormoneTherapy};
