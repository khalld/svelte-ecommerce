import lang from './lang.json';

export default ({
  en: {
    lang,
    // menu: {
    //   notification: 'You have {{count:gt; 0:{{count}} new {{count; 1:message; default:messages}}!; default:no messages...}}',
    // },
    content: {
      title: 'Welcome to svelte e-commerce',
      info: 'You can now access all your language mutations using <code>{$l(LOCALE, TRANSLATION_KEY)}</code>:',
      // text: 'Visit <a href="{{link}}">kit.svelte.dev</a> to read the documentation',
    },
  },

  it: {
    lang,
    content: {
      title: 'Benvenuto su svelte-ecommerce'
    }
  },

  cs: {
    lang,
    // menu: {
    //   notification: '{{count:gt; 0:Máte {{count}} {{count:gte; 1:novou zprávu; 2:nové zprávy; 5:nových zpráv}}!; default:Nemáte žádné zprávy...}}',
    // },
    content: {
      title: 'Vítejte ve svelte-ecommerce',
      info: 'Nyní máte přístup ke všem jazykovým mutacím prostřednictvím <code>{$l(LOCALE, TRANSLATION_KEY)}</code>:',
      text: 'Dokumentace je k přečtení na <a href="{{link}}">kit.svelte.dev</a>',
    },
  },
});