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
import type { EventFormInputs } from '~/models/analytics-model';
import API_BASE_URL from '~/base-client';

const inputSx = {
  '& .MuiOutlinedInput-root': {
    color: '#e2e8f0',
    '& fieldset': { borderColor: '#334155' },
    '&:hover fieldset': { borderColor: '#10b981' },
    '&.Mui-focused fieldset': { borderColor: '#10b981' },
  },
  '& .MuiInputLabel-root': { color: '#64748b' },
  '& .MuiInputLabel-root.Mui-focused': { color: '#10b981' },
  '& .MuiSelect-icon': { color: '#64748b' },
  '& .MuiFormHelperText-root': { color: '#f87171' },
};

const menuPaperSx = {
  PaperProps: {
    sx: {
      bgcolor: '#1e293b',
      border: '1px solid #334155',
      color: '#e2e8f0',
      '& .MuiMenuItem-root:hover': { bgcolor: '#334155' },
    },
  },
};

const EventFormModal: React.FC<EventFormProps> = ({open, onClose}) => {  
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { control , handleSubmit, formState: { errors }, reset } = useForm<EventFormInputs>({
        defaultValues: {
        timestamp: null,
        userId: '',
        eventType: ''
        }
    });
  
    const handleFormSubmit : SubmitHandler<EventFormInputs> = async (formData) => {      
        setIsSubmitting(true);   
        
        try {
            const response = await fetch(`${API_BASE_URL}/api/analytics`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();
            console.log('Success:', data);            
            handleOnClose();
        } catch (error) {   
            setIsSubmitting(false);          
            console.error('Error:', error);
        }
    };

    const handleOnClose = () =>{
        reset();
        onClose();
        setIsSubmitting(false);
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
        <Dialog
            open={open}
            onClose={() => handleOnClose()}
            fullWidth
            maxWidth="sm"
            PaperProps={{
                sx: {
                    bgcolor: '#0f172a',
                    color: '#e2e8f0',
                    border: '1px solid #334155',
                    borderRadius: '12px',
                }
            }}
        >
            <DialogTitle sx={{ color: '#ffffff', borderBottom: '1px solid #334155' }}>
                Simple Event Form
            </DialogTitle>        
            <DialogContent sx={{ pt: 2 }}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>             
                    <form id="modal-form" onSubmit={handleSubmit(handleFormSubmit)}>
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
                                sx={inputSx}
                                SelectProps={{ MenuProps: menuPaperSx }}
                                >
                                    <MenuItem value="page_view">View Page</MenuItem>
                                    <MenuItem value="page_download">Download Page</MenuItem>
                                    <MenuItem value="page_update">Update Page</MenuItem>
                                    <MenuItem value="page_saved">Save Page</MenuItem>
                                </TextField>
                            )}
                        />

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
                                sx={inputSx}
                                />
                            )}
                        />
                        
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
                                        sx: inputSx,
                                    },
                                    desktopPaper: {
                                        sx: {
                                            bgcolor: '#1e293b',
                                            border: '1px solid #334155',
                                            color: '#e2e8f0',
                                            '& .MuiPickersDay-root': { color: '#e2e8f0' },
                                            '& .MuiPickersDay-root:hover': { bgcolor: '#334155' },
                                            '& .MuiPickersDay-root.Mui-selected': { bgcolor: '#10b981' },
                                            '& .MuiPickersCalendarHeader-label': { color: '#e2e8f0' },
                                            '& .MuiPickersArrowSwitcher-button': { color: '#94a3b8' },
                                            '& .MuiClock-pin': { bgcolor: '#10b981' },
                                            '& .MuiClockPointer-root': { bgcolor: '#10b981' },
                                            '& .MuiClockNumber-root': { color: '#94a3b8' },
                                        }
                                    }
                                }}
                                />
                            )}
                        />                                
                    </form>
                </LocalizationProvider>
            </DialogContent>

            <DialogActions sx={{ borderTop: '1px solid #334155', px: 3, py: 2 }}>
                <Button onClick={() => onClose()} sx={{ color: '#94a3b8', '&:hover': { color: '#e2e8f0' } }}>
                    Cancel
                </Button>
                <Button
                    type="submit"
                    form="modal-form"
                    variant="contained"
                    disabled={isSubmitting}
                    color="success"
                >
                    { isSubmitting ? 'Submitting...' : 'Submit' }
                </Button>
            </DialogActions>
    
        </Dialog>
        </>
    );
};

export default EventFormModal;
