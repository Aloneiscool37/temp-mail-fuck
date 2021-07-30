const TempMailFuck = require('./../temp-mail-fuck')

;(async () => {
  const tmf = await TempMailFuck({
    savePath: __dirname + '/myMailBox.json'
  })

  console.log(tmf)

  const mailbox = await tmf.createMailbox()
  //const mailbox = await tmf.getMailboxByMail('woley29006@spinwinds.com')
  //const mailbox = await tmf.getMailboxByToken('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1dWlkIjoiMjk5ZjZiZjRiZjViNGE5NTlkYTY3Mjc4ZjU0ZTFjODQiLCJtYWlsYm94Ijoid29sZXkyOTAwNkBzcGlud2luZHMuY29tIiwiaWF0IjoxNjI3NjQ0NDc1fQ.KYs-e0V5znjOwmD4Yoq0ysDz_u1N24-t5oI8HFxLhz8')

  console.log(mailbox)

  console.log(mailbox.isOk)

  if (mailbox.isOk) {
    //const messages = await mailbox.getMessages()
    //console.log(await messages[0].getFullMessage())

    /*const id = await mailbox.getMessagesInterval(messages => {
      console.log(await messages[0].getFullMessage())
    }, 5000)

    mailbox.clearMessagesInterval(id)*/

    /*const autodesk = await mailbox.findMessage(({ from, subject, bodyPreview }) => from.match(/Autodesk/gi))

    if (autodesk.isFind) {
      console.log(await autodesk.message.getFullMessage())
    }*/

    const id = await mailbox.findMessageInterval(
      ({ from, subject, bodyPreview }) => from.match(/prohetamine/gi),
      message => {
        if (message.isFind) {
          console.log(message)
        }
      },
      5000
    )

    mailbox.clearMessagesInterval(id)

    tmf.kill()
  }
})()
