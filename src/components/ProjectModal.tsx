import React from 'react';
import type { ProjectData } from '../types';
import { X, MapPin, Calendar, DollarSign, Activity, Tag } from 'lucide-react';

interface ProjectModalProps {
  project: ProjectData | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  if (!project) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content glass-panel" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose} aria-label="Close modal">
          <X size={24} />
        </button>
        
        <div className="modal-header">
          <div className="card-badge mb-2 inline-block">
            {project.Category || 'Other'}
          </div>
          <h2 className="modal-title">{project.Project}</h2>
          <div className="modal-country">
            <MapPin size={16} />
            <span>{project.Country}</span>
          </div>
        </div>
        
        <div className="modal-body">
          <div className="modal-section">
            <h4 className="section-title">Project Summary</h4>
            <p className="modal-description">{project.Summary || 'No summary available.'}</p>
          </div>
          
          <div className="modal-grid">
            <div className="detail-item glass-item">
              <span className="detail-label">Budget</span>
              <span className="detail-value highlight">
                <DollarSign size={18} />
                {project.Budget || 'N/A'}
              </span>
            </div>
            
            <div className="detail-item glass-item">
              <span className="detail-label">Deadline</span>
              <span className="detail-value">
                <Calendar size={18} />
                {project.Deadline || 'N/A'}
              </span>
            </div>
            
            <div className="detail-item glass-item">
              <span className="detail-label">Area/Size</span>
              <span className="detail-value">
                <Activity size={18} />
                {project.Area || 'N/A'}
              </span>
            </div>
            
            <div className="detail-item glass-item">
              <span className="detail-label">Location</span>
              <span className="detail-value">
                <MapPin size={18} />
                <span>{project.Location || 'N/A'}</span>
              </span>
            </div>
            
            <div className="detail-item glass-item">
              <span className="detail-label">Category</span>
              <span className="detail-value">
                <Tag size={18} />
                <span>{project.Category || 'N/A'}</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
