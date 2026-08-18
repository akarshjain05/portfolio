import { useState, useEffect } from 'react';

export default function Typewriter({ messages, typingSpeed = 50, deletingSpeed = 30, delayBeforeDelete = 2000 }) {
  const [text, setText] = useState('');
  const [messageIndex, setMessageIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let timer;
    const currentMessage = messages[messageIndex];

    if (isDeleting) {
      if (text === '') {
        setIsDeleting(false);
        setMessageIndex((prev) => (prev + 1) % messages.length);
      } else {
        timer = setTimeout(() => {
          setText(currentMessage.substring(0, text.length - 1));
        }, deletingSpeed);
      }
    } else {
      if (text === currentMessage) {
        timer = setTimeout(() => setIsDeleting(true), delayBeforeDelete);
      } else {
        timer = setTimeout(() => {
          setText(currentMessage.substring(0, text.length + 1));
        }, typingSpeed);
      }
    }

    return () => clearTimeout(timer);
  }, [text, isDeleting, messageIndex, messages, typingSpeed, deletingSpeed, delayBeforeDelete]);

  return (
    <span className="typewriter">
      {text}
      <span className="typewriter__cursor">|</span>
    </span>
  );
}
