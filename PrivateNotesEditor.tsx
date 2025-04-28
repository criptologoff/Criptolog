import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Lock, Save, AlertTriangle, Clock } from 'lucide-react';
import { showToast } from '../utils/toast';

interface PrivateNotesEditorProps {
  onSave?: (title: string, content: string, tags: string[]) => void;
  initialTitle?: string;
  initialContent?: string;
  initialTags?: string[];
}

export const PrivateNotesEditor: React.FC<PrivateNotesEditorProps> = ({
  onSave,
  initialTitle = '',
  initialContent = '',
  initialTags = [],
}) => {
  const { t } = useTranslation();
  const [title, setTitle] = useState(initialTitle);
  const [content, setContent] = useState(initialContent);
  const [tags, setTags] = useState<string[]>(initialTags);
  const [newTag, setNewTag] = useState('');
  const [draftSaved, setDraftSaved] = useState(false);
  const [idleTime, setIdleTime] = useState(0);
  
  // Auto-save draft after 2 seconds of inactivity
  useEffect(() => {
    const interval = setInterval(() => {
      if (title || content) {
        setIdleTime(prev => prev + 1);
        if (idleTime >= 2) {
          saveDraft();
          setIdleTime(0);
        }
      }
    }, 1000);
    
    return () => clearInterval(interval);
  }, [title, content, idleTime]);
  
  // Reset idle timer when user types
  useEffect(() => {
    setIdleTime(0);
    setDraftSaved(false);
  }, [title, content]);
  
  const saveDraft = () => {
    // In a real application, save to localStorage or IndexedDB
    localStorage.setItem('notesDraft', JSON.stringify({ title, content, tags }));
    setDraftSaved(true);
  };
  
  const handleSave = () => {
    if (!title.trim()) {
      showToast(t('privateNotes.needTitle'), 'warning');
      return;
    }
    
    if (onSave) {
      onSave(title, content, tags);
    }
    
    // Clear the draft
    localStorage.removeItem('notesDraft');
    showToast(t('privateNotes.saved'), 'success');
  };
  
  const addTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      setTags([...tags, newTag.trim()]);
      setNewTag('');
    }
  };
  
  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };
  
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addTag();
    }
  };
  
  return (
    <div className="max-w-4xl mx-auto bg-gray-800 rounded-lg shadow-xl p-6 border border-gray-700">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center">
            <Lock className="w-5 h-5 text-blue-400" />
          </div>
          <h2 className="text-xl font-bold text-white">{t('privateNotes.title')}</h2>
        </div>
        
        <div className="flex items-center space-x-2 text-xs text-gray-400">
          {draftSaved ? (
            <>
              <div className="w-2 h-2 rounded-full bg-green-400"></div>
              <span>{t('privateNotes.draftSaved')}</span>
            </>
          ) : (
            <>
              <Clock className="w-4 h-4" />
              <span>{t('privateNotes.unsaved')}</span>
            </>
          )}
        </div>
      </div>
      
      <div className="mb-6">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder={t('privateNotes.titlePlaceholder')}
          className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
        />
        
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder={t('privateNotes.contentPlaceholder')}
          className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[200px]"
          rows={10}
        ></textarea>
      </div>
      
      <div className="mb-6">
        <label className="block text-gray-200 font-medium mb-2">{t('privateNotes.tags')}</label>
        <div className="flex flex-wrap gap-2 mb-3">
          {tags.map(tag => (
            <span 
              key={tag} 
              className="px-3 py-1 bg-blue-600/30 text-blue-300 rounded-full text-sm flex items-center"
            >
              {tag}
              <button 
                onClick={() => removeTag(tag)} 
                className="ml-2 text-blue-300 hover:text-blue-100"
              >
                &times;
              </button>
            </span>
          ))}
        </div>
        
        <div className="flex">
          <input
            type="text"
            value={newTag}
            onChange={(e) => setNewTag(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={t('privateNotes.addTag')}
            className="flex-1 px-4 py-2 bg-gray-700 border border-gray-600 rounded-l-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button 
            onClick={addTag}
            className="bg-blue-600 hover:bg-blue-500 text-white px-4 rounded-r-lg transition-colors"
          >
            {t('add')}
          </button>
        </div>
      </div>
      
      <div className="flex items-start space-x-3 p-4 rounded-lg bg-blue-500/10 border border-blue-500/20 mb-6">
        <AlertTriangle className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
        <p className="text-sm text-gray-300">{t('privateNotes.encryptionNote')}</p>
      </div>
      
      <div className="flex justify-end">
        <button
          onClick={handleSave}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition-colors flex items-center"
        >
          <Save className="w-5 h-5 mr-2" />
          {t('save')}
        </button>
      </div>
    </div>
  );
};