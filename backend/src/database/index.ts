import { ConnectionPool, TYPES } from 'mssql';

const db = new ConnectionPool('mssql://sa:root12@localhost/Northwind');

try {
    if(!db.connected){
        db.connect((err) => {
            if(!err){
                console.log('Database connected!');
            }else{
                console.error(err);
            }
        });
    }
} catch (error) {
    console.warn('Erro no database.');
    console.error(error);    
}

export { db, TYPES };