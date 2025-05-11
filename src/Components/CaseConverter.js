import { useState } from 'react';
import './CaseConverter.css';

function CaseConverter() {
    const [text, setText] = useState('');
    const [error, setError] = useState('');

    const handleChange = (e) => setText(e.target.value);

    const changeUppercase = () => setText(text.toUpperCase());
    const changeLowercase = () => setText(text.toLowerCase());

    const sentencecase = () => {
        const sentences = text.split(/\. /).map(s => s.charAt(0).toUpperCase() + s.slice(1));
        setText(sentences.join('. '));
    };

    const capitaliseCase = () => {
        const words = text.toLowerCase().split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1));
        setText(words.join(' '));
    };

    const alternatingCase = () => {
        let result = '';
        for (let i = 0; i < text.length; i++) {
            result += i % 2 === 0 ? text[i].toLowerCase() : text[i].toUpperCase();
        }
        setText(result);
    };

    const inverseCase = () => {
        const inverted = [...text].map(c =>
            c === c.toUpperCase() ? c.toLowerCase() : c.toUpperCase()
        ).join('');
        setText(inverted);
    };

    const removeBlankSpace = () => setText(text.replace(/\s+/g, ' ').trim());
    const clearText = () => setText('');

    const copyToClipboard = async () => {
        try {
            await navigator.clipboard.writeText(text || '');
        } catch (e) {
            console.error('Clipboard copy failed', e);
        }
    };

    const paste = async () => {
        try {
            const clip = await navigator.clipboard.readText();
            setText(clip);
        } catch (e) {
            console.error('Paste failed', e);
        }
    };

    const downloadText = () => {
        if (!text.trim()) {
            setError("Please enter some text first!");
            setTimeout(() => setError(''), 2000);
            return;
        }

        if (window.confirm('Are you sure you want to download the text?')) {
            const blob = new Blob([text], { type: 'text/plain' });
            const anchor = document.createElement('a');
            anchor.href = URL.createObjectURL(blob);
            anchor.download = 'text.txt';
            anchor.click();
            URL.revokeObjectURL(anchor.href);
        }
    };

    const wordCount = () => text.trim().split(/\s+/).filter(Boolean).length;
    const characterCount = () => text.length;

    return (
        <div className="container">
            <h1>Text Converter</h1>
            <textarea
                className="form-control"
                rows="6"
                value={text}
                onChange={handleChange}
                placeholder="Enter your text here..."
            ></textarea>
            {error && <p className="error">{error}</p>}

            <div className="text-analysis">
                <h2>Text Analysis</h2>
                <p>
                    <span>{wordCount()} {wordCount() === 1 ? 'Word' : 'Words'}</span>
                    <span className='separator'>|</span>
                    <span>{characterCount()} {characterCount() === 1 ? 'Character' : 'Characters'}</span>
                </p>
            </div>

            <div className="button-grid">
                <button onClick={changeUppercase}>UpperCase</button>
                <button onClick={changeLowercase}>LowerCase</button>
                <button onClick={sentencecase}>SentenceCase</button>
                <button onClick={capitaliseCase}>CapitaliseCase</button>
                <button onClick={alternatingCase}>aLtErNaTiNgCaSe</button>
                <button onClick={inverseCase}>InVeRsEcAsE</button>
                <button onClick={removeBlankSpace}>Remove Blanks</button>
                <button onClick={clearText}>Clear</button>
                <button onClick={copyToClipboard}>Copy</button>
                <button onClick={paste}>Paste</button>
                <button onClick={downloadText}>Download</button>
            </div>
        </div>
    );
}

export default CaseConverter;
