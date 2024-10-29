import api from '../api/api';

const getToken = () => {
  return localStorage.getItem('token');
};

const ReportService = {
  generateMedicalLeave: async (reportData: any) => {
    const token = getToken();
    const response = await api.post(`/relatorio/atestado`, reportData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      responseType: 'blob',
    });

    const pdfBlob = new Blob([response.data], { type: 'application/pdf' });
    const downloadUrl = window.URL.createObjectURL(pdfBlob);
    const link = document.createElement('a');
    link.href = downloadUrl;
    link.download = 'atestado.pdf';
    link.click();
    window.URL.revokeObjectURL(downloadUrl);
  },
};

export default ReportService;
