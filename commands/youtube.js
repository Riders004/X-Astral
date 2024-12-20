const { CreatePlug } = require('../lib/commands');
const YouTube = require('youtube-sr').default;

CreatePlug({
    command: 'yts',
    category: 'search',
    desc: 'Search',
    execute: async (message, conn) => {
        console.log(message.text.trim().split(' ').slice(1).join(' '));
        console.log(message.text.trim().split(' '));
        console.log(message.text.trim());
        console.log(message.text);
        const query = message.text;
        if (!query) return message.reply('(e.g., `yts search term`)');
        const videos = await YouTube.search(query, { limit: 18, safeSearch: true });
        if (!videos || videos.length === 0) return message.reply(`No_fund`);
        const res = videos.map((m, i) => 
            `*${++i}. ${m.title}*\n` +
            `Published: ${new Date(m.uploadedAt).toLocaleDateString()}\n` +
            `https://www.youtube.com/watch?v=${m.id}\n` +
            `---`
        ).join("\n");
        await conn.send(message.user, { text: `*YouTube Search:* _${query}_\n\n${res}` }, { quoted: message });
    },
});
