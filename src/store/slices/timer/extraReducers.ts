import { createAsyncThunk, ActionReducerMapBuilder } from '@reduxjs/toolkit';
import { ITimer } from './reducer';

/* 
-This code exports a Thunk, 'getRestaurantTime'
-Thunk is used to fetch the opening and closing hours of a restaurant
 */
export const getRestaurantTime = createAsyncThunk(
    'timer/getRestaurantTime',
    async (id: number) => {

        const res = await fetch(`http://localhost:3010/restaurant/hours/${id}`);
        const data = await res.json();
        const restData = await data.restaurant;
        const openingDays = await restData.OpeningDays;

        /* array is an array of strings that maps the numbers returned 
        by getDay to their corresponding day of the week names. */
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

        /*  array to find an object that has a property day equal
         to the current day of the week */
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

// reducer function named 'getRestaurantTimeReducer'
const getRestaurantTimeReducer =
    (builder: ActionReducerMapBuilder<ITimer>) => {
        builder
            .addCase(getRestaurantTime.pending, (state, action) => {
            })
            /* The corresponding function takes the current state and 
            the action as arguments, and updates the state with the values in
            the payload property of the action.  */
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

    //used as an argument for the createSlice
export const extraReducersRestaurant =
    (builder: ActionReducerMapBuilder<ITimer>) => {
        getRestaurantTimeReducer(builder);
    }

