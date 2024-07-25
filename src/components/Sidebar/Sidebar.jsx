import React, { useContext, useState } from 'react'
import './Sidebar.css'
import { assets } from '../../assets/assets'
import { Context } from '../../context/Context'

const Sidebar = () => {
    const [extended, setExtended] = useState(false)
    const {onSent,prevPrompts,setRecentPrompts,newChat} = useContext(Context)
    const loadPrompt = async (prompt) => {
        setRecentPrompts(prompt)
        await onSent(prompt)
    }

    return (
        <div className="sidebar">
            <div className="top">
                <img onClick={()=>setExtended(prev=>!prev)} className='menu' src={assets.menu_icon} alt="" />
                <div onClick={()=>newChat()} className="newchat">
                    <img src={assets.plus_icon} alt="" />
                    {extended ? <p style={{ color: 'white' }}>New Chat</p> : null}
                </div>
                {extended ? <div className="recent">
                    <p style={{ color: 'white' }} className="recent-title">Recent</p>

                    {prevPrompts.map((item,index)=>{
                                return(
                                    <div onClick={()=>loadPrompt(item)} className="recent-entry">
                        <img src={assets.message_icon} alt="" />
                        <p style={{ color: 'white' }}>{item.slice(0,18)}...</p>
                    </div>
                                )
                    })}

                    
                </div> : null}


            </div>
            <div className="bottom">
                <div className="bottom-item recent-entry">
                    <img src={assets.question_icon} alt="" />
                   {extended?<p style={{ color: 'white' }}>Help</p>:null}
                </div>
                <div className="bottom-item recent-entry">
                    <img src={assets.history_icon} alt="" />

                    {extended?<p style={{ color: 'white' }}>Activity</p>:null}
                </div>
                <div className="bottom-item recent-entry">
                    <img src={assets.setting_icon} alt="" />
                    {extended?<p style={{ color: 'white' }}>Settings</p>:null}
                </div>
            </div>
        </div>
    )
}

export default Sidebar