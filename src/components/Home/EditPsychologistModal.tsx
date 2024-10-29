import React, { useEffect, useState } from 'react';
import '../../styles/EditPsychologistModal.css';
import TextInputMask from '../textInputMask/textInputMask';
import AuthService from '../../services/AuthService';
import { toast } from 'react-toastify';

interface EditPsychologistModalProps {
  onClose: () => void;
}

const EditPsychologistModal: React.FC<EditPsychologistModalProps> = ({ onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    cpf: '',
  });

  useEffect(() => {
    const fetchPsychologistData = async () => {
      try {
        const data = await AuthService.getPsychologistDetails();
        
        if (data) {
          setFormData({
            name: data.name || '',
            cpf: data.cpf || '',
          });
        } else {
          console.error('No data returned from API');
        }
      } catch (error) {
        console.error('Erro ao buscar os dados do psicólogo:', error);
      }
    };

    fetchPsychologistData();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const sanitizedData = {
        ...formData,
        cpf: formData.cpf.replace(/[.\-/]/g, ''),
      };

      await AuthService.updatePsychologist(sanitizedData);
      toast.success('Psicólogo atualizado com sucesso!');
      onClose();
    } catch (error) {
      console.error("Update error:", error);
      toast.error('Erro ao atualizar o psicólogo');
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Editar Psicólogo</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Nome"
            value={formData.name}
            onChange={handleInputChange}
            required
          />

          <TextInputMask
            key={formData.cpf}
            placeholder="CPF: "
            maskType="cpf"
            name="cpf"
            onChange={handleInputChange}
            value={formData.cpf}
          />

          <button type="submit" className="submit-button">Salvar</button>
          <button type="button" className="close-button" onClick={onClose}>Cancelar</button>
        </form>
      </div>
    </div>
  );
};

export default EditPsychologistModal;
