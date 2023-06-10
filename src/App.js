import React from 'react'
import styled from 'styled-components'
import './App.css'
import { useState , useEffect } from 'react'


const Navbar = styled.div`
  width:100%;
  height : 60px;
  background-color : teal;
  display:flex;
  justify-content:space-between;
  align-items:center;
`
const Container = styled.div`
  height : 100%;
  width : 100%;
`
const Title = styled.h1`
  margin-left : 40px;
  font-weight : 600;
  font-style:italic;
`

const List = styled.ul`
  list-style:none;
  display : flex;
`
const ListItem = styled.li`
  margin : 0 20px;
  font-size : 20px;
  font-weight : 400;
  cursor:pointer;
  transition:all .5s ease;
  &:hover{
    z-index : 2;
    transform : scale(1.3);
  }
`

const Middle = styled.div`
  height : 51vh;
  width : 100%;
  display : flex;
    align-items:center;
    justify-content : center;
  // background-color : green;
  flex-direction : column;

`
const Card = styled.div`
    flex : 1.5;
    height : 100%;
    border-radius : 10px;
    border : 4px solid gray;
    display : flex;
    align-items:center;
    justify-content : center;
    margin : 10px;
`

const CardInfo = styled.div`
    width : 120px;
    height : 120px;
    border-radius : 10px ;
    border : 3px solid black;
    display : flex;
    align-items:center;
    justify-content : center;
    font-size : 80px;
    color : teal;
`
const Lower = styled.div`
  width : 100%;
  height : 29vh;
  display : flex;
  align-items:flex-start;
  justify-content : center;
`
const TextArea = styled.textarea`
  height : 80%;
  width : 50%;
  font-size : 40px;
  margin : 0 20px;
  padding : 10px;
`
const StatsContainer = styled.div`
  flex : 1;
  margin:10px;
  display : flex;
  align-items:center;
  justify-content : center;
  flex-direction : column;
  height : 100%;
  border : 2px solid gray;
  border-radius : 10px;
  padding : 10px;

`

const Stats = styled.span`
  color : teal;
  display : block;
  font-size:28px;
  text-align : center;
`
const InfoContainer = styled.div`
  display : flex;
  width : 60%;
  height : 30vh;
`
const Img = styled.img`
        height : 90%;
`

const TimerContainer =styled.div`
    width : 100%;
    height : 50px;
    background-color : lavender;
    display : flex;
    justify-content : flex-end;
`

const InnerContainer = styled.div`
    width : 25%;
    height :100%;
    background-color : cyan;
    text-align:center;
    font-size: 40px;
`

const App = () => {

  const [text, setText] = useState('');
  const [nextKey, setNextKey] = useState('');
  const [total,setTotal] = useState(0); 
  const [correct,setCorrect] = useState(0);
  const [timer, setTimer] = useState(5 * 60); 
  const [isActive, setIsActive] = useState(false);
  

  
  useEffect(() => {
    let interval = null;
    if (isActive) {
      interval = setInterval(() => {
        setTimer((prevTimer) => {
          if(prevTimer === 1) {setIsActive(false); clearInterval(interval)}
          return prevTimer - 1;
        });
      }, 1000);
    } else if (!isActive && timer !== 0) {
      clearInterval(interval);
    }
    return () => {
      clearInterval(interval);
    };
  }, [isActive, timer]);

  const handleStart = () => {
    setIsActive(true);
  };

  const handleReset = () => {
    setTimer(5 * 60);
    setIsActive(false);
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return {
      minutes: minutes.toString().padStart(2, '0'),
      seconds: seconds.toString().padStart(2, '0')
    };
  };

  const { minutes, seconds } = formatTime(timer);

  useEffect(() => {
    setNextKey(getRandomKey());
  },[]);

  const handleKeyDown = (event) => {
    
    const { key } = event;

    if (/^[a-zA-Z]$/.test(key)) {
      if( key === nextKey){
        setCorrect(correct + 1);
      }
      setTotal(total + 1);
      setText((prevText) => prevText + key);
      setNextKey(getRandomKey());
    }
  };

  const getRandomKey = () => {
    const keys = 'asdfjkl'.split('');
    const randomIndex = Math.floor(Math.random() * keys.length);
    return keys[randomIndex];
  };

  
  return (
    <Container>
      <Navbar>
        <Title>Touch Typing Practice</Title>
        <Img src="favicon_io (2)\android-chrome-512x512.png"></Img>
        <List>
          <ListItem onClick={handleStart} disabled={setIsActive} >Start Practice</ListItem>
          <ListItem onClick={()=>{handleReset()}}>Reset Text</ListItem>
          <ListItem onClick={handleReset}>Reset Timer</ListItem>
        </List>
      </Navbar>
      <TimerContainer>
        <InnerContainer>
            {(minutes!=='00' || seconds !=='00')? `${minutes} : ${seconds}` : 'Time Over!'}
        </InnerContainer>
      </TimerContainer>

      <Middle>
          <Title>Press the Key Shown Below:</Title>
          <InfoContainer>
          <Card>
              <CardInfo>{nextKey}</CardInfo>
          </Card>
          <StatsContainer>
          <Stats>Total keys pressed : <b>{total}</b></Stats>
          <Stats>Correct : <b>{correct}</b></Stats>
          <Stats>Accuracy : <b>{total===0 ? 0: parseFloat(correct/total * 100).toFixed(3)}%</b></Stats>
        </StatsContainer>
          </InfoContainer>
      </Middle>

      <Lower>
        <TextArea value={text}
        onKeyDown={handleKeyDown}
        placeholder="Start typing...">
        </TextArea>
      </Lower>

    </Container>
  )
}

export default App
