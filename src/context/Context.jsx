import { createContext, useState } from "react";
import run from "../config/gemini";

export const Context=createContext();

const ContextProvider=(props) =>{
    const [input,setInput]=useState("");
    const [recentPrompt,setRecentPrompt]=useState("");
    const [prevPrompts,setPrevPrompts]=useState([]);
    const [showResult,setShowResults]=useState(false);
    const [loading,setLoading]= useState(false);
    const [resultData,setResultData]=useState("")

    const newChat=()=>{
        setLoading(false)
        setShowResults(false)
    }
            
        
    
    

    const onSent = async (prompt) =>{
        setResultData("")
        setLoading(true) 
        setShowResults(true)
        let response;
        if(prompt!==undefined){
            Response=await run(prompt)
            setRecentPrompt(prompt)
        }
        else{
            setPrevPrompts(prev=>[...prev,input])
            setRecentPrompt(input)
            response = await run(input)
        }
        
        
      
       let responseArray =response.split("**");
       let newResponse = "";
       for(let i=0 ;i<responseArray.length;i++){
        if(i===0 || i%2!==1){newResponse+=responseArray[i];}
        else{newResponse+="<i>"+responseArray+"</i>";}
        
       }
       let newResponse2 = newResponse.split("*").join("</br>")

       
    


       setResultData(<p dangerouslySetInnerHTML={{ __html: newResponse2 }} />)
       setLoading(false)
       setInput("")


    }

    const contextValue={
        prevPrompts,
        setPrevPrompts,
        onSent,
        setRecentPrompt,
        recentPrompt,
        showResult,
        loading,
        resultData,
        input,
        setInput,
        newChat

    }
    return(
<Context.Provider value={contextValue}>
    {props.children}
</Context.Provider>
    )
}
export default ContextProvider