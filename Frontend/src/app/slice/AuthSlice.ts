import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// export interface UserData {
//     _id: string;
//     name: string;
//     email: string;
//     phone: string;
//     password: string;
//     token: string;
//     refreshToken: string;
//     userId: string;
// }
export interface UserData {
    success: boolean;
    message: string;
    data: {
        email: string;
        isUser: boolean;
        isVerified: boolean;
        name: string;
        phone: string;
    };
    userId: string;
    token: string;
    refreshToken: string;
}
interface  AdminData {
    email:string;
    password:string
}

interface AuthState {
    userData: UserData | null;
    mechanicData:UserData | null;
    adminData:AdminData | null
}

const initialState: AuthState = {
    userData: localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo') as string) : null,
    mechanicData: localStorage.getItem('mechInfo') ? JSON.parse(localStorage.getItem('mechInfo') as string) : null,
    adminData: localStorage.getItem('adminInfo') ? JSON.parse(localStorage.getItem('adminInfo') as string) : null,

};

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUserCredential: (state, action: PayloadAction<UserData>) => {
            state.userData = action.payload;
            localStorage.setItem('userInfo', JSON.stringify(action.payload));
        },
        setMechanicCredential: (state, action: PayloadAction<UserData>) => {
            state.mechanicData = action.payload;
            localStorage.setItem('mechInfo', JSON.stringify(action.payload));
        },
        setAdminCredential: (state, action: PayloadAction<AdminData>) => {
            state.adminData = action.payload;
            localStorage.setItem('adminInfo', JSON.stringify(action.payload));
        },
        clearUserCredential: (state) => {
            state.userData = null;
            localStorage.removeItem('userInfo');
        }
    }
});

export const { setUserCredential, clearUserCredential,setMechanicCredential,setAdminCredential } = authSlice.actions;

export default authSlice.reducer;
