import React from 'react'
import {useEffect, useRef} from "react"
import Modal from "react-modal"


const costomstyle={
  content:{
    top:'50%',
    left:'50%',
    right:'auto', 
    bottom:'auto', 
    marginRight:'-50%', 
    transform:'translate(-50%,-50%)',
    backgroundColor:'#a5c4d4'
  }
}
Modal.setAppElement('head')

const Main = () => {


const[wordData, setWordData]=React.useState([])

const[word, setWord] =React.useState('')

const[correctWord,setCorrectWord]=React.useState('')

const[inputValue,setInputValue]=React.useState('')

const[IsOpen,setIsOpen]=React.useState(false)

const[point,setPoint]=React.useState(0)



const url = 'https://api.api-ninjas.com/v1/randomword';
const api_url = 'https://random-word-api.vercel.app/api?words=100'


useEffect(() => { 
  fetch(api_url,{
    method: 'GET',

    .then(res => res.json())
    .then(data => setWordData(data))
  
}, []);


const[isRunning, setIsRunning]=React.useState(false)
const intervalRef=useRef(null)
const[timer, setTimer]=React.useState(30)




const startTime = () => {
  if(isRunning)return
  setIsRunning(true)
  intervalRef.current=setInterval(() => {
    setTimer(prevTime => prevTime - 1)
  }, 1000)
  }

const stopTime= () => {
  setIsRunning(false)
  if(intervalRef.current){
    clearInterval(intervalRef.current)
    intervalRef.current=null

  }
}


const reset = () => {
  setTimer(30)
  startTime
}

useEffect(() => {
  if (timer <= 0){
    openModal()
    
      stopTime()
      handleReset()
  }
},[timer])



function shuffle(){

  const ranWord = wordData[Math.floor(Math.random() * wordData.length )]
setCorrectWord(ranWord)

  if (ranWord.length < 3) return ranWord;
const first = ranWord.slice(0, 1);
const middle=ranWord.slice(1, -1);
const last = ranWord.slice(-1);
const shuffled = middle
  .split('')
  .sort(() => 0.5 - Math.random())
  .join('');
return  setWord(shuffled + last + first);

}


function getWord(e){
  e.preventDefault();
  shuffle();
  reset()
  startTime()
  handleReset()

}


function checkWord(e){
  e.preventDefault()
  if(correctWord === inputValue){
    shuffle()
    handleReset()
    startTime()
    reset()
    points()
  }else{
    alert("try again")
  }

}

function handleReset(){
  setInputValue('')
  
}

function openModal(){
  setIsOpen(true)
}

function closeModal(){
  setIsOpen(!setIsOpen);
  setPoint(0)
  shuffle()
  reset()
  startTime()
  
}

function points(){
  setPoint(prevPoint => prevPoint + 1)
}



console.log(correctWord)
console.log(point)

  return (
    <div className='w-150 h-120 bg-[#d2e59e] p-10' >
        <h1 className='
        text-center 
        text-[30px] 
        uppercase 
        font-bold 
        pb-5
        '>jumble word game</h1>
        <h2 className='text-center font-bold my-10 p-5 h-20 text-3xl tracking-[20px] uppercase border-1 border-[#2f2f2f] bg-[#f3f9d2] text-[#2f2f2f]' >{word}</h2>
        <div className='flex justify-between text-xl'> 
        <p className='mb-5 flex text-xl capitalize'>time left: <span className=' font-bold'>{timer}</span></p>
        <h3>Points: <span className='font-bold'>{point}</span></h3>
        </div>
        <form action="">
            <input 
            className='border-1 border-[#2f2f2f] bg-[#f3f9d2] w-full h-14 text-center uppercase mb-5 text-xl font-[#2f2f2f] font-semibold tracking-[10px] Answer'
            type="text" 
            name="answer" 
            id="answer" 
            placeholder='Answer'
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}/>
            
            <div className='flex justify-evenly [&>button]:h-10 [&>button]:p-2 [&>button]:rounded-md [&>button]:font-semibold [&>button]:capitalize' >
            <button className='bg-purple-500' onClick={getWord}>refresh word</button>
            <button className='bg-white text-black' onClick={checkWord}>check word</button>
            </div>
        </form>
        <Modal style={costomstyle} isOpen={IsOpen} onRequestClose={closeModal} >
          <div className='w-150 h-50 text-center' >

          <h1 className='text-4xl capitalize mb-5 ' >Time Off! <span className='bg-amber-300 px-5 font-bold'>{correctWord.toUpperCase()}</span> was the correct word.</h1>
          <h1 className='text-3xl capitalize mb-5'>Your Total point:{point}</h1>
            <div className='flex justify-center'>
          <button className='border-1 border-black w-30 h-10 bg-gray-800 text-slate-300 ' onClick={closeModal}>Try agin! </button>

          </div>
          </div>
        </Modal>


    </div>
  )

}
export default Main
