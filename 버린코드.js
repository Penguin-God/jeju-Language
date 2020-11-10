var 번역할언어 = document.getElementById("번역할언어").value.split(" ")
    for(var i = 0; i < 번역할언어.length; i++){
        var 바꿀언어 = " " + 번역할언어[i]
        for(var key in 제주어사전){
            if(바꿀언어.indexOf(key) != -1)
                번역할언어[i] = 제주어사전[key]
        }
        번역된언어 += 번역할언어[i] + " "
    }