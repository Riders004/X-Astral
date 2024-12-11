const { CreatePlug } = require('../lib/commands');

CreatePlug({
    command: 'kick',
    category: 'group',
    desc: 'Remove a user from the group',
    execute: async (message, conn) => {
        if (!message.isGroup) return;
        if (!message.isBotAdmin) return message.reply('Um not admin');
        const participants = await message.groupParticipants;
        const members = message.mentions;
        if (message.text === 'all') {
            const nonAdmins = participants.filter(participant => !participant.admin || participant.admin !== 'admin').map(participant => participant.id);
            if (nonAdmins.length === 0) return message.reply('_remove_');
            await message.reply('_Kicking all non-admins.._');
            for (const user of nonAdmins) {
                await conn.groupParticipantsUpdate(message.user, [user], 'remove')
                    .then(() => message.reply(`Removed: ${user}`))
                    .catch(err => message.reply(`${user}`));
            }
        } else if (members.length > 0) {
            for (const user of members) {
                await conn.groupParticipantsUpdate(message.user, [user], 'remove')
                    .then(() => message.reply(`removed: ${user}.`))
                    .catch(err => message.reply(`${user}.`));
            }
        } else {
            return message.reply('mention_user(s)/type_"all"');
        }
    }
});
                        
CreatePlug({
    command: 'mute',
    category: 'group',
    desc: 'grouo',
    execute: async (message, conn) => {
        if (!message.isGroup) return;
        if (!message.isBotAdmin) return message.reply('um not admin');
         if (!message.groupAdmins.includes(message.sender)) {
            return;
        }try {
            const currentSettings = await conn.groupMetadata(message.user);
            if (currentSettings.announce) {
                return message.reply('_Group already muted_');}
             await conn.groupSettingUpdate(message.user, 'announcement');
            return message.reply('_group_muted_');
        } catch (err) {
            console.error(err);
            return;
        }
    }
});

CreatePlug({
    command: 'unmute',
    category: 'group',
    desc: 'Unmute',
    execute: async (message, conn) => {
        if (!message.isGroup) return;
        if (!message.isBotAdmin) return message.reply('um_not_admin');
        if (!message.groupAdmins.includes(message.sender)) {
            return;
        }try {
          const settings = await conn.groupMetadata(message.user);
            if (!settings.announce) {
                return message.reply('group_already_unmuted');}
             await conn.groupSettingUpdate(message.user, 'chat');
            return message.reply('_group_been_unmuted_');
        } catch (err) {
            console.error(err);
            return;
        }
    }
});
                                                   
CreatePlug({
    command: 'tagall',
    category: 'group',
    desc: 'Mention all',
    execute: async (message, conn) => {
        if (!message.isGroup) return;
        if (!message.isBotAdmin) return;
        if (!message.groupAdmins.includes(message.sender)) {
            return;
        }try {
           const groupMetadata = await conn.groupMetadata(message.user);
            const participants = groupMetadata.participants;
            const mentions = participants.map(participant => participant.id);
            const msg = `@${mentions.join(' @')}`;
            await conn.send(message.user, { text: msg, mentions }, { quoted: message });
            return;
        } catch (err) {
            console.error(err);
            return;
        }
    }
});
    
        
          
