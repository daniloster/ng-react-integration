import React from 'react';

import styles from './hello-world.scss';

const HelloWorld = (() => (
    <div className={styles.content}>
        <h1 className={styles.title}>hello world!</h1>
        <p>I am a static component that is not consuming anything.</p>
    </div>
));

export default HelloWorld;
