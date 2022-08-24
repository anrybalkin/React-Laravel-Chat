import React from "react";
import { changeChat } from "../features/currentUserStorage";
import store from "../features/reduxstore";


class Search extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state={searchVal:"",searchValues:[]}
        this.handlerChange=this.handlerChange.bind(this)
        this.toChat=this.toChat.bind(this)

    }

    componentDidMount()
    {
        document.addEventListener("click",(e)=>{
            if(e.target.className.indexOf("search")===-1&&document.querySelector(".search-result")!==null)
            {
                this.setState({searchVal:"",searchValues:[]});

            }
        })
    }

    toChat(chatID,messageID)
    {
        store.dispatch(changeChat({activeChat:chatID}))
        setTimeout(()=>{
            if(document.getElementById(messageID)!==null)
            {
                document.getElementById(messageID).scrollIntoView();
            }
        },2000)
    }

    handlerChange(e)
    {this.setState({searchVal:e.target.value})
        if(e.target.value.length>3)
        {
            let allID="",tmp=store.getState().chats.chat.filter(chat=>{
                return chat.members.toString().indexOf(store.getState().currentUserStorage.userName)!==-1;
            }).map(el=>{
                return el;
            });
            
            tmp.forEach(el=>{
                allID+=el.chatID!==undefined?el.chatID+" ":""
            })
            tmp=store.getState().messages.message.filter(el=>{return el.text.indexOf(this.state.searchVal)!==-1&&allID.indexOf(el.chatID)!==-1})
            this.setState({searchValues:tmp})
        }
    }

    render()
    {
        let renderlist;
        if(this.state.searchVal!="")
        {
            if(this.state.searchValues.length>0)
            {
                renderlist=this.state.searchValues.map(el=>{
                    return <li className="search-option" key={el.id} onClick={()=>{this.toChat(el.chatID,el.id)}}>
                        {el.text.split(this.state.searchVal)[0]}<span className='search-yellow'>{this.state.searchVal}</span>{el.text.split(this.state.searchVal)[1]}
                    </li>
                })
            }

        }
        return <div className="search-panel">
            <input type="text" className="search-input" value={this.state.searchVal} onChange={this.handlerChange} placeholder="type something" />
            <button className="search-submit"><img src={"images/svg/search-icon.svg"} alt="search-icon" /></button>
            {this.state.searchValues.length>0?<div className="search-result visible"><ul className="search-options">{renderlist}
                </ul>
            </div>:""}
        </div>
    }
}

export default Search;