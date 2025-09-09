const Footer = () => {
  return (
    <footer className="border-t bg-gray-50">
      <div className="max-w-6xl mx-auto px-6 py-6 flex justify-between items-center text-sm text-gray-500">
        <p>© {new Date().getFullYear()} MyBlog. All rights reserved.</p>
        <p>
          Built with{" "}
          <a
            href="https://nextjs.org/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-700 underline"
          >
            Next.js
          </a>{" "}
          &{" "}
          <a
            href="https://expressjs.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-700 underline"
          >
            Express
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
