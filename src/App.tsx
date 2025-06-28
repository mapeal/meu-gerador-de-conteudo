import { useState, useCallback } from 'react';

// --- Ícones em SVG ---
const TitleIcon = () => ( <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-teal-400"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.7-3.7a1 1 0 0 0-1.4-1.4l-1.6 1.6a1 1 0 0 0 0 1.4l-1.6 1.6a1 1 0 0 0-1.4 0zM9.3 17.7a1 1 0 0 0 0-1.4l-1.6-1.6a1 1 0 0 0-1.4 0L2.3 18.7a1 1 0 0 0 1.4 1.4l1.6-1.6a1 1 0 0 0 0-1.4l1.6-1.6a1 1 0 0 0 1.4 0z" /><path d="m21.3 5.7-9-9a1 1 0 0 0-1.4 0l-9 9a1 1 0 0 0 0 1.4l9 9a1 1 0 0 0 1.4 0l9-9a1 1 0 0 0 0-1.4z" /></svg> );
const DescriptionIcon = () => ( <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-sky-400"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" /><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" /></svg> );
const HashtagIcon = () => ( <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-indigo-400"><line x1="4" y1="9" x2="20" y2="9" /><line x1="4" y1="15" x2="20" y2="15" /><line x1="10" y1="3" x2="8" y2="21" /><line x1="16" y1="3" x2="14" y2="21" /></svg> );
const IdeaIcon = () => ( <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-amber-400"><path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" /><path d="M10.88 10.88a3 3 0 1 1 4.24 4.24" /><path d="M12 2a7 7 0 0 0-7 7c0 2 1 4 3 5.5s4 2.5 4 2.5" /><path d="M12 22a7 7 0 0 1 7-7c0-2-1-4-3-5.5S12 7 12 7" /></svg> );

// --- Componente de Botão de Copiar ---
const CopyButton = ({ textToCopy }: { textToCopy: string }) => {
    const [copyText, setCopyText] = useState('Copiar');
    const handleCopy = () => {
        const textArea = document.createElement('textarea');
        textArea.value = textToCopy;
        textArea.style.position = 'fixed';
        textArea.style.opacity = '0';
        document.body.appendChild(textArea);
        textArea.select();
        try {
            document.execCommand('copy');
            setCopyText('Copiado!');
        } catch (err) {
            console.error('Falha ao copiar texto: ', err);
            setCopyText('Erro!');
        }
        document.body.removeChild(textArea);
        setTimeout(() => setCopyText('Copiar'), 2000);
    };
    return ( <button onClick={handleCopy} className={`px-3 py-1 text-sm rounded-md transition-all duration-200 ${ copyText === 'Copiado!' ? 'bg-green-600 text-white' : 'bg-gray-600 hover:bg-gray-500 text-gray-200' }`} > {copyText} </button> );
};

// --- Componente de Exibição dos Resultados ---
const ResultsDisplay = ({ generatedContent }: { generatedContent: any }) => {
    if (!generatedContent) return null;

    const { titles, description, hashtags, thumbnail, script } = generatedContent;

    return (
        <div className="w-full mt-8 space-y-6 animate-fade-in">
            {/* Variações de Título */}
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg p-4 shadow-lg">
                <div className="flex items-center space-x-2 mb-3"><TitleIcon /><h2 className="text-xl font-semibold text-teal-300">Variações de Título ✨</h2></div>
                <div className="space-y-3">
                    {titles.map((title: string, index: number) => (
                        <div key={index} className="flex justify-between items-center bg-gray-900/50 p-3 rounded-md">
                            <p className="text-gray-200 text-md leading-relaxed"><strong>{index + 1}.</strong> {title}</p>
                            <CopyButton textToCopy={title} />
                        </div>
                    ))}
                </div>
            </div>
            
            {/* Ideia de Miniatura (Thumbnail) */}
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg p-4 shadow-lg">
                 <div className="flex justify-between items-center mb-3">
                    <div className="flex items-center space-x-2"><IdeaIcon /><h2 className="text-xl font-semibold text-amber-300">Ideia para Miniatura (Thumbnail) 🖼️</h2></div>
                    <CopyButton textToCopy={thumbnail} />
                </div>
                <p className="text-gray-300 whitespace-pre-line leading-relaxed">{thumbnail}</p>
            </div>

            {/* Sugestão de Roteiro */}
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg p-4 shadow-lg">
                 <div className="flex justify-between items-center mb-3">
                    <div className="flex items-center space-x-2"><DescriptionIcon /><h2 className="text-xl font-semibold text-cyan-300">Sugestão de Roteiro 📝</h2></div>
                    <CopyButton textToCopy={script} />
                </div>
                <p className="text-gray-300 whitespace-pre-line leading-relaxed">{script}</p>
            </div>

            {/* Descrição Completa */}
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg p-4 shadow-lg">
                <div className="flex justify-between items-center mb-3"><DescriptionIcon /><h2 className="text-xl font-semibold text-sky-300">Descrição Completa 🚀</h2></div>
                <CopyButton textToCopy={description} />
                <p className="mt-3 text-gray-300 whitespace-pre-line leading-relaxed">{description}</p>
            </div>

            {/* Hashtags */}
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg p-4 shadow-lg">
                <div className="flex justify-between items-center mb-3"><HashtagIcon /><h2 className="text-xl font-semibold text-indigo-300">Hashtags Estratégicas</h2></div>
                <CopyButton textToCopy={hashtags} />
                <p className="mt-3 text-gray-300 font-mono tracking-wide">{hashtags}</p>
            </div>
        </div>
    );
};


// --- Componente Principal da Aplicação ---
export default function App() {
    const [topic, setTopic] = useState('');
    const [channelLink, setChannelLink] = useState('');
    const [tone, setTone] = useState('Inspirador');
    const [generatedContent, setGeneratedContent] = useState<any | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const TONES = ['Inspirador', 'Teológico', 'Jovem e Descontraído'];

    const handleGenerateContent = useCallback(async () => {
        if (!topic.trim()) {
            setError('Por favor, insira um tema para começar.');
            return;
        }

        setIsLoading(true);
        setError('');
        setGeneratedContent(null);

        const prompt = `
            Você é um especialista em SEO, copywriting e estratégia de conteúdo para mídias sociais, com foco em conteúdo religioso e de crescimento pessoal. Sua missão é criar um pacote completo de conteúdo viral e engajador.

            Tema: "${topic}"
            Tom de Voz: "${tone}"

            Responda OBRIGATORIAMENTE com um objeto JSON válido, sem nenhum texto ou formatação adicional. O objeto deve ter a seguinte estrutura, com as strings preenchidas:
            {
              "titles": ["título 1 com emoji", "título 2 com emoji", "título 3 com emoji"],
              "description": "Corpo da descrição aqui, com 2-3 parágrafos e emojis.",
              "script": "- Tópico 1: [descreva o primeiro ponto]\\n- Tópico 2: [descreva o segundo ponto]\\n- Tópico 3: [descreva o terceiro ponto]",
              "thumbnail": "Ideia para a miniatura aqui, com texto e elementos visuais.",
              "hashtags": "#tag1, #tag2, #tag3, #tag4, #tag5, #tag6, #tag7"
            }
        `;
        
        try {
            const apiKey = "";
            const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;
            const payload = { contents: [{ role: "user", parts: [{ text: prompt }] }] };

            const response = await fetch(apiUrl, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
            if (!response.ok) throw new Error(`Erro na API: ${response.statusText}`);
            
            const result = await response.json();
            const rawText = result.candidates?.[0]?.content?.parts?.[0]?.text;
            if (!rawText) throw new Error('A resposta da IA está vazia.');

            const cleanedJsonString = rawText.replace(/```json/g, '').replace(/```/g, '').trim();
            const parsedContent = JSON.parse(cleanedJsonString);

            const { 
                titles, 
                description: descriptionBody, 
                script, 
                thumbnail, 
                hashtags 
            } = parsedContent;

            if (!titles || !descriptionBody || !hashtags) {
                 throw new Error('O JSON retornado pela IA não contém os campos necessários.');
            }
            
            const cta = "\n\n---\n\nGostou do conteúdo? 🙏✨\n🔔 Inscreva-se\n👍 Deixe seu Like\n💬 Comente\n🔗 Compartilhe com um amigo!";
            const channelInfo = channelLink ? `\n\nVisite meu canal: ${channelLink}` : '';
            const finalHashtags = `\n\n${hashtags}`;
            const fullDescription = `${descriptionBody}${cta}${channelInfo}${finalHashtags}`;

            setGeneratedContent({ titles, description: fullDescription, hashtags, thumbnail, script });

        } catch (e) {
            console.error("Erro detalhado:", e);
            setError('Ocorreu um erro ao gerar o conteúdo. A resposta da IA pode não estar no formato JSON esperado. Tente novamente.');
        } finally {
            setIsLoading(false);
        }
    }, [topic, channelLink, tone]);

    return (
        <div className="min-h-screen w-full bg-gray-900 text-white font-sans flex flex-col items-center p-4 sm:p-6 lg:p-8">
            <style>{`@keyframes fade-in { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } } .animate-fade-in { animation: fade-in 0.5s ease-out forwards; } .gradient-text { background-image: linear-gradient(to right, #2dd4bf, #38bdf8, #a78bfa); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }`}</style>
            
            <div className="w-full max-w-3xl mx-auto">
                <header className="text-center mb-8">
                    <h1 className="text-4xl sm:text-5xl font-bold gradient-text">Gerador de Conteúdo IA Pro</h1>
                    <p className="text-gray-400 mt-2 text-lg">Seu assistente completo para criar conteúdo viral.</p>
                </header>

                <main className="bg-gray-800/60 backdrop-blur-md border border-gray-700 p-6 rounded-xl shadow-2xl space-y-6">
                    <div>
                        <label className="text-lg font-medium text-gray-300">1. Escolha o Tom de Voz:</label>
                        <div className="mt-2 flex flex-wrap gap-2">
                            {TONES.map(t => (
                                <button key={t} onClick={() => setTone(t)} className={`px-4 py-2 text-sm font-semibold rounded-full transition-all duration-200 ${ tone === t ? 'bg-teal-500 text-white shadow-lg' : 'bg-gray-700 hover:bg-gray-600 text-gray-300'}`}>
                                    {t}
                                </button>
                            ))}
                        </div>
                    </div>
                    <div>
                        <label htmlFor="topic-input" className="text-lg font-medium text-gray-300">2. Digite o Tema:</label>
                        {/* A CORREÇÃO ESTÁ AQUI: rows={3} em vez de rows="3" */}
                        <textarea id="topic-input" value={topic} onChange={(e) => setTopic(e.target.value)} placeholder="Ex: O poder do perdão, João 3:16..." className="mt-2 w-full p-3 bg-gray-900 border-2 border-gray-600 rounded-lg focus:ring-2 focus:ring-teal-400 focus:border-teal-400 transition-all duration-200 text-white resize-none h-24" rows={3}/>
                    </div>
                    <div>
                        <label htmlFor="channel-link-input" className="text-lg font-medium text-gray-300">3. Link do seu Canal (Opcional):</label>
                        <input id="channel-link-input" type="text" value={channelLink} onChange={(e) => setChannelLink(e.target.value)} placeholder="https://www.youtube.com/c/seucanal" className="mt-2 w-full p-3 bg-gray-900 border-2 border-gray-600 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-200 text-white" />
                    </div>
                    <button onClick={handleGenerateContent} disabled={isLoading} className="w-full flex justify-center items-center py-3 px-6 bg-gradient-to-r from-teal-500 via-sky-600 to-indigo-600 text-white font-bold text-lg rounded-lg shadow-lg hover:from-teal-600 hover:to-indigo-700 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:scale-100">
                        {isLoading ? ( <><svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>Gerando...</> ) : ( 'Gerar Pacote de Conteúdo' )}
                    </button>
                    {error && <p className="text-red-400 text-center pt-4 animate-fade-in">{error}</p>}
                </main>
                <ResultsDisplay generatedContent={generatedContent} />
            </div>
            <footer className="text-center mt-12 text-gray-500 text-sm"><p>Desenvolvido com IA para maximizar seu alcance.</p></footer>
        </div>
    );
}
