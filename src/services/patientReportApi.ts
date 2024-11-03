import api from '../api/api';

const API_BASE_URL = '/reports';

export const createReport = async (patientId: number, reportContent: string, reportDate: string) => {
    return api.post(API_BASE_URL, {
        patient_id: patientId,
        report_content: reportContent,
        report_date: reportDate,
    });
};

export const deleteReport = async (reportId: number) => {
    return api.delete(`${API_BASE_URL}/${reportId}`);
};

export const getReportsByPatient = async (patientId: number) => {
    return api.get(`${API_BASE_URL}/patient/${patientId}`);
};
