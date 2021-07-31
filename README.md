![enter image description here](/media/logo.png)

##### lang: [ru](#rulang) [en](#enlang)


# <a name="rulang">temp-mail-fuck</a>

> temp-mail-fuck - Твой лучший почтовый друг.

### Почему ?
Я очень бедный человек, в моей семье 14 человек и они тоже бедны представляете ? мы просто не можем позволить себе платить 19$ за ебаных 1000 запросов в месяц для какой-то одноразовой почты. А что если очень хочется ? мы случайно заметили что, моднейший [Cloudflare](/media/Cloudflare.jpg) пропускает все основные запросы к api и решили им [воспользоваться](https://www.npmjs.com/package/temp-mail-fuck), [спасибо](https://temp-mail.org/) за эту возможность, теперь моя [семья](https://www.npmjs.com/package/temp-mail-fuck) питается почтовыми ящиками! Надеюсь мой вклад облегчит кому-то [жизнь](https://www.patreon.com/prohetamine).

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

#### <a name="tempmailfuck">TempMailFuck</a>

Функция [TempMailFuck](#tempmailfuck) инициализирует подключение к Puppeteer принимает два необязательных параметра, два объекта и возвращает объект с функциями: [kill](#kill), [createMailbox](#createmailbox), [getMailboxByMail](#getmailboxbymail), [getMailboxByToken](#getmailboxbytoken). Не забывайте убивать процесс Puppeteer если не используете модуль с помощью [kill](#kill).

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

  tmf.kill() // Убивает процесс puppeteer
})()
```

#### <a name="createmailbox">createMailbox</a>

Функция [createMailbox](#createmailbox) создает новый почтовый ящик, взаимодействовать с ним можно через функции [getMessages](#getmessages), [getMessagesInterval](#getmessagesinterval), [clearMessagesInterval](#clearmessagestnterval), [findMessage](#findmessage), [findMessageInterval](#findmessageinterval).

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
    clearMessagesInterval: [Function: clearMessagesInterval],
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

    setTimeout(() => {
      mailbox.clearMessagesInterval(id)
      tmf.kill()
    }, 60000)
  } else {
    // что-то пошло не так...
  }
})()
```

#### <a name="getmailboxbymail">getMailboxByMail</a>

Функция [getMailboxByMail](#getmailboxbymail) ищет почтовый ящик по mail переданному первым параметром, взаимодействовать с ним можно через функции [getMessages](#getmessages), [getMessagesInterval](#getmessagesinterval), [clearMessagesInterval](#clearmessagestnterval), [findMessage](#findmessage), [findMessageInterval](#findmessageinterval).

> getMailboxByMail - доступен только когда есть savePath.

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
    clearMessagesInterval: [Function: clearMessagesInterval],
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
})()
```

#### <a name="getmailboxbytoken">getMailboxByToken</a>

Функция [getMailboxByToken](#getmailboxbytoken) ищет почтовый ящик по token переданному первым параметром, взаимодействовать с ним можно через функции [getMessages](#getmessages), [getMessagesInterval](#getmessagesinterval), [clearMessagesInterval](#clearmessagestnterval), [findMessage](#findmessage), [findMessageInterval](#findmessageinterval).

> getMailboxByToken - доступен только когда есть savePath.

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
    clearMessagesInterval: [Function: clearMessagesInterval],
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
})()
```

#### <a name="kill">kill</a>

Функция [kill](#kill) убивает процесс Puppeteer и заканчивает работу [TempMailFuck](#tempmailfuck).

```sh
const TempMailFuck = require('temp-mail-fuck')

;(async () => {
  const tmf = await TempMailFuck()

  // ваши действия

  tmf.kill()
})()
```

#### <a name="getmessages">getMessages</a>

Функция [getMessages](#getmessages) возвращает массив писем в каждом из которых есть только предварительное сообщение и функция getFullMessage которую можно использовать для получения полного сообщения, в качестве параметров ничего не принимает.

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

  tmf.kill()
})()
```
