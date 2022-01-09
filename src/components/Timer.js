import { useState, useEffect } from 'react'

export default function Timer() {

    const [isActive, setIsActive] = useState(false);
    const [isPicked, setIsPicked] = useState(false);
    const [sessionCount, setSessionCount] = useState(0);

    const [second, setSecond] = useState('00');
    const [minute, setMinute] = useState('00');
    const [hour, setHour] = useState('00');

    const [counter, setCounter] = useState(0)
    const [flow, setFlow] = useState(0)
    const [rest, setRest] = useState(0)
    const [bub, setBub] = useState(2)

    useEffect(() => {
        let flowInterval;

        if (isPicked) {
            const hourCounter = Math.floor(counter / 3600);
            const minuteCounter = Math.floor(counter / 60) % 60;
            const secondCounter = (counter % 60);
    
            const computedSecond = String(secondCounter).length === 1 ? `0${secondCounter}`: secondCounter;
            const computedMinute = String(minuteCounter).length === 1 ? `0${minuteCounter}`: minuteCounter;
            const computedHour = String(hourCounter).length === 1 ? `0${hourCounter}`: hourCounter;
        
            setSecond(computedSecond);
            setMinute(computedMinute);
            setHour(computedHour);
        
            
            flowInterval = setInterval(() => {
                // when bub is even, its time for rest, when it is odd, it's time for work
                if (isActive) {
                    if (counter >= 1) {
                        setCounter(counter => counter - 1);
                    } else {
                        setBub(bub+1) // in rest
                        // setCounter(bub%2===0 ? rest : flow)
                        if (bub%2===0) {
                            setCounter(rest)
                        } else {
                            setCounter(flow)
                            setSessionCount(sessionCount+1)
                        }
                    }
                    
                }  
            }, 1000) // 1000 milliseconds per second
          
        }
        return () => clearInterval(flowInterval);
    }, [isActive, isPicked, counter]);

    const stopTimer = () => {
        setIsActive(false);
        setIsPicked(false);
        setCounter(0);
        setSecond('00');
        setMinute('00')
        setHour('00');
        setSessionCount(0);
        setBub(0);
    }

    const handleClick = (event) => {
        setIsPicked(true);
        // 25 minutes work, 5 minutes rest
        if(event.target.textContent === "Classic"){
            setCounter(1500)
            setFlow(1500)
            setRest(300)
            // Testing numbers
            // setCounter(15)
            // setFlow(15)
            // setRest(3)
        }
        // 50 minutes work, 10 minutes rest
        if(event.target.textContent === "Longer") {
            setCounter(3000)
            setFlow(3000)
            setRest(600)
        }
        // 75 minutes work, 15 minutes rest
        if(event.target.textContent === "Longest"){
            setCounter(4500)
            setFlow(4500)
            setRest(900)
        }
    }

    return (
        <div className="">

            {/* Timer display */}
            <div className='text-white text-6xl pt-32 pb-8 text-center'>
                <span className="">{hour}</span>
                    <span>:</span>
                <span className="minute">{minute}</span>
                    <span>:</span>
                <span className="second">{second}</span>
            </div>

            {/* Pomodoro session options */}
            {!isPicked ? 
                <div className="text-center">

                    <button onClick={event => handleClick(event)} className="text-blue-800 px-3 m-3 rounded-md shadow-md bg-white">Classic</button>
                    <button onClick={event => handleClick(event)} className="text-blue-800 px-3 m-3 rounded-md shadow-md bg-white">Longer</button>
                    <button onClick={event => handleClick(event)} className="text-blue-800 px-3 m-3 rounded-md shadow-md bg-white">Longest</button>
            
                </div>
            : 
            <>
                <div className="text-center">
                    <h1 className="font-semibold text-blue-800"> Sessions completed: {sessionCount} </h1>
                </div>
                    
                <div className="flex justify-center space-x-5">
                    <button className="text-blue-800 font-semibold text-lg h-24 w-24 mt-20 shadow-sm bg-white rounded-full" onClick={() => setIsActive(!isActive)}>{isActive ? "Pause" : "Start"}</button>
                    <button className="text-blue-800 text-lg font-semibold shadow-sm h-24 w-24 mt-20 bg-white rounded-full" onClick={() => stopTimer()}> End Session </button>
                </div>
                    
            </>
            }
            
        </div>
    )
}
