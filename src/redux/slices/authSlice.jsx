import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  session: null
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setSession(state, action) {
      state.session = action.payload;
    },
    logout(state) {
      state.session = null;
    }
  }
});

export const { setSession, logout } = authSlice.actions;
export default authSlice.reducer;

// supabase 사용 시 사용하던 버전
// import { createSlice } from '@reduxjs/toolkit';

// export const authSlice = createSlice({
//   name: 'auth',
//   initialState: {
//     signedInUser: null
//   },
//   reducers: {
//     setUser: (state, action) => {
//       state.signedInUser = action.payload;
//     }
//   }
// });

// export const { setUser } = authSlice.actions;

// export default authSlice.reducer;
