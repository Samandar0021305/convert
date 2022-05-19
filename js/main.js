const textarea = document.querySelector("textarea")
const speechBtn = document.querySelector('button')
const voisceList = document.querySelector("select");

let synth = speechSynthesis;
let isSpeaking = true

function vocies(){
for(let voice of synth.getVoices()){
    console.log(voice)
    let selected = voice.name === "Google US English" ? "selected" : ""
    let option = `<option value="${voice.name}" ${selected}>${voice.name} (${voice.lang}) </option>`
  voisceList.insertAdjacentHTML("beforeend",option)
}
}
synth.addEventListener("voiceschanged",vocies)

function textToSpeech(text){
    let utternance = new SpeechSynthesisUtterance(text)
    speechSynthesis.speak(utternance)
    for(let voice of synth.getVoices()){
        if(voice.name === voisceList.value)
        utternance.voice = voice
    }
}

speechBtn.addEventListener('click',e=>{
    e.preventDefault()
    if(textarea.value !==""){
        if(!synth.speaking){
            textToSpeech(textarea.value)
        }
      if(textarea.value.length > 80){
          if(isSpeaking){
              synth.resume();
              isSpeaking = false
              speechBtn.innerHTML = "Pause Speech"
          }else{
              synth.pause;
              isSpeaking = true
              speechBtn.innerHTML = "Reaume Speech"
          }
          setInterval(()=>{
              if(!isSpeaking.speaking && !isSpeaking){
                  isSpeaking = true;
                  speechBtn.innerHTML = "Converter to spech"
              }
          })
      }
      else{
        speechBtn.innerHTML = "Converter to spech"
      }
    }  
})

