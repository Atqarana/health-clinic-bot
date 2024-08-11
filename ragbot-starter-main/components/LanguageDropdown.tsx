import { useState } from 'react';

interface LanguageDropdownProps {
  onChange: (language: string) => void;
}

const languages = [
  { code: 'en', name: 'English' },
  { code: 'es', name: 'Spanish' },
  { code: 'fr', name: 'French' },
  // Add more languages as needed
];

export default function LanguageDropdown({ onChange }: LanguageDropdownProps) {
  const [selectedLanguage, setSelectedLanguage] = useState(languages[0].code);

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const language = event.target.value;
    setSelectedLanguage(language);
    onChange(language);
  };

  return (
    <div className='relative inline-block'>
      <select
        value={selectedLanguage}
        onChange={handleChange}
        className='bg-white border border-gray-300 rounded-lg p-2 shadow-md'
      >
        {languages.map((lang) => (
          <option key={lang.code} value={lang.code}>
            {lang.name}
          </option>
        ))}
      </select>
    </div>
  );
}
