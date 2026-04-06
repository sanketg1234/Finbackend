import Record from '../models/record.model.js';


export const createRecord = async (req, res) => {
    try {
        const { amount, type, category, description, date } = req.body;

        const record = await Record.create({
            amount,
            type,
            category,
            description,
            date: date || Date.now(),
            user: req.user._id
        });

        res.status(201).json({ success: true, data: record });
    } catch (error) {
        res.status(500).json({ error: 'Failed to create record', details: error.message });
    }
};

export const getRecords = async (req, res) => {
    try {
        const filter = {};
        if (req.query.type) filter.type = req.query.type;
        if (req.query.category) filter.category = req.query.category;

        const records = await Record.find(filter).sort({ date: -1 });

        res.status(200).json({ success: true, count: records.length, data: records });
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch records' });
    }
};


export const updateRecord = async (req, res) => {
    try {
        const record = await Record.findByIdAndUpdate(req.params.id, req.body, {
            new: true,           
            runValidators: true  ,
            returnDocument: 'after'
        });

        if (!record) {
            return res.status(404).json({ error: 'Record not found' });
        }

        res.status(200).json({ success: true, data: record });
    } catch (error) {
        res.status(500).json({ error: 'Failed to update record' });
    }
};


export const deleteRecord = async (req, res) => {
    try {
        const record = await Record.findByIdAndDelete(req.params.id);

        if (!record) {
            return res.status(404).json({ error: 'Record not found' });
        }

        res.status(200).json({ success: true, message: 'Record deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete record' });
    }
};