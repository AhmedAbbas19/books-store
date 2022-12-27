import React from 'react';
import { render, queryByAttribute } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { store } from '../store/store';

export const renderWithContext = (element: React.ReactElement) => {
    return render(
        <Provider store={store}>
            <Router>
                {element}
            </Router>
        </Provider>
    );
}

export const getBy = (attr: string) => queryByAttribute.bind(null, attr);
