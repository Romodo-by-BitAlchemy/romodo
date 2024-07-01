//Models/Trip.js
import mongoose from 'mongoose';

const tripSchema = new mongoose.Schema({
 
    status: {
        type: Boolean,
        default: true // Default to scheduled (true)
    }
});

const Trip = mongoose.model('Trip', tripSchema);

export default Trip;


