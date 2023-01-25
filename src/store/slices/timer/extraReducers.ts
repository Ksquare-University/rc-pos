import { createAsyncThunk, ActionReducerMapBuilder } from '@reduxjs/toolkit';
import { ITimer } from './reducer';

export const getRestaurantTime = createAsyncThunk(
    'timer/getRestaurantTime',
    async (id: Number) => {
        const res = await fetch(`https:localhost/5000/restaurant/owner/${id}`);
        const data = await res.json();

        const currentDate = new Date();

        const currentDay = currentDate.getDay();

        const daysByNumber = [
            'sunday',
            'monday',
            'tuesday',
            'wednesday',
            'thursday',
            'friday',
            'saturday'
        ];

        const currentTimes = data.openingDays.find((times: any) => (
            times.day.toLoweCase() === daysByNumber[currentDay]
        ));

        return currentTimes;
    }
);

const getRestaurantTimeReducer = (builder: ActionReducerMapBuilder<ITimer>) => {
    builder
        .addCase(getRestaurantTime.fulfilled, (state, action) => {
            state.openTime = action.payload.opening_hour;
            state.closeTime = action.payload.closing_hour;
            state.timeExists = true;
        })
        .addCase(getRestaurantTime.rejected, (state) => {
           
            state.timeExists = false;
        })

}


export const extraReducersRestaurant = (builder: ActionReducerMapBuilder<ITimer>) => {
    getRestaurantTimeReducer(builder);
}
