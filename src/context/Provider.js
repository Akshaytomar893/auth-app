import { useState} from "react";
import AppContext from "./context";

const AppProvider = ({children})=>{
    const [appState, setAppState] = useState({
        name:'',
        email:'',
        isLoggedIn: false,
        picture:''
    })
    return (
        <AppContext.Provider value={{appState, setAppState}}>
            {children}
        </AppContext.Provider>
    )
}
export default AppProvider