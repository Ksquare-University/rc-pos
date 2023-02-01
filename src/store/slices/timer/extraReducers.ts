import { createAsyncThunk, ActionReducerMapBuilder } from '@reduxjs/toolkit';
import { ITimer } from './reducer';

export const getRestaurantTime = createAsyncThunk(
    'timer/getRestaurantTime',
    async (id: number) => {

        const res = await fetch(`http://localhost:3010/restaurant/hours/${id}`);
        const data = await res.json();
        const restData = await data.restaurant;
        const openingDays = await restData.OpeningDays;

        const currentDate = new Date();
        const currentDay = currentDate.getDay();
        const daysByNumber = [
            'Monday',
            'Tuesday',
            'Wednesday',
            'Thursday',
            'Friday',
            'Saturday',
            'Sunday',
        ];

        const currentDayData = openingDays.find((day: { day: string; }) => (
            day.day === daysByNumber[currentDay]
        ));

        const currentTimes = {
            opening_hour: currentDayData.opening_hour,
            closing_hour: currentDayData.closing_hour,
        };

        console.log("currentTimes-2", currentTimes);

        return currentTimes
    }
);

const getRestaurantTimeReducer = (builder: ActionReducerMapBuilder<ITimer>) => {
    builder

        .addCase(getRestaurantTime.pending, (state, action) => {

        })
        .addCase(getRestaurantTime.fulfilled, (state, { payload }) => {
            const { opening_hour, closing_hour } = payload;
            state.openTime = opening_hour;
            state.closeTime = closing_hour;
            state.timeExists = true;
        })
        .addCase(getRestaurantTime.rejected, (state) => {
            state.timeExists = false;
        })

}

export const extraReducersRestaurant = (builder: ActionReducerMapBuilder<ITimer>) => {
    getRestaurantTimeReducer(builder);
}

