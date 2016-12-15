/* eslint-disable  func-names */
/* eslint quote-props: ["error", "consistent"]*/

'use strict';
const MAX_NUMER = 1000;


const Alexa = require('alexa-sdk');

const APP_ID = 'amzn1.ask.skill.7da93716-df16-4cbf-9b92-32a35246e4e8';

const handlers = {
    'NewSession': function () {
        this.attributes.speechOutput = this.t('WELCOME_MESSAGE', this.t('SKILL_NAME'));
  
        this.attributes.repromptSpeech = this.t('WELCOME_REPROMT');
        this.emit(':ask', this.attributes.speechOutput, this.attributes.repromptSpeech);
    },
    'RandomNumberIntent': function () {
        const cardTitle = this.t('DISPLAY_CARD_TITLE', this.t('SKILL_NAME'));
        const myNumber = Math.floor((Math.random() * MAX_NUMER) + 1);

        this.attributes.speechOutput = myNumber;
		this.attributes.repromptSpeech = this.t('RANDOM_NUMER_REPEAT');
		this.emit(':askWithCard', myNumber, this.attributes.repromptSpeech, cardTitle, myNumber);
    },
    'AMAZON.HelpIntent': function () {
        this.attributes.speechOutput = this.t('HELP_MESSAGE');
        this.attributes.repromptSpeech = this.t('HELP_REPROMT');
        this.emit(':ask', this.attributes.speechOutput, this.attributes.repromptSpeech);
    },
    'AMAZON.RepeatIntent': function () {
        this.emit(':ask', this.attributes.speechOutput, this.attributes.repromptSpeech);
    },
    'AMAZON.StopIntent': function () {
        this.emit('SessionEndedRequest');
    },
    'AMAZON.CancelIntent': function () {
        this.emit('SessionEndedRequest');
    },
    'SessionEndedRequest': function () {
        this.emit(':tell', this.t('STOP_MESSAGE'));
    },
};

const languageStrings = {
    'en-GB': {
        translation: {
            SKILL_NAME: 'Random number generator',
            WELCOME_MESSAGE: "Welcome to %s. You can say commands like, generate random number.",
            WELCOME_REPROMT: 'For instructions on what you can say, please say help me.',
            DISPLAY_CARD_TITLE: '%s  - Generated number.',
            HELP_MESSAGE: "You can generate numbers saying, generate random number, or, you can say exit...Now, what can I help you with?",
            HELP_REPROMT: "You can say things like, generate random number, or you can say exit...Now, what can I help you with?",
            STOP_MESSAGE: 'Goodbye!',
			RANDOM_NUMER_REPEAT: 'Repeat random number'
        },
    },
    'en-US': {
        translation: {
            SKILL_NAME: 'Random number generator',
            WELCOME_MESSAGE: "Welcome to %s. You can say commands like, generate random number.",
            WELCOME_REPROMT: 'For instructions on what you can say, please say help me.',
            DDISPLAY_CARD_TITLE: '%s  - Generated number.',
            HELP_MESSAGE: "You can generate numbers saying, generate random number, or, you can say exit...Now, what can I help you with?",
            HELP_REPROMT: "You can say things like, generate random number, or you can say exit...Now, what can I help you with?",
            STOP_MESSAGE: 'Goodbye!',
			RANDOM_NUMER_REPEAT: 'Repeat random number'
        },
    },
    'de-DE': {
        translation: {
            SKILL_NAME: 'Zufallszahlengenerator',
            WELCOME_MESSAGE: 'Willkommen bei %s. Du kannst Befehle sagen, zum Beispiel Zufallszahl generieren.',
            WELCOME_REPROMT: 'Wenn du wissen möchtest, was du sagen kannst, sag einfach „Hilf mir“.',
            DISPLAY_CARD_TITLE: '%s - Erzeugte Zufallszahl',
            HELP_MESSAGE: 'Du kannst beispielsweise Fragen sagen wie „Zufallszahl generieren“ oder du kannst „Beenden“ sagen ... Wie kann ich dir helfen?',
            HELP_REPROMT: 'Du kannst beispielsweise Sachen sagen wie „Zufallszahl generieren“ oder du kannst „Beenden“ sagen ... Wie kann ich dir helfen?',
            STOP_MESSAGE: 'Auf Wiedersehen!',
			RANDOM_NUMER_REPEAT: 'Zufallszahl wiederholen'
        },
    },
};

exports.handler = (event, context) => {
    const alexa = Alexa.handler(event, context);
    alexa.APP_ID = APP_ID;
    // To enable string internationalization (i18n) features, set a resources object.
    alexa.resources = languageStrings;
    alexa.registerHandlers(handlers);
    alexa.execute();
};
