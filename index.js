/* eslint-disable  func-names */
/* eslint quote-props: ["error", "consistent"]*/

'use strict';
const MAX_NUMER = 1000;


const Alexa = require('alexa-sdk');

const APP_ID = 'amzn1.ask.skill.7da93716-df16-4cbf-9b92-32a35246e4e8';

const generateNumber = function(){
    const myNumber = Math.floor((Math.random() * MAX_NUMER) + 1);

    this.attributes.speechOutput = this.t('NUMBER_MESSAGE', myNumber);
    this.emit(':tell', this.attributes.speechOutput);
};

const handlers = {
    'NewSession': function () {
        generateNumber.apply(this);
    },
    'RandomNumberIntent': function () {
        generateNumber.apply(this);
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
            NUMBER_MESSAGE: 'The generated number is: %d',
            HELP_MESSAGE: "You can generate numbers saying, generate random number, or, you can say exit...Now, what can I help you with?",
            HELP_REPROMT: "You can say things like, generate random number, or you can say exit...Now, what can I help you with?",
            STOP_MESSAGE: 'Goodbye!'
        },
    },
    'en-US': {
        translation: {
            SKILL_NAME: 'Random number generator',
            NUMBER_MESSAGE: 'The generated number is: %d',
            HELP_MESSAGE: "You can generate numbers saying, generate random number, or, you can say exit...Now, what can I help you with?",
            HELP_REPROMT: "You can say things like, generate random number, or you can say exit...Now, what can I help you with?",
            STOP_MESSAGE: 'Goodbye!'
        },
    },
    'de-DE': {
        translation: {
            SKILL_NAME: 'Zufallszahlengenerator',
            NUMBER_MESSAGE: 'Die generierte Zahl lautet: %d',
            HELP_MESSAGE: 'Du kannst beispielsweise Fragen sagen wie „Zufallszahl generieren“ oder du kannst „Beenden“ sagen ... Wie kann ich dir helfen?',
            HELP_REPROMT: 'Du kannst beispielsweise Sachen sagen wie „Zufallszahl generieren“ oder du kannst „Beenden“ sagen ... Wie kann ich dir helfen?',
            STOP_MESSAGE: 'Auf Wiedersehen!'
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
