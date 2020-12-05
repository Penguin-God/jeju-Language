var 제주어사전 = {}
var 방언사전 = {}
var 표준어사전 = {}
var 번역언어종류 = "방언"

fetch("./방언.json") // read json
    .then(function(resp){
        return resp.json();
    })
    .then(function(data){
        방언사전 = data; // 변수에 json 담기
        제주어사전 = 방언사전;
    });

fetch("./표준어.json") // read json
    .then(function(resp){
        return resp.json();
    })
    .then(function(data){
        표준어사전 = data; // 변수에 json 담기
    });

function 번역(){
    var 번역된언어 = ""
    var 번역할언어 = document.getElementById("번역할언어").value.split(" ")
    if(번역언어종류 == "방언"){
        if(" " + document.getElementById("번역할언어").value in 제주어사전 && 번역할언어.length > 1){
            번역된언어 = 제주어사전[" " + document.getElementById("번역할언어").value]
            document.getElementById("번역된언어").innerHTML = 번역된언어
            return;
        }
    }
    else{
        if(document.getElementById("번역할언어").value in 제주어사전 && 번역할언어.length > 1){
            번역된언어 = 표준어사전[document.getElementById("번역할언어").value]
            document.getElementById("번역된언어").innerHTML = 번역된언어
            return;
        }
    }

    // 문장 번역 
    for(var i = 0; i < 번역할언어.length; i++){
        if(번역언어종류 == "방언"){
            if(" " + 번역할언어[i] in 제주어사전)
                번역할언어[i] = 제주어사전[" " + 번역할언어[i]]
        }
        else if(번역할언어[i] in 제주어사전){
            번역할언어[i] = 제주어사전[번역할언어[i]]
        }
        번역된언어 += 번역할언어[i] + " "
    }
    // 값 전달
    document.getElementById("번역된언어").innerHTML = 번역된언어
}

function 교체(){
    if(번역언어종류 == "방언"){
        //document.getElementById("언어종류").innerHTML = "표준어                                                 방언"
        제주어사전 = 표준어사전
        번역언어종류 = "표준어"
        document.querySelector(".방언").innerHTML = "표준어"
        document.querySelector(".표준어").innerHTML = "방언"
    }
    else{
        //document.getElementById("언어종류").innerHTML = "방언                                                표준어"
        제주어사전 = 방언사전
        번역언어종류 = "방언"
        document.querySelector(".방언").innerHTML = "방언"
        document.querySelector(".표준어").innerHTML = "표준어"
    }
    document.getElementById("번역할언어").value = ""
    document.getElementById("번역된언어").innerHTML = "번역"
}