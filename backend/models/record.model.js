import mongoose from 'mongoose';

const recordSchema = new mongoose.Schema(
  {
    amount: {
        type: Number,
        required: true,
        min: [0, 'Amount cannot be negative']
    },
    type: {
        type: String,
        enum: ['income', 'expense'],
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },
    description: {
        type: String,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    }
  }, 
  { timestamps: true }
);

const Record = mongoose.model('Record', recordSchema);
export default Record;