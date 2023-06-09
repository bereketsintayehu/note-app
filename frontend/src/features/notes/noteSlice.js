import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import noteService from './noteService';

const initialState = {
    notes: [],
    isError: false,
    isLoading: false,
    isSuccess: false,
    message: ''
}

// create new note
export const createNote = createAsyncThunk('notes/create', async (noteData, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await noteService.createNote(noteData, token)
    } catch (error) {
        const message =
        (error.response &&
            error.response.data &&
            error.response.data.message) ||
        error.message ||
        error.toString()
        return thunkAPI.rejectWithValue(message)
    }
});

// get user notes
export const getNotes = createAsyncThunk('notes/getAll', async (_, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await noteService.getNotes(token)
    } catch (error) {
        const message =
        (error.response &&
            error.response.data &&
            error.response.data.message) ||
        error.message ||
        error.toString()
        return thunkAPI.rejectWithValue(message)
    }
});

// delete user note
export const deleteNote = createAsyncThunk('notes/delete', async (id, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await noteService.deleteNote(id, token)
    } catch (error) {
        const message =
        (error.response &&
            error.response.data &&
            error.response.data.message) ||
        error.message ||
        error.toString()
        return thunkAPI.rejectWithValue(message)
    }
});



// update user note
export const updateNote = createAsyncThunk('notes/update', async (noteData, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        const id = noteData.id
        const data = {
            text: noteData.text,
            md: noteData.md
        }
        return await noteService.updateNote(id, data, token)
    } catch (error) {
        const message =
        (error.response &&
            error.response.data &&
            error.response.data.message) ||
        error.message ||
        error.toString()
        return thunkAPI.rejectWithValue(message)
    }
});


export const noteSlice = createSlice({
    name: 'notes',
    initialState,
    reducers: {
        reset: (state) => initialState
    },
    extraReducers: (builder) => {
        builder
            .addCase(createNote.pending, (state) => {
                state.isLoading = true
            })
            .addCase(createNote.fulfilled, (state, action) => {
                state.notes.push(action.payload)
                state.isLoading = false
                state.isSuccess = true
            })
            .addCase(createNote.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(getNotes.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getNotes.fulfilled, (state, action) => {
                state.notes = action.payload
                state.isLoading = false
                state.isSuccess = true
            })
            .addCase(getNotes.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(deleteNote.pending, (state) => {
                state.isLoading = true
            })
            .addCase(deleteNote.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.notes = state.notes.filter((note) => note._id !== action.payload.id)
            })
            .addCase(deleteNote.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(updateNote.pending, (state) => {
                state.isLoading = true
            })
            .addCase(updateNote.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                const index = state.notes.findIndex((note) => note._id === action.payload._id)
                state.notes[index] = action.payload
            })
            .addCase(updateNote.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
    },
})

export const {reset} = noteSlice.actions
export default noteSlice.reducer