// Simple parser for agent instructions
// Recognizes [tool title="..."] and [tool title="..." value="..."]

export function parseInstructions(instructions) {
    // Split into lines for paragraphs
    const lines = instructions
        .split(/\r?\n/)
        .filter((line) => line.trim().length > 0);
    const regex = /\[tool\s+title="([^"]+)"(?:\s+value="([^"]+)")?\]/g;
    return lines.map((line) => {
        const result = [];
        let lastIndex = 0;
        let match;
        while ((match = regex.exec(line)) !== null) {
            if (match.index > lastIndex) {
                result.push({
                    type: 'text',
                    value: line.slice(lastIndex, match.index),
                });
            }
            result.push({
                type: 'tool',
                title: match[1],
                ...(match[2] ? { value: match[2] } : {}),
            });
            lastIndex = regex.lastIndex;
        }
        if (lastIndex < line.length) {
            result.push({
                type: 'text',
                value: line.slice(lastIndex),
            });
        }
        return result;
    });
}
