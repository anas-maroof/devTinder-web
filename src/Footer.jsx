const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="w-full bg-gray-900 text-gray-300 text-center py-4 flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 font-poppins">
      <span className="flex items-center gap-2">
        Created By
        <i className="fa-solid fa-heart text-red-500 animate-pulse"></i>
        <a
          href="https://www.linkedin.com/in/mohd-anas-maroof-45a650295/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-white hover:text-red-500 transition font-semibold"
          title="Anas Maroof's LinkedIn Profile"
        >
          Anas <span className="text-red-500">Maroof</span>
        </a>
      </span>

      <span className="flex items-center gap-1">
        <i className="fa-solid fa-copyright"></i> {year}
      </span>

      <a
        href="https://github.com/anas-maroof/netflix-gpt"
        target="_blank"
        rel="noopener noreferrer"
        className="text-white hover:text-red-400 font-bold transition"
        title="Netflix GPT GitHub Repository"
      >
        Dev<span className="text-red-500">Tinder</span>
      </a>
    </footer>
  );
};

export default Footer;
