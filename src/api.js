export const runCode = async (language , sourceCode , stdin) => {
    const url = 'https://onecompiler-apis.p.rapidapi.com/api/v1/run';
    
    const languageToFileExtension = {
        python: 'py',
        javascript: 'js',
        typescript: 'ts',
        java: 'java',
        csharp: 'cs',
        php: 'php',
        c : 'c'
    };

    const fileExtension = languageToFileExtension[language] || 'txt';
    const fileName = `index.${fileExtension}`;

    const options = {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
            'X-RapidAPI-Key': 'a118d638c7msh1d694dcc3f04c75p115ebcjsn9c5f6d7c3a4f',
            'X-RapidAPI-Host': 'onecompiler-apis.p.rapidapi.com'
        },
        body: JSON.stringify({
            language: language,
            stdin: stdin,
            files: [
                {
                    name: fileName,
                    content: sourceCode
                }
            ]
        })
    };

    try {
        const response = await fetch(url, options);
        const result = await response.json();
        return result; 
    } catch (error) {
        console.error(error);
    }
};