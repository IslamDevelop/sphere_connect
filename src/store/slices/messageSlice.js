import { createSlice } from "@reduxjs/toolkit";
import { auth } from "../../firebase";
import writeUserData from "../../components/messages/Messages";
import { getDatabase, onValue, ref } from "firebase/database";


const  initialState = { 
    user: null,
    message: null,
    date: null, 
}

const messageSlice = createSlice({
    name: 'messages',
    initialState,
    reducers: {
        addMessage(state,action) {
            let option = {
                hour: "numeric",
                minute: "numeric",
                seconds: "numeric",
              };
              const db = getDatabase();
              const dbUser = ref(db, "Profile/users/");
                onValue(dbUser, (snapshot) => {
                const nick = (snapshot.val());
              const nickname = nick.find(userEmail => userEmail.email === auth.currentUser.email)
                    state.user = nickname.nickname
                
                });
                
              
          
                state.message = action.payload;
                state.date = Intl.DateTimeFormat("ru-Us", option).format()
            
            }
        ,
        removeMessage(state) {
            state.user = null;
            state.message = null;
            state.date = null
        }
,
        addUser(state, action) {
            
            state.user = action.payload
            console.log(state.user)
        }
    }
})
export const {addMessage,addUser,removeMessage} = messageSlice.actions;
export default messageSlice.reducer