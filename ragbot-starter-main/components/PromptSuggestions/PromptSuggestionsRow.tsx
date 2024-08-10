import PromptSuggestionButton from "./PromptSuggestionButton";

const PromptSuggestionRow = ({ onPromptClick }) => {
  const prompts = [
    '🌟 Get Started',
    '📞 Contact Us',
    '❓ FAQs and General Help',
  ];

  return (
    <div className="flex flex-row flex-wrap justify-start items-center py-4 gap-2">
      {prompts.map((prompt, index) => (
        <PromptSuggestionButton key={`suggestion-${index}`} text={prompt} onClick={() => onPromptClick(prompt)} />
      ))}
    </div>
  );
};

export default PromptSuggestionRow;
