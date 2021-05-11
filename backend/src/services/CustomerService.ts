import { db, TYPES } from '../database';
import { ICustomer } from '../model/Customer.model';



class CustomerService{

    async getCustomers(){
        try {
            const result = await db.query<ICustomer>('SELECT * FROM Customers;');
            return result.recordset;
        } catch (error) {
            console.warn('Erro no customer service: getCustomer');
            console.error(error);
        }
    }

    async getCustomerById(customerID: string){
        try {
            const tra = db.transaction();
            const transBegin = await tra.begin();
            const requestBd = transBegin.request();
            requestBd.input('customerID', TYPES.NVarChar, customerID);
            const result = await requestBd.query<ICustomer>('SELECT * FROM Customers WHERE CustomerID = @customerID;');
            await transBegin.commit();
            return result.recordset;
        } catch (error) {
            console.warn('Erro no customer service: getCustomer by ID');
            console.error(error);
        }
    }

    async create(customer: ICustomer){
        const {
            CustomerID,
            CompanyName,
            ContactName,
            ContactTitle,
            Address,
            City,
            Region,
            PostalCode,
            Country,
            Phone,
            Fax
        } = customer;
        try {
            const tra = db.transaction();
            const transBegin = await tra.begin();
            const requestBd = transBegin.request();
            requestBd.input('customerID', TYPES.NVarChar, CustomerID);
            requestBd.input('companyName', TYPES.NVarChar, CompanyName);
            requestBd.input('contactName', TYPES.NVarChar, ContactName);
            requestBd.input('contactTitle', TYPES.NVarChar, ContactTitle);
            requestBd.input('address', TYPES.NVarChar, Address);
            requestBd.input('city', TYPES.NVarChar, City);
            requestBd.input('region', TYPES.NVarChar, Region);
            requestBd.input('postalCode', TYPES.NVarChar, PostalCode);
            requestBd.input('country', TYPES.NVarChar, Country);
            requestBd.input('phone', TYPES.NVarChar, Phone);
            requestBd.input('fax', TYPES.NVarChar, Fax);
            const result = await requestBd.query<ICustomer>('INSERT INTO Customers (CustomerID, CompanyName, ContactName, ContactTitle, Address, City, Region, PostalCode, Country, Phone, Fax) VALUES (@customerID, @companyName, @contactName, @contactTitle, @address, @city, @region, @postalCode, @country, @phone, @fax);');
            await transBegin.commit();
            
            return result.rowsAffected;
        } catch (error) {
            console.warn('Erro no customer service: create');
            console.error(error);
        }
    }

    async update(customer: ICustomer){
        const {
            CustomerID,
            CompanyName,
            ContactName,
            ContactTitle,
            Address,
            City,
            Region,
            PostalCode,
            Country,
            Phone,
            Fax
        } = customer;
        try {
            const tra = db.transaction();
            const transBegin = await tra.begin();
            const requestBd = transBegin.request();
            requestBd.input('customerID', TYPES.NVarChar, CustomerID);
            requestBd.input('companyName', TYPES.NVarChar, CompanyName);
            requestBd.input('contactName', TYPES.NVarChar, ContactName);
            requestBd.input('contactTitle', TYPES.NVarChar, ContactTitle);
            requestBd.input('address', TYPES.NVarChar, Address);
            requestBd.input('city', TYPES.NVarChar, City);
            requestBd.input('region', TYPES.NVarChar, Region);
            requestBd.input('postalCode', TYPES.NVarChar, PostalCode);
            requestBd.input('country', TYPES.NVarChar, Country);
            requestBd.input('phone', TYPES.NVarChar, Phone);
            requestBd.input('fax', TYPES.NVarChar, Phone);
            const result = await requestBd.query<ICustomer>('UPDATE Customers SET CompanyName = @companyName, ContactName = @contactName, ContactTitle = @contactName, Address = @address, City = @city, Region = @region, PostalCode = @postalCode, Country = @country, Phone = @phone, Fax = @fax WHERE CustomerID = @customerID;');
            await transBegin.commit();
            
            return result.rowsAffected;
        } catch (error) {
            console.warn('Erro no customer service: update');
            console.error(error);
        }
    }

    async delete(customerId: string){
        try {
            const tra = db.transaction();
            const transBegin = await tra.begin();
            const requestBd = transBegin.request();
            requestBd.input('customerID', TYPES.NVarChar, customerId);
            const result = await requestBd.query<ICustomer>(`DELETE FROM Customers WHERE CustomerID = @customerID`);
            await transBegin.commit();
            
            return result.rowsAffected;
        } catch (error) {
            console.warn('Erro no customer service: delete');
            console.error(error);
        }
    }

}

export { CustomerService };