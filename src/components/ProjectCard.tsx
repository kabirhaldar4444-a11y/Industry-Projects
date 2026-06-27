import React from 'react';
import type { ProjectData } from '../types';
import { MapPin, Calendar, DollarSign, Activity } from 'lucide-react';

interface ProjectCardProps {
  project: ProjectData;
  onReadMore: (project: ProjectData) => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, onReadMore }) => {
  return (
    <div className="project-card">
      <div className="card-header">
        <div>
          <h3 className="card-title">{project.Project}</h3>
          <div className="card-country">
            <MapPin size={14} />
            <span>{project.Country}</span>
          </div>
        </div>
        <span className="card-badge">{project.Category || 'Other'}</span>
      </div>
      
      <p className="card-summary" title={project.Summary}>
        {project.Summary || 'No summary available.'}
      </p>
      
      <div className="card-details">
        <div className="detail-item">
          <span className="detail-label">Budget</span>
          <span className="detail-value highlight">
            <DollarSign size={14} />
            {project.Budget || 'N/A'}
          </span>
        </div>
        
        <div className="detail-item">
          <span className="detail-label">Deadline</span>
          <span className="detail-value">
            <Calendar size={14} />
            {project.Deadline || 'N/A'}
          </span>
        </div>
        
        <div className="detail-item">
          <span className="detail-label">Area/Size</span>
          <span className="detail-value">
            <Activity size={14} />
            {project.Area || 'N/A'}
          </span>
        </div>
        
        <div className="detail-item">
          <span className="detail-label">Location</span>
          <span className="detail-value">
            <MapPin size={14} />
            <span className="truncate">{project.Location || 'N/A'}</span>
          </span>
        </div>
      </div>
      
      <button 
        className="btn-read-more" 
        onClick={() => onReadMore(project)}
      >
        Read Full Project
      </button>
    </div>
  );
};
