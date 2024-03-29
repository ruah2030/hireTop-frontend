

// userSlice.js
import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: {
        token:null,
        id: null,
        email: null,
        user_name: null,
        email_verified_at: null,
        created_at: null,
        updated_at: null,
        user_mata: null,
        first_name: null,
        last_name: null,
        deleted_at: null
    },
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const { setUser } = userSlice.actions;
export default userSlice;