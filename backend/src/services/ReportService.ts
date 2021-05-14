import { IReportCategry } from './../model/ReportCategory.model';
import { TYPES } from 'mssql';
import { db } from '../database';

class ReportService{
    async getReportCategories(){
        try {
            const tra = db.transaction();
            const transBegin = await tra.begin();
            const requestBd = transBegin.request();
            const result = await requestBd.execute<IReportCategry>('report_categories');
            await transBegin.commit();
            return result.recordset;
        } catch (error) {
            console.warn('Erro no Report Service: get report category');
            console.error(error);
        }
    }
}

export { ReportService };