const Discord = require('discord.js')
const schema = require('../../database/schemas/Code')
const moment = require('moment')
var voucher_codes = require('voucher-code-generator')

module.exports = {
  name: 'gencode',
  category: 'Premium',
  description: 'Generates a premium code',

  run: async (client, message, args, user, guild) => {

    if (!message.guild.me.permissions.has('SEND_MESSAGES')) return
    if (
      !message.guild.me.permissions.has([
        'EMBED_LINKS',
        'ADD_REACTIONS',
        'SEND_MESSAGES',
        'READ_MESSAGE_HISTORY',
        'VIEW_CHANNEL',
      ])
    ) {
      return message.channel.send({
        content: `
      ❌ I require some Permissions!

      **I need the following Permissions to work on your Server:**
      EMBED_LINKS,
      ADD_REACTIONS, 
      SEND_MESSAGES, 
      READ_MESSAGE_HISTORY,
      VIEW_CHANNEL

      ⚠️ Please add me the right Permissions and re-run this Command!
  
      `,
      })
    }
    
    let codes = []

   
    const plan = args[0]
    const plans = ['daily', 'weekly', 'monthly', 'yearly']

    if (!plan) return message.channel.send({ content: `**> Please provide plan**` })

 
    if (!plans.includes(args[0]))
      return message.channel.send(
       { content:  `**Invalid Plan, available plans:** ${plans.join(', ')}`}
      )

  
    let time
    if (plan === 'daily') time = Date.now() + 86400000
    if (plan === 'weekly') time = Date.now() + 86400000 * 7
    if (plan === 'monthly') time = Date.now() + 86400000 * 30
    if(plan === 'yearly') time = Date.now() + 86400000 * 365

    // Generate the code with a pattern of 12 characters.
    let amount = args[1]
    if (!amount) amount = 1

    for (var i = 0; i < amount; i++) {
      const codePremium = voucher_codes.generate({
        pattern: '####-####-####'
      })

      
      const code = codePremium.toString().toUpperCase()

    
      const find = await schema.findOne({
        code: code
      })

   
      if (!find) {
        schema.create({
          code: code,
          plan: plan,
          expiresAt: time
        })

        codes.push(`${i + 1}- ${code}`)
      }
    }

    message.channel.send(
      { content: 
        `\`\`\`Generated +${codes.length}\n\n--------\n${codes.join(
        '\n'
      )}\n--------\n\nType - ${plan}\nExpires - ${moment(time).format(
        'dddd, MMMM Do YYYY'
      )}\`\`\`\nTo redeem, use \`$redeem <code>\``}
    )
  }
}
