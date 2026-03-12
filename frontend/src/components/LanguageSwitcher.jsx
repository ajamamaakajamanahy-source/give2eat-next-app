import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Globe } from 'lucide-react';

const LanguageSwitcher = () => {
  const { language, toggleLanguage, t } = useLanguage();

  return (
    <Button
      variant="ghost"
      onClick={toggleLanguage}
      className="flex items-center gap-2 text-sm hover:bg-white/5 rounded-full px-4 py-2 transition-all duration-300 group"
      title={language === 'en' ? 'Switch to Malayalam' : 'Switch to English'}
    >
      <Globe 
        size={16} 
        className="text-green-400 group-hover:rotate-12 transition-transform duration-300" 
      />
      <span className="font-medium text-white/80 group-hover:text-white transition-colors">
        {t('nav.language')}
      </span>
    </Button>
  );
};

export default LanguageSwitcher;
