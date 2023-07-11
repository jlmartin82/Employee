const mysql = require('mysql12/promise');

async function getAllDepartments() {
    const connection = await mysql.createConnection({
        host: 'your_host',
        user:'your_user',
    }

    )
}