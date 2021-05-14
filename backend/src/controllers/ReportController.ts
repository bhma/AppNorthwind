import { Request, Response } from 'express';
import { ReportService } from '../services/ReportService';

class ReportController{

    async getReportCategories(req: Request, res: Response){
        try {
            const reportService = new ReportService();
            const reportCategories = await reportService.getReportCategories();
            res.json(reportCategories);
        } catch (error) {
            console.warn('Erro no Report Controller: get report category');
            console.error(error);
            res.json(error);
        }
    }
}

export { ReportController };