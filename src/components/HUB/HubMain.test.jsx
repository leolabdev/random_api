import { render, screen } from '@testing-library/react';
import HubMain from "./HubMain";


test('We have h1 element Global hub', () => {
    render(<HubMain />);
    const linkElement = screen.getByText(/Global Hub/i);
    expect(linkElement).toBeInTheDocument();
});
