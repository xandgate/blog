'use client';

import { useState, FormEvent } from 'react';
import { Flex, Input, Button, Text } from '@once-ui-system/core';

interface NewsletterSignupProps {
  segment?: string;
  className?: string;
}

export default function NewsletterSignup({ segment, className }: NewsletterSignupProps) {
  const [email, setEmail] = useState('');
  const [honeypot, setHoneypot] = useState(''); // Hidden field for bots
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    // Client-side validation
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setStatus('error');
      setMessage('Please enter a valid email address');
      return;
    }

    // Rate limiting check (localStorage)
    const lastSubmit = localStorage.getItem('newsletter_last_submit');
    if (lastSubmit) {
      const timeSince = Date.now() - parseInt(lastSubmit, 10);
      if (timeSince < 60000) { // 1 minute
        setStatus('error');
        setMessage('Please wait a moment before trying again');
        return;
      }
    }

    setStatus('loading');
    
    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          honeypot, // Will be empty for humans, filled by bots
          segment,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus('success');
        setMessage(data.message || 'Thanks for subscribing!');
        setEmail('');
        localStorage.setItem('newsletter_last_submit', Date.now().toString());
      } else {
        setStatus('error');
        setMessage(data.error || 'Something went wrong. Please try again.');
      }
    } catch (error) {
      setStatus('error');
      setMessage('Network error. Please check your connection.');
    }
  };

  return (
    <Flex
      as="form"
      direction="column"
      gap="m"
      className={className}
      onSubmit={handleSubmit}
    >
      <Text variant="heading-strong-l">
        Stay Updated
      </Text>
      <Text variant="body-default-m" onBackground="neutral-weak">
        Get notified about new articles and insights.
      </Text>

      {/* Honeypot field - hidden from humans, visible to bots */}
      <input
        type="text"
        name="website"
        value={honeypot}
        onChange={(e) => setHoneypot(e.target.value)}
        style={{ display: 'none' }}
        tabIndex={-1}
        autoComplete="off"
      />

      <Flex gap="m" fillWidth>
        <Input
          id="newsletter-email"
          type="email"
          placeholder="your@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={status === 'loading' || status === 'success'}
          style={{ flex: 1 }}
        />
        <Button
          type="submit"
          variant="primary"
          disabled={status === 'loading' || status === 'success'}
        >
          {status === 'loading' ? 'Subscribing...' : 'Subscribe'}
        </Button>
      </Flex>

      {message && (
        <Text
          variant="body-default-s"
          onBackground={status === 'success' ? 'brand-strong' : 'danger-strong'}
        >
          {message}
        </Text>
      )}
    </Flex>
  );
}
