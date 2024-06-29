const mysql = require('mysql2/promise');
const crypto = require('crypto');

// Database connection
const dbConfig = {
    host: 'localhost',
    user: 'root',
    password: 'root1234',
    database: 'workshop_0628'
};

const generateSalt = (length = 16) => {
    return crypto.randomBytes(length).toString("hex");
};

const hashPassword = (password, salt) => {
    return crypto.createHash('sha256').update(password + salt).digest('hex');
};

const dummyData = async () => {
    const connection = await mysql.createConnection(dbConfig);

    // Dummy Auth data
    const authData = [
        { email: 'user1@example.com', password: 'password1' },
        { email: 'user2@example.com', password: 'password2' },
        { email: 'user3@example.com', password: 'password3' }
    ];

    const authIds = [];
    for (let auth of authData) {
        const salt = generateSalt();
        const hashedPassword = hashPassword(auth.password, salt);
        const [result] = await connection.execute(
            'INSERT INTO Auth (email, password) VALUES (?, ?)',
            [auth.email, hashedPassword]
        );
        const authId = result.insertId;
        authIds.push(authId);
        await connection.execute(
            'INSERT INTO AuthSalt (auth_id) VALUES (?)',
            [authId]
        );
    }

    // Dummy Users data
    const usersData = [
        { auth_id: authIds[0], name: 'John Doe', id_number: '1234567890123', phone: '01012345678', address: '123 Main St' },
        { auth_id: authIds[1], name: 'Jane Smith', id_number: '2345678901234', phone: '01023456789', address: '456 Oak St' },
        { auth_id: authIds[2], name: 'Alice Johnson', id_number: '3456789012345', phone: '01034567890', address: '789 Pine St' }
    ];

    const userIds = [];
    for (let user of usersData) {
        const [result] = await connection.execute(
            'INSERT INTO Users (auth_id, name, id_number, phone, address) VALUES (?, ?, ?, ?, ?)',
            [user.auth_id, user.name, user.id_number, user.phone, user.address]
        );
        userIds.push(result.insertId);
    }

    // Dummy Accounts data
    const accountsData = [
        { user_id: userIds[0], account_number: '1234567890', balance: 1000.00 },
        { user_id: userIds[1], account_number: '2345678901', balance: 2000.00 },
        { user_id: userIds[2], account_number: '3456789012', balance: 3000.00 }
    ];

    for (let account of accountsData) {
        await connection.execute(
            'INSERT INTO Accounts (user_id, account_number, balance) VALUES (?, ?, ?)',
            [account.user_id, account.account_number, account.balance]
        );
    }

    console.log('Dummy data inserted successfully.');
    await connection.end();
};

dummyData().catch(err => console.error(err));

