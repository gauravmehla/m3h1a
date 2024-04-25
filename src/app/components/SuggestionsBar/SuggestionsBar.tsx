import "@/app/components/SuggestionsBar/Suggestionsbar.css";

interface SuggestionsBarProps {
  suggestions: string[];
}

interface SuggestionsBarProps {
  suggestions: string[];
  handleSuggestionClick: (suggestion: string) => void;
}

const SuggestionsBar: React.FC<SuggestionsBarProps> = ({
  suggestions,
  handleSuggestionClick,
}) => {
  return (
    <div className="suggestions-container">
      {suggestions.map((suggestion, index) => (
        <div
          key={index}
          className="suggestion"
          onClick={() => handleSuggestionClick(suggestion)}
        >
          {suggestion}
        </div>
      ))}
    </div>
  );
};

export default SuggestionsBar;
