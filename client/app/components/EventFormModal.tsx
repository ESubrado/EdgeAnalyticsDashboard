import React, { useState } from 'react';

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  MenuItem
} from '@mui/material';
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { useForm, Controller } from 'react-hook-form';
import type { SubmitHandler } from 'react-hook-form';
import type { EventFormProps } from '~/models/analytics-model';

import API_BASE_URL from '~/base-client';

type EventFormInputs = {
  userId: string;
  eventType: string;
  timestamp: Date | null;
};

const EventFormModal: React.FC<EventFormProps> = ({open, onClose}) => {  
    const { control , handleSubmit, formState: { errors }, reset } = useForm<EventFormInputs>({
        defaultValues: {
        timestamp: null,
        userId: '',
        eventType: ''
        }
    });
  
    const handleFormSubmit : SubmitHandler<EventFormInputs> = async (formData) => { 

        try {
            const response = await fetch(`${API_BASE_URL}/analytics`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json', // or 'multipart/form-data' for file uploads
                },
                body: JSON.stringify(formData), // Convert data to JSON string
            });

            const data = await response.json();
            console.log('Success:', data);

        } catch (error) {

            console.error('Error:', error);

        } finally {            
            handleOnClose();
            
            setTimeout(()=>{ // temporary reload, to be removed when implementing socket IO
                 window.location.reload(); 
            }, 1000)           
        }  
    };

    const handleOnClose = () =>{
        reset(); // reset form after submit
        onClose(); // close modal
    }

    const filterCharacters = (e : any) => {
        const key = e.key
        const regex = /^[a-zA-Z0-9 ]$/;
        if (
            key === "Backspace" ||
            key === "Tab" ||
            key === "ArrowLeft" ||
            key === "ArrowRight" ||
            key === "Delete"
        ) {
            return;
        }
        if (!regex.test(key)) {
            e.preventDefault();
        }
    }

    return (
        <>   
        <Dialog open={open} onClose={() => handleOnClose()} fullWidth maxWidth="sm">
            <DialogTitle>Simple Event Form</DialogTitle>        
            <DialogContent>
                <LocalizationProvider dateAdapter={AdapterDateFns}>             
                    <form id="modal-form" onSubmit={handleSubmit(handleFormSubmit)}>
                        {/* Event Type Field */}
                        <Controller
                            name="eventType"
                            control={control}
                            defaultValue=""
                            rules={{ required: "Please select an Event Type" }}
                            render={({ field }) => (
                                <TextField
                                {...field}
                                select
                                label="Select Event Type"
                                fullWidth
                                margin="normal"
                                error={!!errors.eventType}
                                helperText={errors.eventType?.message}
                                >
                                    <MenuItem value="page_view">View Page</MenuItem>
                                    <MenuItem value="page_download">Download Page</MenuItem>
                                    <MenuItem value="page_update">Update Page</MenuItem>
                                </TextField>
                            )}
                        />


                        {/* Name Field */}
                        <Controller
                            name="userId"
                            control={control}
                            defaultValue=""
                            rules={{ required: "User ID is required" }}
                            render={({ field }) => (
                                <TextField
                                {...field}
                                label="User ID"
                                fullWidth
                                margin="normal"
                                slotProps={{htmlInput: {maxLength: 10}}}
                                error={!!errors.userId}
                                helperText={errors.userId?.message}
                                onKeyDown={filterCharacters}
                                />
                            )}
                        />
                        
                        {/* Date Picker */}
                        <Controller
                            name="timestamp"
                            control={control}
                            rules={{ required: "Date is required" }}
                            render={({ field }) => (
                                <DateTimePicker
                                label="Select Date"
                                value={field.value}                                
                                onChange={(date) => field.onChange(date)}
                                maxDateTime={new Date()}
                                slotProps={{
                                    textField: {
                                    fullWidth: true,
                                    margin: "normal",
                                    error: !!errors.timestamp,
                                    helperText: errors.timestamp?.message,
                                    },
                                }}
                                />
                            )}
                        />                                
                    </form>
                </LocalizationProvider>
            </DialogContent>

            <DialogActions>
                <Button onClick={() => onClose()}>Cancel</Button>
                <Button type="submit" form="modal-form" variant="contained">Submit</Button>
            </DialogActions>
    
        </Dialog>
        </>
    );
};

export default EventFormModal;
