import Record from '../models/record.model.js';

export const getDashboardSummary = async (req, res) => {
    try {
        
        const totals = await Record.aggregate([
            {
                $group: {
                    _id: "$type",
                    totalAmount: { $sum: "$amount" }
                }
            }
        ]);

        let income = 0;
        let expense = 0;

        totals.forEach(item => {
            if (item._id === 'income') income = item.totalAmount;
            if (item._id === 'expense') expense = item.totalAmount;
        });

        const categoryTotals = await Record.aggregate([
            { $match: { type: 'expense' } }, 
            {
                $group: {
                    _id: "$category",
                    totalSpent: { $sum: "$amount" }
                }
            },
            { $sort: { totalSpent: -1 } } 
        ]);

        const recentActivity = await Record.find()
            .sort({ date: -1 })
            .limit(5)
            .select('amount type category date');

        const monthlyTrends = await Record.aggregate([
            {
                $group: {
                    _id: {
                        month: { $month: "$date" },
                        year: { $year: "$date" }
                    },
                    income: {
                        $sum: { $cond: [{ $eq: ["$type", "income"] }, "$amount", 0] }
                    },
                    expense: {
                        $sum: { $cond: [{ $eq: ["$type", "expense"] }, "$amount", 0] }
                    }
                }
            },
            { $sort: { "_id.year": 1, "_id.month": 1 } }
        ]);

        res.status(200).json({
            success: true,
            data: {
                netBalance: income - expense,
                totalIncome: income,
                totalExpense: expense,
                categoryBreakdown: categoryTotals,
                recentActivity,
                monthlyTrends
            }
        });

    } catch (error) {
        res.status(500).json({ error: 'Failed to generate dashboard summary' });
    }
};