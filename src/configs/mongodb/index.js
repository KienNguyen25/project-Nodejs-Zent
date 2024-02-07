// muc tieu tao ket noi tới mongo clound(database)
// note: xử lý bất đồng bộ
// Key: JQFitEI4zoYE4ygL
const mongoose = require('mongoose');

async function connect() {
    try {
        await mongoose.connect(
           'mongodb://localhost:27017/trello-app'
            // {
            //     useNewUrlParser: true,
            //     useUnifiedTopology: true,
            // }
        );
        console.log('Database - Connect successfully !!!');
    } catch (error) {
        console.log('Database - Connect failure!!!');
    }
}

module.exports = {connect};