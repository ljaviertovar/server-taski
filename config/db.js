const mongoose = require('mongoose');
require('dotenv').config({ path: '.env' });
const ora = require('ora');



const connectDB = async () => {

    const spinner = ora('Connecting DB ...').start();

    try {
        await mongoose.connect(process.env.DB_MONGO, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false
        })

        console.log('DB connected!');

    } catch (err) {
        console.error(err);
        process.exit(1); //stop app
    }

    spinner.stop();

}

module.exports = connectDB;