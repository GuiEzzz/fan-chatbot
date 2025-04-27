// components/Suggestions.js

export default function Suggestions() {
    // Lista estática de sugestões
    const suggestions = [
      "Ativar/Desativar Modo Torcida",
      "Quem são os jogadores da FURIA?",
      "Quando é o próximo campeonato?",
      "Como está a FURIA no campeonato?",
      "Quais são as conquistas recentes da FURIA?",
      "Você pode me dizer a história da FURIA?"
    ];
  
    return (
      <div className="w-72 bg-[#222] p-4 rounded-lg shadow-md">
        <h2 className="text-lg font-semibold text-white mb-4">Sugestões de Perguntas</h2>
        <ul className="list-inside list-disc space-y-2">
          {suggestions.map((suggestion, index) => (
            <li key={index} className="text-white">
              {suggestion}
            </li>
          ))}
        </ul>
      </div>
    );
  }
  