import React, { useState, useEffect } from 'react';
import '../../styles/AddPatientReportModal.css';

interface AddPatientReportModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (reportContent: string, reportDate: string) => void;
}

const AddPatientReportModal: React.FC<AddPatientReportModalProps> = ({ isOpen, onClose, onSave }) => {
    const [reportContent, setReportContent] = useState('');
    const [reportDate, setReportDate] = useState('');

    useEffect(() => {
        if (isOpen) {
            setReportContent('');
            setReportDate('');
        }
    }, [isOpen]);

    const handleSave = () => {
        onSave(reportContent, reportDate);
        setReportContent('');
        setReportDate('');
    };

    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>Adicionar Prontuário</h2>
                <textarea
                    placeholder="Escreva o prontuário..."
                    value={reportContent}
                    onChange={(e) => setReportContent(e.target.value)}
                />
                <input
                    type="date"
                    value={reportDate}
                    onChange={(e) => setReportDate(e.target.value)}
                />
                <div className="modal-actions">
                    <button onClick={handleSave}>Salvar</button>
                    <button onClick={onClose}>Fechar</button>
                </div>
            </div>
        </div>
    );
};

export default AddPatientReportModal;
