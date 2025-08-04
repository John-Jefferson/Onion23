import './mainPage.css';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
export const MainPage = () => {
    const location = useLocation();
    const [overallScore, setOverallScore] = useState(null)
    const [UID, setUID] = useState(null)
    useEffect(() => {
        if(location.state?.uid){
            setUID(location.state?.uid)
        }
    }, [location.state?.uid])
    useEffect(() => {
        async function getData(){
            try{
                await fetch("http://localhost:3001/getUserData", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ 
                    uid: UID,
                    })
            }).then(res => res.json())
            .then(json => {
                console.log("whole json: ", json)
                if(json.overallScore){
                    setOverallScore(json.overallScore)
                    console.log("overallScore from initial: ", json.overallScore)
                }
            })
            }
            catch (err){
                console.log(err)
            }
        }
        getData()
    }, [UID])
    useEffect(() => {
        console.log("overallScore: ", overallScore)
    }, [overallScore])
    return(
        <>
        <div className = "allButtonsDiv">
            <div className = "mainUpperButtonDiv">
                <button className = "startButton">START</button>
                <div className = "createButtonDiv">
                    <button className = "createButton">CREATE</button>
                    <div className = "createButtonDesc">cvbfvxcvzcvfsvsdf</div>
                </div>
            </div>
            <button className = "yourPostButton">YOUR POSTS</button>
            <p className = "yourPostDesc">asdasdasdasd</p>
        </div>
        </>
    );
}