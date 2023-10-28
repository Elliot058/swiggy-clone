import React, { createContext, useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';

export const ChatContext = createContext([{}, (value) => value]);

ChatContext.displayName = 'ChatContext';

export const ChatProvider = ({ value, children }) => {
    const [chat, setChat] = useState({
        chat: []
    });

    useEffect(() => {
        setChat(value);
    }, [value]);

    return <ChatContext.Provider value={[chat, setChat]}>{children}</ChatContext.Provider>;
};

ChatProvider.propTypes = {
    children: PropTypes.any.isRequired,
    value: PropTypes.object,
};

export const useChat = () => useContext(ChatContext);
