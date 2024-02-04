const Users = require('../models/users.js');

// Get all users or users with pagination
exports.getUsers = async (req, res, next) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const pageSize = parseInt(req.query.pageSize) || 10;
        
        if (page && pageSize) {
            const users = await Users.find({})
                .skip((page - 1) * pageSize)
                .limit(pageSize);
            
            return res.send(users);
        } else {
            const users = await Users.find({});
            return res.send(users);
        }
    } catch (error) {
        next(error);
    }
};


// Get all users or users with pagination using aggregation (Ex: 1)
exports.getUsers = async (req, res, next) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const pageSize = parseInt(req.query.pageSize) || 10;

        const pipeline = [];

        // Optional match criteria for filtering
        // For example, to filter users by a specific field: 
        // pipeline.push({ $match: { fieldName: filterValue } });

        // Pagination
        pipeline.push({ $skip: (page - 1) * pageSize });
        pipeline.push({ $limit: pageSize });

        const users = await Users.aggregate(pipeline);

        res.send(users);
    } catch (error) {
        next(error);
    }
};

// Get all users or users with pagination using aggregation (Ex: 2)
exports.getUsers = async (req, res, next) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const pageSize = parseInt(req.query.pageSize) || 10;

        const users = await Users.aggregate([
            {
                $facet: {
                    metadata: [{ $count: 'totalCount' }],
                    data: [
                        { $skip: (page - 1) * pageSize },
                        { $limit: pageSize },
                    ],
                },
            },
        ]);

        res.status(200).json({
            success: true,
            users: {
                metadata: { totalCount: users[0].metadata[0].totalCount, page, pageSize },
                data: users[0].data,
            },
        });
    } catch (error) {
        next(error);
    }
};

// Get user by ID
exports.getUserById = async (req, res, next) => {
    try {
        const user = await Users.findOne({ _id: req.params.id });
        res.send(user);
    } catch (error) {
        next(error);
    }
};

// Create a new user
exports.createUser = async (req, res, next) => {
    try {
        const newUser = await Users.create(req.body);
        res.send(newUser);
    } catch (error) {
        next(error);
    }
};

// Update user by ID
exports.updateUserById = async (req, res, next) => {
    try {
        const updatedUser = await Users.findOneAndUpdate(
            { _id: req.params.id },
            req.body,
            { new: true }
        );
        res.send(updatedUser);
    } catch (error) {
        next(error);
    }
};

// Delete user by ID
exports.deleteUserById = async (req, res, next) => {
    try {
        const deletedUser = await Users.findOneAndDelete({ _id: req.params.id });
        
        if (!deletedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.send(deletedUser);
    } catch (error) {
        next(error);
    }
};
