import { USER_AUTH, USER_AUTH_FAILED, USER_AUTH_SUCCESS, USER_LOGOUT } from "./constants"

export const loginAction=()=>{
    return {
        type:USER_AUTH
   }
}
export const loginActionSuccess=(usernumber,username)=>{
    return {
        type:USER_AUTH_SUCCESS,
        data:{usernumber,username}
   }
}

export const logout=()=>{
    return {
        type:USER_LOGOUT
   }
}
export const loginActionFailed=(error)=>{
    return {
        type:USER_AUTH_FAILED,
        data:error
   }
}

export const fetchUser=(username,password)=>{
    return(dispatch)=>{
        dispatch(loginAction())
        let formData = new FormData();
        formData.append('number', username);
        formData.append('password',password);
        fetch('http://chandra.getenjoyment.net/reactPractice/login.php',{
            method:'POST',
            body:formData
        })
        .then(response=>response.json().then(res=> {
            if(res.login){
                dispatch(loginActionSuccess(res.number,res.name))
            }else{
                dispatch(loginActionFailed(res.message))
            }
        }
            ))
        .catch(error => {
            dispatch(loginActionFailed(error))
            // useDispatch(()=>loginActionFailed(error))
            // dispatch(buyCake())
        })
    }
}