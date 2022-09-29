import { render, screen } from '@testing-library/react';
import HubSearch from "./HubSearch";


test('renders learn react link', () => {
    render(<HubSearch />);
    const linkElement = screen.getByText(/a/i);
    expect(linkElement).toBeInTheDocument();
});
