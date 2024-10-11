const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// Define the schema for the User model
const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        trim: true
    },
    lastName: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/.+@.+\..+/, 'Please enter a valid email address'],
        trim: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
    },
    img: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
});

// Hash the password before saving the user to the database
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

// Method to compare entered password with the hashed password in the database
userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model('User', userSchema);

// Function to create a new user
async function createUser(userData) {
    try {
        const user = new User(userData);
        await user.validate(); // This will run the validation without saving
        return await user.save();
    } catch (error) {
        console.error('User validation failed:', error.message);
        throw error;
    }
}

// Example usage
const userData = {
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    password: 'securePassword123',
    img: 'path/to/image.jpg'
};

createUser(userData)
    .then(user => console.log('User created successfully:', user))
    .catch(error => console.error('Error:', error.message));

module.exports = User;