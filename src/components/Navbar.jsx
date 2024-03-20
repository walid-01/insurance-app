import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="bg-gray-800 py-4">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <div className="text-white font-bold text-xl">
            <Link href="/">AssuExpert</Link>
          </div>
          {/* Add your navigation links here */}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
