export default function Footer({ children }) {
  const year = new Date().getFullYear();
  return (
    <footer
      style={{
        padding: '1rem 0',
        background: 'var(--bg-2)',
        textAlign: 'center',
        width: '100%',
        maxHeight: '10vh',
      }}
    >
      <p style={{ display: 'block', margin: '0 auto' }}>
        © {year}{' '}
        <a
          href="https://https://truckdrivernews.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Truck Driver News
        </a>{' '}
        app Built with React & Vite {children}
      </p>
    </footer>
  );
}
