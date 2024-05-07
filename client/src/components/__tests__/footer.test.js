import React from 'react';
import { render, screen } from '@testing-library/react';
import Footer from '../Footer/Footer';
import '@testing-library/jest-dom';

describe('Footer component', () => {
  test('renders social media links', () => {
    render(<Footer />);
    const linkedinLink = screen.getByTestId('linkedin-link');
    const githubLink = screen.getByTestId('github-link');
    expect(linkedinLink).toBeInTheDocument();
    expect(githubLink).toBeInTheDocument();
  });

  test('social media links have correct href attributes', () => {
    render(<Footer />);
    const linkedinLink = screen.getByTestId('linkedin-link');
    const githubLink = screen.getByTestId('github-link');
    expect(linkedinLink).toHaveAttribute('href', 'https://www.linkedin.com/in/harneet123/');
    expect(githubLink).toHaveAttribute('href', 'https://github.com/HarneetKaur04');
  });
});
