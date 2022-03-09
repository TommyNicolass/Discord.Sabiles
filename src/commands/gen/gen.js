const { MessageEmbed } = require('discord.js')
const User = require("../../database/schemas/User");

module.exports = {
  name: 'gen',
  category: 'info',
  description: 'Returns latency and API ping',

  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */



  run: async (client, message, args) => {
    const fs = require("fs")
    const randomNumber = Math.floor(Math.random() * 1) + 1;

    const profileSchema = require("../../handlers/commandlimit");


  
    





          if (user && user.isPremium) {

            let data
            try {
              data = await profileSchema.findOne({ userID: message.author.id })
              if(!data) {
                await profileSchema.insertMany([{ userID: message.author.id }])
              }
            } catch(e) {
              console.log(e)
            }
            
            const user = await profileSchema.findOne({ userID: message.author.id })
            
            await profileSchema.updateOne({ userID: message.author.id }, {
              limit: user.limit + 1
            })
        

      
      const acc = args[0]

          if (!acc) return message.channel.send("Enter the type of accounts to generate      ")



          const channelemb = new MessageEmbed()
          .setColor("#f21a02")
          .setFooter(message.author.tag, message.author.avatarURL({dynamic:true }))
          .addFields({
            name: "Error!", value: "Genereting accounts is allowed only on <#935061533128540211>"
        })

              if (!message.channel.id.includes("935061533128540211")) return message.channel.send({embeds: [channelemb] });






            let path = `./src/accounts/${args[0] + ".txt"}`
  
        fs.access(path, fs.F_OK, (err) => {
          if (err) {
            return message.channel.send(args[0]+" is not a valid account check stock")
          } else {

              function getRandomLine(filename) {
                var data = fs.readFileSync(filename, "utf8");
                var lines = data.split('\n');
                return lines[Math.floor(Math.random() * lines.length)];
              }
           var the_random_line_text = getRandomLine(path);

            const {readFileSync} = require('fs');

            const data = readFileSync(`./src/accounts/${args[0] + ".txt"}`, 'utf-8').split(/\r?\n/g);

            const random = data[Math.floor(Math.random() * data.length - 1)];

            const splitted = `${the_random_line_text}`.split(':');




            message.channel.send("Account genereted check dm")
            message.author.send({
              "content": null,
            "embeds": [
            {
              "title": "Accounts has been generated!\nAccount Details",
            "description": "**━━━━━━━━━━━━ \n**",
            "color": 16711680,
            "fields": [
            {
              "name": `⮚ Type: ${args[0]}\n⮚ Email: ||${splitted[0]}||\n⮚ Password: ||${splitted[1]}||`,
            "value": "**━━━━━━━━━━━━\n**"
              },
            {
              "name": `Fast copy\n⮛⮛ \n||${the_random_line_text}||`,
            "value": `**━━━━━━━━━━━━\n⮚ Stock left: **${String(fs.readFileSync(`./src/accounts/${args[0] + ".txt"}`)).split('\n').length}**\n⮚ Generations left: 3/8\n━━━━━━━━━━━━**`
              }
            ]
          }
            ]
      })
  
  
      
  
  
  
           
  
  
          }
        
          
        })

      } else return message.reply("You dont have premium")
  
  
  
  
  
        } 
  
      }




















