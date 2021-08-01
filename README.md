![enter image description here](/media/logo.png)

##### lang: [ru](#rulang) [en](#enlang)


# <a name="rulang">temp-mail-fuck</a>

> temp-mail-fuck - Твой лучший друг в мире электронной почты.

### Почему ?
Я очень бедный человек, в моей семье 14 человек и они тоже бедны представляете ? А моей бабушке вообще 88 лет. Мы просто не можем позволить себе платить 19$ за ебаных 1000 запросов в месяц для какой-то одноразовой почты. А что если очень хочется ? мы случайно заметили что, моднейший [Cloudflare](/media/Cloudflare.jpg) пропускает все основные запросы к api и решили им [воспользоваться](https://www.npmjs.com/package/temp-mail-fuck), [спасибо](https://temp-mail.org/) за эту возможность, теперь моя [семья](https://www.npmjs.com/package/temp-mail-fuck) питается почтовыми ящиками! Надеюсь мой вклад облегчит кому-то [жизнь](https://www.patreon.com/prohetamine).

### С чего начать

Установим npm модуль  ```temp-mail-fuck```

```sh
$ npm install temp-mail-fuck
```

или

```sh
$ yarn add temp-mail-fuck
```

или

```sh
$ yarn add https://github.com/prohetamine/temp-mail-fuck
```

### Примеры и описание

Подключение модуля

```sh
const TempMailFuck = require('temp-mail-fuck')
```

#### <a name="rutempmailfuck">TempMailFuck</a>

Функция [TempMailFuck](#rutempmailfuck) инициализирует подключение к Puppeteer принимает два необязательных параметра, два объекта и возвращает объект с функциями: [kill](#rukill), [createMailbox](#rucreatemailbox), [getMailboxByMail](#rugetmailboxbymail), [getMailboxByToken](#rugetmailboxbytoken). Не забывайте убивать процесс Puppeteer если не используете модуль с помощью [kill](#rukill).

##### object

| ключ | значение | значение по-умолчанию | обязательный | информация |
| ------ | ------ | ------ | ------ | ------ |
| savePath | string | global.SPDCTMF | нет | используется как путь для сохранения почтовых токенов |

##### object2

| ключ | значение | значение по-умолчанию | обязательный | информация |
| ------ | ------ | ------ | ------ | ------ |
| любой доступный Puppeteer | none-type | global.PDCTMF | нет | используется для настройки лаунчера Puppeteer |

```sh
const TempMailFuck = require('temp-mail-fuck')

;(async () => {
  // await TempMailFuck() или

  const tmf = await TempMailFuck({
    savePath: __dirname + '/myMailBox.json'
  }, {
    headless: true,
    ignoreHTTPSErrors: true,
    executablePath: '/usr/bin/chromium-browser', // твой путь до puppeteer
    args: ['--disable-web-security', '--no-sandbox', '--disable-setuid-sandbox'],
  })

  console.log(tmf)

  /* {
    kill: [Function: kill],
    createMailbox: [AsyncFunction: createMailbox],
    getMailboxByMail: [Function: getMailboxByMail],
    getMailboxByToken: [Function: getMailboxByToken]
  } */

  setTimeout(() => {
    tmf.kill() // Убивает процесс puppeteer
  }, 60000 * 10)
})()
```

#### <a name="rucreatemailbox">createMailbox</a>

Функция [createMailbox](#rucreatemailbox) создает новый почтовый ящик, взаимодействовать с ним можно через функции [getMessages](#rugetmessages), [getMessagesInterval](#rugetmessagesinterval), [findMessage](#rufindmessage), [findMessageInterval](#rufindmessageinterval), [killMessagesInterval](#rukillmessagesinterval).

```sh
const TempMailFuck = require('temp-mail-fuck')

;(async () => {
  const tmf = await TempMailFuck({
    savePath: __dirname + '/myMailBox.json'
  })

  const mailbox = await tmf.createMailbox()

  console.log(mailbox)

  /* {
    token: 'eyJhbGciOiJIUzI1NiIsInR5c ... xEFDD_TxGMVCnF1El5xIyPU',
    mailbox: 'mesixa5696@obxstorm.com',
    isOk: true,
    getMessages: [AsyncFunction (anonymous)],
    getMessagesInterval: [AsyncFunction: getMessagesInterval],
    killMessagesInterval: [Function: killMessagesInterval],
    findMessage: [AsyncFunction: findMessage],
    findMessageInterval: [AsyncFunction: findMessageInterval]
  } */

  if (mailbox.isOk) {
    // ящик успешно был создан, значит его можно использовать
    const id = await mailbox.findMessageInterval(
      ({ from, subject, bodyPreview }) => from.match(/prohetamine/gi),
      message => {
        if (message.isFind) {
          console.log(message)

        }
      },
      5000
    )

    return setTimeout(() => {
      mailbox.killMessagesInterval(id)
      tmf.kill()
    }, 60000)
  } else {
    // что-то пошло не так...
  }

  setTimeout(() => {
    tmf.kill()
  }, 60000 * 10)
})()
```

#### <a name="rugetmailboxbymail">getMailboxByMail</a>

Функция [getMailboxByMail](#rugetmailboxbymail) ищет почтовый ящик по mail переданному первым параметром, взаимодействовать с ним можно через функции [getMessages](#rugetmessages), [getMessagesInterval](#rugetmessagesinterval), [findMessage](#rufindmessage), [findMessageInterval](#rufindmessageinterval), [killMessagesInterval](#rukillmessagesinterval).

> getMailboxByMail - доступен только когда есть savePath.

| параметры | значение по-умолчанию | информация |
| ------ | ------ | ------ |
| string | null | ключ поиска писем |

```sh
const TempMailFuck = require('temp-mail-fuck')

;(async () => {
  const tmf = await TempMailFuck({
    savePath: __dirname + '/myMailBox.json'
  })

  const mailbox = await tmf.getMailboxByMail('mesixa5696@obxstorm.com')

  console.log(mailbox)

  /* {
    token: null,
    mailbox: null,
    isOk: false,
    getMessages: [AsyncFunction (anonymous)],
    getMessagesInterval: [AsyncFunction: getMessagesInterval],
    killMessagesInterval: [Function: killMessagesInterval],
    findMessage: [AsyncFunction: findMessage],
    findMessageInterval: [AsyncFunction: findMessageInterval]
  } */

  if (mailbox.isOk) {
    // ящик успешно был создан, значит его можно использовать
    const messages = await mailbox.getMessages()
    console.log(await messages[0].getFullMessage())
  } else {
    // что-то пошло не так...
  }

  setTimeout(() => {
    tmf.kill()
  }, 60000 * 10)
})()
```

#### <a name="rugetmailboxbytoken">getMailboxByToken</a>

Функция [getMailboxByToken](#rugetmailboxbytoken) ищет почтовый ящик по token переданному первым параметром, взаимодействовать с ним можно через функции [getMessages](#rugetmessages), [getMessagesInterval](#rugetmessagesinterval), [findMessage](#rufindmessage), [findMessageInterval](#rufindmessageinterval), [killMessagesInterval](#rukillmessagesinterval).

> getMailboxByToken - доступен только когда есть savePath.

| параметры | значение по-умолчанию | информация |
| ------ | ------ | ------ |
| string | null | ключ поиска писем |

```sh
const TempMailFuck = require('temp-mail-fuck')

;(async () => {
  const tmf = await TempMailFuck({
    savePath: __dirname + '/myMailBox.json'
  })

  const mailbox = await tmf.getMailboxByToken('eyJhbGciOiJIUzI1NiIsInR5c ... xEFDD_TxGMVCnF1El5xIyPU')

  console.log(mailbox)

  /* {
    token: null,
    mailbox: null,
    isOk: false,
    getMessages: [AsyncFunction (anonymous)],
    getMessagesInterval: [AsyncFunction: getMessagesInterval],
    killMessagesInterval: [Function: killMessagesInterval],
    findMessage: [AsyncFunction: findMessage],
    findMessageInterval: [AsyncFunction: findMessageInterval]
  } */

  if (mailbox.isOk) {
    // ящик успешно был создан, значит его можно использовать
    const messages = await mailbox.getMessages()
    console.log(await messages[0].getFullMessage())
  } else {
    // что-то пошло не так...
  }

  setTimeout(() => {
    tmf.kill()
  }, 60000 * 10)
})()
```

#### <a name="rukill">kill</a>

Функция [kill](#rukill) убивает процесс Puppeteer и заканчивает работу [TempMailFuck](#rutempmailfuck).

```sh
const TempMailFuck = require('temp-mail-fuck')

;(async () => {
  const tmf = await TempMailFuck()

  // ваши действия

  setTimeout(() => {
    tmf.kill()
  }, 60000 * 10)
})()
```

#### <a name="rugetmessages">getMessages</a>

Функция [getMessages](#rugetmessages) возвращает массив писем в каждом из которых есть только предварительное сообщение и функция getFullMessage которую можно использовать для получения полного сообщения. В качестве параметров ничего не принимает.

```sh
const TempMailFuck = require('temp-mail-fuck')

;(async () => {
  const tmf = await TempMailFuck({
    savePath: __dirname + '/myMailBox.json'
  })

  //const mailbox = await tmf.createMailbox()
  const mailbox = await tmf.getMailboxByMail('rokanod348@biohorta.com')
  //const mailbox = await tmf.getMailboxByToken('eyJhbGciOiJIUzI1NiIsInR5c ... xEFDD_TxGMVCnF1El5xIyPU')

  console.log(mailbox.mailbox) // rokanod348@biohorta.com

  if (mailbox.isOk) {
    const messages = await mailbox.getMessages()

    console.log(messages)

  /* [
      {
        _id: '6104961ed1a97500a1c32d52',
        receivedAt: 1627690527,
        from: 'Stas Prohetamine <prohetamine@gmail.com>',
        subject: null,
        bodyPreview: ' Привет бедный человек ',
        attachmentsCount: 0,
        getFullMessage: [AsyncFunction (anonymous)]
      }
    ] */

    if (messages.length > 0) {
      console.log(await messages[0].getFullMessage())

    /* {
        _id: '6104961ed1a97500a1c32d52',
        receivedAt: 1627690527,
        user: '46df74731e18464c89d55b2972669556',
        mailbox: 'rokanod348@biohorta.com',
        from: 'Stas Prohetamine <prohetamine@gmail.com>',
        subject: null,
        bodyPreview: ' Привет бедный человек ',
        bodyHtml: '<div dir="ltr">Привет бедный человек</div>\n',
        attachmentsCount: 0,
        attachments: [],
        createdAt: '2021-07-31T00:15:26.712Z'
      } */
    }
  }

  setTimeout(() => {
    tmf.kill()
  }, 60000 * 10)
})()
```

#### <a name="rugetmessagesinterval">getMessagesInterval</a>

Функция [getMessagesInterval](#rugetmessagesinterval) возвращает массив писем через callback c интервалом в _N миллисекунд_ в каждом из которых есть только предварительное сообщение и функция getFullMessage которую можно использовать для получения полного сообщения. В качестве параметров принимает callback первым и единственным параметром в который передает письма, а вторым параметром принимает время интервала в миллисекундах.

| параметры | значение по-умолчанию | информация |
| ------ | ------ | ------ |
| funtcion | global.TMFFCB | функция обратного вызова с аргументом в виде массива писем |
| number | 30000 | время интервала в миллисекундах |

```sh
const TempMailFuck = require('temp-mail-fuck')

;(async () => {
  const tmf = await TempMailFuck({
    savePath: __dirname + '/myMailBox.json'
  })

  //const mailbox = await tmf.createMailbox()
  const mailbox = await tmf.getMailboxByMail('rokanod348@biohorta.com')
  //const mailbox = await tmf.getMailboxByToken('eyJhbGciOiJIUzI1NiIsInR5c ... xEFDD_TxGMVCnF1El5xIyPU')

  console.log(mailbox.mailbox) // rokanod348@biohorta.com

  if (mailbox.isOk) {
    const id = await mailbox.getMessagesInterval(async messages => {
      console.log(messages)

      /* [
        {
          _id: '6104961ed1a97500a1c32d52',
          receivedAt: 1627690527,
          from: 'Stas Prohetamine <prohetamine@gmail.com>',
          subject: null,
          bodyPreview: ' Привет бедный человек ',
          attachmentsCount: 0,
          getFullMessage: [AsyncFunction (anonymous)]
        }
      ] */

      if (messages.length > 0) {
        console.log(await messages[0].getFullMessage())

      /* {
          _id: '6104961ed1a97500a1c32d52',
          receivedAt: 1627690527,
          user: '46df74731e18464c89d55b2972669556',
          mailbox: 'rokanod348@biohorta.com',
          from: 'Stas Prohetamine <prohetamine@gmail.com>',
          subject: null,
          bodyPreview: ' Привет бедный человек ',
          bodyHtml: '<div dir="ltr">Привет бедный человек</div>\n',
          attachmentsCount: 0,
          attachments: [],
          createdAt: '2021-07-31T00:15:26.712Z'
        } */
      }
    }, 5000)
  }

  setTimeout(() => {
    tmf.kill()
  }, 60000 * 10)
})()
```

#### <a name="rufindmessage">findMessage</a>

Функция [findMessage](#rufindmessage) возвращает найденное письмо с помощью встроенного callback фильтра совпадений. В успешно найденном письме есть только предварительное сообщение и функция getFullMessage которую можно использовать для получения полного сообщения. В качестве параметров принимает callback функцию фильтра и первым единственным параметром в который передает объект предварительного письма.

| параметры | значение по-умолчанию | информация |
| ------ | ------ | ------ |
| funtcion | global.TMFFCB | функция обратного вызова с аргументами в виде ключей объекта предварительного письма |

```sh
const TempMailFuck = require('temp-mail-fuck')

;(async () => {
  const tmf = await TempMailFuck({
    savePath: __dirname + '/myMailBox.json'
  })

  //const mailbox = await tmf.createMailbox()
  const mailbox = await tmf.getMailboxByMail('rokanod348@biohorta.com')
  //const mailbox = await tmf.getMailboxByToken('eyJhbGciOiJIUzI1NiIsInR5c ... xEFDD_TxGMVCnF1El5xIyPU')

  console.log(mailbox.mailbox) // rokanod348@biohorta.com

  if (mailbox.isOk) {
    const prohetamine = await mailbox.findMessage(({ from, subject, bodyPreview }) => from.match(/prohetamine/gi))

    console.log(prohetamine)

    /* {
      isFind: true,
      message: {
        _id: '6104961ed1a97500a1c32d52',
        receivedAt: 1627690527,
        from: 'Stas Prohetamine <prohetamine@gmail.com>',
        subject: null,
        bodyPreview: ' Привет бедный человек ',
        attachmentsCount: 0,
        getFullMessage: [AsyncFunction (anonymous)]
      }
    } */

    if (prohetamine.isFind) {
      console.log(await prohetamine.message.getFullMessage())

      /* {
        _id: '6104961ed1a97500a1c32d52',
        receivedAt: 1627690527,
        user: '46df74731e18464c89d55b2972669556',
        mailbox: 'rokanod348@biohorta.com',
        from: 'Stas Prohetamine <prohetamine@gmail.com>',
        subject: null,
        bodyPreview: ' Привет бедный человек ',
        bodyHtml: '<div dir="ltr">Привет бедный человек</div>\n',
        attachmentsCount: 0,
        attachments: [],
        createdAt: '2021-07-31T00:15:26.712Z'
      } */
    }
  }

  setTimeout(() => {
    tmf.kill()
  }, 60000 * 10)
})()
```

#### <a name="rufindmessageinterval">findMessageInterval</a>

Функция [findMessageInterval](#rufindmessageinterval) возвращает найденное письмо в callback2 с помощью встроенного callback1 фильтра совпадений с интервалом в _N миллисекунд_. В успешно найденном письме есть только предварительное сообщение и функция getFullMessage которую можно использовать для получения полного сообщения. В качестве параметров принимает callback функцию фильтра и первым единственным параметром в который передает объект предварительного письма.

| параметры | значение по-умолчанию | информация |
| ------ | ------ | ------ |
| funtcion | global.TMFFCB | функция обратного вызова с аргументами в виде ключей объекта предварительного письма |
| funtcion | global.TMFFCB | функция обратного вызова с аргументом в виде массива писем |
| number | 30000 | время интервала в миллисекундах |

```sh
const TempMailFuck = require('temp-mail-fuck')

;(async () => {
  const tmf = await TempMailFuck({
    savePath: __dirname + '/myMailBox.json'
  })

  //const mailbox = await tmf.createMailbox()
  const mailbox = await tmf.getMailboxByMail('rokanod348@biohorta.com')
  //const mailbox = await tmf.getMailboxByToken('eyJhbGciOiJIUzI1NiIsInR5c ... xEFDD_TxGMVCnF1El5xIyPU')

  console.log(mailbox.mailbox) // rokanod348@biohorta.com

  if (mailbox.isOk) {
    const id = await mailbox.findMessageInterval(
      ({ from, subject, bodyPreview }) => from.match(/prohetamine/gi),
      async _message => {
        console.log(_message)

        /* {
          isFind: true,
          message: {
            _id: '6104961ed1a97500a1c32d52',
            receivedAt: 1627690527,
            from: 'Stas Prohetamine <prohetamine@gmail.com>',
            subject: null,
            bodyPreview: ' Привет бедный человек ',
            attachmentsCount: 0,
            getFullMessage: [AsyncFunction (anonymous)]
          }
        } */

        const { message, isFind } = _message

        if (isFind) {
          console.log(await message.getFullMessage())

          /* {
            _id: '6104961ed1a97500a1c32d52',
            receivedAt: 1627690527,
            user: '46df74731e18464c89d55b2972669556',
            mailbox: 'rokanod348@biohorta.com',
            from: 'Stas Prohetamine <prohetamine@gmail.com>',
            subject: null,
            bodyPreview: ' Привет бедный человек ',
            bodyHtml: '<div dir="ltr">Привет бедный человек</div>\n',
            attachmentsCount: 0,
            attachments: [],
            createdAt: '2021-07-31T00:15:26.712Z'
          } */
        }
      },
      5000
    )

    // mailbox.killMessagesInterval(id) // убивает интервал
  }

  setTimeout(() => {
    tmf.kill()
  }, 60000 * 10)
})()
```

#### <a name="rufindmessageinterval">clearMessagesInterval</a>

Функция [clearMessagesInterval](#rukillmessagesinterval) убивает любой из интервалов [findMessageInterval](#rufindmessageinterval) или [getMessagesInterval](#rugetmessagesinterval). В качестве параметров принимает идентификатор интервала.

| параметры | значение по-умолчанию | информация |
| ------ | ------ | ------ |
| id | null | идентификатор интервала |

```sh
const TempMailFuck = require('temp-mail-fuck')

;(async () => {
  const tmf = await TempMailFuck({
    savePath: __dirname + '/myMailBox.json'
  })

  const mailbox = await tmf.createMailbox()

  if (mailbox.isOk) {
    const id = await mailbox.getMessagesInterval(async messages => {
      console.log(messages)
    }, 5000)

    setTimeout(() => {
      mailbox.killMessagesInterval(id) // убивает интервал
    }, 30000)
  }

  setTimeout(() => {
    tmf.kill()
  }, 60000 * 10)
})()
```

### Контакты

Мой Телеграм: [@prohetamine](https://t.me/prohetamine), [канал](https://t.me/prohetamine)

Почта: prohetamine@gmail.com

Донат денег: [patreon](https://www.patreon.com/prohetamine)

Если у вас есть какие-либо вопросы и/или предложения, пожалуйста, напишите мне в телеграмме, если вы найдете ошибки также дайте мне знать, я буду очень благодарен.

-------- OTHER WORLD --------

##### lang: [ru](#rulang) [en](#enlang)


# <a name="enlang">temp-mail-fuck</a>

> temp-mail-fuck - Your best friend in the world of email.

### Why ?
I am a very poor person, there are 14 people in my family and they are also poor can you imagine ? And my grandmother is generally 88 years old. We just can't afford to pay$ 19 for a fucking 1000 requests per month for some one-time mail. And what if really want to ? we accidentally noticed that, the most fashionable [Cloudflare](/media/Cloudflare.jpg) skips all the main api requests and decided to [use it](https://github.com/prohetamine/temp-mail-fuck#readme), [thank you](https://temp-mail.org/) for this opportunity, now my [family](https://www.npmjs.com/package/temp-mail-fuck) eats mailboxes! I hope my contribution will make it easier for someone [life](https://www.patreon.com/prohetamine).

### Get started

Install the npm module ```temp-mail-fuck```

```sh
$ npm install temp-mail-fuck
```

or

```sh
$ yarn add temp-mail-fuck
```

or

```sh
$ yarn add https://github.com/prohetamine/temp-mail-fuck
```

### Examples and description

Connecting the module

```sh
const TempMailFuck = require('temp-mail-fuck')
```

#### <a name="entempmailfuck">TempMailFuck</a>

The function [TempMailFuck](#entempmailfuck) initializes the connection to Puppeteer takes two optional parameters, two objects and returns an object with the functions: [kill](#enkill), [createMailbox](#encreatemailbox), [getMailboxByMail](#engetmailboxbymail), [getMailboxByToken](#engetmailboxbytoken). Don't forget to kill the Puppeteer process if you don't use the module with [kill](#kill).

##### object

| key | value | default value | mandatory | information |
| ------ | ------ | ------ | ------ | ------ |
| savePath | string | global.SPDCTMF | none | is used as a path for saving the post token |

##### object2

| key | value | default value | required | information|
| ------ | ------ | ------ | ------ | ------ |
| any available Puppeteer | none-type | global.PDCTMF | none | is used to configure the Puppeteer launcher |

```sh
const TempMailFuck = require('temp-mail-fuck')

;(async () => {
  // await TempMailFuck() or

  const tmf = await TempMailFuck({
    savePath: __dirname + '/myMailBox.json'
  }, {
    headless: true,
    ignoreHTTPSErrors: true,
    executablePath: '/usr/bin/chromium-browser', // your way to puppeteer
    args: ['--disable-web-security', '--no-sandbox', '--disable-setuid-sandbox'],
  })

  console.log(tmf)

  /* {
    kill: [Function: kill],
    createMailbox: [AsyncFunction: createMailbox],
    getMailboxByMail: [Function: getMailboxByMail],
    getMailboxByToken: [Function: getMailboxByToken]
  } */

  setTimeout(() => {
    tmf.kill() // Kills the puppeteer process
  }, 60000 * 10)
})()
```

#### <a name="encreatemailbox">createMailbox</a>

The [createMailbox](#encreatemailbox) function creates a new mailbox, you can interact with it through the functions [getMessages](#engetmessages), [getMessagesInterval](#engetmessagesinterval), [findMessage](#enfindmessage), [findMessageInterval](#enfindmessageinterval), [killMessagesInterval](#enkillmessagesinterval).

```sh
const TempMailFuck = require('temp-mail-fuck')

;(async () => {
  const tmf = await TempMailFuck({
    savePath: __dirname + '/myMailBox.json'
  })

  const mailbox = await tmf.createMailbox()

  console.log(mailbox)

  /* {
    token: 'eyJhbGciOiJIUzI1NiIsInR5c ... xEFDD_TxGMVCnF1El5xIyPU',
    mailbox: 'mesixa5696@obxstorm.com',
    isOk: true,
    getMessages: [AsyncFunction (anonymous)],
    getMessagesInterval: [AsyncFunction: getMessagesInterval],
    killMessagesInterval: [Function: killMessagesInterval],
    findMessage: [AsyncFunction: findMessage],
    findMessageInterval: [AsyncFunction: findMessageInterval]
  } */

  if (mailbox.isOk) {
    // the mailbox was created successfully, so it can be used
    const id = await mailbox.findMessageInterval(
      ({ from, subject, bodyPreview }) => from.match(/prohetamine/gi),
      message => {
        if (message.isFind) {
          console.log(message)

        }
      },
      5000
    )

    return setTimeout(() => {
      mailbox.killMessagesInterval(id)
      tmf.kill()
    }, 60000)
  } else {
    // something went wrong...
  }

  setTimeout(() => {
    tmf.kill()
  }, 60000 * 10)
})()
```

#### <a name="engetmailboxbymail">getMailboxByMail</a>

The function [getMailboxByMail](#engetmailboxbymail) searches for a mailbox by mail passed by the first parameter, you can interact with it through the functions [getMessages](#engetmessages), [getMessagesInterval](#engetmessagesinterval), [findMessage](#enfindmessage), [findMessageInterval](#enfindmessageinterval), [killMessagesInterval](#enkillmessagesinterval).

> getMailboxByMail - available only when there is a savePath.

| parameters | default value | information|
| ------ | ------ | ------ |
| string | null | message search key |

```sh
const TempMailFuck = require('temp-mail-fuck')

;(async () => {
  const tmf = await TempMailFuck({
    savePath: __dirname + '/myMailBox.json'
  })

  const mailbox = await tmf.getMailboxByMail('mesixa5696@obxstorm.com')

  console.log(mailbox)

  /* {
    token: null,
    mailbox: null,
    isOk: false,
    getMessages: [AsyncFunction (anonymous)],
    getMessagesInterval: [AsyncFunction: getMessagesInterval],
    killMessagesInterval: [Function: killMessagesInterval],
    findMessage: [AsyncFunction: findMessage],
    findMessageInterval: [AsyncFunction: findMessageInterval]
  } */

  if (mailbox.isOk) {
    // the mailbox was created successfully, so it can be used
    const messages = await mailbox.getMessages()
    console.log(await messages[0].getFullMessage())
  } else {
    // something went wrong...
  }

  setTimeout(() => {
    tmf.kill()
  }, 60000 * 10)
})()
```

#### <a name="engetmailboxbytoken">getMailboxByToken</a>

The function [getMailboxByToken](#engetmailboxbytoken) searches for a mailbox by the token passed by the first parameter, you can interact with it through the functions [getMessages](#engetmessages), [getMessagesInterval](#engetmessagesinterval), [findMessage](#enfindmessage), [findMessageInterval](#enfindmessageinterval), [killMessagesInterval](#enkillmessagesinterval).

> getMailboxByMail - available only when there is a savePath.

| parameters | default value | information|
| ------ | ------ | ------ |
| string | null | message search key |

```sh
const TempMailFuck = require('temp-mail-fuck')

;(async () => {
  const tmf = await TempMailFuck({
    savePath: __dirname + '/myMailBox.json'
  })

  const mailbox = await tmf.getMailboxByToken('eyJhbGciOiJIUzI1NiIsInR5c ... xEFDD_TxGMVCnF1El5xIyPU')

  console.log(mailbox)

  /* {
    token: null,
    mailbox: null,
    isOk: false,
    getMessages: [AsyncFunction (anonymous)],
    getMessagesInterval: [AsyncFunction: getMessagesInterval],
    killMessagesInterval: [Function: killMessagesInterval],
    findMessage: [AsyncFunction: findMessage],
    findMessageInterval: [AsyncFunction: findMessageInterval]
  } */

  if (mailbox.isOk) {
    // the mailbox was created successfully, so it can be used
    const messages = await mailbox.getMessages()
    console.log(await messages[0].getFullMessage())
  } else {
    // something went wrong...
  }

  setTimeout(() => {
    tmf.kill()
  }, 60000 * 10)
})()
```

#### <a name="enkill">kill</a>

The [kill](#kill) function kills the Puppeteer process and finishes [TempMailFuck](#entempmailfuck).

```sh
const TempMailFuck = require('temp-mail-fuck')

;(async () => {
  const tmf = await TempMailFuck()

  // your actions

  setTimeout(() => {
    tmf.kill()
  }, 60000 * 10)
})()
```

#### <a name="engetmessages">getMessages</a>

The [getMessage](#engetmessages) function returns an array of emails, each of which contains only a preliminary message and the getFullMessage function that can be used to get the full message. It does not accept anything as parameters.

```sh
const TempMailFuck = require('temp-mail-fuck')

;(async () => {
  const tmf = await TempMailFuck({
    savePath: __dirname + '/myMailBox.json'
  })

  //const mailbox = await tmf.createMailbox()
  const mailbox = await tmf.getMailboxByMail('rokanod348@biohorta.com')
  //const mailbox = await tmf.getMailboxByToken('eyJhbGciOiJIUzI1NiIsInR5c ... xEFDD_TxGMVCnF1El5xIyPU')

  console.log(mailbox.mailbox) // rokanod348@biohorta.com

  if (mailbox.isOk) {
    const messages = await mailbox.getMessages()

    console.log(messages)

  /* [
      {
        _id: '6104961ed1a97500a1c32d52',
        receivedAt: 1627690527,
        from: 'Stas Prohetamine <prohetamine@gmail.com>',
        subject: null,
        bodyPreview: ' Привет бедный человек ',
        attachmentsCount: 0,
        getFullMessage: [AsyncFunction (anonymous)]
      }
    ] */

    if (messages.length > 0) {
      console.log(await messages[0].getFullMessage())

    /* {
        _id: '6104961ed1a97500a1c32d52',
        receivedAt: 1627690527,
        user: '46df74731e18464c89d55b2972669556',
        mailbox: 'rokanod348@biohorta.com',
        from: 'Stas Prohetamine <prohetamine@gmail.com>',
        subject: null,
        bodyPreview: ' Привет бедный человек ',
        bodyHtml: '<div dir="ltr">Привет бедный человек</div>\n',
        attachmentsCount: 0,
        attachments: [],
        createdAt: '2021-07-31T00:15:26.712Z'
      } */
    }
  }

  setTimeout(() => {
    tmf.kill()
  }, 60000 * 10)
})()
```

#### <a name="engetmessagesinterval">getMessagesInterval</a>

The [getMessagesInterval](#engetmessagesinterval) function returns an array of messages via callback with an interval of _N milliseconds, each of which contains only a preliminary message and the getFullMessage function that can be used to get the full message. As parameters, it takes callback as the first and only parameter to which it transmits messages, and takes the interval time in milliseconds as the second parameter.

| parameters | default value | information|
| ------ | ------ | ------ |
| function | global.TMFFCB | callback function with an argument in the form of an array of letters |
| number | 30000 | interval time in milliseconds |

```sh
const TempMailFuck = require('temp-mail-fuck')

;(async () => {
  const tmf = await TempMailFuck({
    savePath: __dirname + '/myMailBox.json'
  })

  //const mailbox = await tmf.createMailbox()
  const mailbox = await tmf.getMailboxByMail('rokanod348@biohorta.com')
  //const mailbox = await tmf.getMailboxByToken('eyJhbGciOiJIUzI1NiIsInR5c ... xEFDD_TxGMVCnF1El5xIyPU')

  console.log(mailbox.mailbox) // rokanod348@biohorta.com

  if (mailbox.isOk) {
    const id = await mailbox.getMessagesInterval(async messages => {
      console.log(messages)

      /* [
        {
          _id: '6104961ed1a97500a1c32d52',
          receivedAt: 1627690527,
          from: 'Stas Prohetamine <prohetamine@gmail.com>',
          subject: null,
          bodyPreview: ' Привет бедный человек ',
          attachmentsCount: 0,
          getFullMessage: [AsyncFunction (anonymous)]
        }
      ] */

      if (messages.length > 0) {
        console.log(await messages[0].getFullMessage())

      /* {
          _id: '6104961ed1a97500a1c32d52',
          receivedAt: 1627690527,
          user: '46df74731e18464c89d55b2972669556',
          mailbox: 'rokanod348@biohorta.com',
          from: 'Stas Prohetamine <prohetamine@gmail.com>',
          subject: null,
          bodyPreview: ' Привет бедный человек ',
          bodyHtml: '<div dir="ltr">Привет бедный человек</div>\n',
          attachmentsCount: 0,
          attachments: [],
          createdAt: '2021-07-31T00:15:26.712Z'
        } */
      }
    }, 5000)
  }

  setTimeout(() => {
    tmf.kill()
  }, 60000 * 10)
})()
```

#### <a name="enfindmessage">findMessage</a>

The [findMessage](#enfindmessage) function returns the found message using the built-in callback filter of matches. In a successfully found email, there is only a preliminary message and the getFullMessage function that can be used to get the full message. It takes the callback function of the filter as parameters and passes the object of the preliminary message as the first and only parameter.

| parameters | default value | information|
| ------ | ------ | ------ |
| function | global.TMFFCB | callback function with arguments in the form of keys of the preliminary letter object |

```sh
const TempMailFuck = require('temp-mail-fuck')

;(async () => {
  const tmf = await TempMailFuck({
    savePath: __dirname + '/myMailBox.json'
  })

  //const mailbox = await tmf.createMailbox()
  const mailbox = await tmf.getMailboxByMail('rokanod348@biohorta.com')
  //const mailbox = await tmf.getMailboxByToken('eyJhbGciOiJIUzI1NiIsInR5c ... xEFDD_TxGMVCnF1El5xIyPU')

  console.log(mailbox.mailbox) // rokanod348@biohorta.com

  if (mailbox.isOk) {
    const prohetamine = await mailbox.findMessage(({ from, subject, bodyPreview }) => from.match(/prohetamine/gi))

    console.log(prohetamine)

    /* {
      isFind: true,
      message: {
        _id: '6104961ed1a97500a1c32d52',
        receivedAt: 1627690527,
        from: 'Stas Prohetamine <prohetamine@gmail.com>',
        subject: null,
        bodyPreview: ' Привет бедный человек ',
        attachmentsCount: 0,
        getFullMessage: [AsyncFunction (anonymous)]
      }
    } */

    if (prohetamine.isFind) {
      console.log(await prohetamine.message.getFullMessage())

      /* {
        _id: '6104961ed1a97500a1c32d52',
        receivedAt: 1627690527,
        user: '46df74731e18464c89d55b2972669556',
        mailbox: 'rokanod348@biohorta.com',
        from: 'Stas Prohetamine <prohetamine@gmail.com>',
        subject: null,
        bodyPreview: ' Привет бедный человек ',
        bodyHtml: '<div dir="ltr">Привет бедный человек</div>\n',
        attachmentsCount: 0,
        attachments: [],
        createdAt: '2021-07-31T00:15:26.712Z'
      } */
    }
  }

  setTimeout(() => {
    tmf.kill()
  }, 60000 * 10)
})()
```

#### <a name="enfindmessageinterval">findMessageInterval</a>

The [findMessageInterval](#enfindmessageinterval) function returns the found message to callback2 using the built-in callback1 match filter with an interval of _N milliseconds. In a successfully found email, there is only a preliminary message and the getFullMessage function that can be used to get the full message. It takes the callback function of the filter as parameters and passes the object of the preliminary message as the first and only parameter.

| parameters | default value | information|
| ------ | ------ | ------ |
| function | global.TMFFCB | callback function with arguments in the form of keys of the preliminary letter object |
| function | global.TMFFCB | callback function with an argument in the form of an array of letters |
| number | 30000 | interval time in milliseconds |

```sh
const TempMailFuck = require('temp-mail-fuck')

;(async () => {
  const tmf = await TempMailFuck({
    savePath: __dirname + '/myMailBox.json'
  })

  //const mailbox = await tmf.createMailbox()
  const mailbox = await tmf.getMailboxByMail('rokanod348@biohorta.com')
  //const mailbox = await tmf.getMailboxByToken('eyJhbGciOiJIUzI1NiIsInR5c ... xEFDD_TxGMVCnF1El5xIyPU')

  console.log(mailbox.mailbox) // rokanod348@biohorta.com

  if (mailbox.isOk) {
    const id = await mailbox.findMessageInterval(
      ({ from, subject, bodyPreview }) => from.match(/prohetamine/gi),
      async _message => {
        console.log(_message)

        /* {
          isFind: true,
          message: {
            _id: '6104961ed1a97500a1c32d52',
            receivedAt: 1627690527,
            from: 'Stas Prohetamine <prohetamine@gmail.com>',
            subject: null,
            bodyPreview: ' Привет бедный человек ',
            attachmentsCount: 0,
            getFullMessage: [AsyncFunction (anonymous)]
          }
        } */

        const { message, isFind } = _message

        if (isFind) {
          console.log(await message.getFullMessage())

          /* {
            _id: '6104961ed1a97500a1c32d52',
            receivedAt: 1627690527,
            user: '46df74731e18464c89d55b2972669556',
            mailbox: 'rokanod348@biohorta.com',
            from: 'Stas Prohetamine <prohetamine@gmail.com>',
            subject: null,
            bodyPreview: ' Привет бедный человек ',
            bodyHtml: '<div dir="ltr">Привет бедный человек</div>\n',
            attachmentsCount: 0,
            attachments: [],
            createdAt: '2021-07-31T00:15:26.712Z'
          } */
        }
      },
      5000
    )

    // mailbox.killMessagesInterval(id) // kills the interval
  }

  setTimeout(() => {
    tmf.kill()
  }, 60000 * 10)
})()
```

#### <a name="enfindmessageinterval">clearMessagesInterval</a>

The function [clearMessagesInterval](#enkillmessagesinterval) kills either of the intervals [findMessageInterval](#enfindmessageinterval) or [getMessagesInterval](#engetmessagesinterval). Accepts the interval ID as parameters.

| parameters | default value | information|
| ------ | ------ | ------ |
| id | null | interval id |

```sh
const TempMailFuck = require('temp-mail-fuck')

;(async () => {
  const tmf = await TempMailFuck({
    savePath: __dirname + '/myMailBox.json'
  })

  const mailbox = await tmf.createMailbox()

  if (mailbox.isOk) {
    const id = await mailbox.getMessagesInterval(async messages => {
      console.log(messages)
    }, 5000)

    setTimeout(() => {
      mailbox.killMessagesInterval(id) // kills the interval
    }, 30000)
  }

  setTimeout(() => {
    tmf.kill()
  }, 60000 * 10)
})()
```

### Contacts

My Telegram: [@prohetamine](https://t.me/prohetamine), [channel](https://t.me/prohetamine)

Email: prohetamine@gmail.com

Donat money: [patreon](https://www.patreon.com/prohetamine)

If you have any questions and/or suggestions, please email me in telegram, if you find any bugs also let me know, I will be very grateful.
