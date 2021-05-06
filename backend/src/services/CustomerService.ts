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

    async create(customer: ICustomer){
        const {
            customerID,
            companyName,
            contactName,
            contactTitle,
            address,
            city,
            region,
            postalCode,
            country,
            phone,
            fax
        } = customer;
        try {
            const tra = db.transaction();
            const transBegin = await tra.begin();
            const requestBd = transBegin.request();
            requestBd.input('customerID', TYPES.NVarChar, customerID);
            requestBd.input('companyName', TYPES.NVarChar, companyName);
            requestBd.input('contactName', TYPES.NVarChar, contactName);
            requestBd.input('contactTitle', TYPES.NVarChar, contactTitle);
            requestBd.input('address', TYPES.NVarChar, address);
            requestBd.input('city', TYPES.NVarChar, city);
            requestBd.input('region', TYPES.NVarChar, region);
            requestBd.input('postalCode', TYPES.NVarChar, postalCode);
            requestBd.input('country', TYPES.NVarChar, country);
            requestBd.input('phone', TYPES.NVarChar, phone);
            requestBd.input('fax', TYPES.NVarChar, fax);
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
            customerID,
            companyName,
            contactName,
            contactTitle,
            address,
            city,
            region,
            postalCode,
            country,
            phone,
            fax
        } = customer;
        try {
            const tra = db.transaction();
            const transBegin = await tra.begin();
            const requestBd = transBegin.request();
            requestBd.input('customerID', TYPES.NVarChar, customerID);
            requestBd.input('companyName', TYPES.NVarChar, companyName);
            requestBd.input('contactName', TYPES.NVarChar, contactName);
            requestBd.input('contactTitle', TYPES.NVarChar, contactTitle);
            requestBd.input('address', TYPES.NVarChar, address);
            requestBd.input('city', TYPES.NVarChar, city);
            requestBd.input('region', TYPES.NVarChar, region);
            requestBd.input('postalCode', TYPES.NVarChar, postalCode);
            requestBd.input('country', TYPES.NVarChar, country);
            requestBd.input('phone', TYPES.NVarChar, phone);
            requestBd.input('fax', TYPES.NVarChar, fax);
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