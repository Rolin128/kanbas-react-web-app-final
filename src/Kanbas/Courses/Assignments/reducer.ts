import { createSlice } from "@reduxjs/toolkit";
// import { assignments } from "../../Database";

const initialState = {
    assignments: [], //clear assignments state vairable 
};

const assignmentsSlice = createSlice({
    name: "assignments",
    initialState,
    reducers: {
        setAssignments: (state, action) => {      //setAssignments用于更新Redux store中的assignments状态
            state.assignments = action.payload;
        },
        addAssignment: (state, { payload: assignment }) => {
            const newItem: any = {
                _id: new Date().getTime().toString(),
                title: assignment.title,
                course: assignment.course,
                description: assignment.description,
                points: assignment.points,
                due: assignment.due,
                available: assignment.available,
                until: assignment.until,
            };
            state.assignments = [...state.assignments, newItem] as any;
        },
        deleteAssignment: (state, { payload: assignmentId }) => {
            state.assignments = state.assignments.filter((m: any) => m._id !== assignmentId);
        },
        updateAssignment: (state, { payload: assignment }) => {
            state.assignments = state.assignments.map((m: any) =>
                m._id === assignment._id ? assignment : m
            ) as any;
        },
        editAssignment: (state, { payload: assignmentId }) => {
            state.assignments = state.assignments.map((m: any) =>
                m._id === assignmentId ? { ...m, editing: true } : m
            ) as any;
        },
    },
});

export const { addAssignment, deleteAssignment, updateAssignment, editAssignment,setAssignments } = assignmentsSlice.actions;
export default assignmentsSlice.reducer;
