function Footer() {
  return (
    <footer className="bg-indigo-900 text-white py-6 mt-12">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center">

        <div>
          <h2 className="text-xl font-bold">
            🎓 AI Exam Preparation Platform
          </h2>
          <p className="text-indigo-200 mt-2">
            Learn smarter with Artificial Intelligence.
          </p>
        </div>

        <div className="mt-4 md:mt-0 text-center md:text-right">
          <p className="text-indigo-200">
            © {new Date().getFullYear()} AI Exam Preparation Platform
          </p>

          <p className="text-sm text-indigo-300 mt-1">
            Developed by Vijayalakshmi K
          </p>
        </div>

      </div>
    </footer>
  );
}

export default Footer;