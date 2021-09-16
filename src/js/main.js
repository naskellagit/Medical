'use strict';
const anchorLinks = new AnchorLinks('a.scroll-to');
anchorLinks.plugEventListener('click', anchorLinks.scroll);

const animation = new Animation('.anim-items');
animation.plugWindowEventListener(animation.animOnScroll.bind(animation));

const progressBar = new ProgressBar('.progress-line');
progressBar.plugWindowEventListener(progressBar.progressAnimation.bind(progressBar));

const form = new Form('.form__body');
form.plugEventListener('submit', form.formSend.bind(form));

const fullScreen = new FullScreen('.container__foto');
fullScreen.plugEventListener('click', fullScreen.show);

const nightMode = new NightMode('.night');
nightMode.plugEventListener('click', nightMode.setNightMode.bind(nightMode));